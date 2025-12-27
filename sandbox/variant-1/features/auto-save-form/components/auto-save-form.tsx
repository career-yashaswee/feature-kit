"use client";

import { useAutoSave } from "../hooks/use-auto-save";
import type { AutoSaveFormProps } from "../types";

export function AutoSaveForm<T>({
  children,
  data,
  onSave,
  interval = 2000,
  storageKey,
  onLoad,
  saveOnUnmount = true,
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: AutoSaveFormProps<T>) {
  useAutoSave({
    data,
    onSave,
    interval,
    storageKey,
    onLoad,
    saveOnUnmount,
    successMessage,
    errorMessage,
  });

  return <>{children}</>;
}
