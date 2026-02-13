/**
 * Vertical Shelves - Container for all vertical sections
 */

import { VerticalShelf } from './VerticalShelf';
import type { Post, Author } from '@/cms';

interface VerticalShelvesProps {
  aiPosts: Post[];
  creatorPosts: Post[];
  businessPosts: Post[];
  livingPosts: Post[];
  authors: Author[];
}

type VerticalKey = 'ai' | 'creator' | 'business' | 'living';

const verticalConfig: Array<{
  key: VerticalKey;
  title: string;
  slug: string;
  description: string;
}> = [
  {
    key: 'ai',
    title: 'AI',
    slug: 'ai',
    description: 'Intelligence at scale',
  },
  {
    key: 'creator',
    title: 'Creator Economy',
    slug: 'creator',
    description: 'Building in public',
  },
  {
    key: 'business',
    title: 'Business',
    slug: 'business',
    description: 'Strategy & operations',
  },
  {
    key: 'living',
    title: 'Living',
    slug: 'living',
    description: 'Work, life, culture',
  },
];

export function VerticalShelves({ aiPosts, creatorPosts, businessPosts, livingPosts, authors }: VerticalShelvesProps) {
  const postsByKey: Record<VerticalKey, Post[]> = {
    ai: aiPosts,
    creator: creatorPosts,
    business: businessPosts,
    living: livingPosts,
  };

  const activeVerticals = verticalConfig.filter(
    (vertical) => postsByKey[vertical.key].length > 0
  );

  if (activeVerticals.length === 0) return null;

  return (
    <div className="bg-[hsl(var(--ivy-background))]">
      {activeVerticals.map((vertical) => (
        <VerticalShelf
          key={vertical.key}
          title={vertical.title}
          slug={vertical.slug}
          description={vertical.description}
          posts={postsByKey[vertical.key]}
          authors={authors}
        />
      ))}
    </div>
  );
}
