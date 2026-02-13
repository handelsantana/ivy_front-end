import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Typography - Polymorphic text component
 * 
 * Maps variants to the locked type scale.
 * Uses Playfair Display for headlines, Inter for body.
 * 
 * @example
 * <Typography variant="h1">Welcome to IVY</Typography>
 * <Typography variant="body" as="span">Inline text</Typography>
 */

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'dek'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography variant from the type scale */
  variant: TypographyVariant;
  /** HTML element to render (defaults based on variant) */
  as?: React.ElementType;
  /** Additional CSS classes */
  className?: string;
  /** Text color variant */
  color?: 'default' | 'muted';
  /** Children elements */
  children: React.ReactNode;
}

// Map variants to CSS classes
const variantClasses: Record<TypographyVariant, string> = {
  display: 'ivy-display',
  h1: 'ivy-h1',
  h2: 'ivy-h2',
  h3: 'ivy-h3',
  h4: 'ivy-h4',
  h5: 'ivy-h5',
  h6: 'ivy-h6',
  dek: 'ivy-dek',
  'body-lg': 'ivy-body-lg',
  body: 'ivy-body',
  'body-sm': 'ivy-body-sm',
  caption: 'ivy-caption',
  overline: 'ivy-overline',
};

// Default HTML elements for each variant
const defaultElements: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  dek: 'p',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
};

const colorClasses = {
  default: 'text-[hsl(var(--ivy-foreground))]',
  muted: 'text-[hsl(var(--ivy-foreground-muted))]',
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    variant, 
    as, 
    color = 'default',
    className, 
    children, 
    ...props 
  }, ref) => {
    const Component = as ?? defaultElements[variant];
    
    // Dek and caption have built-in muted color
    const effectiveColor = (variant === 'dek' || variant === 'caption') 
      ? 'muted' 
      : color;

    return (
      <Component
        ref={ref}
        className={cn(
          variantClasses[variant],
          colorClasses[effectiveColor],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography;
