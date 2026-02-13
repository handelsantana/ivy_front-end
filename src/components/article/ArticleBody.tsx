/**
 * Article Body - Markdown content renderer with heading IDs
 */

import { useMemo } from 'react';
import type { HeadingNode } from '@/cms';
import { slugify } from '@/cms/utils';

interface ArticleBodyProps {
  content: string;
  headings: HeadingNode[];
}

export function ArticleBody({ content, headings }: ArticleBodyProps) {
  // Simple markdown to HTML conversion with heading IDs
  const htmlContent = useMemo(() => {
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const blocks: string[] = [];

    const applyInlineFormatting = (text: string) => {
      let formatted = text;
      formatted = formatted.replace(/\[([^\]]+?)\]\((.+?)\)/g, '<a href="$2" class="underline hover:opacity-70">$1</a>');
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
      formatted = formatted.replace(/\*(?!\*)(.+?)\*/g, '<em>$1</em>');
      formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-[hsl(var(--ivy-background-muted))] px-1 py-0.5 text-sm">$1</code>');
      return formatted;
    };

    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const isBlockStart = (line: string) =>
      /^#{1,6}\s+/.test(line) ||
      /^[-*]\s+/.test(line) ||
      /^\d+\.\s+/.test(line) ||
      /^>\s+/.test(line) ||
      /^```/.test(line) ||
      /^---$/.test(line.trim());

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) {
        i += 1;
        continue;
      }

      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i += 1;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i += 1;
        }
        if (i < lines.length) i += 1;
        blocks.push(
          `<pre class="bg-[hsl(var(--ivy-background-muted))] p-4 overflow-x-auto"><code>${escapeHtml(
            codeLines.join('\n')
          )}</code></pre>`
        );
        continue;
      }

      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = slugify(text);
        blocks.push(
          `<h${level} id="${id}" class="scroll-mt-24">${applyInlineFormatting(text)}</h${level}>`
        );
        i += 1;
        continue;
      }

      if (/^---$/.test(line.trim())) {
        blocks.push('<hr class="my-8 border-[hsl(var(--ivy-border))]" />');
        i += 1;
        continue;
      }

      if (/^>\s+/.test(line)) {
        const quoteLines: string[] = [];
        while (i < lines.length && /^>\s+/.test(lines[i])) {
          quoteLines.push(lines[i].replace(/^>\s+/, '').trim());
          i += 1;
        }
        blocks.push(
          `<blockquote class="border-l-4 border-[hsl(var(--ivy-foreground))] pl-4 italic">${applyInlineFormatting(
            quoteLines.join(' ')
          )}</blockquote>`
        );
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
          items.push(`<li>${applyInlineFormatting(lines[i].replace(/^[-*]\s+/, '').trim())}</li>`);
          i += 1;
        }
        blocks.push(`<ul class="list-disc pl-6 space-y-2">${items.join('')}</ul>`);
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
          items.push(`<li>${applyInlineFormatting(lines[i].replace(/^\d+\.\s+/, '').trim())}</li>`);
          i += 1;
        }
        blocks.push(`<ol class="list-decimal pl-6 space-y-2">${items.join('')}</ol>`);
        continue;
      }

      const paragraphLines: string[] = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
        paragraphLines.push(lines[i].trim());
        i += 1;
      }
      if (paragraphLines.length > 0) {
        blocks.push(`<p>${applyInlineFormatting(paragraphLines.join(' '))}</p>`);
      }
    }

    return blocks.join('\n');
  }, [content]);

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-[var(--font-headline)] prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5
        prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
        prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3
        prose-p:text-[hsl(var(--ivy-foreground))] prose-p:leading-relaxed prose-p:mb-8 prose-p:max-w-none
        prose-a:text-[hsl(var(--ivy-foreground))] prose-a:underline prose-a:underline-offset-2
        prose-strong:font-semibold
        prose-ul:my-8 prose-ol:my-8 prose-li:my-2 prose-li:max-w-none
        prose-blockquote:font-[var(--font-headline)] prose-blockquote:not-italic prose-blockquote:text-xl
        prose-pre:bg-[hsl(var(--ivy-background-muted))]
        prose-code:text-[hsl(var(--ivy-foreground))]
      "
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
