'use client';

/**
 * The Index Landing Page
 * Evergreen, foundational content
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData, usePosts, useAuthors } from '@/cms';
import { HeadMeta } from '@/platform';
import { Bookmark, ArrowRight } from 'lucide-react';

const FORMAT_GROUPS = [
  { format: 'guide', label: 'Guides', description: 'Step-by-step how-tos and tutorials' },
  { format: 'index', label: 'Directories', description: 'Curated lists and resources' },
  { format: 'deep-dive', label: 'Deep Dives', description: 'Comprehensive analysis' },
];

const VERTICALS = [
  { slug: 'ai', label: 'AI' },
  { slug: 'creator-economy', label: 'Creator' },
  { slug: 'business', label: 'Business' },
  { slug: 'culture', label: 'Living' },
];

export default function TheIndex() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { posts } = usePosts();
  const { authors } = useAuthors();

  const publishedPosts = useMemo(() => 
    posts.filter(p => p.status === 'published'),
    [posts]
  );

  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  const postsByFormat = useMemo(() => {
    const grouped: Record<string, typeof publishedPosts> = {};
    FORMAT_GROUPS.forEach(group => {
      grouped[group.format] = publishedPosts.filter(p => p.format === group.format);
    });
    return grouped;
  }, [publishedPosts]);

  const postsByVertical = useMemo(() => {
    const grouped: Record<string, typeof publishedPosts> = {};
    VERTICALS.forEach(v => {
      grouped[v.slug] = publishedPosts.filter(p => p.vertical === v.slug);
    });
    return grouped;
  }, [publishedPosts]);

  return (
    <>
      <HeadMeta
        title="The Index"
        description="Essential reads, always relevant. Our curated collection of foundational guides, directories, and deep dives."
        canonicalPath="/index"
      />
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Hero */}
      <section className="py-[var(--space-7)] md:py-[var(--space-8)] border-b border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
            <Bookmark className="h-8 w-8" />
            <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              The Index
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] max-w-2xl">
            Essential reads, always relevant. Our curated collection of foundational content.
          </p>
        </div>
      </section>

      {/* Format Sections */}
      {FORMAT_GROUPS.map((group) => (
        <section key={group.format} className="py-[var(--space-6)] border-b border-[hsl(var(--ivy-border))]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <div className="flex items-start justify-between mb-[var(--space-5)]">
              <div>
                <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight">
                  {group.label}
                </h2>
                <p className="text-[hsl(var(--ivy-foreground-muted))]">{group.description}</p>
              </div>
            </div>

            {postsByFormat[group.format]?.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-[var(--space-5)]">
                {postsByFormat[group.format].slice(0, 6).map((post) => {
                  const author = getAuthor(post.authorId);
                  return (
                    <article key={post.id} className="group">
                      <AppLink href={`/article/${post.slug}`}>
                        {post.heroImage && (
                          <div className="relative aspect-[3/2] overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]">
                            <img
                              src={post.heroImage}
                              alt={post.heroImageAlt || post.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                          {post.vertical}
                        </p>
                        <h3 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                          {post.title}
                        </h3>
                        {author && (
                          <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
                            {author.name}
                          </p>
                        )}
                      </AppLink>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="text-[hsl(var(--ivy-foreground-muted))]">No content yet</p>
            )}
          </div>
        </section>
      ))}

      {/* Browse by Vertical */}
      <section className="py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight mb-[var(--space-5)]">
            Browse by Topic
          </h2>
          <div className="grid md:grid-cols-4 gap-[var(--space-4)]">
            {VERTICALS.map((vertical) => (
              <AppLink
                key={vertical.slug}
                href={`/${vertical.slug === 'creator-economy' ? 'creator-economy' : vertical.slug === 'culture' ? 'living' : vertical.slug}`}
                className="group p-[var(--space-5)] bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors"
              >
                <h3 className="font-[var(--font-headline)] text-lg font-bold mb-[var(--space-2)] group-hover:opacity-70 transition-opacity">
                  {vertical.label}
                </h3>
                <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-3)]">
                  {postsByVertical[vertical.slug]?.length || 0} articles
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--ivy-foreground-muted))]">
                  Explore
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}


