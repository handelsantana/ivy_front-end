'use client';

/**
 * HomePage - Homepage Layout (A5)
 * 
 * Composes all homepage modules in the correct order.
 * All content is driven by mock curation data.
 */

import { HeadMeta } from '@/platform';
import { homepageCuration } from '@/mock';
import {
  LeadStory,
  SideCard,
  TheEditGrid,
  VerticalShelf,
  IndexStrip,
  ReportsModule,
} from '@/components/home';

export function HomePage() {
  const {
    leadStory,
    theWeek,
    theIndex,
    theEdit,
    shelves,
    indexStrip,
    reports,
  } = homepageCuration;

  return (
    <>
      <HeadMeta
        title="IVY Edition"
        noSuffix
        description="Ideas, Vision, Yield — Premium editorial coverage of AI, creator economy, business, and culture."
        canonicalPath="/"
      />

      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
        {/* Above the fold */}
        {/* Lead Story - Full-bleed hero */}
        <LeadStory post={leadStory} />

        {/* Side cards: The Week + The Index */}
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-6)]">
          <div className="grid md:grid-cols-2 gap-[var(--space-4)]">
            <SideCard
              title="The Week"
              subtitle="What's shaping the conversation"
              posts={theWeek}
              href="/the-week"
              variant="default"
            />
            <SideCard
              title="The Index"
              subtitle="Essential reads, always relevant"
              posts={theIndex}
              href="/index"
              variant="accent"
            />
          </div>
        </div>

        {/* Mid page */}
        {/* The Edit - curated stories */}
        <TheEditGrid posts={theEdit} />

        {/* Vertical Shelves - AI, Creator, Business, Living */}
        <VerticalShelf data={shelves.ai} />
        <VerticalShelf data={shelves.creator} />
        <VerticalShelf data={shelves.business} />
        <VerticalShelf data={shelves.living} />

        {/* Index Strip - evergreen magnets */}
        <IndexStrip magnets={indexStrip} />

        {/* Reports Module */}
        <ReportsModule data={reports} />
      </div>
    </>
  );
}

export default HomePage;

