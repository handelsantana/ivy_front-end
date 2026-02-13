/**
 * LocalStorage CMS Storage Layer
 * 
 * Provides CRUD operations with localStorage persistence.
 * Designed for easy migration to a database backend.
 */

import type {
  Post,
  Author,
  HomepageModule,
  Report,
  CMSState,
  CreatePostInput,
  UpdatePostInput,
  CreateAuthorInput,
  UpdateAuthorInput,
  CreateModuleInput,
  UpdateModuleInput,
  CreateReportInput,
  UpdateReportInput,
} from './types';
import { generateId, extractHeadings } from './utils';

const STORAGE_KEY = 'ivy_cms_data';

// ─────────────────────────────────────────────────────────────
// Storage Operations
// ─────────────────────────────────────────────────────────────

function getState(): CMSState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse CMS state:', e);
  }
  
  return {
    posts: [],
    authors: [],
    modules: [],
    reports: [],
    currentUser: null,
  };
}

function setState(state: CMSState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ─────────────────────────────────────────────────────────────
// Posts
// ─────────────────────────────────────────────────────────────

export function getPosts(): Post[] {
  return getState().posts;
}

export function getPost(id: string): Post | undefined {
  return getState().posts.find(p => p.id === id);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getState().posts.find(p => p.slug === slug);
}

export function getPublishedPosts(): Post[] {
  return getState().posts.filter(p => p.status === 'published');
}

export function createPost(input: CreatePostInput): Post {
  const state = getState();
  const now = new Date().toISOString();
  
  const post: Post = {
    ...input,
    id: generateId(),
    headings: extractHeadings(input.body),
    createdAt: now,
    updatedAt: now,
  };
  
  state.posts.push(post);
  setState(state);
  return post;
}

export function updatePost(input: UpdatePostInput): Post | undefined {
  const state = getState();
  const index = state.posts.findIndex(p => p.id === input.id);
  
  if (index === -1) return undefined;
  
  const existing = state.posts[index];
  const updated: Post = {
    ...existing,
    ...input,
    headings: input.body ? extractHeadings(input.body) : existing.headings,
    updatedAt: new Date().toISOString(),
  };
  
  state.posts[index] = updated;
  setState(state);
  return updated;
}

export function deletePost(id: string): boolean {
  const state = getState();
  const index = state.posts.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  state.posts.splice(index, 1);
  
  // Also remove from any modules
  state.modules.forEach(module => {
    module.postIds = module.postIds.filter(postId => postId !== id);
  });
  
  setState(state);
  return true;
}

export function publishPost(id: string): Post | undefined {
  const state = getState();
  const post = state.posts.find(p => p.id === id);
  
  if (!post || post.status !== 'approved') {
    console.error('Cannot publish: post must be in "approved" status');
    return undefined;
  }
  
  return updatePost({
    id,
    status: 'published',
    publishedAt: new Date().toISOString(),
  });
}

// ─────────────────────────────────────────────────────────────
// Authors
// ─────────────────────────────────────────────────────────────

export function getAuthors(): Author[] {
  return getState().authors;
}

export function getAuthor(id: string): Author | undefined {
  return getState().authors.find(a => a.id === id);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getState().authors.find(a => a.slug === slug);
}

export function createAuthor(input: CreateAuthorInput): Author {
  const state = getState();
  const now = new Date().toISOString();
  
  const author: Author = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  
  state.authors.push(author);
  setState(state);
  return author;
}

export function updateAuthor(input: UpdateAuthorInput): Author | undefined {
  const state = getState();
  const index = state.authors.findIndex(a => a.id === input.id);
  
  if (index === -1) return undefined;
  
  const updated: Author = {
    ...state.authors[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  
  state.authors[index] = updated;
  setState(state);
  return updated;
}

export function deleteAuthor(id: string): boolean {
  const state = getState();
  
  // Check if author has posts
  const hasPosts = state.posts.some(p => p.authorId === id);
  if (hasPosts) {
    console.error('Cannot delete author with existing posts');
    return false;
  }
  
  const index = state.authors.findIndex(a => a.id === id);
  if (index === -1) return false;
  
  state.authors.splice(index, 1);
  setState(state);
  return true;
}

// ─────────────────────────────────────────────────────────────
// Homepage Modules
// ─────────────────────────────────────────────────────────────

export function getModules(): HomepageModule[] {
  return getState().modules.sort((a, b) => a.position - b.position);
}

export function getModule(id: string): HomepageModule | undefined {
  return getState().modules.find(m => m.id === id);
}

export function getActiveModules(): HomepageModule[] {
  return getModules().filter(m => m.isActive);
}

export function createModule(input: CreateModuleInput): HomepageModule {
  const state = getState();
  const now = new Date().toISOString();
  
  const module: HomepageModule = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  
  state.modules.push(module);
  setState(state);
  return module;
}

export function updateModule(input: UpdateModuleInput): HomepageModule | undefined {
  const state = getState();
  const index = state.modules.findIndex(m => m.id === input.id);
  
  if (index === -1) return undefined;
  
  const updated: HomepageModule = {
    ...state.modules[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  
  state.modules[index] = updated;
  setState(state);
  return updated;
}

export function deleteModule(id: string): boolean {
  const state = getState();
  const index = state.modules.findIndex(m => m.id === id);
  
  if (index === -1) return false;
  
  state.modules.splice(index, 1);
  setState(state);
  return true;
}

export function addPostToModule(moduleId: string, postId: string): HomepageModule | undefined {
  const state = getState();
  const module = state.modules.find(m => m.id === moduleId);
  
  if (!module) return undefined;
  if (module.postIds.includes(postId)) return module;
  
  module.postIds.push(postId);
  module.updatedAt = new Date().toISOString();
  setState(state);
  return module;
}

export function removePostFromModule(moduleId: string, postId: string): HomepageModule | undefined {
  const state = getState();
  const module = state.modules.find(m => m.id === moduleId);
  
  if (!module) return undefined;
  
  module.postIds = module.postIds.filter(id => id !== postId);
  module.updatedAt = new Date().toISOString();
  setState(state);
  return module;
}

// ─────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────

export function getReports(): Report[] {
  return getState().reports;
}

export function getReport(id: string): Report | undefined {
  return getState().reports.find(r => r.id === id);
}

export function getPublishedReports(): Report[] {
  return getState().reports.filter(r => r.status === 'published');
}

export function createReport(input: CreateReportInput): Report {
  const state = getState();
  const now = new Date().toISOString();
  
  const report: Report = {
    ...input,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  
  state.reports.push(report);
  setState(state);
  return report;
}

export function updateReport(input: UpdateReportInput): Report | undefined {
  const state = getState();
  const index = state.reports.findIndex(r => r.id === input.id);
  
  if (index === -1) return undefined;
  
  const updated: Report = {
    ...state.reports[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  
  state.reports[index] = updated;
  setState(state);
  return updated;
}

export function deleteReport(id: string): boolean {
  const state = getState();
  const index = state.reports.findIndex(r => r.id === id);
  
  if (index === -1) return false;
  
  state.reports.splice(index, 1);
  setState(state);
  return true;
}

// ─────────────────────────────────────────────────────────────
// Seed Data (for development)
// ─────────────────────────────────────────────────────────────

export function seedDemoData(): void {
  const state = getState();
  
  // Only seed if empty
  if (state.authors.length > 0) return;
  
  const now = new Date().toISOString();
  
  // Create demo author
  const author: Author = {
    id: 'author-demo',
    name: 'IVY Editorial',
    slug: 'ivy-editorial',
    bio: 'The IVY editorial team covering AI, creator economy, and digital business.',
    role: 'Editor',
    createdAt: now,
    updatedAt: now,
  };
  state.authors.push(author);
  
  // Create demo posts (published for homepage display)
  const demoPosts: Post[] = [
    {
      id: 'post-lead',
      slug: 'future-of-ai-2024',
      title: 'The Future of AI: What 2024 Has in Store',
      dek: 'From multimodal models to autonomous agents, the next wave of AI innovation is already here.',
      heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop',
      heroImageAlt: 'Abstract AI visualization',
      format: 'deep-dive',
      vertical: 'ai',
      pillar: 'trends',
      authorId: author.id,
      body: '# The Future of AI\n\nArtificial intelligence continues to evolve at an unprecedented pace...',
      headings: [{ id: 'the-future-of-ai', text: 'The Future of AI', level: 1 }],
      seo: { metaTitle: 'The Future of AI: What 2024 Has in Store' },
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-week-1',
      slug: 'creator-economy-trends',
      title: 'Creator Economy Hits $250B Valuation',
      dek: 'New funding rounds signal continued growth in the creator space.',
      format: 'news',
      vertical: 'creator-economy',
      pillar: 'trends',
      authorId: author.id,
      body: '# Creator Economy Trends\n\nThe creator economy continues to grow...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-week-2',
      slug: 'openai-new-features',
      title: 'OpenAI Announces Major API Updates',
      dek: 'New capabilities make building AI applications easier than ever.',
      format: 'news',
      vertical: 'ai',
      pillar: 'tools',
      authorId: author.id,
      body: '# OpenAI Updates\n\nOpenAI has announced...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-index-1',
      slug: 'guide-to-prompt-engineering',
      title: 'The Complete Guide to Prompt Engineering',
      dek: 'Master the art of communicating with AI systems.',
      format: 'guide',
      vertical: 'ai',
      pillar: 'strategy',
      authorId: author.id,
      body: '# Prompt Engineering Guide\n\nLearn how to write effective prompts...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-edit-1',
      slug: 'rise-of-ai-agents',
      title: 'The Rise of AI Agents',
      dek: 'Autonomous AI systems are reshaping how we work.',
      heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
      format: 'deep-dive',
      vertical: 'ai',
      pillar: 'analysis',
      authorId: author.id,
      body: '# AI Agents\n\nThe next frontier in artificial intelligence...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-edit-2',
      slug: 'building-in-public',
      title: 'Why Building in Public Works',
      dek: 'The strategy behind sharing your journey.',
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      format: 'opinion',
      vertical: 'creator-economy',
      pillar: 'strategy',
      authorId: author.id,
      body: '# Building in Public\n\nSharing your journey...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'post-edit-3',
      slug: 'startup-metrics-guide',
      title: 'The Only Startup Metrics That Matter',
      dek: 'Cut through the noise with these essential KPIs.',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      format: 'guide',
      vertical: 'business',
      pillar: 'tools',
      authorId: author.id,
      body: '# Startup Metrics\n\nFocus on what matters...',
      headings: [],
      seo: {},
      status: 'published',
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    },
  ];
  state.posts.push(...demoPosts);
  
  // Create homepage modules with correct slugs
  const modules: HomepageModule[] = [
    {
      id: 'module-lead',
      name: 'Lead Story',
      slug: 'lead-story',
      position: 1,
      postIds: ['post-lead'],
      maxPosts: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-week',
      name: 'The Week',
      slug: 'the-week',
      position: 2,
      postIds: ['post-week-1', 'post-week-2'],
      maxPosts: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-index-sidebar',
      name: 'The Index (Sidebar)',
      slug: 'the-index-sidebar',
      position: 3,
      postIds: ['post-index-1'],
      maxPosts: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-edit',
      name: 'The Edit',
      slug: 'the-edit',
      position: 4,
      postIds: ['post-edit-1', 'post-edit-2', 'post-edit-3'],
      maxPosts: 8,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-ai',
      name: 'AI Vertical',
      slug: 'ai',
      position: 5,
      postIds: ['post-lead', 'post-week-2', 'post-edit-1'],
      maxPosts: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-creator',
      name: 'Creator Vertical',
      slug: 'creator',
      position: 6,
      postIds: ['post-week-1', 'post-edit-2'],
      maxPosts: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-business',
      name: 'Business Vertical',
      slug: 'business',
      position: 7,
      postIds: ['post-edit-3'],
      maxPosts: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'module-index-strip',
      name: 'Index Strip',
      slug: 'index-strip',
      position: 8,
      postIds: ['post-index-1', 'post-edit-1', 'post-edit-2'],
      maxPosts: 7,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ];
  state.modules.push(...modules);
  
  setState(state);
  console.log('CMS demo data seeded with homepage modules');
}

// ─────────────────────────────────────────────────────────────
// Clear Data (for development)
// ─────────────────────────────────────────────────────────────

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
