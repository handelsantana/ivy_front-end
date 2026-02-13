import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge - Label component using overline typography
 * 
 * Uses the IVY overline type style with uppercase styling.
 * 
 * @example
 * <Badge>Feature</Badge>
 * <Badge variant="outline">Guide</Badge>
 * <Badge variant="muted">Index</Badge>
 */

const badgeVariants = cva(
  // Base styles using overline typography
  [
    "inline-flex items-center justify-center",
    "font-[var(--font-body)]",
    "text-[var(--text-overline)]",
    "leading-[var(--leading-overline)]",
    "font-semibold",
    "uppercase",
    "tracking-[0.1em]",
    "rounded-[var(--radius-sm)]",
    "px-[var(--space-2)] py-[var(--space-1)]",
    "transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ivy-focus-ring))] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[hsl(var(--ivy-foreground))]",
          "text-[hsl(var(--ivy-background))]",
        ],
        outline: [
          "border border-[hsl(var(--ivy-border-strong))]",
          "text-[hsl(var(--ivy-foreground))]",
          "bg-transparent",
        ],
        muted: [
          "bg-[hsl(var(--ivy-background-muted))]",
          "text-[hsl(var(--ivy-foreground-muted))]",
        ],
        // Preserve original variants for backwards compatibility
        secondary: [
          "bg-[hsl(var(--ivy-background-muted))]",
          "text-[hsl(var(--ivy-foreground))]",
          "hover:bg-[hsl(var(--ivy-background-muted))]",
        ],
        destructive: [
          "border-transparent bg-destructive text-destructive-foreground",
          "hover:bg-destructive/80",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
