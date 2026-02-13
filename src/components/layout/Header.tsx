import { Masthead } from './Masthead';
import { PrimaryNav } from './PrimaryNav';
import { UtilityNav } from './UtilityNav';
import { SearchCommand } from './SearchCommand';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

/**
 * Header - Main header composition
 * 
 * Sticky positioning with backdrop blur.
 * Desktop: Masthead | PrimaryNav | --- | UtilityNav | Search
 * Mobile: MenuTrigger | --- | Masthead | --- | Search
 */
export function Header() {
  return (
    <header
      className={cn(
        // Positioning
        'sticky top-0 z-40',
        // Size
        'h-14 md:h-16',
        // Background with backdrop blur
        'bg-[hsl(var(--ivy-background))]/95 backdrop-blur-sm',
        // Border
        'border-b border-[hsl(var(--ivy-border))]'
      )}
    >
      <div
        className={cn(
          'h-full',
          'px-4 md:px-6',
          'flex items-center'
        )}
      >
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          <MobileMenu />
          <Masthead />
          <SearchCommand />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <Masthead />
            <PrimaryNav />
          </div>
          <div className="flex items-center gap-4">
            <UtilityNav />
            <div className="w-px h-6 bg-[hsl(var(--ivy-border))]" />
            <SearchCommand />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
