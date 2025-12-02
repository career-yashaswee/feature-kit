"use client";

import { createContext, useContext, ReactNode } from "react";
import type { TocItem } from "@/features/table-of-contents/hooks/use-table-of-contents";

type TableOfContentsContextType = {
  items: TocItem[];
};

const TableOfContentsContext = createContext<TableOfContentsContextType>({
  items: [],
});

export function TableOfContentsProvider({
  items,
  children,
}: {
  items: TocItem[];
  children: ReactNode;
}) {
  return (
    <TableOfContentsContext.Provider value={{ items }}>
      {children}
    </TableOfContentsContext.Provider>
  );
}

export function useTableOfContentsContext() {
  return useContext(TableOfContentsContext);
}

