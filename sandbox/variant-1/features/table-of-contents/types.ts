import type { TocItem } from "./hooks/use-table-of-contents";

export type { TocItem };

export interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}
