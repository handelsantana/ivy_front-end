'use client';

/**
 * Fenkai Edition Bridge Page
 */

import { EditionPage } from '@/components/edition';

export default function Fenkai() {
  return (
    <EditionPage
      name="Fenkai"
      tagline="Structured clarity for complex decisions."
      description="Fenkai provides decision frameworks for founders and operators navigating ambiguity. It transforms scattered inputs into actionable direction through systematic analysis and prioritization methodologies."
      proofPoints={[
        { text: 'Used by teams at 40+ early-stage companies', metric: 'Seed to Series B' },
        { text: 'Reduces decision latency by structuring trade-offs', metric: 'Average 3x faster alignment' },
        { text: 'Open methodology, freely documented', metric: 'No vendor lock-in' },
      ]}
      externalUrl="https://fenkai.io"
      externalLabel="Explore Fenkai"
      articleVertical="business"
      articlePillar="strategy"
    />
  );
}

