'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Masthead } from './Masthead';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';

/**
 * MobileMenu - Left-side drawer for mobile navigation
 * 
 * Uses Sheet component (Radix Dialog internally).
 * Auto-closes on navigation.
 */

const primaryLinks = [
  { href: '/artificial-intelligence', label: 'AI' },
  { href: '/creator-economy', label: 'Creator' },
  { href: '/business', label: 'Business' },
  { href: '/living', label: 'Living' },
  { href: '/index', label: 'Index' },
  { href: '/reports', label: 'Reports' },
];

const utilityLinks = [
  { href: '/about', label: 'About' },
  { href: '/contributors', label: 'Contributors' },
  { href: '/newsletter', label: 'Newsletter' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={cn(
            'md:hidden',
            'h-10 w-10',
            'text-[hsl(var(--ivy-foreground))]',
            'hover:text-[hsl(var(--ivy-link-hover))]',
            'hover:bg-[hsl(var(--ivy-background-muted))]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]'
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        id="mobile-menu"
        className={cn(
          'w-[280px]',
          'bg-[hsl(var(--ivy-background))]',
          'border-r-[hsl(var(--ivy-border))]'
        )}
      >
        <SheetHeader className="text-left">
          <SheetTitle asChild>
            <Masthead />
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2" aria-label="Mobile navigation">
          {/* Primary Links */}
          <div className="flex flex-col gap-1">
            {primaryLinks.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-2 px-3 rounded-[var(--radius-sm)]',
                  'text-[length:var(--text-body)]',
                  'font-medium',
                  'text-[hsl(var(--ivy-foreground))]',
                  'hover:bg-[hsl(var(--ivy-background-muted))]',
                  'hover:text-[hsl(var(--ivy-link-hover))]'
                )}
                activeClassName="bg-[hsl(var(--ivy-background-muted))] font-semibold"
              >
                {link.label}
              </NavItem>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-[hsl(var(--ivy-border))]" />

          {/* Utility Links */}
          <div className="flex flex-col gap-1">
            {utilityLinks.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-2 px-3 rounded-[var(--radius-sm)]',
                  'text-[length:var(--text-body-sm)]',
                  'font-normal',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'hover:bg-[hsl(var(--ivy-background-muted))]',
                  'hover:text-[hsl(var(--ivy-foreground))]'
                )}
                activeClassName="text-[hsl(var(--ivy-foreground))] font-medium"
              >
                {link.label}
              </NavItem>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
