import { useMemo } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import slugify from "slugify";
import type { Root, Heading, PhrasingContent, Text, InlineCode } from "mdast";

export type TocItem = {
  content: string;
  slug: string;
  lvl: number;
  i: number;
  seen: number;
};

export function useTableOfContents(markdown: string): TocItem[] {
  return useMemo(() => {
    if (!markdown) return [];

    try {
      const processor = unified().use(remarkParse);
      const tree = processor.parse(markdown) as Root;
      const headings: TocItem[] = [];
      const seenCounts: Record<string, number> = {};

      // Walk the AST to find headings
      const walk = (node: Root | Heading | PhrasingContent) => {
        if (node.type === "heading") {
          const heading = node as Heading;
          const level = heading.depth;

          // Extract text content from heading
          const content = heading.children
            .map((child: PhrasingContent) => {
              if (child.type === "text") {
                return (child as Text).value || "";
              }
              if (child.type === "inlineCode") {
                return (child as InlineCode).value || "";
              }
              return "";
            })
            .join("")
            .trim();

          if (content) {
            const baseSlug = slugify(content, {
              lower: true,
              strict: true,
              trim: true,
            });

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
        }

        if ("children" in node && Array.isArray(node.children)) {
          node.children.forEach((child) =>
            walk(child as Root | Heading | PhrasingContent),
          );
        }
      };

      walk(tree);

      return headings;
    } catch (error) {
      console.error("Error generating table of contents:", error);
      return [];
    }
  }, [markdown]);
}
