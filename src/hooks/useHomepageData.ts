/**
 * Homepage Data Hook
 *
 * Fetches and organizes module data for the homepage.
 * All content is driven by CMS modules - no random feeds.
 */

import { useCallback, useMemo } from 'react';
import { usePosts, useAuthors, useModules, useReports, type Post } from '@/cms';

// Module slug constants - must match admin module slugs
const MODULE_SLUGS = {
  LEAD_STORY: 'lead-story',
  THE_WEEK: 'the-week',
  THE_INDEX_SIDEBAR: 'the-index-sidebar',
  THE_EDIT: 'the-edit',
  AI: 'ai',
  CREATOR: 'creator',
  BUSINESS: 'business',
  LIVING: 'living',
  INDEX_STRIP: 'index-strip',
} as const;

export function useHomepageData() {
  const { posts } = usePosts();
  const { authors } = useAuthors();
  const { modules } = useModules();
  const { reports } = useReports();

  // Only use published posts
  const publishedPosts = useMemo(() => 
    posts.filter(p => p.status === 'published'),
    [posts]
  );

  // Sort posts by publish date (fallback to created date)
  const sortedPosts = useMemo(() => {
    return [...publishedPosts].sort((a, b) => {
      const aDate = new Date(a.publishedAt || a.createdAt).getTime();
      const bDate = new Date(b.publishedAt || b.createdAt).getTime();
      return bDate - aDate;
    });
  }, [publishedPosts]);

  const postById = useMemo(() => {
    return new Map(publishedPosts.map((post) => [post.id, post]));
  }, [publishedPosts]);

  const activeModulesBySlug = useMemo(() => {
    const moduleMap = new Map<string, (typeof modules)[number]>();

    modules.forEach((module) => {
      if (module.isActive && !moduleMap.has(module.slug)) {
        moduleMap.set(module.slug, module);
      }
    });

    return moduleMap;
  }, [modules]);

  const authorsById = useMemo(() => {
    return new Map(authors.map((author) => [author.id, author]));
  }, [authors]);

  // Helper to get posts for a module by slug
  const getModulePosts = useCallback((moduleSlug: string): Post[] => {
    const module = activeModulesBySlug.get(moduleSlug);
    if (!module) return [];

    return module.postIds
      .map((id) => postById.get(id))
      .filter((post): post is Post => post !== undefined);
  }, [activeModulesBySlug, postById]);

  const getAuthor = useCallback(
    (authorId: string) => authorsById.get(authorId),
    [authorsById]
  );

  // Get module data
  const data = useMemo(() => {
    const selectOrFallback = (primary: Post[], fallback: Post[]) => {
      return primary.length > 0 ? primary : fallback;
    };

    const isIndexFormat = (post: Post) => post.format === 'guide' || post.format === 'index';
    const leadStory = getModulePosts(MODULE_SLUGS.LEAD_STORY)[0] || sortedPosts[0] || null;
    const leadStoryId = leadStory?.id;
    const nonLeadPosts = leadStoryId
      ? sortedPosts.filter((post) => post.id !== leadStoryId)
      : sortedPosts;
    const indexFormatPosts = sortedPosts.filter(isIndexFormat);

    return {
      // Lead story - first post from lead-story module
      leadStory,

      // Side cards
      weekPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.THE_WEEK),
        nonLeadPosts.slice(0, 4)
      ),
      indexSidebarPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.THE_INDEX_SIDEBAR),
        indexFormatPosts.slice(0, 4)
      ),

      // The Edit
      editPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.THE_EDIT),
        nonLeadPosts.slice(0, 6)
      ),

      // Vertical shelves
      aiPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.AI),
        sortedPosts.filter((post) => post.vertical === 'ai').slice(0, 4)
      ),
      creatorPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.CREATOR),
        sortedPosts.filter((post) => post.vertical === 'creator-economy').slice(0, 4)
      ),
      businessPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.BUSINESS),
        sortedPosts.filter((post) => post.vertical === 'business').slice(0, 4)
      ),
      livingPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.LIVING),
        sortedPosts.filter((post) => post.vertical === 'culture').slice(0, 4)
      ),

      // Index strip
      indexStripPosts: selectOrFallback(
        getModulePosts(MODULE_SLUGS.INDEX_STRIP),
        indexFormatPosts.slice(0, 7)
      ),

      // Latest published report
      latestReport: reports.find((report) => report.status === 'published') || null,

      // Latest posts
      latestPosts: sortedPosts,

      // Authors lookup
      authors,

      // Helper
      getAuthor,
    };
  }, [authors, getAuthor, getModulePosts, reports, sortedPosts]);

  return data;
}

// Export module slugs for use in admin seeding
export { MODULE_SLUGS };
