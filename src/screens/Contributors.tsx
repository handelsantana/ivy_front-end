'use client';

/**
 * Contributors List Page
 * Shows all authors with photo, bio, and beats
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData, useAuthors, usePosts, type Author } from '@/cms';
import { HeadMeta } from '@/platform';
import { Twitter, Linkedin, Globe } from 'lucide-react';

export default function Contributors() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { authors } = useAuthors();
  const { posts } = usePosts();

  // Calculate beats (verticals they write about) for each author
  const authorsWithBeats = useMemo(() => {
    return authors.map((author) => {
      const authorPosts = posts.filter(p => p.authorId === author.id && p.status === 'published');
      const verticals = [...new Set(authorPosts.map(p => p.vertical))];
      const postCount = authorPosts.length;
      
      return {
        ...author,
        beats: verticals,
        postCount,
      };
    }).filter(a => a.postCount > 0 || authors.length <= 5); // Show all if few authors
  }, [authors, posts]);

  const verticalLabels: Record<string, string> = {
    'ai': 'AI',
    'creator-economy': 'Creator Economy',
    'business': 'Business',
    'culture': 'Culture',
    'technology': 'Technology',
  };

  return (
    <>
      <HeadMeta
        title="Contributors"
        description="The writers, analysts, and experts behind IVY's coverage of AI, creator economy, business, and culture."
        canonicalPath="/contributors"
      />
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Hero */}
      <section className="py-[var(--space-7)] md:py-[var(--space-8)] border-b border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-[var(--space-3)]">
            Contributors
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] max-w-2xl">
            The writers, analysts, and experts behind IVY's coverage.
          </p>
        </div>
      </section>

      {/* Contributors Grid */}
      <section className="py-[var(--space-7)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          {authorsWithBeats.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
              {authorsWithBeats.map((author) => (
                <ContributorCard 
                  key={author.id} 
                  author={author} 
                  beats={author.beats}
                  postCount={author.postCount}
                  verticalLabels={verticalLabels}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-[var(--space-8)]">
              <p className="text-[hsl(var(--ivy-foreground-muted))]">
                No contributors yet. Add authors in the{' '}
                <AppLink href="/admin/authors" className="underline hover:opacity-70">
                  admin panel
                </AppLink>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-[var(--space-8)] bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] text-center">
          <h2 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold mb-[var(--space-3)]">
            Want to contribute?
          </h2>
          <p className="text-[hsl(var(--ivy-background)/0.8)] max-w-md mx-auto mb-[var(--space-5)]">
            We're always looking for experts and writers to join our team.
          </p>
          <a 
            href="mailto:contribute@ivy.com"
            className="inline-block px-[var(--space-5)] py-[var(--space-3)] bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))] font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
    </>
  );
}

// Contributor Card Component
interface ContributorCardProps {
  author: Author;
  beats: string[];
  postCount: number;
  verticalLabels: Record<string, string>;
}

function ContributorCard({ author, beats, postCount, verticalLabels }: ContributorCardProps) {
  return (
    <AppLink
      href={`/contributors/${author.slug}`}
      className="group block p-[var(--space-5)] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors"
    >
      <div className="flex gap-[var(--space-4)]">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[hsl(var(--ivy-background-muted))] flex items-center justify-center">
              <span className="text-2xl font-bold text-[hsl(var(--ivy-foreground-muted))]">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="font-[var(--font-headline)] text-lg font-bold group-hover:opacity-70 transition-opacity">
            {author.name}
          </h2>
          {author.role && (
            <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
              {author.role}
            </p>
          )}
          
          {/* Beats */}
          {beats.length > 0 && (
            <div className="flex flex-wrap gap-[var(--space-1)] mt-[var(--space-2)]">
              {beats.map((beat) => (
                <span
                  key={beat}
                  className="inline-block px-[var(--space-2)] py-0.5 text-xs font-medium bg-[hsl(var(--ivy-background-muted))] text-[hsl(var(--ivy-foreground-muted))]"
                >
                  {verticalLabels[beat] || beat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {author.bio && (
        <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-3)] line-clamp-2">
          {author.bio}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-[var(--space-4)] pt-[var(--space-3)] border-t border-[hsl(var(--ivy-border))]">
        <span className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
          {postCount} {postCount === 1 ? 'article' : 'articles'}
        </span>
        
        {/* Social links */}
        <div className="flex items-center gap-[var(--space-2)]" onClick={(e) => e.stopPropagation()}>
          {author.twitter && (
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))]"
              onClick={(e) => e.stopPropagation()}
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))]"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))]"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </AppLink>
  );
}


