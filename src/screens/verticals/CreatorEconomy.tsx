'use client';

/**
 * Creator Economy Vertical Landing Page
 */

import { useEffect } from 'react';
import { seedDemoData } from '@/cms';
import { VerticalLandingPage } from '@/components/landing';
import { useVerticalData } from '@/hooks/useVerticalData';
import { HeadMeta } from '@/platform';

const PILLARS = [
  { slug: 'tools', label: 'Tools', description: 'Platforms and software for creators' },
  { slug: 'strategy', label: 'Strategy', description: 'Growing and monetizing your audience' },
  { slug: 'trends', label: 'Trends', description: 'What\'s next in creator culture' },
  { slug: 'people', label: 'People', description: 'Profiles and interviews with creators' },
];

const START_HERE = [
  { title: 'Building in Public: A Complete Guide', href: '/article/building-in-public', description: 'Why sharing your journey works' },
  { title: 'Monetization Strategies for Creators', href: '/article/creator-monetization', description: 'Turn followers into income' },
  { title: 'The Creator Tech Stack', href: '/article/creator-tech-stack', description: 'Essential tools for modern creators' },
];

export default function CreatorEconomy() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { featuredPost, latestPosts, pillarPosts, indexPosts, authors } = useVerticalData({
    vertical: 'creator-economy',
    moduleSlug: 'creator-featured',
  });

  return (
    <>
      <HeadMeta
        title="Creator Economy"
        description="Building in public. Tools, strategies, and stories from the creator frontier. Platforms, monetization, and audience growth."
        canonicalPath="/creator-economy"
      />
      <VerticalLandingPage
        title="Creator Economy"
        tagline="Building in public. Tools, strategies, and stories from the creator frontier."
        description="Coverage of the platforms, strategies, and people defining how we build audiences and make a living online."
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

