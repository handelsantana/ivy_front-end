'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

/**
 * SearchCommand - Command palette modal for search
 * 
 * Opens via button click or Cmd/Ctrl + K keyboard shortcut.
 * Contains "Index Magnets" quick links to evergreen content.
 */

// Index Magnets - Quick links to popular evergreen content
const indexMagnets = [
  { href: '/artificial-intelligence', label: 'Applied AI Systems' },
  { href: '/creator-economy', label: 'Creator Ops' },
  { href: '/business', label: 'Growth Systems' },
  { href: '/living', label: 'Living With Tech' },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Global keyboard listener for Cmd/Ctrl + K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Search"
        aria-haspopup="dialog"
        title="Search (⌘K)"
        className={cn(
          'h-10 w-10',
          'text-[hsl(var(--ivy-foreground))]',
          'hover:text-[hsl(var(--ivy-link-hover))]',
          'hover:bg-[hsl(var(--ivy-background-muted))]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]'
        )}
      >
        <Search className="h-5 w-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search IVY Edition..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Index Magnets">
            {indexMagnets.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => handleSelect(item.href)}
                className="cursor-pointer"
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Quick Links">
            <CommandItem
              value="styleguide"
              onSelect={() => handleSelect('/styleguide')}
              className="cursor-pointer"
            >
              Design System Styleguide
            </CommandItem>
            <CommandItem
              value="about"
              onSelect={() => handleSelect('/about')}
              className="cursor-pointer"
            >
              About IVY Edition
            </CommandItem>
            <CommandItem
              value="newsletter"
              onSelect={() => handleSelect('/newsletter')}
              className="cursor-pointer"
            >
              Newsletter
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
