/**
 * Contextual Links - Curated internal navigation
 */

import { AppLink } from '@/platform';
import { ArrowRight } from 'lucide-react';

interface ContextualLink {
  title: string;
  href: string;
  description?: string;
}

interface ContextualLinksProps {
  links: ContextualLink[];
  title?: string;
}

export function ContextualLinks({ links, title = "Continue Reading" }: ContextualLinksProps) {
  if (links.length === 0) return null;

  return (
    <aside className="my-[var(--space-6)] p-[var(--space-5)] bg-[hsl(var(--ivy-background-muted))] border border-[hsl(var(--ivy-border))]">
      <h3 className="font-[var(--font-headline)] text-sm font-semibold uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
        {title}
      </h3>
      <ul className="space-y-[var(--space-3)]">
        {links.map((link, index) => (
          <li key={index}>
            <AppLink
              href={link.href}
              className="group flex items-start gap-[var(--space-3)]"
            >
              <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-[hsl(var(--ivy-foreground-muted))] group-hover:translate-x-1 transition-transform" />
              <div>
                <span className="font-medium text-[hsl(var(--ivy-foreground))] group-hover:opacity-70 transition-opacity">
                  {link.title}
                </span>
                {link.description && (
                  <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                    {link.description}
                  </p>
                )}
              </div>
            </AppLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

