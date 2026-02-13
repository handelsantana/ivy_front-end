/**
 * Reports Module - Latest report + archive link
 */

import { AppLink } from '@/platform';
import type { Report, Author } from '@/cms';
import { FileText, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportsModuleProps {
  latestReport?: Report;
  author?: Author;
}

export function ReportsModule({ latestReport, author }: ReportsModuleProps) {
  return (
    <section className="py-[var(--space-7)] md:py-[var(--space-8)]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        <div className="grid md:grid-cols-2 gap-[var(--space-6)] items-center">
          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-4)]">
              <FileText className="h-5 w-5 text-[hsl(var(--ivy-foreground))]" />
              <h2 className="font-[var(--font-headline)] text-xl font-bold tracking-tight">
                Reports
              </h2>
            </div>

            {latestReport ? (
              <>
                <h3 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold leading-tight mb-[var(--space-3)]">
                  {latestReport.title}
                </h3>
                <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
                  {latestReport.description}
                </p>
                {author && (
                  <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-5)]">
                    By {author.name}
                  </p>
                )}
                <div className="flex flex-wrap gap-[var(--space-3)]">
                  <Button asChild>
                    <AppLink href={`/reports/${latestReport.slug}`}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </AppLink>
                  </Button>
                  <Button variant="outline" asChild>
                    <AppLink href="/reports">
                      View Archive
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </AppLink>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-[hsl(var(--ivy-foreground-muted))] mb-[var(--space-4)]">
                  In-depth research and analysis on the topics that matter most.
                </p>
                <Button variant="outline" asChild>
                  <AppLink href="/reports">
                    Browse Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AppLink>
                </Button>
              </>
            )}
          </div>

          {/* Right: Cover image */}
          <div className="relative">
            {latestReport?.coverImage ? (
              <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--ivy-background-muted))] shadow-lg">
                <img
                  src={latestReport.coverImage}
                  alt={latestReport.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[4/5] bg-[hsl(var(--ivy-foreground))] flex items-center justify-center">
                <div className="text-center text-[hsl(var(--ivy-background))]">
                  <FileText className="h-16 w-16 mx-auto mb-[var(--space-4)] opacity-50" />
                  <p className="font-[var(--font-headline)] text-lg font-semibold">
                    Reports Coming Soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

