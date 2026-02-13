/**
 * Vertical Shelf - Single vertical section (AI, Creator, Business, Living)
 * Shows curated posts with sublabels
 */

import { useMemo } from 'react';
import { AppLink } from '@/platform';
import type { Post, Author } from '@/cms';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface VerticalShelfProps {
  title: string;
  slug: string;
  description?: string;
  posts: Post[];
  authors: Author[];
}

export function VerticalShelf({ title, slug, description, posts, authors }: VerticalShelfProps) {
  const authorById = useMemo(
    () => new Map(authors.map((author) => [author.id, author])),
    [authors]
  );
  if (posts.length === 0) return null;

  const visiblePosts = posts.slice(0, 4);

  return (
    <section className="py-[var(--space-6)] border-t border-[hsl(var(--ivy-border))]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-[var(--space-5)]">
          <div>
            <h2 className="font-[var(--font-headline)] text-xl md:text-2xl font-bold tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-[hsl(var(--ivy-foreground-muted))] text-sm mt-1">
                {description}
              </p>
            )}
          </div>
          <AppLink
            href={`/${slug}`}
            className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors group"
          >
            All {title}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </AppLink>
        </div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-4 gap-[var(--space-5)]">
          {visiblePosts.map((post) => {
            const author = authorById.get(post.authorId);

            return (
              <article key={post.id} className="group">
                <AppLink href={`/article/${post.slug}`}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]">
                    {post.heroImage ? (
                      <OptimizedImage
                        src={post.heroImage}
                        alt={post.heroImageAlt || post.title}
                        width={400}
                        height={300}
                        fill
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground-muted)/0.1)] to-[hsl(var(--ivy-foreground-muted)/0.2)]" />
                    )}
                  </div>

                  {/* Sublabel */}
                  <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                    {post.pillar}
                  </p>

                  {/* Title */}
                  <h3 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>

                  {/* Author */}
                  {author && (
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-2)]">
                      {author.name}
                    </p>
                  )}
                </AppLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
