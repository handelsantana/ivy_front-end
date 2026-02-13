'use client';

/**
 * Evolsign Edition Bridge Page
 */

import { EditionPage } from '@/components/edition';

export default function Evolsign() {
  return (
    <EditionPage
      name="Evolsign"
      tagline="Design systems that scale with intention."
      description="Evolsign provides frameworks for building cohesive visual identities and component libraries. It addresses the gap between one-off designs and maintainable systems that grow with products."
      proofPoints={[
        { text: 'Token-based architecture from day one', metric: 'Consistency built in' },
        { text: 'Documentation as a first-class deliverable', metric: 'Reduces handoff friction' },
        { text: 'Adaptable to brand evolution', metric: 'Systems that flex without breaking' },
      ]}
      externalUrl="https://evolsign.design"
      externalLabel="Explore Evolsign"
      articleVertical="creator-economy"
      articlePillar="tools"
    />
  );
}

