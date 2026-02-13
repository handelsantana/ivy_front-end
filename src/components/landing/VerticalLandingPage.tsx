/**
 * Vertical Landing Page Template
 * 
 * Reusable template for vertical/section landing pages.
 * Includes: Hero, Featured slot, Latest feed, Pillar shelves, Index magnets
 */

import { AppLink } from '@/platform';
import type { Post, Author } from '@/cms';
import { ArrowRight, Bookmark } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface PillarConfig {
  slug: string;
  label: string;
  description: string;
}

interface StartHereLink {
  title: string;
  href: string;
  description?: string;
}

export interface VerticalLandingPageProps {
  // Header
  title: string;
  tagline: string;
  description?: string;
  
  // Content
  featuredPost?: Post;
  latestPosts: Post[];
  authors: Author[];
  
  // Pillars
  pillars: PillarConfig[];
  pillarPosts: Record<string, Post[]>;
  
  // Start Here
  startHereLinks: StartHereLink[];
  
  // Index magnets
  indexPosts: Post[];
  
  // Config
  accentColor?: string;
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function HeroSection({ title, tagline, description }: { title: string; tagline: string; description?: string }) {
  return (
    <section className="py-[var(--space-7)] md:py-[var(--space-8)] border-b border-[hsl(var(--ivy-border))]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-[var(--space-3)]">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] max-w-2xl">
          {tagline}
        </p>
        {description && (
          <p className="text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-4)] max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

function FeaturedSlot({ post, author }: { post: Post; author?: Author }) {
  return (
    <article className="group">
      <AppLink href={`/article/${post.slug}`} className="grid md:grid-cols-2 gap-[var(--space-6)] items-center">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--ivy-background-muted))]">
          {post.heroImage ? (
            <OptimizedImage
              src={post.heroImage}
              alt={post.heroImageAlt || post.title}
              width={800}
              height={500}
              priority
              fill
              className="group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ivy-foreground)/0.1)] to-[hsl(var(--ivy-foreground)/0.2)]" />
          )}
          <div className="absolute top-[var(--space-3)] left-[var(--space-3)]">
            <span className="inline-block px-[var(--space-2)] py-[var(--space-1)] text-xs font-medium uppercase tracking-wider bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))]">
              Featured
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
            {post.pillar} · {post.format.replace('-', ' ')}
          </p>
          <h2 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold leading-tight group-hover:opacity-70 transition-opacity mb-[var(--space-3)]">
            {post.title}
          </h2>
          <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
            {post.dek}
          </p>
          {author && (
            <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
              By <span className="font-medium text-[hsl(var(--ivy-foreground))]">{author.name}</span>
            </p>
          )}
        </div>
      </AppLink>
    </article>
  );
}

function LatestFeed({ posts, authors }: { posts: Post[]; authors: Author[] }) {
  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  return (
    <div className="space-y-[var(--space-5)]">
      <h3 className="font-[var(--font-headline)] text-lg font-bold tracking-tight">
        Latest
      </h3>
      <div className="space-y-[var(--space-4)]">
        {posts.map((post) => {
          const author = getAuthor(post.authorId);
          return (
            <article key={post.id} className="group pb-[var(--space-4)] border-b border-[hsl(var(--ivy-border))] last:border-0">
              <AppLink href={`/article/${post.slug}`}>
                <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-1)]">
                  {post.pillar}
                </p>
                <h4 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h4>
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
    </div>
  );
}

function PillarShelf({ pillar, posts, authors }: { pillar: PillarConfig; posts: Post[]; authors: Author[] }) {
  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  if (posts.length === 0) return null;

  return (
    <div className="py-[var(--space-5)] border-t border-[hsl(var(--ivy-border))]">
      <div className="flex items-start justify-between mb-[var(--space-4)]">
        <div>
          <h3 className="font-[var(--font-headline)] text-lg font-bold tracking-tight">
            {pillar.label}
          </h3>
          <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
            {pillar.description}
          </p>
        </div>
        <AppLink
          href={`?pillar=${pillar.slug}`}
          className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors flex items-center gap-1"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </AppLink>
      </div>
      
      <div className="grid md:grid-cols-3 gap-[var(--space-4)]">
        {posts.slice(0, 3).map((post) => {
          const author = getAuthor(post.authorId);
          return (
            <article key={post.id} className="group">
              <AppLink href={`/article/${post.slug}`}>
                {post.heroImage && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-[hsl(var(--ivy-background-muted))] mb-[var(--space-3)]">
                    <OptimizedImage
                      src={post.heroImage}
                      alt={post.heroImageAlt || post.title}
                      width={400}
                      height={267}
                      fill
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <h4 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h4>
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
    </div>
  );
}

function StartHereBlock({ links }: { links: StartHereLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))] p-[var(--space-5)]">
      <h3 className="font-[var(--font-headline)] text-lg font-bold tracking-tight mb-[var(--space-4)]">
        Start Here
      </h3>
      <ul className="space-y-[var(--space-3)]">
        {links.map((link, index) => (
          <li key={index}>
            <AppLink
              href={link.href}
              className="group flex items-center gap-[var(--space-3)]"
            >
              <span className="text-sm text-[hsl(var(--ivy-background)/0.5)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-medium group-hover:opacity-70 transition-opacity">
                {link.title}
              </span>
            </AppLink>
            {link.description && (
              <p className="text-sm text-[hsl(var(--ivy-background)/0.6)] ml-8 mt-1">
                {link.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndexMagnets({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        <div className="flex items-center justify-between mb-[var(--space-5)]">
          <div className="flex items-center gap-[var(--space-2)]">
            <Bookmark className="h-5 w-5" />
            <h3 className="font-[var(--font-headline)] text-xl font-bold tracking-tight">
              Popular in The Index
            </h3>
          </div>
          <AppLink
            href="/index"
            className="text-sm font-medium text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
          >
            Browse all →
          </AppLink>
        </div>

        <div className="grid md:grid-cols-4 gap-[var(--space-4)]">
          {posts.slice(0, 4).map((post) => (
            <AppLink
              key={post.id}
              href={`/article/${post.slug}`}
              className="group p-[var(--space-4)] bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
                {post.format.replace('-', ' ')}
              </p>
              <h4 className="font-[var(--font-headline)] text-base font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                {post.title}
              </h4>
            </AppLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function VerticalLandingPage({
  title,
  tagline,
  description,
  featuredPost,
  latestPosts,
  authors,
  pillars,
  pillarPosts,
  startHereLinks,
  indexPosts,
}: VerticalLandingPageProps) {
  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  return (
    <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Hero */}
      <HeroSection title={title} tagline={tagline} description={description} />

      {/* Featured + Latest */}
      <section className="py-[var(--space-7)]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="grid lg:grid-cols-3 gap-[var(--space-8)]">
            {/* Featured (2 cols) */}
            <div className="lg:col-span-2">
              {featuredPost ? (
                <FeaturedSlot post={featuredPost} author={getAuthor(featuredPost.authorId)} />
              ) : (
                <div className="aspect-[16/10] bg-[hsl(var(--ivy-background-muted))] flex items-center justify-center">
                  <p className="text-[hsl(var(--ivy-foreground-muted))]">No featured content yet</p>
                </div>
              )}
            </div>

            {/* Sidebar: Latest + Start Here */}
            <div className="space-y-[var(--space-6)]">
              {latestPosts.length > 0 && (
                <LatestFeed posts={latestPosts.slice(0, 5)} authors={authors} />
              )}
              <StartHereBlock links={startHereLinks} />
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Shelves */}
      {pillars.length > 0 && (
        <section className="py-[var(--space-6)]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            {pillars.map((pillar) => (
              <PillarShelf
                key={pillar.slug}
                pillar={pillar}
                posts={pillarPosts[pillar.slug] || []}
                authors={authors}
              />
            ))}
          </div>
        </section>
      )}

      {/* Index Magnets */}
      <IndexMagnets posts={indexPosts} />
    </div>
  );
}

