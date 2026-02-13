/**
 * TheEditGrid - Curated stories grid with strong imagery
 * 
 * Displays 6-8 stories in a visually rich layout with one featured.
 */

import { AppLink } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { PostCard } from '@/components/content/PostCard';
import { cn } from '@/lib/utils';
import type { CuratedPost } from '@/mock/types';

interface TheEditGridProps {
  posts: CuratedPost[];
  className?: string;
}

export function TheEditGrid({ posts, className }: TheEditGridProps) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className={cn('py-[var(--space-7)] md:py-[var(--space-8)]', className)}>
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Section header */}
        <div className="flex items-center justify-between mb-[var(--space-6)]">
          <Typography variant="h2">
            The Edit
          </Typography>
          <AppLink
            href="/the-edit"
            className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors no-underline"
          >
            View all →
          </AppLink>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-[var(--space-5)] md:gap-[var(--space-6)]">
          {/* Featured story - spans 2 columns and rows */}
          <div className="md:col-span-2 md:row-span-2">
            <PostCard
              post={featured}
              variant="featured"
              imageAspect="video"
            />
          </div>

          {/* Secondary stories */}
          {rest.slice(0, 4).map((post) => (
            <PostCard
              key={post.id}
              post={post}
              variant="compact"
              showDek={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TheEditGrid;
