'use client';

/**
 * Living Vertical Landing Page
 */

import { useEffect } from 'react';
import { seedDemoData } from '@/cms';
import { VerticalLandingPage } from '@/components/landing';
import { useVerticalData } from '@/hooks/useVerticalData';
import { HeadMeta } from '@/platform';

const PILLARS = [
  { slug: 'strategy', label: 'Productivity', description: 'Work smarter, not harder' },
  { slug: 'tools', label: 'Gear', description: 'The tools that improve daily life' },
  { slug: 'trends', label: 'Culture', description: 'How we live and work today' },
  { slug: 'people', label: 'Profiles', description: 'How interesting people structure their lives' },
];

const START_HERE = [
  { title: 'The Modern Knowledge Worker\'s Toolkit', href: '/article/knowledge-worker-toolkit', description: 'Essential apps and workflows' },
  { title: 'Deep Work in the Age of Distraction', href: '/article/deep-work-guide', description: 'Reclaim your focus' },
  { title: 'Work-Life Integration Guide', href: '/article/work-life-integration', description: 'Beyond the balance myth' },
];

export default function Living() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { featuredPost, latestPosts, pillarPosts, indexPosts, authors } = useVerticalData({
    vertical: 'culture',
    moduleSlug: 'living-featured',
  });

  return (
    <>
      <HeadMeta
        title="Living"
        description="Work, life, culture. How technology shapes how we live. Productivity, wellness, and culture insights."
        canonicalPath="/living"
      />
      <VerticalLandingPage
        title="Living"
        tagline="Work, life, culture. How technology shapes how we live."
        description="Productivity, wellness, and culture at the intersection of technology and daily life."
        featuredPost={featuredPost}
        latestPosts={latestPosts}
        authors={authors}
        pillars={PILLARS}
        pillarPosts={pillarPosts}
        startHereLinks={START_HERE}
        indexPosts={indexPosts}
      />
    </>
  );
}

