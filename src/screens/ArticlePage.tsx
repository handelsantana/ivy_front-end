'use client';

/**
 * Article Page - Single article template with format variants
 * 
 * Format variants:
 * - Feature (deep-dive, interview): full-bleed sections + pull quotes
 * - Guide: jump links + checklist blocks
 * - Index: list/table blocks + jump links
 * - Briefing (news): compact + "what changed" box
 */

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { AppLink } from '@/platform';
import { seedDemoData, usePosts, useAuthors, useModules, type Post } from '@/cms';
import {
  ArticleHero,
  ArticleByline,
  ArticleBody,
  JumpLinks,
  PullQuote,
  RelatedCluster,
  ContextualLinks,
  NewsletterCTA,
  ReadNext,
  WhatChangedBox,
  ChecklistBlock,
} from '@/components/article';
import { HeadMeta } from '@/platform';
import { ArrowLeft } from 'lucide-react';

// Demo data for format-specific blocks
const DEMO_CHANGES = [
  { item: 'OpenAI announces GPT-5', direction: 'up' as const, detail: 'Major capability improvements' },
  { item: 'Anthropic releases Claude 4', direction: 'up' as const, detail: 'New reasoning benchmarks' },
  { item: 'Meta AI team shrinks', direction: 'down' as const, detail: 'Layoffs in AI division' },
];

const DEMO_CHECKLIST = [
  { id: '1', text: 'Define your use case and requirements' },
  { id: '2', text: 'Evaluate available tools and platforms' },
  { id: '3', text: 'Start with a proof of concept' },
  { id: '4', text: 'Gather user feedback early' },
  { id: '5', text: 'Iterate based on results' },
  { id: '6', text: 'Document your process' },
];

const DEMO_CONTEXTUAL_LINKS = [
  { title: 'The Complete Guide to Prompt Engineering', href: '/article/prompt-engineering', description: 'Master the art of AI communication' },
  { title: 'AI Tools Comparison 2024', href: '/article/ai-tools', description: 'Find the right tool for your needs' },
  { title: 'Getting Started with AI Agents', href: '/article/ai-agents', description: 'Autonomous AI explained' },
];

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    seedDemoData();
  }, []);

  const { posts } = usePosts();
  const { authors } = useAuthors();
  const { modules } = useModules();

  // Find current post
  const post = useMemo(() =>
    posts.find(p => p.slug === slug && p.status === 'published'),
    [posts, slug]
  );

  // Get author
  const author = useMemo(() =>
    post ? authors.find(a => a.id === post.authorId) : undefined,
    [authors, post]
  );

  // Get related posts (from same vertical or curated)
  const relatedPosts = useMemo(() => {
    if (!post) return [];

    // First check for curated related module
    const relatedModule = modules.find(m => m.slug === 'related' && m.isActive);
    if (relatedModule && relatedModule.postIds.length > 0) {
      return posts
        .filter(p => relatedModule.postIds.includes(p.id) && p.id !== post.id && p.status === 'published')
        .slice(0, 3);
    }

    // Fallback to same vertical
    return posts
      .filter(p => p.vertical === post.vertical && p.id !== post.id && p.status === 'published')
      .slice(0, 3);
  }, [post, posts, modules]);

  // Get next article
  const nextPost = useMemo(() => {
    if (!post) return undefined;
    const publishedPosts = posts.filter(p => p.status === 'published' && p.id !== post.id);
    return publishedPosts[0];
  }, [post, posts]);

  // Format detection
  const isFeature = post?.format === 'deep-dive' || post?.format === 'interview';
  const isGuide = post?.format === 'guide';
  const isIndex = post?.format === 'index';
  const isBriefing = post?.format === 'news';

  // Show jump links for guide and index formats
  const showJumpLinks = (isGuide || isIndex) && post && post.headings.length > 2;

  if (!post) {
    return (
      <div className="min-h-screen bg-[hsl(var(--ivy-background))] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-headline)] text-2xl font-bold mb-[var(--space-4)]">
            Article not found
          </h1>
          <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
            This article doesn't exist or hasn't been published yet.
          </p>
          <AppLink
            href="/"
            className="inline-flex items-center gap-2 font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </AppLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeadMeta
        title={post.title}
        description={post.dek}
        canonicalPath={`/article/${post.slug}`}
        ogImage={post.heroImage}
        ogType="article"
        article={{
          headline: post.title,
          description: post.dek,
          image: post.heroImage,
          authorName: author?.name || 'IVY Edition',
          authorUrl: author ? `https://ivyedition.com/contributors/${author.slug}` : undefined,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt,
          section: post.vertical,
          tags: [post.pillar, post.format],
        }}
      />
      <article className="min-h-screen bg-[hsl(var(--ivy-background))]">
        {/* Hero - Cinematic for features, standard for others */}
        <ArticleHero post={post} format={post.format} />

        {/* Title + Dek for non-hero formats */}
        {isBriefing && (
          <header className="py-[var(--space-6)] border-b border-[hsl(var(--ivy-border))]">
            <div className="max-w-[var(--content-width-max)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
              <span className="inline-block px-[var(--space-2)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 mb-[var(--space-3)]">
                Briefing
              </span>
              <h1 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold leading-tight mb-[var(--space-3)]">
                {post.title}
              </h1>
              <p className="text-lg text-[hsl(var(--ivy-foreground-muted))]">
                {post.dek}
              </p>
            </div>
          </header>
        )}

        {/* Main content area */}
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          {/* Dek below hero for non-briefing */}
          {!isBriefing && (
            <div className="max-w-[var(--content-width-max)] mx-auto py-[var(--space-6)]">
              <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] leading-relaxed">
                {post.dek}
              </p>
            </div>
          )}

          {/* Byline */}
          <div className="max-w-[var(--content-width-max)] mx-auto">
            <ArticleByline
              author={author}
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              createdAt={post.createdAt}
            />
          </div>

          {/* What Changed box for Briefings */}
          {isBriefing && (
            <div className="max-w-[var(--content-width-max)] mx-auto mt-[var(--space-5)]">
              <WhatChangedBox changes={DEMO_CHANGES} asOf="today" />
            </div>
          )}

          {/* Content grid with optional sidebar */}
          <div className={`py-[var(--space-6)] ${showJumpLinks ? 'grid lg:grid-cols-[1fr_250px] gap-[var(--space-8)]' : ''}`}>
            {/* Main content */}
            <div className={showJumpLinks ? '' : 'max-w-[var(--content-width-max)] mx-auto'}>
              {/* Inline jump links for guides */}
              {isGuide && post.headings.length > 2 && (
                <JumpLinks headings={post.headings} variant="inline" />
              )}

              {/* Article body */}
              <ArticleBody content={post.body} headings={post.headings} />

              {/* Checklist for guides */}
              {isGuide && (
                <ChecklistBlock
                  title="Quick Start Checklist"
                  items={DEMO_CHECKLIST}
                />
              )}

              {/* Pull quote or Editor's Take for features */}
              {isFeature && (
                <PullQuote
                  quote="The future of AI isn't about replacing humans—it's about augmenting our capabilities in ways we're only beginning to understand."
                  attribution="Industry Expert"
                  variant={Math.random() > 0.5 ? 'default' : 'editors-take'}
                />
              )}

              {/* Contextual links */}
              <ContextualLinks links={DEMO_CONTEXTUAL_LINKS} />

              {/* Inline newsletter CTA */}
              <NewsletterCTA variant="inline" />
            </div>

            {/* Sidebar with jump links for index format */}
            {showJumpLinks && isIndex && (
              <aside className="hidden lg:block">
                <JumpLinks headings={post.headings} variant="sidebar" />
              </aside>
            )}
          </div>

          {/* Related cluster */}
          <div className="max-w-[var(--content-width-wide)] mx-auto">
            <RelatedCluster
              posts={relatedPosts}
              authors={authors}
              title="Related Reading"
            />
          </div>

          {/* Read next */}
          <div className="max-w-[var(--content-width-max)] mx-auto">
            <ReadNext post={nextPost} />
          </div>
        </div>

        {/* Full-width newsletter CTA */}
        <NewsletterCTA variant="full" />
      </article>
    </>
  );
}
