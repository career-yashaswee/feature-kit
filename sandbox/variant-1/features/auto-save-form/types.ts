import type { ReactNode } from "react";

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
  successMessage?: string;
  errorMessage?: string;
}
