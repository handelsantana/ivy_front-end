/**
 * Edition Bridge Page Template
 * Connects IVY content to external ventures
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData, usePosts, useAuthors, type Post } from '@/cms';
import { ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface ProofPoint {
  text: string;
  metric?: string;
}

interface EditionPageProps {
  name: string;
  tagline: string;
  description: string;
  proofPoints: ProofPoint[];
  externalUrl: string;
  externalLabel?: string;
  // Curated article slugs or filter criteria
  articleSlugs?: string[];
  articleVertical?: string;
  articlePillar?: string;
}

export function EditionPage({
  name,
  tagline,
  description,
  proofPoints,
  externalUrl,
  externalLabel = 'Visit site',
  articleSlugs = [],
  articleVertical,
  articlePillar,
}: EditionPageProps) {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { posts } = usePosts();
  const { authors } = useAuthors();

  // Get curated articles
  const curatedArticles = useMemo(() => {
    const publishedPosts = posts.filter(p => p.status === 'published');
    
    // If specific slugs provided, use those
    if (articleSlugs.length > 0) {
      return articleSlugs
        .map(slug => publishedPosts.find(p => p.slug === slug))
        .filter((p): p is Post => p !== undefined)
        .slice(0, 10);
    }
    
    // Otherwise filter by vertical/pillar
    return publishedPosts
      .filter(p => {
        if (articleVertical && p.vertical !== articleVertical) return false;
        if (articlePillar && p.pillar !== articlePillar) return false;
        return true;
      })
      .slice(0, 10);
  }, [posts, articleSlugs, articleVertical, articlePillar]);

  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  return (
    <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Hero */}
      <section className="py-[var(--space-8)] md:py-[var(--space-9)] border-b border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="max-w-3xl">
            {/* Edition badge */}
            <span className="inline-block px-[var(--space-3)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))] mb-[var(--space-5)]">
              IVY Edition
            </span>

            <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-[var(--space-4)]">
              {name}
            </h1>
            
            <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
              {tagline}
            </p>

            {/* What it solves */}
            <p className="text-lg text-[hsl(var(--ivy-foreground))] leading-relaxed mb-[var(--space-6)]">
              {description}
            </p>

            {/* External link */}
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[var(--space-2)] px-[var(--space-5)] py-[var(--space-3)] bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))] font-medium hover:opacity-90 transition-opacity"
            >
              {externalLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <section className="py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
            {proofPoints.map((point, index) => (
              <div key={index} className="flex gap-[var(--space-3)]">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-[hsl(var(--ivy-foreground))]" />
                <div>
                  <p className="font-medium text-[hsl(var(--ivy-foreground))]">
                    {point.text}
                  </p>
                  {point.metric && (
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
                      {point.metric}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Articles */}
      <section className="py-[var(--space-7)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight mb-[var(--space-2)]">
            Related from IVY
          </h2>
          <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
            Context and insights that inform this work.
          </p>

          {curatedArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-[var(--space-5)]">
              {curatedArticles.map((post) => {
                const author = getAuthor(post.authorId);
                return (
                  <AppLink
                    key={post.id}
                    href={`/article/${post.slug}`}
                    className="group flex gap-[var(--space-4)] p-[var(--space-4)] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors"
                  >
                    {post.heroImage && (
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-[hsl(var(--ivy-background-muted))]">
                        <OptimizedImage
                          src={post.heroImage}
                          alt={post.heroImageAlt || post.title}
                          width={96}
                          height={96}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                        {post.pillar}
                      </p>
                      <h3 className="font-[var(--font-headline)] font-semibold leading-snug group-hover:opacity-70 transition-opacity line-clamp-2">
                        {post.title}
                      </h3>
                      {author && (
                        <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
                          {author.name}
                        </p>
                      )}
                    </div>
                  </AppLink>
                );
              })}
            </div>
          ) : (
            <p className="text-[hsl(var(--ivy-foreground-muted))] py-[var(--space-6)] text-center border border-dashed border-[hsl(var(--ivy-border))]">
              Supporting articles will appear here once published.
            </p>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-[var(--space-7)] border-t border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[var(--space-4)]">
            <div>
              <h3 className="font-[var(--font-headline)] text-lg font-bold">
                Learn more about {name}
              </h3>
              <p className="text-[hsl(var(--ivy-foreground-muted))]">
                Explore the full project and its applications.
              </p>
            </div>
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[var(--space-2)] font-medium hover:opacity-70 transition-opacity"
            >
              {externalLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

