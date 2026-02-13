import { cn } from '@/lib/utils';

/**
 * SkipLink - Accessibility skip-to-content link
 * 
 * Visually hidden until focused, allows keyboard users
 * to skip navigation and jump directly to main content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        // Visually hidden by default
        'sr-only',
        // Visible when focused
        'focus:not-sr-only',
        'focus:absolute focus:top-2 focus:left-2 focus:z-50',
        // Styling when visible
        'focus:px-4 focus:py-2',
        'focus:bg-[hsl(var(--ivy-background))]',
        'focus:text-[hsl(var(--ivy-foreground))]',
        'focus:border focus:border-[hsl(var(--ivy-border))]',
        'focus:rounded-[var(--radius-sm)]',
        'focus:outline-2 focus:outline-offset-2 focus:outline-[hsl(var(--ivy-focus-ring))]',
        // Typography
        'font-[var(--font-body)]',
        'text-[length:var(--text-body-sm)]',
        'font-medium'
      )}
    >
      Skip to content
    </a>
  );
}

export default SkipLink;
