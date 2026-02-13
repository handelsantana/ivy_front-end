/**
 * What Changed Box - For Briefing format
 */

import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Change {
  item: string;
  direction: 'up' | 'down' | 'neutral';
  detail?: string;
}

interface WhatChangedBoxProps {
  changes: Change[];
  asOf?: string;
}

export function WhatChangedBox({ changes, asOf }: WhatChangedBoxProps) {
  if (changes.length === 0) return null;

  const DirectionIcon = ({ direction }: { direction: string }) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-[hsl(var(--ivy-foreground-muted))]" />;
    }
  };

  return (
    <aside className="my-[var(--space-5)] p-[var(--space-4)] bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
      <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-3)]">
        <Clock className="h-4 w-4 text-amber-700 dark:text-amber-400" />
        <h3 className="font-[var(--font-headline)] text-sm font-semibold text-amber-800 dark:text-amber-300">
          What Changed
        </h3>
        {asOf && (
          <span className="text-xs text-amber-600 dark:text-amber-500">
            as of {asOf}
          </span>
        )}
      </div>
      <ul className="space-y-[var(--space-2)]">
        {changes.map((change, index) => (
          <li key={index} className="flex items-start gap-[var(--space-2)]">
            <DirectionIcon direction={change.direction} />
            <div>
              <span className="font-medium text-[hsl(var(--ivy-foreground))]">
                {change.item}
              </span>
              {change.detail && (
                <span className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
                  {' '}— {change.detail}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
