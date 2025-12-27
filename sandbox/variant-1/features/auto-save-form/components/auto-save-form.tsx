"use client";

import { useAutoSaveForm } from "../hooks/use-auto-save-form";
import type { AutoSaveFormProps } from "../types";

export function AutoSaveForm<T extends Record<string, unknown>>({
  children,
  onSave,
  data,
  debounceMs = 1000,
  storageKey,
  onSaveStart,
  onSaveSuccess,
  onSaveError,
  onLoadFromStorage,
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: AutoSaveFormProps<T>) {
  useAutoSaveForm({
    data,
    onSave,
    debounceMs,
    storageKey,
    onSaveStart,
    onSaveSuccess,
    onSaveError,
    onLoadFromStorage,
    successMessage,
    errorMessage,
  });

  return <>{children}</>;
}
