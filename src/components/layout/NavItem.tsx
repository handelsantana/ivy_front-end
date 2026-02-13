'use client';

import { usePathname } from 'next/navigation';
import { AppLink } from '@/platform/AppLink';
import { cn } from '@/lib/utils';

/**
 * NavItem - Migration-ready navigation component
 * 
 * Uses AppLink for navigation and usePathname() to compute active state.
 */

export interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  /** Match exact path (true) or prefix match (false) */
  exact?: boolean;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Additional classes for icon */
  iconClassName?: string;
}

export function NavItem({
  href,
  children,
  className,
  activeClassName = 'font-semibold',
  exact = false,
  icon: Icon,
  iconClassName,
}: NavItemProps) {
  const pathname = usePathname();
  
  // Active detection: exact match or prefix match
  const isActive = exact 
    ? pathname === href 
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <AppLink
      href={href}
      className={cn(
        // Base styles
        'transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]',
        className,
        // Active state
        isActive && activeClassName
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon className={cn('h-4 w-4', iconClassName)} />}
      {children}
    </AppLink>
  );
}

export default NavItem;
