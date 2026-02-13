'use client';

import { Header } from './Header';
import { Footer } from './Footer';
import { SkipLink } from './SkipLink';
import { useGlobalLoading } from '@/lib/globalLoading';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

/**
 * GlobalLayout - Layout wrapper
 * 
 * Renders SkipLink, Header, main content area, and Footer.
 */
export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const isLoading = useGlobalLoading();

  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <div className="relative flex-1">
        <main
          id="main-content"
          tabIndex={-1}
          className="outline-none flex-1"
          aria-busy={isLoading}
        >
          {children}
        </main>
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-[hsl(var(--ivy-background))]">
            <PageSkeleton />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GlobalLayout;
