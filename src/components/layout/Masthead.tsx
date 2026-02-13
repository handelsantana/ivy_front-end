import { AppLink } from '@/platform/AppLink';
import { cn } from '@/lib/utils';

/**
 * Masthead - Brand component linking to homepage
 * 
 * "IVY" in Playfair Display (bold) + "/" separator + "Edition" in Inter (regular)
 */
export function Masthead({ className }: { className?: string }) {
  return (
    <AppLink
      href="/"
      className={cn(
        'flex items-baseline gap-1',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]',
        'rounded-[var(--radius-sm)]',
        className
      )}
    >
      <span
        className={cn(
          'font-[var(--font-headline)]',
          'text-[length:var(--text-h4)]',
          'font-bold',
          'leading-none',
          'text-[hsl(var(--ivy-foreground))]'
        )}
      >
        IVY
      </span>
      <span
        className={cn(
          'font-[var(--font-body)]',
          'text-[length:var(--text-body)]',
          'font-normal',
          'text-[hsl(var(--ivy-foreground-muted))]',
          'mx-0.5'
        )}
      >
        /
      </span>
      <span
        className={cn(
          'font-[var(--font-body)]',
          'text-[length:var(--text-body)]',
          'font-normal',
          'text-[hsl(var(--ivy-foreground))]'
        )}
      >
        Edition
      </span>
    </AppLink>
  );
}

export default Masthead;
