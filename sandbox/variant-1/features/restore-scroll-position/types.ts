import type { ReactNode } from "react";

export interface RestoreScrollPositionProps {
  children: ReactNode;
  storageKey: string;
  persist?: boolean;
  container?: HTMLElement | null;
  enabled?: boolean;
  debounceMs?: number;
}
