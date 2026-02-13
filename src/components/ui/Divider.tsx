import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Divider - Horizontal rule with consistent styling
 * 
 * Uses border and spacing tokens from the design system.
 * 
 * @example
 * <Divider />
 * <Divider spacing="lg" decorative />
 */

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Vertical margin around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Decorative style (centered short line) */
  decorative?: boolean;
}

const spacingClasses = {
  none: 'my-0',
  sm: 'my-[var(--space-4)]',
  md: 'my-[var(--space-5)]',
  lg: 'my-[var(--space-6)]',
};

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ spacing = 'md', decorative = false, className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          // Base styles
          'border-0 border-t border-[hsl(var(--ivy-border))]',
          // Spacing
          spacingClasses[spacing],
          // Decorative variant
          decorative && 'w-16 mx-auto border-[hsl(var(--ivy-border-strong))]',
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
