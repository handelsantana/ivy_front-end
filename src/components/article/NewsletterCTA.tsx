/**
 * Newsletter CTA - Subscribe block for articles
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check } from 'lucide-react';

interface NewsletterCTAProps {
  variant?: 'inline' | 'full';
}

export function NewsletterCTA({ variant = 'inline' }: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`${variant === 'full' ? 'py-[var(--space-8)]' : 'py-[var(--space-6)]'} bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]`}>
        <div className="max-w-[var(--content-width-prose)] mx-auto px-[var(--space-4)] text-center">
          <Check className="h-8 w-8 mx-auto mb-[var(--space-3)]" />
          <p className="font-[var(--font-headline)] text-xl font-bold">You're subscribed!</p>
          <p className="text-sm text-[hsl(var(--ivy-background)/0.7)] mt-[var(--space-2)]">
            Check your inbox for a confirmation email.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <section className="py-[var(--space-8)] bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]">
        <div className="max-w-[var(--content-width-prose)] mx-auto px-[var(--space-4)] text-center">
          <Mail className="h-8 w-8 mx-auto mb-[var(--space-4)]" />
          <h2 className="font-[var(--font-headline)] text-2xl md:text-3xl font-bold mb-[var(--space-3)]">
            Stay ahead of the curve
          </h2>
          <p className="text-[hsl(var(--ivy-background)/0.8)] mb-[var(--space-6)] max-w-md mx-auto">
            Get the best of IVY delivered to your inbox. Weekly insights on tech, business, and culture.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-[var(--space-3)] max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-[var(--space-4)] py-[var(--space-3)] bg-[hsl(var(--ivy-background)/0.1)] border border-[hsl(var(--ivy-background)/0.2)] text-[hsl(var(--ivy-background))] placeholder:text-[hsl(var(--ivy-background)/0.5)] focus:outline-none focus:border-[hsl(var(--ivy-background)/0.5)]"
            />
            <Button 
              type="submit"
              className="bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))] hover:bg-[hsl(var(--ivy-background)/0.9)]"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-[hsl(var(--ivy-background)/0.5)] mt-[var(--space-3)]">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    );
  }

  return (
    <aside className="my-[var(--space-6)] p-[var(--space-5)] bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]">
      <div className="flex items-start gap-[var(--space-4)]">
        <Mail className="h-6 w-6 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-[var(--font-headline)] font-bold mb-[var(--space-1)]">
            Get this in your inbox
          </h3>
          <p className="text-sm text-[hsl(var(--ivy-background)/0.7)] mb-[var(--space-3)]">
            Weekly insights, no spam.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-[var(--space-2)]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="flex-1 px-[var(--space-3)] py-[var(--space-2)] text-sm bg-[hsl(var(--ivy-background)/0.1)] border border-[hsl(var(--ivy-background)/0.2)] text-[hsl(var(--ivy-background))] placeholder:text-[hsl(var(--ivy-background)/0.5)] focus:outline-none focus:border-[hsl(var(--ivy-background)/0.5)]"
            />
            <Button 
              type="submit"
              size="sm"
              className="bg-[hsl(var(--ivy-background))] text-[hsl(var(--ivy-foreground))] hover:bg-[hsl(var(--ivy-background)/0.9)]"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
