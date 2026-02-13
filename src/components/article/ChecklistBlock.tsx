/**
 * Checklist Block - For Guide format
 */

import { useState } from 'react';
import { Check, Square } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed?: boolean;
}

interface ChecklistBlockProps {
  title?: string;
  items: ChecklistItem[];
  interactive?: boolean;
}

export function ChecklistBlock({ title, items, interactive = true }: ChecklistBlockProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    new Set(items.filter(i => i.completed).map(i => i.id))
  );

  const toggleItem = (id: string) => {
    if (!interactive) return;
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedCount = checkedItems.size;
  const totalCount = items.length;

  return (
    <div className="my-[var(--space-6)] p-[var(--space-5)] bg-[hsl(var(--ivy-background-muted))] border border-[hsl(var(--ivy-border))]">
      {title && (
        <div className="flex items-center justify-between mb-[var(--space-4)]">
          <h3 className="font-[var(--font-headline)] font-semibold">
            {title}
          </h3>
          <span className="text-sm text-[hsl(var(--ivy-foreground-muted))]">
            {completedCount}/{totalCount}
          </span>
        </div>
      )}
      
      {/* Progress bar */}
      <div className="h-1 bg-[hsl(var(--ivy-border))] mb-[var(--space-4)]">
        <div 
          className="h-full bg-[hsl(var(--ivy-foreground))] transition-all duration-300"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>

      <ul className="space-y-[var(--space-3)]">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => toggleItem(item.id)}
                disabled={!interactive}
                className={`flex items-start gap-[var(--space-3)] w-full text-left ${
                  interactive ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                }`}
              >
                <span className={`flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center border ${
                  isChecked 
                    ? 'bg-[hsl(var(--ivy-foreground))] border-[hsl(var(--ivy-foreground))]' 
                    : 'border-[hsl(var(--ivy-foreground-muted))]'
                }`}>
                  {isChecked && <Check className="h-3 w-3 text-[hsl(var(--ivy-background))]" />}
                </span>
                <span className={`${isChecked ? 'line-through text-[hsl(var(--ivy-foreground-muted))]' : ''}`}>
                  {item.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
