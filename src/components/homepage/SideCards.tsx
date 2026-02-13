/**
 * Side Cards - "The Week" and "The Index" modules
 * Two compact cards that sit beside or below the lead story
 */

import { AppLink } from '@/platform';
import type { Post } from '@/cms';
import { ArrowRight } from 'lucide-react';

interface SideCardProps {
  title: string;
  subtitle?: string;
  posts: Post[];
  href: string;
  variant?: 'default' | 'accent';
}

function SideCard({ title, subtitle, posts, href, variant = 'default' }: SideCardProps) {
  const bgClass = variant === 'accent' 
    ? 'bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]'
    : 'bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))] border border-[hsl(var(--ivy-border))]';
  
  const mutedClass = variant === 'accent'
    ? 'text-[hsl(var(--ivy-background)/0.7)]'
    : 'text-[hsl(var(--ivy-foreground-muted))]';

  return (
    <div className={`flex flex-col h-full p-[var(--space-5)] ${bgClass}`}>
      {/* Header */}
      <div className="mb-[var(--space-4)]">
        <h2 className="font-[var(--font-headline)] text-xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className={`text-sm mt-1 ${mutedClass}`}>{subtitle}</p>
        )}
      </div>
      
      {/* Posts list */}
      <ul className="flex-1 space-y-[var(--space-3)]">
        {posts.slice(0, 4).map((post, index) => (
          <li key={post.id}>
            <AppLink 
              href={`/article/${post.slug}`}
              className="group flex items-start gap-[var(--space-3)]"
            >
              <span className={`text-sm font-medium ${mutedClass} mt-0.5`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium leading-snug group-hover:opacity-70 transition-opacity">
                {post.title}
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
      
      {/* See all link */}
      <AppLink 
        href={href}
        className={`inline-flex items-center gap-2 text-sm font-medium mt-[var(--space-4)] group ${mutedClass} hover:opacity-100`}
      >
        See all
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </AppLink>
    </div>
  );
}

interface SideCardsProps {
  weekPosts: Post[];
  indexPosts: Post[];
}

export function SideCards({ weekPosts, indexPosts }: SideCardsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-[var(--space-4)]">
      <SideCard
        title="The Week"
        subtitle="What's shaping the conversation"
        posts={weekPosts}
        href="/the-week"
        variant="default"
      />
      <SideCard
        title="The Index"
        subtitle="Essential reads, always relevant"
        posts={indexPosts}
        href="/index"
        variant="accent"
      />
    </div>
  );
}


