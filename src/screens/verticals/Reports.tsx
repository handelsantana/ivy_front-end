'use client';

/**
 * Reports Landing Page
 */

import { useEffect, useMemo } from 'react';
import { AppLink } from '@/platform';
import { seedDemoData, useReports, useAuthors } from '@/cms';
import { Button } from '@/components/ui/button';
import { HeadMeta } from '@/platform';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { formatDate } from '@/cms/utils';

export default function Reports() {
  useEffect(() => {
    seedDemoData();
  }, []);

  const { reports } = useReports();
  const { authors } = useAuthors();

  const publishedReports = useMemo(() => 
    reports.filter(r => r.status === 'published'),
    [reports]
  );

  const getAuthor = (authorId: string) => authors.find(a => a.id === authorId);

  const latestReport = publishedReports[0];
  const archiveReports = publishedReports.slice(1);

  return (
    <>
      <HeadMeta
        title="Reports"
        description="In-depth research and analysis on AI, creator economy, business, and culture. Download our latest publications."
        canonicalPath="/reports"
      />
      <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Hero */}
      <section className="py-[var(--space-7)] md:py-[var(--space-8)] border-b border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
          <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
            <FileText className="h-8 w-8" />
            <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Reports
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[hsl(var(--ivy-foreground-muted))] max-w-2xl">
            In-depth research and analysis on the topics that matter most.
          </p>
        </div>
      </section>

      {/* Latest Report */}
      {latestReport ? (
        <section className="py-[var(--space-7)]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <h2 className="font-[var(--font-headline)] text-sm font-medium uppercase tracking-wider text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
              Latest Report
            </h2>
            <div className="grid md:grid-cols-2 gap-[var(--space-8)] items-center">
              {/* Cover */}
              <div className="relative aspect-[4/5] bg-[hsl(var(--ivy-foreground))] overflow-hidden">
                {latestReport.coverImage ? (
                  <img
                    src={latestReport.coverImage}
                    alt={latestReport.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="h-24 w-24 text-[hsl(var(--ivy-background)/0.3)]" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <h3 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold leading-tight mb-[var(--space-4)]">
                  {latestReport.title}
                </h3>
                <p className="text-lg text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
                  {latestReport.description}
                </p>
                {getAuthor(latestReport.authorId) && (
                  <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-2)]">
                    By {getAuthor(latestReport.authorId)?.name}
                  </p>
                )}
                {latestReport.publishedAt && (
                  <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-6)]">
                    Published {formatDate(latestReport.publishedAt)}
                  </p>
                )}
                <div className="flex flex-wrap gap-[var(--space-3)]">
                  <Button asChild size="lg">
                    <AppLink href={`/reports/${latestReport.slug}`}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </AppLink>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <AppLink href={`/reports/${latestReport.slug}`}>
                      Read Online
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AppLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-[var(--space-8)]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] text-center">
            <FileText className="h-16 w-16 text-[hsl(var(--ivy-foreground-muted)/0.3)] mx-auto mb-[var(--space-4)]" />
            <h2 className="font-[var(--font-headline)] text-2xl font-bold mb-[var(--space-3)]">
              Reports Coming Soon
            </h2>
            <p className="text-[hsl(var(--ivy-foreground-muted))] max-w-md mx-auto">
              We're working on our first research report. Sign up for the newsletter to be notified when it launches.
            </p>
          </div>
        </section>
      )}

      {/* Archive */}
      {archiveReports.length > 0 && (
        <section className="py-[var(--space-7)] bg-[hsl(var(--ivy-background-muted))]">
          <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
            <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight mb-[var(--space-5)]">
              Archive
            </h2>
            <div className="grid md:grid-cols-3 gap-[var(--space-5)]">
              {archiveReports.map((report) => {
                const author = getAuthor(report.authorId);
                return (
                  <AppLink
                    key={report.id}
                    href={`/reports/${report.slug}`}
                    className="group bg-[hsl(var(--ivy-background))] border border-[hsl(var(--ivy-border))] hover:border-[hsl(var(--ivy-border-strong))] transition-colors"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[4/3] bg-[hsl(var(--ivy-foreground))] overflow-hidden">
                      {report.coverImage ? (
                        <img
                          src={report.coverImage}
                          alt={report.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-[hsl(var(--ivy-background)/0.3)]" />
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-[var(--space-4)]">
                      <h3 className="font-[var(--font-headline)] text-lg font-semibold leading-snug group-hover:opacity-70 transition-opacity">
                        {report.title}
                      </h3>
                      {author && (
                        <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-2)]">
                          {author.name}
                        </p>
                      )}
                    </div>
                  </AppLink>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-[var(--space-8)] border-t border-[hsl(var(--ivy-border))]">
        <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] text-center">
          <h2 className="font-[var(--font-headline)] text-2xl font-bold mb-[var(--space-3)]">
            Get Reports in Your Inbox
          </h2>
          <p className="text-[hsl(var(--ivy-foreground-muted))] max-w-md mx-auto mb-[var(--space-5)]">
            Be the first to know when we publish new research. No spam, just insights.
          </p>
          <Button asChild>
            <AppLink href="/#newsletter">Subscribe to Newsletter</AppLink>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}


