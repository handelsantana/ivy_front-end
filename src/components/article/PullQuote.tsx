/**
 * Pull Quote - Highlighted quote block for features
 */

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  variant?: 'default' | 'editors-take';
}

export function PullQuote({ quote, attribution, variant = 'default' }: PullQuoteProps) {
  if (variant === 'editors-take') {
    return (
      <aside className="my-[var(--space-7)] p-[var(--space-5)] bg-[hsl(var(--ivy-foreground))] text-[hsl(var(--ivy-background))]">
        <p className="text-xs font-semibold uppercase tracking-wider mb-[var(--space-3)] text-[hsl(var(--ivy-background)/0.6)]">
          Editor's Take
        </p>
        <p className="font-[var(--font-headline)] text-lg md:text-xl leading-relaxed">
          {quote}
        </p>
        {attribution && (
          <p className="mt-[var(--space-3)] text-sm text-[hsl(var(--ivy-background)/0.7)]">
            — {attribution}
          </p>
        )}
      </aside>
    );
  }

  return (
    <blockquote className="my-[var(--space-7)] py-[var(--space-5)] px-[var(--space-6)] border-l-4 border-[hsl(var(--ivy-foreground))]">
      <p className="font-[var(--font-headline)] text-xl md:text-2xl lg:text-3xl leading-snug italic">
        "{quote}"
      </p>
      {attribution && (
        <cite className="block mt-[var(--space-3)] text-sm text-[hsl(var(--ivy-foreground-muted))] not-italic">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}
