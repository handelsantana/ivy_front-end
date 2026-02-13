/**
 * SideCard - Compact list card for "The Week" and "The Index" sections
 * 
 * Shows numbered list of posts with a header and "see all" link.
 */

import { AppLink } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CuratedPost } from '@/mock/types';

export type SideCardVariant = 'default' | 'accent';

interface SideCardProps {
  title: string;
  subtitle?: string;
  posts: CuratedPost[];
  href: string;
  variant?: SideCardVariant;
  className?: string;
}

export function SideCard({
  title,
  subtitle,
  posts,
  href,
  variant = 'default',
  className,
}: SideCardProps) {
  const isAccent = variant === 'accent';

  return (
    <div
      className={cn(
        'flex flex-col h-full p-[var(--space-5)]',
        isAccent
          ? 'bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]'
          : 'bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))] border border-[hsl(var(--ivy-border))]',
        className
      )}
    >
      {/* Header */}
      <div className="mb-[var(--space-4)]">
        <Typography
          variant="h4"
          className={isAccent ? 'text-[hsl(var(--ivy-background))]' : ''}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            className={cn(
              'mt-1 block',
              isAccent
                ? 'text-[hsl(var(--ivy-background)/0.7)]'
                : 'text-[hsl(var(--ivy-foreground-muted))]'
            )}
          >
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Posts list */}
      <ul className="flex-1 space-y-[var(--space-3)]">
        {posts.slice(0, 4).map((post, index) => (
          <li key={post.id}>
            <AppLink
              href={post.href}
              className={cn(
                'group flex items-start gap-[var(--space-3)] no-underline',
                isAccent
                  ? 'text-[hsl(var(--ivy-background))]'
                  : 'text-[hsl(var(--ivy-foreground))]'
              )}
            >
              <span
                className={cn(
                  'text-sm font-medium mt-0.5',
                  isAccent
                    ? 'text-[hsl(var(--ivy-background)/0.7)]'
                    : 'text-[hsl(var(--ivy-foreground-muted))]'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium leading-snug group-hover:opacity-70 transition-opacity">
                {post.title}
              </span>
            </AppLink>
          </li>
        ))}
      </ul>

      {/* See all link */}
      <AppLink
        href={href}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-medium mt-[var(--space-4)] group no-underline',
          isAccent
            ? 'text-[hsl(var(--ivy-background)/0.7)] hover:text-[hsl(var(--ivy-background))]'
            : 'text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))]'
        )}
      >
        See all
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </AppLink>
    </div>
  );
}

export default SideCard;
