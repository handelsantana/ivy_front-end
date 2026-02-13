/**
 * Jump Links - Auto-generated table of contents from headings
 */

import { useState, useEffect } from 'react';
import type { HeadingNode } from '@/cms';
import { List } from 'lucide-react';

interface JumpLinksProps {
  headings: HeadingNode[];
  variant?: 'sidebar' | 'inline';
}

export function JumpLinks({ headings, variant = 'sidebar' }: JumpLinksProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Track scroll position to highlight active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // Filter to only show h2 and h3 in the jump links
  const filteredHeadings = headings.filter(h => h.level <= 3);

  if (variant === 'inline') {
    return (
      <nav className="p-[var(--space-5)] bg-[hsl(var(--ivy-background-muted))] border border-[hsl(var(--ivy-border))] mb-[var(--space-6)]">
        <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-4)]">
          <List className="h-4 w-4" />
          <h2 className="font-[var(--font-headline)] text-sm font-semibold uppercase tracking-wider">
            In This Article
          </h2>
        </div>
        <ol className="space-y-[var(--space-2)]">
          {filteredHeadings.map((heading, index) => (
            <li 
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`text-sm hover:text-[hsl(var(--ivy-foreground))] transition-colors ${
                  activeId === heading.id 
                    ? 'text-[hsl(var(--ivy-foreground))] font-medium' 
                    : 'text-[hsl(var(--ivy-foreground-muted))]'
                }`}
              >
                {heading.level === 2 && <span className="text-[hsl(var(--ivy-foreground-muted))]">{index + 1}. </span>}
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Sidebar variant
  return (
    <nav className="sticky top-[var(--space-6)]">
      <h2 className="font-[var(--font-headline)] text-xs font-semibold uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-3)]">
        Contents
      </h2>
      <ul className="space-y-[var(--space-2)] border-l border-[hsl(var(--ivy-border))]">
        {filteredHeadings.map((heading) => (
          <li 
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block pl-[var(--space-3)] -ml-px border-l-2 text-sm transition-all ${
                activeId === heading.id 
                  ? 'border-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-foreground))] font-medium' 
                  : 'border-transparent text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))]'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
