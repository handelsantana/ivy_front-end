/**
 * Mock Data Types
 * 
 * Types for curation data used in homepage and other curated views.
 * Designed to be compatible with future CMS integration.
 */

import type { PostFormat, Vertical } from '@/cms/types';

// ─────────────────────────────────────────────────────────────
// Post Types for Curation
// ─────────────────────────────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostAuthor {
  name: string;
  href: string;
}

export interface CuratedPost {
  id: string;
  title: string;
  dek: string;
  href: string;
  vertical: Vertical;
  format: PostFormat;
  heroImage: HeroImage;
  author: PostAuthor;
  publishedAt: string;
  readingTime?: string;
}

// ─────────────────────────────────────────────────────────────
// Vertical Shelf Types
// ─────────────────────────────────────────────────────────────

export interface VerticalShelfData {
  slug: string;
  label: string;
  description?: string;
  posts: CuratedPost[];
  sublabels: string[];
}

// ─────────────────────────────────────────────────────────────
// Index Magnet (Evergreen Content)
// ─────────────────────────────────────────────────────────────

export interface IndexMagnet {
  id: string;
  title: string;
  href: string;
  vertical: Vertical;
  format: PostFormat;
}

// ─────────────────────────────────────────────────────────────
// Report Types
// ─────────────────────────────────────────────────────────────

export interface CuratedReport {
  id: string;
  title: string;
  description: string;
  href: string;
  coverImage: HeroImage;
  author: PostAuthor;
  publishedAt: string;
}

export interface ReportsData {
  latest: CuratedReport;
  archive: Array<{
    id: string;
    title: string;
    href: string;
    publishedAt: string;
  }>;
}

// ─────────────────────────────────────────────────────────────
// Homepage Curation Config
// ─────────────────────────────────────────────────────────────

export interface HomepageCuration {
  leadStory: CuratedPost;
  theWeek: CuratedPost[];
  theIndex: CuratedPost[];
  theEdit: CuratedPost[];
  shelves: {
    ai: VerticalShelfData;
    creator: VerticalShelfData;
    business: VerticalShelfData;
    living: VerticalShelfData;
  };
  indexStrip: IndexMagnet[];
  reports: ReportsData;
}
