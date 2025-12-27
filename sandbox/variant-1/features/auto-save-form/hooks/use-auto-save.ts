import { useRef, useEffect, useCallback } from "react";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";

export interface UseAutoSaveOptions<TData> {
  /** The data to auto-save */
  data: TData;
  /** Callback function to save the data */
  onSave: (data: TData) => Promise<void> | void;
  /** Debounce interval in milliseconds (default: 2000) */
  interval?: number;
  /** localStorage key for persistence (optional) */
  storageKey?: string;
  /** Callback when data is loaded from storage */
  onLoad?: (data: TData) => void;
  /** Whether to save on unmount (default: true) */
  saveOnUnmount?: boolean;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
}

export function useAutoSave<TData>({
  data,
  onSave,
  interval = 2000,
  storageKey,
  onLoad,
  saveOnUnmount = true,
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: UseAutoSaveOptions<TData>) {
  const hasChange = useRef(false);
  const latestData = useRef(data);
  const handleSave = useRef(onSave);
  const toastIdRef = useRef<string | number | null>(null);
  const hasLoadedRef = useRef(false);

  const [savedData, setSavedData] = useLocalStorage<TData | null>(
    storageKey || "",
    null
  );

  const [debouncedData] = useDebouncedValue(data, { wait: interval });

  // Load from localStorage on mount
  useEffect(() => {
    if (hasLoadedRef.current) return;

    if (storageKey) {
      // Wait for savedData to be determined (could be null or actual data)
      if (savedData !== undefined) {
        hasLoadedRef.current = true;
        if (savedData !== null) {
          try {
            onLoad?.(savedData);
            latestData.current = savedData;
            hasChange.current = false;
          } catch (error) {
            console.error("Failed to load from localStorage:", error);
            latestData.current = data;
          }
        } else {
          // No saved data, use current data
          latestData.current = data;
        }
      }
    } else {
      // No storage key, just initialize
      hasLoadedRef.current = true;
      latestData.current = data;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, savedData]);

  // Track changes
  useEffect(() => {
    if (hasChange.current) return;

    try {
      if (JSON.stringify(latestData.current) !== JSON.stringify(data)) {
        hasChange.current = true;
      }
    } catch {
      hasChange.current = true;
    }
  }, [data]);

  // Update latest data ref
  useEffect(() => {
    latestData.current = data;
  }, [data]);

  // Update save handler ref
  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  // Commit save function
  const commit = useCallback(
    async (newData: TData) => {
      // Show loading toast
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
      toastIdRef.current = toast.loading("Saving...");

      // Save to localStorage immediately (optimistic)
      if (storageKey) {
        setSavedData(newData);
      }

      try {
        await Promise.resolve(handleSave.current(newData));
        hasChange.current = false;

        // Dismiss loading and show success
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
        }
        toast.success(successMessage);
        toastIdRef.current = null;
      } catch (error) {
        hasChange.current = false;

        // Dismiss loading and show error
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
        }
        toast.error(errorMessage);
        toastIdRef.current = null;
        throw error;
      }
    },
    [storageKey, setSavedData, successMessage, errorMessage]
  );

  // Auto-save on debounced data change
  useEffect(() => {
    if (hasChange.current) {
      commit(debouncedData);
    }
  }, [commit, debouncedData]);

  // Save on unmount
  useEffect(
    () => () => {
      if (saveOnUnmount && hasChange.current) {
        commit(latestData.current);
      }
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    },
    [commit, saveOnUnmount]
  );
}
