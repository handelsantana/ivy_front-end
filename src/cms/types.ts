/**
 * CMS Data Models
 * 
 * Core types for the headless CMS layer.
 * Storage: LocalStorage (prototype) → Database (production)
 */

// ─────────────────────────────────────────────────────────────
// Enums & Constants
// ─────────────────────────────────────────────────────────────

export type PostStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export type PostFormat = 
  | 'deep-dive'      // Long-form analysis
  | 'guide'          // How-to / tutorial
  | 'index'          // Curated list/directory
  | 'news'           // Breaking/timely
  | 'opinion'        // Editorial/commentary
  | 'interview'      // Q&A format
  | 'case-study';    // Real-world example

export type Vertical = 
  | 'ai'
  | 'creator-economy'
  | 'business'
  | 'culture'
  | 'technology';

export type Pillar = 
  | 'tools'
  | 'strategy'
  | 'trends'
  | 'people'
  | 'analysis';

// ─────────────────────────────────────────────────────────────
// Core Entities
// ─────────────────────────────────────────────────────────────

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar?: string;
  role: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface HeadingNode {
  id: string;
  text: string;
  level: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  dek: string; // Subtitle/summary
  heroImage?: string;
  heroImageAlt?: string;
  format: PostFormat;
  vertical: Vertical;
  pillar: Pillar;
  authorId: string;
  body: string; // Markdown content
  headings: HeadingNode[]; // Extracted for jump links
  seo: SEOFields;
  status: PostStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  reviewNote?: string; // Note from reviewer
}

export interface HomepageModule {
  id: string;
  name: string;
  slug: string;
  position: number; // Order on homepage
  postIds: string[]; // Pinned posts
  maxPosts: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  pdfUrl?: string;
  authorId: string;
  status: PostStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
// Admin Types
// ─────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'contributor';
}

export interface CMSState {
  posts: Post[];
  authors: Author[];
  modules: HomepageModule[];
  reports: Report[];
  currentUser: AdminUser | null;
}

// ─────────────────────────────────────────────────────────────
// Form Types (for CRUD operations)
// ─────────────────────────────────────────────────────────────

export type CreatePostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'headings'>;
export type UpdatePostInput = Partial<CreatePostInput> & { id: string };

export type CreateAuthorInput = Omit<Author, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAuthorInput = Partial<CreateAuthorInput> & { id: string };

export type CreateModuleInput = Omit<HomepageModule, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateModuleInput = Partial<CreateModuleInput> & { id: string };

export type CreateReportInput = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReportInput = Partial<CreateReportInput> & { id: string };
