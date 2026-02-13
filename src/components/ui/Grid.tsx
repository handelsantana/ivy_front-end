import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Grid - CSS Grid layout component
 * 
 * 12 columns on desktop, 4 columns on mobile.
 * Uses gap tokens from the design system.
 * 
 * @example
 * <Grid cols={3} gap="md">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 *   <div>Column 3</div>
 * </Grid>
 */

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns (defaults to responsive 4/12) */
  cols?: number | 'auto';
  /** Gap size using spacing tokens */
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /** Children elements */
  children: React.ReactNode;
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-[var(--space-3)] md:gap-[var(--space-4)]',
  md: 'gap-[var(--space-4)] md:gap-[var(--space-5)]',
  lg: 'gap-[var(--space-5)] md:gap-[var(--space-6)]',
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols, gap = 'md', className, children, ...props }, ref) => {
    // Build grid columns class
    const getColsClass = () => {
      if (cols === 'auto') {
        return 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]';
      }
      if (typeof cols === 'number') {
        // Fixed number of columns with mobile fallback
        return `grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(cols, 12)}`;
      }
      // Default: responsive 4 mobile / 12 desktop (using common breakpoints)
      return 'grid-cols-4 md:grid-cols-12';
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          getColsClass(),
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

/**
 * GridItem - Child component for spanning columns
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns to span */
  span?: number;
  /** Span on mobile */
  spanMobile?: number;
  /** Children elements */
  children: React.ReactNode;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ span = 1, spanMobile, className, children, ...props }, ref) => {
    const mobileSpan = spanMobile ?? Math.min(span, 4);
    
    return (
      <div
        ref={ref}
        className={cn(
          `col-span-${mobileSpan}`,
          `md:col-span-${span}`,
          className
        )}
        style={{
          // CSS custom properties as fallback for dynamic values
          '--span': span,
          '--span-mobile': mobileSpan,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

export default Grid;
