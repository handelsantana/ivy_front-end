/**
 * VerticalShelf - Single vertical section (AI, Creator, Business, Living)
 * 
 * Shows curated posts with sublabels for a specific vertical.
 */

import { AppLink } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { PostCard } from '@/components/content/PostCard';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VerticalShelfData } from '@/mock/types';

interface VerticalShelfProps {
  data: VerticalShelfData;
  className?: string;
}

export function VerticalShelf({ data, className }: VerticalShelfProps) {
  const { slug, label, description, posts, sublabels } = data;

  if (posts.length === 0) return null;

  return (
    <section
      className={cn(
        'py-[var(--space-6)] border-t border-[hsl(var(--ivy-border))]',
        className
      )}
    >
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-[var(--space-5)]">
          <div>
            <Typography variant="h3">{label}</Typography>
            {description && (
              <Typography
                variant="body-sm"
                color="muted"
                className="mt-1"
              >
                {description}
              </Typography>
            )}
            {/* Sublabels */}
            {sublabels.length > 0 && (
              <div className="flex gap-[var(--space-2)] mt-[var(--space-2)]">
                {sublabels.map((sublabel) => (
                  <span
                    key={sublabel}
                    className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] bg-[hsl(var(--ivy-background-muted))] px-[var(--space-2)] py-[var(--space-1)]"
                  >
                    {sublabel}
                  </span>
                ))}
              </div>
            )}
          </div>
          <AppLink
            href={`/${slug}`}
            className="flex items-center gap-1 text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors group no-underline"
          >
            All {label}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </AppLink>
        </div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-4 gap-[var(--space-5)]">
          {posts.slice(0, 4).map((post) => (
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

export default VerticalShelf;
