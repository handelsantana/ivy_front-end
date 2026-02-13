/**
 * List/Table Block - For Index format
 */

import { AppLink } from '@/platform';
import { ExternalLink } from 'lucide-react';

interface ListItem {
  name: string;
  description?: string;
  link?: string;
  external?: boolean;
  meta?: Record<string, string>;
}

interface ListTableBlockProps {
  title?: string;
  items: ListItem[];
  columns?: string[];
  variant?: 'list' | 'table';
}

export function ListTableBlock({ title, items, columns, variant = 'list' }: ListTableBlockProps) {
  if (items.length === 0) return null;

  if (variant === 'table' && columns && columns.length > 0) {
    return (
      <div className="my-[var(--space-6)] overflow-x-auto">
        {title && (
          <h3 className="font-[var(--font-headline)] font-semibold mb-[var(--space-4)]">
            {title}
          </h3>
        )}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-[hsl(var(--ivy-foreground))]">
              <th className="text-left py-[var(--space-3)] pr-[var(--space-4)] font-semibold text-sm">
                Name
              </th>
              {columns.map((col) => (
                <th key={col} className="text-left py-[var(--space-3)] pr-[var(--space-4)] font-semibold text-sm">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-[hsl(var(--ivy-border))]">
                <td className="py-[var(--space-3)] pr-[var(--space-4)]">
                  {item.link ? (
                    <AppLink
                      href={item.link}
                      className="font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-1"
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.name}
                      {item.external && <ExternalLink className="h-3 w-3" />}
                    </AppLink>
                  ) : (
                    <span className="font-medium">{item.name}</span>
                  )}
                  {item.description && (
                    <p className="text-sm text-[hsl(var(--ivy-foreground-muted))]">{item.description}</p>
                  )}
                </td>
                {columns.map((col) => (
                  <td key={col} className="py-[var(--space-3)] pr-[var(--space-4)] text-sm">
                    {item.meta?.[col] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // List variant
  return (
    <div className="my-[var(--space-6)]">
      {title && (
        <h3 className="font-[var(--font-headline)] font-semibold mb-[var(--space-4)]">
          {title}
        </h3>
      )}
      <ul className="space-y-[var(--space-4)]">
        {items.map((item, index) => (
          <li key={index} className="pb-[var(--space-4)] border-b border-[hsl(var(--ivy-border))] last:border-0">
            {item.link ? (
              <AppLink
                href={item.link}
                className="group"
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="font-medium group-hover:opacity-70 transition-opacity inline-flex items-center gap-1">
                  {item.name}
                  {item.external && <ExternalLink className="h-3 w-3" />}
                </span>
              </AppLink>
            ) : (
              <span className="font-medium">{item.name}</span>
            )}
            {item.description && (
              <p className="text-sm text-[hsl(var(--ivy-foreground-muted))] mt-[var(--space-1)]">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

