'use client';

/**
 * Admin Layout with Sidebar Navigation
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth, seedDemoData } from '@/cms';
import { 
  FileText, 
  Users, 
  LayoutGrid, 
  FileBarChart, 
  LogOut,
  Home,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/components/layout';

const navItems = [
  { to: '/admin', icon: Home, label: 'Dashboard', end: true },
  { to: '/admin/posts', icon: FileText, label: 'Posts' },
  { to: '/admin/authors', icon: Users, label: 'Authors' },
  { to: '/admin/modules', icon: LayoutGrid, label: 'Homepage Modules' },
  { to: '/admin/reports', icon: FileBarChart, label: 'Reports' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, logout } = useAdminAuth();
  const router = useRouter();

  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[hsl(var(--ivy-foreground-muted))]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--ivy-background))]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[hsl(var(--ivy-border))] bg-[hsl(var(--ivy-background))]">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-[hsl(var(--ivy-border))] px-6">
            <span className="font-[var(--font-headline)] text-xl font-bold tracking-tight">
              IVY Admin
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                href={item.to}
                exact={item.end}
                icon={item.icon}
                iconClassName="shrink-0"
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                  'text-[hsl(var(--ivy-foreground-muted))] hover:bg-[hsl(var(--ivy-background-muted))] hover:text-[hsl(var(--ivy-foreground))]'
                )}
                activeClassName="bg-[hsl(var(--ivy-accent)/0.1)] text-[hsl(var(--ivy-accent))]"
              >
                {item.label}
              </NavItem>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-[hsl(var(--ivy-border))] p-4 space-y-2">
            <NavItem
              href="/"
              icon={Settings}
              iconClassName="shrink-0"
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                'text-[hsl(var(--ivy-foreground-muted))] hover:bg-[hsl(var(--ivy-background-muted))] hover:text-[hsl(var(--ivy-foreground))]'
              )}
              activeClassName="font-semibold"
              exact
            >
              View Site
            </NavItem>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
