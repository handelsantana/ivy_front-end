/**
 * LeadStory - Full-bleed hero section for the homepage
 * 
 * Displays the top curated story with prominent imagery.
 * Uses AppLink and AppImage for platform compatibility.
 */

import { AppLink, AppImage } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import type { CuratedPost } from '@/mock/types';

interface LeadStoryProps {
  post: CuratedPost;
  className?: string;
}

export function LeadStory({ post, className }: LeadStoryProps) {
  return (
    <section className={cn('relative w-full', className)}>
      {/* Full-bleed hero image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-[hsl(var(--ivy-foreground))]">
        <AppImage
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          width={post.heroImage.width}
          height={post.heroImage.height}
          priority
          className="w-full h-full object-cover opacity-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ivy-foreground))] via-[hsl(var(--ivy-foreground)/0.3)] to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] pb-[var(--space-6)] md:pb-[var(--space-8)]">
            {/* Category label */}
            <div className="mb-[var(--space-3)]">
              <span className="inline-block px-[var(--space-2)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-background))] bg-[hsl(var(--ivy-background)/0.2)] backdrop-blur-sm border border-[hsl(var(--ivy-background)/0.3)]">
                {post.vertical.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-[var(--font-headline)] text-3xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--ivy-background))] leading-[1.1] max-w-4xl mb-[var(--space-4)]">
              <AppLink
                href={post.href}
                className="hover:opacity-80 transition-opacity no-underline text-[hsl(var(--ivy-background))]"
              >
                {post.title}
              </AppLink>
            </h1>

            {/* Dek */}
            <p className="font-[var(--font-body)] text-lg md:text-xl text-[hsl(var(--ivy-background)/0.85)] max-w-2xl mb-[var(--space-4)]">
              {post.dek}
            </p>

            {/* Author + reading time */}
            <p className="text-sm text-[hsl(var(--ivy-background)/0.7)]">
              By{' '}
              <AppLink
                href={post.author.href}
                className="font-medium text-[hsl(var(--ivy-background))] hover:opacity-80 no-underline"
              >
                {post.author.name}
              </AppLink>
              {post.readingTime && (
                <span className="ml-2 text-[hsl(var(--ivy-background)/0.6)]">
                  · {post.readingTime}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeadStory;
