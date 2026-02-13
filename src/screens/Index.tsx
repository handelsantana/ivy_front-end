'use client';

/**
 * Homepage
 *
 * All content is driven by CMS modules - no random feeds.
 * Configure modules in /admin/modules to curate homepage content.
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData } from '@/cms';
import { useHomepageData } from '@/hooks/useHomepageData';
import {
  LeadStory,
  SideCards,
  TheEdit,
  VerticalShelves,
  IndexStrip,
  ReportsModule,
} from '@/components/homepage';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/button';
import { HeadMeta } from '@/platform';
import { Settings } from 'lucide-react';

const Index = () => {
  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  const {
    leadStory,
    weekPosts,
    indexSidebarPosts,
    editPosts,
    aiPosts,
    creatorPosts,
    businessPosts,
    livingPosts,
    indexStripPosts,
    latestPosts,
    latestReport,
    authors,
    getAuthor,
  } = useHomepageData();

  const hasContent = useMemo(() => {
    return Boolean(leadStory) ||
      weekPosts.length > 0 ||
      editPosts.length > 0 ||
      aiPosts.length > 0 ||
      latestPosts.length > 0;
  }, [aiPosts.length, editPosts.length, leadStory, latestPosts.length, weekPosts.length]);

  const latestPostsPreview = useMemo(() => {
    return latestPosts.slice(0, 6).map((post) => ({
      post,
      author: getAuthor(post.authorId),
    }));
  }, [getAuthor, latestPosts]);

  const reportAuthor = useMemo(() => {
    if (!latestReport) return undefined;
    return getAuthor(latestReport.authorId);
  }, [getAuthor, latestReport]);

  return (
    <>
      <HeadMeta
        title="IVY Edition"
        noSuffix
        description="Ideas, Vision, Yield - Premium editorial coverage of AI, creator economy, business, and culture."
        canonicalPath="/"
      />
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
        {/* Empty state when no modules configured */}
        {!hasContent && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-[var(--space-4)] text-center">
            <div className="max-w-md">
              <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold mb-[var(--space-4)]">
                Welcome to IVY
              </h1>
              <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
                Your homepage is ready for content. Create modules in the admin panel to curate your homepage sections.
              </p>
              <div className="space-y-[var(--space-3)]">
                <Button asChild>
                  <AppLink href="/admin/modules">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Modules
                  </AppLink>
                </Button>
                <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                  Required modules: <code className="text-xs bg-[hsl(var(--ivy-background-muted))] px-1 py-0.5">lead-story</code>, <code className="text-xs bg-[hsl(var(--ivy-background-muted))] px-1 py-0.5">the-week</code>, <code className="text-xs bg-[hsl(var(--ivy-background-muted))] px-1 py-0.5">the-edit</code>, etc.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Above the fold */}
        {leadStory && (
          <LeadStory
            post={leadStory}
            author={getAuthor(leadStory.authorId)}
          />
        )}

        {/* Side cards: The Week + The Index */}
        {(weekPosts.length > 0 || indexSidebarPosts.length > 0) && (
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-6)]">
            <SideCards
              weekPosts={weekPosts}
              indexPosts={indexSidebarPosts}
            />
          </div>
        )}

        {/* Latest posts */}
        {latestPostsPreview.length > 0 && (
          <section className="py-[var(--space-6)] border-t border-[hsl(var(--ivy-border))]">
            <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
              <div className="flex items-center justify-between mb-[var(--space-5)]">
                <h2 className="font-[var(--font-headline)] text-xl md:text-2xl font-bold tracking-tight">
                  Latest
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-[var(--space-5)]">
                {latestPostsPreview.map(({ post, author }) => (
                  <article key={post.id} className="group">
                    <AppLink href={`/article/${post.slug}`} className="block">
                      <div className="relative aspect-[16/9] overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]">
                        {post.heroImage ? (
                          <OptimizedImage
                            src={post.heroImage}
                            alt={post.heroImageAlt || post.title}
                            width={640}
                            height={360}
                            fill
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground)/0.08)] to-[hsl(var(--ivy-foreground)/0.2)]" />
                        )}
                      </div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                        {post.pillar} | {post.format.replace('-', ' ')}
                      </p>
                      <h3 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                        {post.title}
                      </h3>
                      {author && (
                        <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-2)]">
                          {author.name}
                        </p>
                      )}
                    </AppLink>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The Edit - curated stories */}
        {editPosts.length > 0 && (
          <TheEdit
            posts={editPosts}
            authors={authors}
          />
        )}

        {/* Vertical Shelves */}
        <VerticalShelves
          aiPosts={aiPosts}
          creatorPosts={creatorPosts}
          businessPosts={businessPosts}
          livingPosts={livingPosts}
          authors={authors}
        />

        {/* The Index Strip - evergreen content */}
        {indexStripPosts.length > 0 && (
          <IndexStrip posts={indexStripPosts} />
        )}

        {/* Reports Module */}
        <ReportsModule
          latestReport={latestReport || undefined}
          author={reportAuthor}
        />
      </div>
    </>
  );
};

export default Index;
