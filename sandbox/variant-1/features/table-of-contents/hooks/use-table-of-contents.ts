import { useMemo } from "react";

export type TocItem = {
  content: string;
  slug: string;
  lvl: number;
  i: number;
  seen: number;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function useTableOfContents(markdown: string): TocItem[] {
  return useMemo(() => {
    if (!markdown) return [];

    try {
      const headings: TocItem[] = [];
      const lines = markdown.split("\n");
      const seenCounts: Record<string, number> = {};

      lines.forEach((line, index) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const content = match[2].trim();
          const baseSlug = slugify(content);

          // Handle duplicate slugs
          const count = seenCounts[baseSlug] || 0;
          seenCounts[baseSlug] = count + 1;
          const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

          headings.push({
            content,
            slug,
            lvl: level,
            i: headings.length,
            seen: count,
          });
        }
      });

      return headings;
    } catch (error) {
      console.error("Error generating table of contents:", error);
      return [];
    }
  }, [markdown]);
}
