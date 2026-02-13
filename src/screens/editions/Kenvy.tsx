'use client';

/**
 * Kenvy Edition Bridge Page
 */

import { EditionPage } from '@/components/edition';

export default function Kenvy() {
  return (
    <EditionPage
      name="Kenvy"
      tagline="Infrastructure for knowledge work."
      description="Kenvy builds tooling that helps individuals and teams capture, organize, and retrieve information effectively. The focus is on reducing friction between thinking and doing."
      proofPoints={[
        { text: 'Integrates with existing workflows', metric: 'Works alongside your current stack' },
        { text: 'Designed for compound knowledge growth', metric: 'Value increases over time' },
        { text: 'Privacy-first architecture', metric: 'Your data stays yours' },
      ]}
      externalUrl="https://kenvy.co"
      externalLabel="Explore Kenvy"
      articleVertical="technology"
      articlePillar="tools"
    />
  );
}

