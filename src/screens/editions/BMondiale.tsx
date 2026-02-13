'use client';

/**
 * B.Mondiale Edition Bridge Page
 */

import { EditionPage } from '@/components/edition';

export default function BMondiale() {
  return (
    <EditionPage
      name="B.Mondiale"
      tagline="Global perspective on emerging markets."
      description="B.Mondiale tracks technology adoption and business model innovation across developing economies. It identifies patterns that often precede broader market shifts."
      proofPoints={[
        { text: 'Coverage across 30+ emerging markets', metric: 'Africa, SEA, LATAM, MENA' },
        { text: 'Primary research and on-ground networks', metric: 'Not just desk research' },
        { text: 'Focus on replicable patterns', metric: 'Insights that translate across contexts' },
      ]}
      externalUrl="https://bmondiale.com"
      externalLabel="Explore B.Mondiale"
      articleVertical="business"
      articlePillar="trends"
    />
  );
}

