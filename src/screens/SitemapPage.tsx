'use client';

/**
 * HTML Sitemap Page
 * Human-readable site navigation
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData, usePosts, useAuthors } from '@/cms';
import { HeadMeta } from '@/platform';
import { ExternalLink } from 'lucide-react';

interface SitemapSection {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const STATIC_SECTIONS: SitemapSection[] = [
  {
    title: 'Main',
    links: [
      { label: 'Home', href: '/' },
      { label: 'The Index', href: '/index' },
      { label: 'Reports', href: '/reports' },
      { label: 'Contributors', href: '/contributors' },
    ],
  },
  {
    title: 'Verticals',
    links: [
      { label: 'Artificial Intelligence', href: '/artificial-intelligence' },
      { label: 'Creator Economy', href: '/creator-economy' },
      { label: 'Business', href: '/business' },
      { label: 'Living', href: '/living' },
    ],
  },
  {
    title: 'IVY Editions',
    links: [
      { label: 'Fenkai', href: '/edition/fenkai' },
      { label: 'Kenvy', href: '/edition/kenvy' },
      { label: 'Evolsign', href: '/edition/evolsign' },
      { label: 'B.Mondiale', href: '/edition/bmondiale' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'XML Sitemap', href: '/sitemap.xml', external: true },
      { label: 'LLM Summary', href: '/llm.html', external: true },
    ],
  },
];

export default function SitemapPage() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { posts } = usePosts();
  const { authors } = useAuthors();

  // Get published posts for articles section
  const publishedPosts = useMemo(() => 
    posts.filter(p => p.status === 'published').slice(0, 20),
    [posts]
  );

  // Build articles section
  const articlesSection: SitemapSection = useMemo(() => ({
    title: 'Recent Articles',
    links: publishedPosts.map(post => ({
      label: post.title,
      href: `/article/${post.slug}`,
    })),
  }), [publishedPosts]);

  // Build contributors section
  const contributorsSection: SitemapSection = useMemo(() => ({
    title: 'Contributors',
    links: authors.map(author => ({
      label: author.name,
      href: `/contributors/${author.slug}`,
    })),
  }), [authors]);

  const allSections = [
    ...STATIC_SECTIONS.slice(0, 3),
    articlesSection,
    contributorsSection,
    ...STATIC_SECTIONS.slice(3),
  ];

  return (
    <>
      <HeadMeta
        title="Sitemap"
        description="Complete navigation map of IVY Edition - find all sections, articles, and resources."
        canonicalPath="/sitemap"
      />

      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
        {/* Header */}
        <section className="py-[var(--space-7)] border-b border-[hsl(var(--ivy-border))]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tight mb-[var(--space-3)]">
              Sitemap
            </h1>
            <p className="text-xl text-[hsl(var(--ivy-foreground-muted))]">
              Complete navigation of IVY Edition.
            </p>
          </div>
        </section>

        {/* Sitemap Grid */}
        <section className="py-[var(--space-7)]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-8)]">
              {allSections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-[var(--font-headline)] text-lg font-bold tracking-tight mb-[var(--space-4)] pb-[var(--space-2)] border-b border-[hsl(var(--ivy-border))]">
                    {section.title}
                  </h2>
                  <ul className="space-y-[var(--space-2)]">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-[var(--space-1)] text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                          >
                            {link.label}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <AppLink
                            href={link.href}
                            className="text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                          >
                            {link.label}
                          </AppLink>
                        )}
                      </li>
                    ))}
                    {section.links.length === 0 && (
                      <li className="text-[hsl(var(--ivy-foreground-muted))] text-sm">
                        No items yet
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Last updated */}
        <section className="py-[var(--space-6)] border-t border-[hsl(var(--ivy-border))]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
              This sitemap is automatically generated and includes all public pages.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}


