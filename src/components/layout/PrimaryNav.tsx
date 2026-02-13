import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

/**
 * PrimaryNav - Main navigation links
 * 
 * Hidden on mobile (shown in MobileMenu instead)
 */

const primaryLinks = [
  { href: '/artificial-intelligence', label: 'AI' },
  { href: '/creator-economy', label: 'Creator' },
  { href: '/business', label: 'Business' },
  { href: '/living', label: 'Living' },
  { href: '/index', label: 'Index' },
  { href: '/reports', label: 'Reports' },
];

export function PrimaryNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        'hidden md:flex items-center gap-6',
        className
      )}
    >
      {primaryLinks.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          className={cn(
            'text-[length:var(--text-body-sm)]',
            'font-medium',
            'text-[hsl(var(--ivy-foreground))]',
            'hover:text-[hsl(var(--ivy-link-hover))]'
          )}
          activeClassName="font-semibold underline underline-offset-4"
        >
          {link.label}
        </NavItem>
      ))}
    </nav>
  );
}

export default PrimaryNav;
