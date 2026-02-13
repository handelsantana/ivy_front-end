'use client';

/**
 * AI Vertical Landing Page
 */

import { useEffect } from 'react';
import { seedDemoData } from '@/cms';
import { VerticalLandingPage } from '@/components/landing';
import { useVerticalData } from '@/hooks/useVerticalData';
import { HeadMeta } from '@/platform';

const PILLARS = [
  { slug: 'tools', label: 'Tools', description: 'The best AI tools and how to use them' },
  { slug: 'strategy', label: 'Strategy', description: 'How to implement AI in your workflow' },
  { slug: 'trends', label: 'Trends', description: 'Where AI is heading next' },
  { slug: 'analysis', label: 'Analysis', description: 'Deep dives into AI developments' },
];

const START_HERE = [
  { title: 'The Complete Guide to Prompt Engineering', href: '/article/guide-to-prompt-engineering', description: 'Master the art of AI communication' },
  { title: 'AI Tools Comparison 2024', href: '/article/ai-tools-comparison', description: 'Find the right tool for your needs' },
  { title: 'Getting Started with AI Agents', href: '/article/ai-agents-guide', description: 'Autonomous AI explained' },
];

export default function ArtificialIntelligence() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { featuredPost, latestPosts, pillarPosts, indexPosts, authors } = useVerticalData({
    vertical: 'ai',
    moduleSlug: 'ai-featured',
  });

  return (
    <>
      <HeadMeta
        title="Artificial Intelligence"
        description="Intelligence at scale. Tools, trends, and strategies for the AI era. Coverage of foundational models to practical applications."
        canonicalPath="/artificial-intelligence"
      />
      <VerticalLandingPage
        title="Artificial Intelligence"
        tagline="Intelligence at scale. Tools, trends, and strategies for the AI era."
        description="From foundational models to practical applications, we cover the technologies reshaping how we work, create, and live."
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

