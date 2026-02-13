'use client';

import { useState } from 'react';
import { AppLink } from '@/platform/AppLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

/**
 * Footer - Premium editorial footer
 * 
 * Contains Newsletter CTA, navigation links, and "As seen in" placeholder.
 */

// Footer navigation links
const footerLinks = {
  explore: [
    { href: '/about', label: 'About' },
    { href: '/contributors', label: 'Contributors' },
    { href: '/newsletter', label: 'Newsletter' },
    { href: '/sitemap.html', label: 'Sitemap' },
  ],
  editorial: [
    { href: '/editorial-standards', label: 'Editorial Standards' },
    { href: '/corrections', label: 'Corrections' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
};

// Placeholder for "As seen in" logos - hidden until populated
const asSeenInLogos: { name: string; logoUrl?: string }[] = [];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to newsletter API
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-[hsl(var(--ivy-background))]',
        'border-t border-[hsl(var(--ivy-border))]',
        'mt-auto'
      )}
    >
      {/* Newsletter CTA Section */}
      <div className="px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-[var(--content-width-wide)] mx-auto">
          <div className="max-w-xl">
            <h2
              className={cn(
                'font-[var(--font-headline)]',
                'text-[length:var(--text-h4)] md:text-[length:var(--text-h3)]',
                'font-semibold',
                'text-[hsl(var(--ivy-foreground))]',
                'mb-3'
              )}
            >
              Stay ahead of the curve
            </h2>
            <p
              className={cn(
                'font-[var(--font-body)]',
                'text-[length:var(--text-body)]',
                'text-[hsl(var(--ivy-foreground-muted))]',
                'mb-6'
              )}
            >
              Join our newsletter for weekly insights on AI, creator economy, and the future of work.
            </p>

            {subscribed ? (
              <p
                className={cn(
                  'text-[length:var(--text-body)]',
                  'text-[hsl(var(--ivy-foreground))]',
                  'font-medium'
                )}
              >
                Thank you for subscribing! Check your inbox to confirm.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    'flex-1 max-w-sm',
                    'bg-[hsl(var(--ivy-background))]',
                    'border-[hsl(var(--ivy-border-strong))]',
                    'text-[hsl(var(--ivy-foreground))]',
                    'placeholder:text-[hsl(var(--ivy-foreground-muted))]',
                    'focus-visible:ring-[hsl(var(--ivy-focus-ring))]'
                  )}
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  className={cn(
                    'px-6',
                    'bg-[hsl(var(--ivy-foreground))]',
                    'text-[hsl(var(--ivy-background))]',
                    'hover:bg-[hsl(var(--ivy-link-hover))]',
                    'focus-visible:ring-[hsl(var(--ivy-focus-ring))]'
                  )}
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Separator className="bg-[hsl(var(--ivy-border))]" />

      {/* Links Section */}
      <div className="px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-[var(--content-width-wide)] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Masthead */}
            <div className="col-span-2 md:col-span-1">
              <AppLink
                href="/"
                className={cn(
                  'inline-flex items-baseline gap-1',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]',
                  'rounded-[var(--radius-sm)]'
                )}
              >
                <span
                  className={cn(
                    'font-[var(--font-headline)]',
                    'text-[length:var(--text-h5)]',
                    'font-bold',
                    'text-[hsl(var(--ivy-foreground))]'
                  )}
                >
                  IVY
                </span>
                <span
                  className={cn(
                    'font-[var(--font-body)]',
                    'text-[length:var(--text-body-sm)]',
                    'text-[hsl(var(--ivy-foreground-muted))]',
                    'mx-0.5'
                  )}
                >
                  /
                </span>
                <span
                  className={cn(
                    'font-[var(--font-body)]',
                    'text-[length:var(--text-body-sm)]',
                    'text-[hsl(var(--ivy-foreground))]'
                  )}
                >
                  Edition
                </span>
              </AppLink>
              <p
                className={cn(
                  'mt-3',
                  'font-[var(--font-body)]',
                  'text-[length:var(--text-body-sm)]',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'max-w-[20ch]'
                )}
              >
                Insights for the next era of work and creativity.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h3
                className={cn(
                  'font-[var(--font-body)]',
                  'text-[length:var(--text-overline)]',
                  'font-semibold',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'uppercase tracking-wider',
                  'mb-4'
                )}
              >
                Explore
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.explore.map((link) => (
                  <li key={link.href}>
                    <AppLink
                      href={link.href}
                      className={cn(
                        'font-[var(--font-body)]',
                        'text-[length:var(--text-body-sm)]',
                        'text-[hsl(var(--ivy-foreground))]',
                        'hover:text-[hsl(var(--ivy-link-hover))]',
                        'transition-colors duration-150',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]'
                      )}
                    >
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editorial Links */}
            <div>
              <h3
                className={cn(
                  'font-[var(--font-body)]',
                  'text-[length:var(--text-overline)]',
                  'font-semibold',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'uppercase tracking-wider',
                  'mb-4'
                )}
              >
                Editorial
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.editorial.map((link) => (
                  <li key={link.href}>
                    <AppLink
                      href={link.href}
                      className={cn(
                        'font-[var(--font-body)]',
                        'text-[length:var(--text-body-sm)]',
                        'text-[hsl(var(--ivy-foreground))]',
                        'hover:text-[hsl(var(--ivy-link-hover))]',
                        'transition-colors duration-150',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]'
                      )}
                    >
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3
                className={cn(
                  'font-[var(--font-body)]',
                  'text-[length:var(--text-overline)]',
                  'font-semibold',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'uppercase tracking-wider',
                  'mb-4'
                )}
              >
                Legal
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <AppLink
                      href={link.href}
                      className={cn(
                        'font-[var(--font-body)]',
                        'text-[length:var(--text-body-sm)]',
                        'text-[hsl(var(--ivy-foreground))]',
                        'hover:text-[hsl(var(--ivy-link-hover))]',
                        'transition-colors duration-150',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ivy-focus-ring))]'
                      )}
                    >
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* As Seen In Section - Hidden until populated */}
      {asSeenInLogos.length > 0 && (
        <>
          <Separator className="bg-[hsl(var(--ivy-border))]" />
          <div className="px-4 md:px-6 py-8">
            <div className="max-w-[var(--content-width-wide)] mx-auto">
              <p
                className={cn(
                  'text-center',
                  'font-[var(--font-body)]',
                  'text-[length:var(--text-overline)]',
                  'font-semibold',
                  'text-[hsl(var(--ivy-foreground-muted))]',
                  'uppercase tracking-wider',
                  'mb-6'
                )}
              >
                As seen in & referenced by
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {asSeenInLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className={cn(
                      'text-[hsl(var(--ivy-foreground-muted))]',
                      'text-[length:var(--text-body-sm)]',
                      'font-medium'
                    )}
                  >
                    {logo.logoUrl ? (
                      <img
                        src={logo.logoUrl}
                        alt={logo.name}
                        className="h-6 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200"
                      />
                    ) : (
                      logo.name
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Copyright */}
      <div
        className={cn(
          'px-4 md:px-6 py-6',
          'border-t border-[hsl(var(--ivy-border))]'
        )}
      >
        <div className="max-w-[var(--content-width-wide)] mx-auto">
          <p
            className={cn(
              'text-center',
              'font-[var(--font-body)]',
              'text-[length:var(--text-caption)]',
              'text-[hsl(var(--ivy-foreground-muted))]'
            )}
          >
            © {currentYear} IVY Edition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
