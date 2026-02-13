'use client';

/**
 * Business Vertical Landing Page
 */

import { useEffect } from 'react';
import { seedDemoData } from '@/cms';
import { VerticalLandingPage } from '@/components/landing';
import { useVerticalData } from '@/hooks/useVerticalData';
import { HeadMeta } from '@/platform';

const PILLARS = [
  { slug: 'strategy', label: 'Strategy', description: 'Business models and growth tactics' },
  { slug: 'tools', label: 'Operations', description: 'Tools and systems that scale' },
  { slug: 'trends', label: 'Markets', description: 'Industry shifts and opportunities' },
  { slug: 'analysis', label: 'Analysis', description: 'Deep dives into business performance' },
];

const START_HERE = [
  { title: 'The Only Startup Metrics That Matter', href: '/article/startup-metrics-guide', description: 'Cut through the noise' },
  { title: 'Remote Work Playbook', href: '/article/remote-work-guide', description: 'Building distributed teams' },
  { title: 'SaaS Pricing Strategies', href: '/article/saas-pricing', description: 'Find your optimal price point' },
];

export default function Business() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { featuredPost, latestPosts, pillarPosts, indexPosts, authors } = useVerticalData({
    vertical: 'business',
    moduleSlug: 'business-featured',
  });

  return (
    <>
      <HeadMeta
        title="Business"
        description="Strategy and operations. How technology is transforming commerce and work. Startup tactics to enterprise strategy."
        canonicalPath="/business"
      />
      <VerticalLandingPage
        title="Business"
        tagline="Strategy & operations. How technology is transforming commerce and work."
        description="From startup tactics to enterprise strategy, we cover the business of technology and the technology of business."
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

