import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * AppLink - Platform adapter for navigation links
 * 
 * Wraps next/link for internal navigation.
 * 
 * @example
 * <AppLink href="/about">About</AppLink>
 * <AppLink href="/article/123" prefetch>Read Article</AppLink>
 */

export interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The destination URL */
  href: string;
  /** Children elements */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Prefetch hint (currently ignored, used in Next.js) */
  prefetch?: boolean;
  /** External link (opens in new tab) */
  external?: boolean;
}

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, className, prefetch, external, ...props }, ref) => {
    // Handle external links
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal links use Next.js Link
    return (
      <Link href={href} prefetch={prefetch} className={cn(className)} {...props}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = 'AppLink';

export default AppLink;
