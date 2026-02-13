/**
 * CMS API Adapter
 *
 * Fetches remote articles and maps them into local CMS types.
 */

import type { Author, Post, PostFormat, PostStatus, Vertical, Pillar } from './types';
import { extractHeadings, slugify } from './utils';

const DEFAULT_ARTICLES_ENDPOINT = '/api/articles';
const ARTICLES_ENDPOINT = (
  process.env.NEXT_PUBLIC_IVY_ARTICLES_ENDPOINT || DEFAULT_ARTICLES_ENDPOINT
).trim().replace(/\/+$/, '');

export interface ArticlesApiResponse {
  items?: ArticleApiItem[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface ArticleApiItem {
  id?: number | string;
  title?: string;
  slug?: string;
  content?: string | null;
  summary?: string | null;
  cover_image_url?: string | null;
  status?: string | null;
  published_at?: string | null;
  author?: string | null;
  tags?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function fetchArticles(): Promise<ArticleApiItem[]> {
  const response = await fetch(ARTICLES_ENDPOINT, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles (${response.status})`);
  }

  const data = (await response.json()) as ArticlesApiResponse;
  return Array.isArray(data?.items) ? data.items : [];
}

export function mapArticlesToPosts(items: ArticleApiItem[]): Post[] {
  return items.map(mapArticleToPost);
}

export function mapArticlesToAuthors(items: ArticleApiItem[]): Author[] {
  const now = new Date().toISOString();
  const authorsById = new Map<string, Author>();

  items.forEach((item) => {
    const name = (item.author || '').trim() || 'IVY Editorial';
    const slug = slugify(name) || 'ivy-editorial';
    const id = slug;

    if (!authorsById.has(id)) {
      authorsById.set(id, {
        id,
        name,
        slug,
        bio: '',
        role: 'Contributor',
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  return Array.from(authorsById.values());
}

export function mapArticleToPost(item: ArticleApiItem): Post {
  const now = new Date().toISOString();
  const title = (item.title || '').trim() || 'Untitled';
  const slug = (item.slug || slugify(title) || 'untitled').toString();
  const body = normalizeMarkdownContent((item.content || '').toString());
  const summary = normalizeMarkdownContent((item.summary || '').toString());
  const dek = summary || fallbackDek(body);
  const tags = normalizeTags(item.tags);

  const status = normalizeStatus(item.status, item.published_at);
  const createdAt = item.created_at || now;
  const updatedAt = item.updated_at || createdAt;
  const publishedAt = item.published_at || (status === 'published' ? createdAt : undefined);

  const authorName = (item.author || '').trim() || 'IVY Editorial';
  const authorId = slugify(authorName) || 'ivy-editorial';

  const heroImage = item.cover_image_url || undefined;

  return {
    id: item.id !== undefined ? String(item.id) : slug,
    slug,
    title,
    dek,
    heroImage,
    heroImageAlt: heroImage ? title : undefined,
    format: inferFormat(tags, body),
    vertical: inferVertical(tags, title, summary),
    pillar: inferPillar(tags),
    authorId,
    body,
    headings: extractHeadings(body),
    seo: {
      metaTitle: title,
      metaDescription: dek || summary,
      ogImage: heroImage,
    },
    status,
    publishedAt,
    createdAt,
    updatedAt,
  };
}

function normalizeTags(tags?: string[] | null): string[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => (tag || '').toString().trim().toLowerCase())
    .filter(Boolean);
}

function normalizeStatus(status?: string | null, publishedAt?: string | null): PostStatus {
  const value = (status || '').toString().trim().toLowerCase();

  if (value === 'published') return 'published';
  if (publishedAt) return 'published';

  switch (value) {
    case 'draft':
    case 'review':
    case 'approved':
    case 'archived':
      return value;
    default:
      return 'draft';
  }
}

function inferFormat(tags: string[], body: string): PostFormat {
  const has = (needle: string) => tags.some((tag) => tag.includes(needle));

  if (has('guide') || has('how-to') || has('tutorial')) return 'guide';
  if (has('index') || has('directory')) return 'index';
  if (has('news') || has('briefing') || has('breaking')) return 'news';
  if (has('interview')) return 'interview';
  if (has('opinion') || has('editorial')) return 'opinion';
  if (has('case-study') || has('case study')) return 'case-study';

  if ((body || '').length < 600) return 'news';
  return 'deep-dive';
}

function inferVertical(tags: string[], title: string, summary: string): Vertical {
  const haystack = `${title} ${summary}`.toLowerCase();
  const has = (needle: string) =>
    tags.some((tag) => tag.includes(needle)) || haystack.includes(needle);
  const hasAny = (needles: string[]) => needles.some((needle) => has(needle));

  const explicit = tags.find((tag) =>
    ['ai', 'creator', 'creator-economy', 'business', 'culture', 'living', 'technology', 'tech'].includes(tag)
  );
  if (explicit) {
    switch (explicit) {
      case 'creator':
      case 'creator-economy':
        return 'creator-economy';
      case 'business':
        return 'business';
      case 'culture':
      case 'living':
        return 'culture';
      case 'technology':
      case 'tech':
        return 'technology';
      case 'ai':
      default:
        return 'ai';
    }
  }

  if (hasAny(['ai', 'genai', 'ml', 'machine learning', 'machine-learning', 'llm', 'gpt', 'agentic'])) {
    return 'ai';
  }
  if (hasAny(['creator', 'newsletter', 'youtube', 'tiktok', 'influencer', 'audience', 'monetization'])) {
    return 'creator-economy';
  }
  if (hasAny(['business', 'startup', 'saas', 'enterprise', 'finance', 'pricing', 'market', 'sales'])) {
    return 'business';
  }
  if (hasAny(['culture', 'living', 'lifestyle', 'wellness', 'productivity', 'remote', 'work-life', 'media'])) {
    return 'culture';
  }
  if (hasAny(['technology', 'tech', 'hardware', 'device', 'software', 'product'])) {
    return 'technology';
  }

  return 'ai';
}

function inferPillar(tags: string[]): Pillar {
  const has = (needle: string) => tags.some((tag) => tag.includes(needle));

  if (has('tools')) return 'tools';
  if (has('strategy')) return 'strategy';
  if (has('trends') || has('trend') || has('news') || has('briefing')) return 'trends';
  if (has('people')) return 'people';
  if (has('analysis')) return 'analysis';

  return 'analysis';
}

function fallbackDek(body: string): string {
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return '';

  const firstLine = lines[0].replace(/^#{1,6}\s+/, '');
  return firstLine.slice(0, 220);
}

function normalizeMarkdownContent(value: string): string {
  if (!value) return '';
  const normalizedLineEndings = value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const hasEscapedNewlines =
    normalizedLineEndings.includes('\\n') || normalizedLineEndings.includes('\\r');
  if (!hasEscapedNewlines) return normalizedLineEndings;

  // If content has no real newlines, it's likely double-escaped.
  const hasRealNewlines = /[\n]/.test(normalizedLineEndings);
  if (!hasRealNewlines) {
    return normalizedLineEndings
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t');
  }

  // If mixed, only replace escaped sequences.
  return normalizedLineEndings
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t');
}
