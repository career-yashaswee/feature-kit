import type { ReactNode } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface AutoSaveFormProps<T extends Record<string, unknown>> {
  children: ReactNode;
  onSave: (data: T, signal?: AbortSignal) => Promise<void> | void;
  data: T;
  debounceMs?: number;
  storageKey?: string;
  onSaveStart?: () => void;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
  onLoadFromStorage?: (data: T) => void;
  showIndicator?: boolean;
  indicatorPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  successMessage?: string;
  errorMessage?: string;
}
