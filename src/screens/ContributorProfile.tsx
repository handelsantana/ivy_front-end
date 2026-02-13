'use client';

/**
 * Contributor Profile Page
 * Shows author metadata + their posts
 */

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { AppLink } from '@/platform';
import { seedDemoData, useAuthors, usePosts, type Post } from '@/cms';
import { formatDate } from '@/cms/utils';
import { HeadMeta } from '@/platform';
import { Twitter, Linkedin, Globe, ArrowLeft, Mail } from 'lucide-react';

export default function ContributorProfile() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    seedDemoData();
  }, []);

  const { authors } = useAuthors();
  const { posts } = usePosts();

  // Find author by slug
  const author = useMemo(() => 
    authors.find(a => a.slug === slug),
    [authors, slug]
  );

  // Get author's published posts
  const authorPosts = useMemo(() => {
    if (!author) return [];
    return posts
      .filter(p => p.authorId === author.id && p.status === 'published')
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }, [author, posts]);

  // Calculate beats
  const beats = useMemo(() => {
    const verticals = [...new Set(authorPosts.map(p => p.vertical))];
    return verticals;
  }, [authorPosts]);

  const verticalLabels: Record<string, string> = {
    'ai': 'Artificial Intelligence',
    'creator-economy': 'Creator Economy',
    'business': 'Business',
    'culture': 'Culture & Living',
    'technology': 'Technology',
  };

  // Author not found
  if (!author) {
    return (
      <div className="min-h-screen bg-[hsl(var(--ivy-background))] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-headline)] text-2xl font-bold mb-[var(--space-4)]">
            Contributor not found
          </h1>
          <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
            This contributor doesn't exist.
          </p>
          <AppLink
            href="/contributors"
            className="inline-flex items-center gap-2 font-medium hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            View all contributors
          </AppLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeadMeta
        title={author.name}
        description={author.bio || `Articles and insights from ${author.name} at IVY Edition.`}
        canonicalPath={`/contributors/${author.slug}`}
        ogImage={author.avatar}
      />
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Author Header */}
      <section className="py-[var(--space-7)] md:py-[var(--space-8)] border-b border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          {/* Back link */}
          <AppLink
            href="/contributors"
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors mb-[var(--space-6)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All contributors
          </AppLink>

          <div className="flex flex-col md:flex-row gap-[var(--space-6)] md:gap-[var(--space-8)]">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[hsl(var(--ivy-background-muted))] flex items-center justify-center">
                  <span className="text-4xl font-bold text-[hsl(var(--ivy-foreground-muted))]">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-[var(--font-headline)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-[var(--space-2)]">
                {author.name}
              </h1>
              
              {author.role && (
                <p className="text-lg text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
                  {author.role}
                </p>
              )}

              {/* Beats */}
              {beats.length > 0 && (
                <div className="flex flex-wrap gap-[var(--space-2)] mb-[var(--space-4)]">
                  {beats.map((beat) => (
                    <span
                      key={beat}
                      className="inline-block px-[var(--space-3)] py-[var(--space-1)] text-sm font-medium bg-[hsl(var(--ivy-background-muted))] text-[hsl(var(--ivy-foreground))]"
                    >
                      {verticalLabels[beat] || beat}
                    </span>
                  ))}
                </div>
              )}

              {/* Bio */}
              {author.bio && (
                <p className="text-[hsl(var(--ivy-foreground-muted))] max-w-2xl mb-[var(--space-5)]">
                  {author.bio}
                </p>
              )}

              {/* Social links */}
              <div className="flex items-center gap-[var(--space-4)]">
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[var(--space-2)] text-sm text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    @{author.twitter}
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[var(--space-2)] text-sm text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[var(--space-2)] text-sm text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Articles */}
      <section className="py-[var(--space-7)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight mb-[var(--space-5)]">
            Articles by {author.name}
            <span className="text-[hsl(var(--ivy-foreground-muted))] font-normal text-lg ml-[var(--space-2)]">
              ({authorPosts.length})
            </span>
          </h2>

          {authorPosts.length > 0 ? (
            <div className="space-y-[var(--space-6)]">
              {authorPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[hsl(var(--ivy-foreground-muted))] py-[var(--space-8)] text-center">
              No published articles yet.
            </p>
          )}
        </div>
      </section>
    </div>
    </>
  );
}

// Article Card for author page
function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <AppLink 
        href={`/article/${post.slug}`}
        className="grid md:grid-cols-[200px_1fr] gap-[var(--space-4)] md:gap-[var(--space-6)]"
      >
        {/* Thumbnail */}
        {post.heroImage && (
          <div className="relative aspect-[3/2] md:aspect-[4/3] overflow-hidden bg-[hsl(var(--ivy-background-muted))]">
            <img
              src={post.heroImage}
              alt={post.heroImageAlt || post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-2)]">
            <span className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))]">
              {post.vertical}
            </span>
            <span className="text-[hsl(var(--ivy-foreground-muted))]">·</span>
            <span className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))]">
              {post.format.replace('-', ' ')}
            </span>
          </div>
          
          <h3 className="font-[var(--font-headline)] text-xl md:text-2xl font-bold leading-snug group-hover:opacity-70 transition-opacity mb-[var(--space-2)]">
            {post.title}
          </h3>
          
          <p className="text-[hsl(var(--ivy-foreground-muted))] line-clamp-2 mb-[var(--space-2)]">
            {post.dek}
          </p>
          
          <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
            {formatDate(post.publishedAt || post.createdAt)}
          </p>
        </div>
      </AppLink>
    </article>
  );
}
