import type { ReactNode } from "react";

export interface AutoSaveFormProps<T> {
  children: ReactNode;
  /** The data to auto-save */
  data: T;
  /** Callback function to save the data */
  onSave: (data: T) => Promise<void> | void;
  /** Debounce interval in milliseconds (default: 2000) */
  interval?: number;
  /** localStorage key for persistence (optional) */
  storageKey?: string;
  /** Callback when data is loaded from storage */
  onLoad?: (data: T) => void;
  /** Whether to save on unmount (default: true) */
  saveOnUnmount?: boolean;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
}
