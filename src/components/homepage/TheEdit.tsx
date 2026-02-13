/**
 * The Edit - Curated stories grid with strong imagery
 * 6-8 stories in a visually rich layout
 */

import { useMemo } from 'react';
import { AppLink } from '@/platform';
import type { Post, Author } from '@/cms';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface StoryCardProps {
  post: Post;
  author?: Author;
  featured?: boolean;
}

function StoryCard({ post, author, featured = false }: StoryCardProps) {
  return (
    <article className={`group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <AppLink href={`/article/${post.slug}`} className="block">
        {/* Image */}
        <div className={`relative overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)] ${featured ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
          {post.heroImage ? (
            <OptimizedImage
              src={post.heroImage}
              alt={post.heroImageAlt || post.title}
              width={featured ? 800 : 400}
              height={featured ? 600 : 267}
              fill
              className="group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground-muted)/0.1)] to-[hsl(var(--ivy-foreground-muted)/0.2)]" />
          )}
        </div>

        {/* Content */}
        <div>
          {/* Category */}
          <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
            {post.vertical} | {post.pillar}
          </p>

          {/* Title */}
          <h3 className={`font-[var(--font-headline)] font-semibold leading-snug group-hover:opacity-70 transition-opacity ${featured ? 'text-xl md:text-2xl' : 'text-base'}`}>
            {post.title}
          </h3>

          {/* Dek (featured only) */}
          {featured && (
            <p className="text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-2)] line-clamp-2">
              {post.dek}
            </p>
          )}

          {/* Author */}
          {author && (
            <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-2)]">
              {author.name}
            </p>
          )}
        </div>
      </AppLink>
    </article>
  );
}

interface TheEditProps {
  posts: Post[];
  authors: Author[];
}

export function TheEdit({ posts, authors }: TheEditProps) {
  const authorById = useMemo(
    () => new Map(authors.map((author) => [author.id, author])),
    [authors]
  );
  if (posts.length === 0) return null;

  const featured = posts[0];
  const secondaryPosts = posts.slice(1, 5);

  return (
    <section className="py-[var(--space-7)] md:py-[var(--space-8)]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        {/* Section header */}
        <div className="flex items-center justify-between mb-[var(--space-6)]">
          <h2 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold tracking-tight">
            The Edit
          </h2>
          <AppLink
            href="/the-edit"
            className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
          >
            View all {'->'}
          </AppLink>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-[var(--space-5)] md:gap-[var(--space-6)]">
          {/* Featured story */}
          <StoryCard post={featured} author={authorById.get(featured.authorId)} featured />

          {/* Secondary stories */}
          {secondaryPosts.map((post) => (
            <StoryCard key={post.id} post={post} author={authorById.get(post.authorId)} />
          ))}
        </div>
      </div>
    </section>
  );
}
