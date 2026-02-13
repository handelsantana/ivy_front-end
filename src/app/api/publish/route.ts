import { NextResponse } from "next/server";
import type { Author, Post, PostFormat, PostStatus, Vertical, Pillar } from "@/cms/types";
import { extractHeadings, generateId, slugify } from "@/cms/utils";
import { readCMSFile, writeCMSFile, type CMSKVStore } from "@/server/cmsStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedFormats: PostFormat[] = [
  "deep-dive",
  "guide",
  "index",
  "news",
  "opinion",
  "interview",
  "case-study",
];

const allowedVerticals: Vertical[] = [
  "ai",
  "creator-economy",
  "business",
  "culture",
  "technology",
];

const allowedPillars: Pillar[] = ["tools", "strategy", "trends", "people", "analysis"];
const CMS_KV_BINDING = "CMS_DATA";
const CMS_MEMORY_KEY = "__IVY_CMS_STATE__";
const CMS_MEMORY_WARNING_KEY = "__IVY_CMS_MEMORY_WARNING__";

type PublishPayload = {
  id?: string;
  title: string;
  dek: string;
  body: string;
  slug?: string;
  heroImage?: string;
  heroImageAlt?: string;
  format?: PostFormat;
  vertical?: Vertical;
  pillar?: Pillar;
  status?: PostStatus;
  publishedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
  };
  authorId?: string;
  author?: {
    name: string;
    slug?: string;
    bio?: string;
    role?: string;
    avatar?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
};

function getToken(headers: Headers): string | null {
  const auth = headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice("Bearer ".length).trim();
  }
  return headers.get("x-ivy-token");
}

function normalizePostStatus(status?: PostStatus): PostStatus {
  return status ?? "published";
}

function resolveMemoryStore(): CMSKVStore {
  return {
    async get() {
      return (globalThis as Record<string, unknown>)[CMS_MEMORY_KEY] as string | null | undefined ?? null;
    },
    async put(_key, value) {
      (globalThis as Record<string, unknown>)[CMS_MEMORY_KEY] = value;
    },
  };
}

function warnMemoryFallback(): void {
  const globalState = globalThis as Record<string, unknown>;
  if (globalState[CMS_MEMORY_WARNING_KEY]) {
    return;
  }

  console.warn(
    `[IVY CMS] Cloudflare KV binding "${CMS_KV_BINDING}" not found. Falling back to in-memory publish store (non-persistent).`
  );
  globalState[CMS_MEMORY_WARNING_KEY] = true;
}

async function resolveCloudflareKVStore(): Promise<CMSKVStore | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const binding = env[CMS_KV_BINDING];

    if (
      binding &&
      typeof (binding as CMSKVStore).get === "function" &&
      typeof (binding as CMSKVStore).put === "function"
    ) {
      return binding as CMSKVStore;
    }

    if (process.env.NODE_ENV === "production") {
      warnMemoryFallback();
      return resolveMemoryStore();
    }

    return undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  const secret = process.env.IVY_WEBHOOK_SECRET;
  if (secret) {
    const token = getToken(request.headers);
    if (!token || token !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let payload: PublishPayload;
  try {
    payload = (await request.json()) as PublishPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload?.title || !payload?.dek || !payload?.body) {
    return NextResponse.json(
      { error: "title, dek, and body are required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const kvStore = await resolveCloudflareKVStore();
  const state = await readCMSFile(kvStore);

  const format = allowedFormats.includes(payload.format ?? "news")
    ? (payload.format ?? "news")
    : "news";
  const vertical = allowedVerticals.includes(payload.vertical ?? "ai")
    ? (payload.vertical ?? "ai")
    : "ai";
  const pillar = allowedPillars.includes(payload.pillar ?? "analysis")
    ? (payload.pillar ?? "analysis")
    : "analysis";

  const normalizedSlug = payload.slug ? slugify(payload.slug) : slugify(payload.title);

  const existingIndex = state.posts.findIndex(
    (post) => post.slug === normalizedSlug || (payload.id && post.id === payload.id)
  );

  let authorId = payload.authorId;

  if (!authorId) {
    const authorSlug = payload.author?.slug
      ? slugify(payload.author.slug)
      : payload.author?.name
        ? slugify(payload.author.name)
        : "ivy-editorial";

    let author = state.authors.find((a) => a.slug === authorSlug);

    if (!author) {
      const newAuthor: Author = {
        id: generateId(),
        name: payload.author?.name ?? "IVY Editorial",
        slug: authorSlug,
        bio: payload.author?.bio ?? "The IVY editorial team covering AI, creator economy, and digital business.",
        role: payload.author?.role ?? "Editor",
        avatar: payload.author?.avatar,
        twitter: payload.author?.twitter,
        linkedin: payload.author?.linkedin,
        website: payload.author?.website,
        createdAt: now,
        updatedAt: now,
      };
      state.authors.push(newAuthor);
      author = newAuthor;
    }

    authorId = author.id;
  }

  const status = normalizePostStatus(payload.status);
  const publishedAt = status === "published" ? payload.publishedAt ?? now : payload.publishedAt;

  if (existingIndex >= 0) {
    const existing = state.posts[existingIndex];
    const updated: Post = {
      ...existing,
      title: payload.title,
      dek: payload.dek,
      body: payload.body,
      slug: normalizedSlug,
      heroImage: payload.heroImage ?? existing.heroImage,
      heroImageAlt: payload.heroImageAlt ?? existing.heroImageAlt,
      format,
      vertical,
      pillar,
      authorId,
      seo: { ...existing.seo, ...payload.seo },
      status,
      headings: extractHeadings(payload.body),
      publishedAt,
      updatedAt: now,
    };

    state.posts[existingIndex] = updated;
    await writeCMSFile(state, kvStore);

    return NextResponse.json({
      ok: true,
      updated: true,
      postId: updated.id,
      slug: updated.slug,
      status: updated.status,
    });
  }

  const post: Post = {
    id: generateId(),
    slug: normalizedSlug,
    title: payload.title,
    dek: payload.dek,
    heroImage: payload.heroImage,
    heroImageAlt: payload.heroImageAlt,
    format,
    vertical,
    pillar,
    authorId,
    body: payload.body,
    headings: extractHeadings(payload.body),
    seo: payload.seo ?? {},
    status,
    publishedAt,
    createdAt: now,
    updatedAt: now,
  };

  state.posts.push(post);
  await writeCMSFile(state, kvStore);

  return NextResponse.json({
    ok: true,
    created: true,
    postId: post.id,
    slug: post.slug,
    status: post.status,
  });
}
