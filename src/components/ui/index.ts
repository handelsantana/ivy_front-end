/**
 * IVY EDITION UI Primitives
 * 
 * Design system components built on CSS tokens and locked type scale.
 */

// Layout primitives
export { Container } from './Container';
export type { ContainerProps } from './Container';

export { Grid, GridItem } from './Grid';
export type { GridProps, GridItemProps } from './Grid';

export { Section } from './Section';
export type { SectionProps } from './Section';

// Typography
export { Typography } from './Typography';
export type { TypographyProps, TypographyVariant } from './Typography';

// Components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants } from './card';
export type { CardProps } from './card';

export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

export { Divider } from './Divider';
export type { DividerProps } from './Divider';

// Re-export Button for convenience
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';
