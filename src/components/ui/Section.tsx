import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Section - Semantic section with consistent vertical spacing
 * 
 * Uses spacing tokens from the design system.
 * 
 * @example
 * <Section spacing="lg" background="muted">
 *   <Container>Content here</Container>
 * </Section>
 */

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding size */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background variant */
  background?: 'default' | 'muted';
  /** HTML element to render */
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'main';
  /** Children elements */
  children: React.ReactNode;
}

const spacingClasses = {
  none: '',
  sm: 'py-[var(--space-5)]',
  md: 'py-[var(--space-6)]',
  lg: 'py-[var(--space-7)]',
  xl: 'py-[var(--space-8)]',
};

const backgroundClasses = {
  default: 'bg-[hsl(var(--ivy-background))]',
  muted: 'bg-[hsl(var(--ivy-background-muted))]',
};

export const Section: React.FC<SectionProps> = ({ 
  spacing = 'md', 
  background = 'default', 
  as: Component = 'section',
  className, 
  children, 
  ...props 
}) => {
  return (
    <Component
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Section;
