/**
 * ReportsModule - Latest report + archive link
 * 
 * Displays the featured report with cover image and archive links.
 */

import { AppLink, AppImage } from '@/platform';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReportsData } from '@/mock/types';

interface ReportsModuleProps {
  data: ReportsData;
  className?: string;
}

export function ReportsModule({ data, className }: ReportsModuleProps) {
  const { latest, archive } = data;

  return (
    <section
      className={cn(
        'py-[var(--space-7)] md:py-[var(--space-8)]',
        className
      )}
    >
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        <div className="grid md:grid-cols-2 gap-[var(--space-6)] items-center">
          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-4)]">
              <FileText className="h-5 w-5 text-[hsl(var(--ivy-foreground))]" />
              <Typography variant="h4">Reports</Typography>
            </div>

            <Typography variant="h2" className="mb-[var(--space-3)]">
              {latest.title}
            </Typography>

            <Typography
              variant="body"
              color="muted"
              className="mb-[var(--space-4)]"
            >
              {latest.description}
            </Typography>

            <Typography
              variant="caption"
              color="muted"
              className="mb-[var(--space-5)] block"
            >
              By{' '}
              <AppLink
                href={latest.author.href}
                className="text-[hsl(var(--ivy-foreground))]"
              >
                {latest.author.name}
              </AppLink>
            </Typography>

            <div className="flex flex-wrap gap-[var(--space-3)]">
              <Button asChild>
                <AppLink href={latest.href} className="no-underline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </AppLink>
              </Button>
              <Button variant="outline" asChild>
                <AppLink href="/reports" className="no-underline">
                  View Archive
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AppLink>
              </Button>
            </div>

            {/* Archive list */}
            {archive.length > 0 && (
              <div className="mt-[var(--space-6)] pt-[var(--space-4)] border-t border-[hsl(var(--ivy-border))]">
                <Typography
                  variant="overline"
                  className="mb-[var(--space-3)] block"
                >
                  Previous Reports
                </Typography>
                <ul className="space-y-[var(--space-2)]">
                  {archive.slice(0, 3).map((report) => (
                    <li key={report.id}>
                      <AppLink
                        href={report.href}
                        className="text-sm text-[hsl(var(--ivy-foreground-muted))] hover:text-[hsl(var(--ivy-foreground))] transition-colors"
                      >
                        {report.title}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Cover image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--ivy-background-muted))] shadow-lg">
              <AppImage
                src={latest.coverImage.src}
                alt={latest.coverImage.alt}
                width={latest.coverImage.width}
                height={latest.coverImage.height}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportsModule;
