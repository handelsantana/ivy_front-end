/**
 * Article Byline - Author, dates, share
 */

import { AppLink } from '@/platform';
import type { Author } from '@/cms';
import { formatDate } from '@/cms/utils';

interface ArticleBylineProps {
  author?: Author;
  publishedAt?: string;
  updatedAt?: string;
  createdAt: string;
}

export function ArticleByline({ author, publishedAt, updatedAt, createdAt }: ArticleBylineProps) {
  const displayDate = publishedAt || createdAt;
  const showUpdated = updatedAt && updatedAt !== displayDate && 
    new Date(updatedAt).getTime() - new Date(displayDate).getTime() > 86400000; // > 1 day

  return (
    <div className="flex flex-wrap items-center gap-x-[var(--space-4)] gap-y-[var(--space-2)] py-[var(--space-4)] border-y border-[hsl(var(--ivy-border))]">
      {/* Author */}
      {author && (
        <div className="flex items-center gap-[var(--space-3)]">
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
              <AppLink
              href={`/contributors/${author.slug}`}
              className="font-medium text-[hsl(var(--ivy-foreground))] hover:opacity-70 transition-opacity"
            >
              {author.name}
            </AppLink>
            {author.role && (
              <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">{author.role}</p>
            )}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="flex items-center gap-[var(--space-3)] text-sm text-[hsl(var(--ivy-foreground-muted))]">
        <time dateTime={displayDate}>
          {formatDate(displayDate)}
        </time>
        {showUpdated && (
          <>
            <span>·</span>
            <span>
              Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

