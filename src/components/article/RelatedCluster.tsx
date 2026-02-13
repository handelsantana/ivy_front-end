/**
 * Related Cluster - Curated related articles
 */

import { AppLink } from '@/platform';
import type { Post, Author } from '@/cms';

interface RelatedClusterProps {
  posts: Post[];
  authors: Author[];
  title?: string;
}

export function RelatedCluster({ posts, authors, title = "Related Reading" }: RelatedClusterProps) {
  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  if (posts.length === 0) return null;

  return (
    <aside className="py-[var(--space-7)] border-t border-[hsl(var(--ivy-border))]">
      <h2 className="font-[var(--font-headline)] text-xl font-bold tracking-tight mb-[var(--space-5)]">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-[var(--space-5)]">
        {posts.slice(0, 3).map((post) => {
          const author = getAuthor(post.authorId);
          return (
            <article key={post.id} className="group">
              <AppLink href={`/article/${post.slug}`}>
                {post.heroImage && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]">
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt || post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                  {post.pillar}
                </p>
                <h3 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>
                {author && (
                  <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
                    {author.name}
                  </p>
                )}
              </AppLink>
            </article>
          );
        })}
      </div>
    </aside>
  );
}

