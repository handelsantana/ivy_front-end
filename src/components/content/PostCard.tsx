/**
 * PostCard - Reusable content card component
 * 
 * Displays a curated post with image, title, dek, author, and metadata.
 * Uses AppLink and AppImage for platform compatibility.
 * Does NOT fetch data - receives post object as prop.
 */

import { AppLink, AppImage } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import type { CuratedPost } from '@/mock/types';

export type PostCardVariant = 'default' | 'compact' | 'featured' | 'minimal';

export interface PostCardProps {
  post: CuratedPost;
  variant?: PostCardVariant;
  showImage?: boolean;
  showDek?: boolean;
  showAuthor?: boolean;
  showMeta?: boolean;
  imageAspect?: 'video' | 'square' | 'portrait';
  className?: string;
}

export function PostCard({
  post,
  variant = 'default',
  showImage = true,
  showDek = true,
  showAuthor = true,
  showMeta = true,
  imageAspect = 'video',
  className,
}: PostCardProps) {
  const aspectClasses = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  };

  const titleVariants: Record<PostCardVariant, 'h3' | 'h4' | 'h5' | 'body'> = {
    featured: 'h3',
    default: 'h4',
    compact: 'h5',
    minimal: 'body',
  };

  return (
    <article className={cn('group', className)}>
      <AppLink
        href={post.href}
        className="block no-underline"
      >
        {/* Image */}
        {showImage && post.heroImage && (
          <div
            className={cn(
              'relative overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]',
              aspectClasses[imageAspect]
            )}
          >
            <AppImage
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              width={post.heroImage.width}
              height={post.heroImage.height}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div>
          {/* Meta: vertical + format */}
          {showMeta && (
            <Typography
              variant="overline"
              className="mb-[var(--space-1)]"
            >
              {post.vertical.replace('-', ' ')}
              {post.format && (
                <span className="text-[hsl(var(--ivy-foreground-muted))]">
                  {' · '}
                  {post.format.replace('-', ' ')}
                </span>
              )}
            </Typography>
          )}

          {/* Title */}
          <Typography
            variant={titleVariants[variant]}
            as="h3"
            className={cn(
              'group-hover:opacity-70 transition-opacity',
              variant === 'featured' && 'leading-tight',
              variant === 'minimal' && 'font-medium'
            )}
          >
            {post.title}
          </Typography>

          {/* Dek */}
          {showDek && post.dek && variant !== 'compact' && variant !== 'minimal' && (
            <Typography
              variant="body-sm"
              color="muted"
              className="mt-[var(--space-2)] line-clamp-2"
            >
              {post.dek}
            </Typography>
          )}

          {/* Author + reading time */}
          {showAuthor && (
            <div className="flex items-center gap-[var(--space-2)] mt-[var(--space-2)]">
              <Typography variant="caption">
                {post.author.name}
              </Typography>
              {post.readingTime && (
                <>
                  <span className="text-[hsl(var(--ivy-foreground-muted))]">·</span>
                  <Typography variant="caption" color="muted">
                    {post.readingTime}
                  </Typography>
                </>
              )}
            </div>
          )}
        </div>
      </AppLink>
    </article>
  );
}

export default PostCard;
