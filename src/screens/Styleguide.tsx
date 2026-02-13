'use client';

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { HeadMeta } from '@/platform';
import { AppLink } from '@/platform';
import { 
  Container, 
  Section, 
  Grid,
  Typography, 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  Badge, 
  Divider 
} from '@/components/ui';

/**
 * Styleguide - Living documentation for the IVY EDITION design system
 * 
 * Showcases:
 * - Typography specimens (all heading levels, body variants)
 * - Spacing scale visualization
 * - Color palette swatches
 * - Grid demonstration (12-col desktop / 4-col mobile)
 * - UI primitives in various states
 */

const Styleguide: React.FC = () => {
  return (
    <HelmetProvider>
      <HeadMeta 
        title="Design System Styleguide" 
        description="IVY EDITION design system documentation - typography, spacing, colors, and UI primitives."
      />
      
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
        {/* Header */}
        <Section spacing="lg" background="muted">
          <Container size="full">
            <Typography variant="display" className="mb-[var(--space-3)]">
              IVY EDITION
            </Typography>
            <Typography variant="dek">
              Design System Styleguide — Typography, spacing, colors, and UI primitives.
            </Typography>
          </Container>
        </Section>

        {/* Typography Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              Typography
            </Typography>
            <Typography variant="body" color="muted" className="mb-[var(--space-6)] max-w-[62ch]">
              Headlines use Playfair Display. Body and UI text use Inter.
              All sizes are locked to the type scale.
            </Typography>

            <div className="space-y-[var(--space-6)]">
              {/* Headlines */}
              <div>
                <Typography variant="overline" className="mb-[var(--space-4)] block">
                  Headlines
                </Typography>
                <div className="space-y-[var(--space-4)]">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="display">Display</Typography>
                    <Typography variant="caption">Playfair Display · 48px / 1.1 · 700</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h1">Heading 1</Typography>
                    <Typography variant="caption">Playfair Display · 40px / 1.15 · 600</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h2">Heading 2</Typography>
                    <Typography variant="caption">Playfair Display · 32px / 1.2 · 600</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h3">Heading 3</Typography>
                    <Typography variant="caption">Playfair Display · 28px / 1.25 · 600</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h4">Heading 4</Typography>
                    <Typography variant="caption">Playfair Display · 24px / 1.3 · 600</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h5">Heading 5</Typography>
                    <Typography variant="caption">Playfair Display · 20px / 1.35 · 600</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div className="flex flex-col md:flex-row md:items-baseline gap-[var(--space-2)] md:gap-[var(--space-4)]">
                    <Typography variant="h6">Heading 6</Typography>
                    <Typography variant="caption">Playfair Display · 18px / 1.4 · 600</Typography>
                  </div>
                </div>
              </div>

              <Divider decorative />

              {/* Body Text */}
              <div>
                <Typography variant="overline" className="mb-[var(--space-4)] block">
                  Body Text
                </Typography>
                <div className="space-y-[var(--space-4)]">
                  <div>
                    <Typography variant="dek" className="mb-[var(--space-1)]">
                      This is a dek — used for article summaries and subtitles.
                    </Typography>
                    <Typography variant="caption">Inter · 20px / 1.5 · 400 · Muted</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div>
                    <Typography variant="body-lg" className="mb-[var(--space-1)]">
                      Body Large — for lead paragraphs and emphasized content.
                    </Typography>
                    <Typography variant="caption">Inter · 18px / 1.6 · 400</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div>
                    <Typography variant="body" className="mb-[var(--space-1)]">
                      Body — the default text size for all content. Optimized for long-form reading at 62-72 characters per line.
                    </Typography>
                    <Typography variant="caption">Inter · 16px / 1.6 · 400</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div>
                    <Typography variant="body-sm" className="mb-[var(--space-1)]">
                      Body Small — for secondary content and UI elements.
                    </Typography>
                    <Typography variant="caption">Inter · 14px / 1.5 · 400</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div>
                    <Typography variant="caption" className="block mb-[var(--space-1)]">
                      Caption — for metadata, timestamps, and labels.
                    </Typography>
                    <Typography variant="caption">Inter · 12px / 1.4 · 500 · Muted</Typography>
                  </div>
                  <Divider spacing="sm" />
                  <div>
                    <Typography variant="overline" className="block mb-[var(--space-1)]">
                      Overline — categories and labels
                    </Typography>
                    <Typography variant="caption">Inter · 11px / 1.3 · 600 · Uppercase</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Spacing Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              Spacing Scale
            </Typography>
            <Typography variant="body" color="muted" className="mb-[var(--space-6)] max-w-[62ch]">
              Based on a 4px unit. Scale: 4, 8, 12, 16, 24, 32, 48, 64.
            </Typography>

            <div className="space-y-[var(--space-3)]">
              {[
                { token: '--space-1', size: '4px', label: 'space-1' },
                { token: '--space-2', size: '8px', label: 'space-2' },
                { token: '--space-3', size: '12px', label: 'space-3' },
                { token: '--space-4', size: '16px', label: 'space-4' },
                { token: '--space-5', size: '24px', label: 'space-5' },
                { token: '--space-6', size: '32px', label: 'space-6' },
                { token: '--space-7', size: '48px', label: 'space-7' },
                { token: '--space-8', size: '64px', label: 'space-8' },
              ].map(({ token, size, label }) => (
                <div key={token} className="flex items-center gap-[var(--space-4)]">
                  <div 
                    className="bg-[hsl(var(--ivy-foreground))] shrink-0"
                    style={{ 
                      width: `var(${token})`, 
                      height: `var(${token})`,
                      minWidth: '4px',
                      minHeight: '4px'
                    }}
                  />
                  <Typography variant="body-sm" className="font-mono w-24">
                    {label}
                  </Typography>
                  <Typography variant="caption">
                    {size}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Colors Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              Color Palette
            </Typography>
            <Typography variant="body" color="muted" className="mb-[var(--space-6)] max-w-[62ch]">
              Minimal, editorial neutral palette. All colors in HSL format.
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-4)]">
              {[
                { name: 'Background', token: '--ivy-background', dark: false },
                { name: 'Background Muted', token: '--ivy-background-muted', dark: false },
                { name: 'Foreground', token: '--ivy-foreground', dark: true },
                { name: 'Foreground Muted', token: '--ivy-foreground-muted', dark: true },
                { name: 'Border', token: '--ivy-border', dark: false },
                { name: 'Border Strong', token: '--ivy-border-strong', dark: false },
                { name: 'Link', token: '--ivy-link', dark: true },
                { name: 'Focus Ring', token: '--ivy-focus-ring', dark: false },
              ].map(({ name, token, dark }) => (
                <div key={token}>
                  <div 
                    className="h-20 rounded-[var(--radius-md)] border border-[hsl(var(--ivy-border))] mb-[var(--space-2)]"
                    style={{ backgroundColor: `hsl(var(${token}))` }}
                  />
                  <Typography variant="body-sm" className="font-medium">
                    {name}
                  </Typography>
                  <Typography variant="caption" className="font-mono">
                    {token}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Grid Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              Grid System
            </Typography>
            <Typography variant="body" color="muted" className="mb-[var(--space-6)] max-w-[62ch]">
              12 columns on desktop, 4 columns on mobile. Gap: 24px desktop / 16px mobile.
            </Typography>

            {/* 12-column visualization */}
            <div className="mb-[var(--space-6)]">
              <Typography variant="overline" className="mb-[var(--space-3)] block">
                12-Column Grid (Desktop)
              </Typography>
              <Grid cols={12} gap="md">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-16 bg-[hsl(var(--ivy-background-muted))] border border-[hsl(var(--ivy-border))] rounded-[var(--radius-sm)] flex items-center justify-center"
                  >
                    <Typography variant="caption">{i + 1}</Typography>
                  </div>
                ))}
              </Grid>
            </div>

            {/* Common layouts */}
            <div>
              <Typography variant="overline" className="mb-[var(--space-3)] block">
                Common Layouts
              </Typography>
              <div className="space-y-[var(--space-4)]">
                {/* 3-column */}
                <Grid cols={3} gap="md">
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/3</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/3</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/3</Typography>
                  </Card>
                </Grid>

                {/* 4-column */}
                <Grid cols={4} gap="md">
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/4</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/4</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/4</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/4</Typography>
                  </Card>
                </Grid>

                {/* 2-column */}
                <Grid cols={2} gap="md">
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/2</Typography>
                  </Card>
                  <Card padding="md" background="muted">
                    <Typography variant="caption">1/2</Typography>
                  </Card>
                </Grid>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Primitives Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              UI Primitives
            </Typography>

            {/* Cards */}
            <div className="mb-[var(--space-8)]">
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Card
              </Typography>
              <Typography variant="body" color="muted" className="mb-[var(--space-5)] max-w-[62ch]">
                Neutral container primitive. Composable with children — no editorial fields baked in.
              </Typography>

              <Grid cols={3} gap="md">
                <Card padding="md">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>With border and medium padding.</CardDescription>
                  </CardHeader>
                </Card>
                <Card padding="md" hover>
                  <CardHeader>
                    <CardTitle>Hover Card</CardTitle>
                    <CardDescription>Has hover state with shadow.</CardDescription>
                  </CardHeader>
                </Card>
                <Card padding="md" background="muted" border="none">
                  <CardHeader>
                    <CardTitle>Muted Card</CardTitle>
                    <CardDescription>With muted background, no border.</CardDescription>
                  </CardHeader>
                </Card>
              </Grid>
            </div>

            {/* Badges */}
            <div className="mb-[var(--space-8)]">
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Badge
              </Typography>
              <Typography variant="body" color="muted" className="mb-[var(--space-5)] max-w-[62ch]">
                Uses overline typography with uppercase styling.
              </Typography>

              <div className="flex flex-wrap gap-[var(--space-3)]">
                <Badge variant="default">Feature</Badge>
                <Badge variant="outline">Guide</Badge>
                <Badge variant="muted">Index</Badge>
                <Badge variant="secondary">Briefing</Badge>
              </div>
            </div>

            {/* Dividers */}
            <div className="mb-[var(--space-8)]">
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Divider
              </Typography>
              <Typography variant="body" color="muted" className="mb-[var(--space-5)] max-w-[62ch]">
                Horizontal rules with consistent styling and spacing options.
              </Typography>

              <Card padding="lg" border="default">
                <Typography variant="body-sm" className="mb-[var(--space-2)]">Default divider:</Typography>
                <Divider spacing="sm" />
                <Typography variant="body-sm" className="mb-[var(--space-4)]">Content below</Typography>
                
                <Typography variant="body-sm" className="mb-[var(--space-2)]">Decorative divider:</Typography>
                <Divider spacing="sm" decorative />
                <Typography variant="body-sm">Content below</Typography>
              </Card>
            </div>

            {/* Container */}
            <div className="mb-[var(--space-8)]">
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Container
              </Typography>
              <Typography variant="body" color="muted" className="mb-[var(--space-5)] max-w-[62ch]">
                Max-width wrapper with responsive padding. Sizes: prose (62ch), wide (72ch), full (1200px).
              </Typography>

              <div className="space-y-[var(--space-4)] bg-[hsl(var(--ivy-background-muted))] p-[var(--space-4)] rounded-[var(--radius-md)]">
                <div className="bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] rounded-[var(--radius-sm)]">
                  <Container size="prose" className="py-[var(--space-3)]">
                    <Typography variant="caption">Container: prose (62ch)</Typography>
                  </Container>
                </div>
                <div className="bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] rounded-[var(--radius-sm)]">
                  <Container size="wide" className="py-[var(--space-3)]">
                    <Typography variant="caption">Container: wide (72ch)</Typography>
                  </Container>
                </div>
                <div className="bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] rounded-[var(--radius-sm)]">
                  <Container size="full" className="py-[var(--space-3)]">
                    <Typography variant="caption">Container: full (1200px)</Typography>
                  </Container>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Interactive States Section */}
        <Section spacing="lg">
          <Container size="full">
            <Typography variant="h2" className="mb-[var(--space-5)]">
              Interactive States
            </Typography>
            <Typography variant="body" color="muted" className="mb-[var(--space-6)] max-w-[62ch]">
              Hover and focus-visible demonstrations for links and interactive elements.
            </Typography>

            {/* Links */}
            <div className="mb-[var(--space-6)]">
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Links
              </Typography>
              <div className="space-y-[var(--space-3)]">
                <div>
                  <Typography variant="body" as="span">
                    This is a paragraph with an{' '}
                    <AppLink href="/styleguide" className="underline underline-offset-2 hover:text-[hsl(var(--ivy-link-hover))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))] focus-visible:outline-offset-2 rounded-[var(--radius-sm)]">
                      inline link
                    </AppLink>
                    {' '}inside it. Hover to see the color change.
                  </Typography>
                </div>
                <div>
                  <Typography variant="body-sm">
                    Tab to the link above to see the focus-visible ring (blue outline).
                  </Typography>
                </div>
              </div>
            </div>

            {/* Interactive Cards */}
            <div>
              <Typography variant="h4" className="mb-[var(--space-4)]">
                Interactive Cards
              </Typography>
              <Grid cols={2} gap="md">
                <Card padding="md" hover className="focus-visible:ring-2 focus-visible:ring-[hsl(var(--ivy-focus-ring))] focus-visible:ring-offset-2" tabIndex={0}>
                  <CardHeader>
                    <CardTitle>Hoverable & Focusable</CardTitle>
                    <CardDescription>
                      Hover to see shadow. Tab to see focus ring.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card padding="md" border="strong" className="transition-all hover:bg-[hsl(var(--ivy-background-muted))]">
                  <CardHeader>
                    <CardTitle>Background Hover</CardTitle>
                    <CardDescription>
                      Hover to see background change.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Grid>
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <Section spacing="lg" background="muted">
          <Container size="full">
            <div className="text-center">
              <Typography variant="overline" className="block mb-[var(--space-2)]">
                IVY Edition
              </Typography>
              <Typography variant="caption">
                Design System v1.0 — Ideas, Vision, Yield
              </Typography>
            </div>
          </Container>
        </Section>
      </div>
    </HelmetProvider>
  );
};

export default Styleguide;

