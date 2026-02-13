/**
 * Article Hero - Cinematic full-bleed hero
 */

import type { Post, PostFormat } from '@/cms';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface ArticleHeroProps {
  post: Post;
  format: PostFormat;
}

export function ArticleHero({ post, format }: ArticleHeroProps) {
  const isFeature = format === 'deep-dive' || format === 'interview';
  const isCompact = format === 'news';

  if (isCompact) {
    return null; // Briefings don't have a hero
  }

  return (
    <section 
      className={`relative w-full overflow-hidden ${
        isFeature ? 'h-[70vh] min-h-[500px]' : 'h-[50vh] min-h-[400px]'
      }`}
    >
      {/* Background Image */}
      {post.heroImage ? (
        <>
          <OptimizedImage
            src={post.heroImage}
            alt={post.heroImageAlt || post.title}
            width={1920}
            height={1080}
            priority
            fill
            placeholder="blur"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ivy-foreground))] via-[hsl(var(--ivy-foreground)/0.4)] to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground)/0.9)] to-[hsl(var(--ivy-foreground))]" />
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[var(--content-width-wide)] mx-auto w-full px-[var(--space-4)] md:px-[var(--space-6)] pb-[var(--space-8)]">
          {/* Category badge */}
          <div className="mb-[var(--space-4)]">
            <span className="inline-block px-[var(--space-3)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))]">
              {post.pillar} · {post.format.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[hsl(var(--ivy-background))] max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
