import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Container - Max-width wrapper with responsive padding
 * 
 * Uses content-width tokens from the design system.
 * 
 * @example
 * <Container size="prose">Content here</Container>
 * <Container size="wide" as="main">Main content</Container>
 */

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Container width variant */
  size?: 'prose' | 'wide' | 'full';
  /** HTML element to render */
  as?: React.ElementType;
  /** Center the container */
  centered?: boolean;
  /** Children elements */
  children: React.ReactNode;
}

const sizeClasses = {
  prose: 'max-w-[62ch]',
  wide: 'max-w-[72ch]',
  full: 'max-w-[1200px]',
};

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ 
    size = 'wide', 
    as: Component = 'div', 
    centered = true,
    className, 
    children, 
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Max width based on size
          sizeClasses[size],
          // Centering
          centered && 'mx-auto',
          // Responsive horizontal padding
          'px-[var(--space-4)] md:px-[var(--space-5)] lg:px-[var(--space-6)]',
          // Full width
          'w-full',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export default Container;
