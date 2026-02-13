/**
 * Vertical Landing Page Data Hook
 * 
 * Provides data for vertical landing pages from CMS.
 */

import { useMemo } from 'react';
import { usePosts, useAuthors, useModules, type Post, type Vertical, type Pillar } from '@/cms';

interface UseVerticalDataOptions {
  vertical?: Vertical;
  moduleSlug?: string;
}

export function useVerticalData({ vertical, moduleSlug }: UseVerticalDataOptions) {
  const { posts } = usePosts();
  const { authors } = useAuthors();
  const { modules } = useModules();

  // Published posts only
  const publishedPosts = useMemo(() => 
    posts.filter(p => p.status === 'published'),
    [posts]
  );

  // Filter by vertical if specified
  const verticalPosts = useMemo(() => {
    if (!vertical) return publishedPosts;
    return publishedPosts.filter(p => p.vertical === vertical);
  }, [publishedPosts, vertical]);

  // Get featured post from module if specified
  const featuredPost = useMemo(() => {
    if (!moduleSlug) return verticalPosts[0];
    
    const module = modules.find(m => m.slug === moduleSlug && m.isActive);
    if (!module || module.postIds.length === 0) return verticalPosts[0];
    
    return publishedPosts.find(p => p.id === module.postIds[0]) || verticalPosts[0];
  }, [moduleSlug, modules, publishedPosts, verticalPosts]);

  // Latest posts (excluding featured)
  const latestPosts = useMemo(() => {
    return verticalPosts
      .filter(p => p.id !== featuredPost?.id)
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
      .slice(0, 10);
  }, [verticalPosts, featuredPost]);

  // Group by pillar
  const pillarPosts = useMemo(() => {
    const grouped: Record<string, Post[]> = {};
    const pillars: Pillar[] = ['tools', 'strategy', 'trends', 'people', 'analysis'];
    
    pillars.forEach(pillar => {
      grouped[pillar] = verticalPosts.filter(p => p.pillar === pillar).slice(0, 4);
    });
    
    return grouped;
  }, [verticalPosts]);

  // Index posts (guides and evergreen content)
  const indexPosts = useMemo(() => {
    return publishedPosts
      .filter(p => p.format === 'guide' || p.format === 'index')
      .slice(0, 6);
  }, [publishedPosts]);

  return {
    featuredPost,
    latestPosts,
    pillarPosts,
    indexPosts,
    authors,
    allPosts: verticalPosts,
  };
}
