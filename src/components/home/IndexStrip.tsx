/**
 * IndexStrip - Horizontal evergreen content magnets
 * 
 * 5-7 persistent/foundational pieces in a horizontally scrolling strip.
 */

import { AppLink } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IndexMagnet } from '@/mock/types';

interface IndexStripProps {
  magnets: IndexMagnet[];
  className?: string;
}

export function IndexStrip({ magnets, className }: IndexStripProps) {
  if (magnets.length === 0) return null;

  return (
    <section
      className={cn(
        'py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]',
        className
      )}
    >
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-[var(--space-5)]">
          <div className="flex items-center gap-[var(--space-3)]">
            <Bookmark className="h-5 w-5 text-[hsl(var(--ivy-foreground))]" />
            <Typography variant="h4">The Index</Typography>
          </div>
          <AppLink
            href="/index"
            className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors no-underline"
          >
            Browse all →
          </AppLink>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-[var(--space-4)] overflow-x-auto pb-[var(--space-2)] -mx-[var(--space-4)] px-[var(--space-4)] md:mx-0 md:px-0 scrollbar-hide">
          {magnets.slice(0, 7).map((magnet) => (
            <AppLink
              key={magnet.id}
              href={magnet.href}
              className="flex-shrink-0 w-64 group no-underline"
            >
              <article className="h-full p-[var(--space-4)] bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors">
                {/* Format badge */}
                <Typography
                  variant="overline"
                  className="mb-[var(--space-2)] block"
                >
                  {magnet.format.replace('-', ' ')}
                </Typography>

                {/* Title */}
                <Typography
                  variant="h5"
                  className="group-hover:opacity-70 transition-opacity line-clamp-3"
                >
                  {magnet.title}
                </Typography>

                {/* Vertical tag */}
                <Typography
                  variant="caption"
                  color="muted"
                  className="mt-[var(--space-3)] block"
                >
                  {magnet.vertical.replace('-', ' ')}
                </Typography>
              </article>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndexStrip;
