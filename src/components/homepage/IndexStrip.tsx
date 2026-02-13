/**
 * The Index Strip - Horizontal evergreen content magnets
 * 5-7 persistent/foundational pieces
 */

import { AppLink } from '@/platform';
import type { Post } from '@/cms';
import { Bookmark } from 'lucide-react';

interface IndexStripProps {
  posts: Post[];
}

export function IndexStrip({ posts }: IndexStripProps) {
  if (posts.length === 0) return null;

  const visiblePosts = posts.slice(0, 7);

  return (
    <section className="py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[var(--space-5)]">
          <div className="flex items-center gap-[var(--space-3)]">
            <Bookmark className="h-5 w-5 text-[hsl(var(--ivy-foreground))]" />
            <h2 className="font-[var(--font-headline)] text-xl font-bold tracking-tight">
              The Index
            </h2>
          </div>
          <AppLink
            href="/index"
            className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
          >
            Browse all {'->'}
          </AppLink>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-[var(--space-4)] overflow-x-auto pb-[var(--space-2)] -mx-[var(--space-4)] px-[var(--space-4)] md:mx-0 md:px-0 scrollbar-hide">
          {visiblePosts.map((post) => (
            <AppLink
              key={post.id}
              href={`/article/${post.slug}`}
              className="flex-shrink-0 w-64 group"
            >
              <article className="h-full p-[var(--space-4)] bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors">
                {/* Format badge */}
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
                  {post.format.replace('-', ' ')}
                </p>

                {/* Title */}
                <h3 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity line-clamp-3">
                  {post.title}
                </h3>

                {/* Vertical tag */}
                <p className="text-xs text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-3)]">
                  {post.vertical}
                </p>
              </article>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}
