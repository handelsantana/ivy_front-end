/**
 * Read Next - Next article suggestion
 */

import { AppLink } from '@/platform';
import type { Post } from '@/cms';
import { ArrowRight } from 'lucide-react';

interface ReadNextProps {
  post?: Post;
}

export function ReadNext({ post }: ReadNextProps) {
  if (!post) return null;

  return (
    <AppLink
      href={`/article/${post.slug}`}
      className="group block py-[var(--space-6)] border-t border-[hsl(var(--ivy-border))]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
            Read Next
          </p>
          <h3 className="font-[var(--font-headline)] text-lg md:text-xl font-semibold group-hover:opacity-70 transition-opacity">
            {post.title}
          </h3>
          <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
            {post.pillar} · {post.format.replace('-', ' ')}
          </p>
        </div>
        <ArrowRight className="h-6 w-6 text-[hsl(var(--ivy-foreground-muted))] group-hover:translate-x-2 transition-transform" />
      </div>
    </AppLink>
  );
}

