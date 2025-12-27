import { useEffect, useRef } from "react";
import { useDebouncedValue } from "@tanstack/react-pacer";
import isEqual from "fast-deep-equal";
import { useLocalStorage, useIsFirstRender } from "@uidotdev/usehooks";
import { toast } from "sonner";
import type { AutoSaveFormProps } from "../types";

export function useAutoSaveForm<T extends Record<string, unknown>>({
  data,
  onSave,
  debounceMs = 1000,
  storageKey,
  onSaveStart,
  onSaveSuccess,
  onSaveError,
  onLoadFromStorage,
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: Pick<
  AutoSaveFormProps<T>,
  | "data"
  | "onSave"
  | "debounceMs"
  | "storageKey"
  | "onSaveStart"
  | "onSaveSuccess"
  | "onSaveError"
  | "onLoadFromStorage"
  | "successMessage"
  | "errorMessage"
>) {
  const [debouncedData] = useDebouncedValue(data, { wait: debounceMs });
  const previousDataRef = useRef<T | null>(null);
  const isFirstRender = useIsFirstRender();
  const abortControllerRef = useRef<AbortController | null>(null);
  const toastIdRef = useRef<string | number | null>(null);
  const hasLoadedFromStorageRef = useRef(false);
  const [savedData, setSavedData] = useLocalStorage<T | null>(
    storageKey || "",
    null,
  );

  // Load from localStorage on mount
  useEffect(() => {
    if (isFirstRender) {
      if (storageKey && savedData) {
        try {
          // Merge saved data with current data (saved data takes precedence)
          const merged = { ...data, ...savedData };
          onLoadFromStorage?.(merged);
          // Set previous data to saved data to prevent immediate save when form updates
          previousDataRef.current = savedData;
          hasLoadedFromStorageRef.current = true;
        } catch (error) {
          console.error("Failed to load from localStorage:", error);
          // If loading fails, set previous data to current data
          if (debouncedData != null) {
            previousDataRef.current = debouncedData;
          }
        }
      } else if (debouncedData != null) {
        // If no saved data, just set previous data to current
        previousDataRef.current = debouncedData;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender, storageKey]);

  // Auto-save logic
  useEffect(() => {
    // Skip on first render
    if (isFirstRender) {
      // If we loaded from storage, previousDataRef is already set
      // Otherwise, set it to current debounced data
      if (!hasLoadedFromStorageRef.current && debouncedData != null) {
        previousDataRef.current = debouncedData;
      }
      return;
    }

    // Skip if no data
    if (previousDataRef.current == null || debouncedData == null) {
      if (debouncedData != null) {
        previousDataRef.current = debouncedData;
      }
      return;
    }

    // Check if data has changed
    const hasChanged = !isEqual(previousDataRef.current, debouncedData);

    if (!hasChanged) return;

    // Update previous data reference
    previousDataRef.current = debouncedData;

    // Cancel previous save if in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    const saveData = async () => {
      // Show loading toast
      toastIdRef.current = toast.loading("Saving...");
      onSaveStart?.();

      // Save to localStorage immediately (optimistic)
      if (storageKey) {
        setSavedData(debouncedData);
      }

      try {
        // Call the save function
        await Promise.resolve(
          onSave(debouncedData, abortControllerRef.current?.signal),
        );

        // Check if aborted
        if (abortControllerRef.current?.signal.aborted) {
          if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
          }
          return;
        }

        // Dismiss loading toast and show success
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
        }
        toast.success(successMessage);
        onSaveSuccess?.();
        toastIdRef.current = null;
      } catch (error) {
        // Check if aborted
        if (abortControllerRef.current?.signal.aborted) {
          if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
          }
          return;
        }

        // Dismiss loading toast and show error
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
        }
        const err = error instanceof Error ? error : new Error(errorMessage);
        toast.error(errorMessage);
        onSaveError?.(err);
        toastIdRef.current = null;
      }
    };

    saveData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedData,
    onSave,
    storageKey,
    onSaveStart,
    onSaveSuccess,
    onSaveError,
    successMessage,
    errorMessage,
    setSavedData,
    isFirstRender,
  ]);
}

