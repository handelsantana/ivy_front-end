/**
 * Lead Story - Full-bleed hero section
 * Displays the top curated story with prominent imagery
 */

import { AppLink } from '@/platform';
import type { Post, Author } from '@/cms';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface LeadStoryProps {
  post: Post;
  author?: Author;
}

export function LeadStory({ post, author }: LeadStoryProps) {
  return (
    <section className="relative w-full">
      {/* Full-bleed hero image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-[hsl(var(--ivy-foreground))]">
        {post.heroImage ? (
          <OptimizedImage
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            width={1920}
            height={820}
            priority
            fill
            className="opacity-90"
            placeholder="blur"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground)/0.8)] to-[hsl(var(--ivy-foreground))]" />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ivy-foreground))] via-[hsl(var(--ivy-foreground)/0.3)] to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] pb-[var(--space-6)] md:pb-[var(--space-8)]">
            {/* Category label */}
            <div className="mb-[var(--space-3)]">
              <span className="inline-block px-[var(--space-2)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-background))] bg-[hsl(var(--ivy-background)/0.2)] backdrop-blur-sm border border-[hsl(var(--ivy-background)/0.3)]">
                {post.vertical}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="font-[var(--font-headline)] text-3xl md:text-5xl lg:text-6xl font-bold text-[hsl(var(--ivy-background))] leading-[1.1] max-w-4xl mb-[var(--space-4)]">
              <AppLink 
                href={`/article/${post.slug}`}
                className="hover:opacity-80 transition-opacity"
              >
                {post.title}
              </AppLink>
            </h1>
            
            {/* Dek */}
            <p className="font-[var(--font-body)] text-lg md:text-xl text-[hsl(var(--ivy-background)/0.85)] max-w-2xl mb-[var(--space-4)]">
              {post.dek}
            </p>
            
            {/* Author */}
            {author && (
              <p className="text-sm text-[hsl(var(--ivy-background)/0.7)]">
                By <span className="font-medium text-[hsl(var(--ivy-background))]">{author.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

