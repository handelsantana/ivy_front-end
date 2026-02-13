import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card - Neutral container primitive
 * 
 * A composable container with no editorial fields baked in.
 * Use with children for complete flexibility.
 * 
 * @example
 * <Card padding="md" hover>
 *   <Typography variant="h3">Title</Typography>
 *   <Typography variant="body">Content</Typography>
 * </Card>
 */

const cardVariants = cva(
  // Base styles
  "block w-full transition-all duration-200",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-[var(--space-3)]",
        md: "p-[var(--space-4)] md:p-[var(--space-5)]",
        lg: "p-[var(--space-5)] md:p-[var(--space-6)]",
      },
      border: {
        none: "",
        default: "border border-[hsl(var(--ivy-border))]",
        strong: "border border-[hsl(var(--ivy-border-strong))]",
      },
      radius: {
        none: "",
        sm: "rounded-[var(--radius-sm)]",
        md: "rounded-[var(--radius-md)]",
        lg: "rounded-[var(--radius-lg)]",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
      },
      hover: {
        true: "hover:border-[hsl(var(--ivy-border-strong))] hover:shadow-md cursor-pointer",
        false: "",
      },
      background: {
        default: "bg-[hsl(var(--ivy-background))]",
        muted: "bg-[hsl(var(--ivy-background-muted))]",
        none: "",
      },
    },
    defaultVariants: {
      padding: "md",
      border: "default",
      radius: "md",
      shadow: "none",
      hover: false,
      background: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Render as a different element */
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, border, radius, shadow, hover, background, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardVariants({ padding, border, radius, shadow, hover, background }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Preserve existing Card sub-components for backwards compatibility
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-[var(--space-2)]", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("ivy-h4 text-[hsl(var(--ivy-foreground))]", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("ivy-body-sm text-[hsl(var(--ivy-foreground-muted))]", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center pt-[var(--space-4)]", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
