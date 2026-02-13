import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      <div className="max-w-[var(--content-width-wide)] mx-auto px-[var(--space-4)] md:px-[var(--space-6)] py-[var(--space-6)] space-y-[var(--space-7)]">
        <Skeleton className="h-[220px] md:h-[320px] w-full rounded-lg" />

        <div className="max-w-[var(--content-width-max)] space-y-[var(--space-4)]">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
            <Skeleton className="h-4 w-9/12" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-[var(--space-5)]">
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;
