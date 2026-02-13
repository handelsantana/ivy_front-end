/**
 * CMS Utilities
 */

import type { HeadingNode } from './types';

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a URL-safe slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract headings from Markdown content for jump links
 * Returns array of heading nodes with id, text, and level
 */
export function extractHeadings(markdown: string): HeadingNode[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: HeadingNode[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date for datetime input
 */
export function formatDateForInput(dateString: string): string {
  return new Date(dateString).toISOString().slice(0, 16);
}

/**
 * Get status badge color class
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'draft':
      return 'bg-[hsl(var(--ivy-foreground-muted)/0.1)] text-[hsl(var(--ivy-foreground-muted))]';
    case 'review':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    case 'approved':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'published':
      return 'bg-[hsl(var(--ivy-accent)/0.1)] text-[hsl(var(--ivy-accent))]';
    case 'archived':
      return 'bg-[hsl(var(--ivy-foreground-muted)/0.05)] text-[hsl(var(--ivy-foreground-muted)/0.6)]';
    default:
      return 'bg-[hsl(var(--ivy-foreground-muted)/0.1)] text-[hsl(var(--ivy-foreground-muted))]';
  }
}
