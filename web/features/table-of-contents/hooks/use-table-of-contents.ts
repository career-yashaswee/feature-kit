import { useMemo } from "react";
import slugify from "slugify";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function useTableOfContents(markdown: string): TocItem[] {
  return useMemo(() => {
    if (!markdown) return [];

    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text, { lower: true, strict: true });

      headings.push({
        id,
        text,
        level,
      });
    }

    return headings.filter((item) => item.level >= 2 && item.level <= 4);
  }, [markdown]);
}

