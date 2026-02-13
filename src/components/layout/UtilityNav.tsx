import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

/**
 * UtilityNav - Secondary navigation links
 * 
 * Smaller text, muted styling. Hidden on mobile.
 */

const utilityLinks = [
  { href: '/about', label: 'About' },
  { href: '/contributors', label: 'Contributors' },
  { href: '/newsletter', label: 'Newsletter' },
];

export function UtilityNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Utility navigation"
      className={cn(
        'hidden md:flex items-center gap-4',
        className
      )}
    >
      {utilityLinks.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          className={cn(
            'text-[length:var(--text-body-sm)]',
            'font-normal',
            'text-[hsl(var(--ivy-foreground-muted))]',
            'hover:text-[hsl(var(--ivy-foreground))]'
          )}
          activeClassName="font-medium text-[hsl(var(--ivy-foreground))]"
        >
          {link.label}
        </NavItem>
      ))}
    </nav>
  );
}

export default UtilityNav;
