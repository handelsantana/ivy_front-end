import { promises as fs } from "fs";
import path from "path";
import type { Author, Post } from "@/cms/types";

export interface CMSFileState {
  posts: Post[];
  authors: Author[];
}

export interface CMSKVStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "ivy-cms.json");
const CMS_KV_KEY = "ivy-cms-state";

function normalizeState(value: unknown): CMSFileState {
  const parsed = (value ?? {}) as Partial<CMSFileState>;
  return {
    posts: Array.isArray(parsed.posts) ? parsed.posts : [],
    authors: Array.isArray(parsed.authors) ? parsed.authors : [],
  };
}

async function readFromKV(store: CMSKVStore): Promise<CMSFileState> {
  const raw = await store.get(CMS_KV_KEY);
  if (!raw) {
    return { posts: [], authors: [] };
  }

  try {
    return normalizeState(JSON.parse(raw));
  } catch {
    return { posts: [], authors: [] };
  }
}

async function writeToKV(store: CMSKVStore, state: CMSFileState): Promise<void> {
  await store.put(CMS_KV_KEY, JSON.stringify(normalizeState(state)));
}

export async function readCMSFile(store?: CMSKVStore): Promise<CMSFileState> {
  if (store) {
    return readFromKV(store);
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { posts: [], authors: [] };
    }
    throw error;
  }
}

export async function writeCMSFile(state: CMSFileState, store?: CMSKVStore): Promise<void> {
  if (store) {
    await writeToKV(store, state);
    return;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(normalizeState(state), null, 2), "utf-8");
}
