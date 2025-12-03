"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useDebounce, useLocalStorage, useIsFirstRender } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AutoSaveFormProps<T extends Record<string, unknown>> {
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

type SaveStatus = "idle" | "saving" | "saved" | "error";

function getIndicatorClasses(
  position: AutoSaveFormProps<never>["indicatorPosition"],
): string {
  const base =
    "absolute z-10 flex items-center gap-1.5 rounded-md bg-background/95 backdrop-blur-sm border px-2 py-1 text-xs font-medium shadow-sm";

  switch (position) {
    case "top-left":
      return `${base} top-2 left-2`;
    case "bottom-left":
      return `${base} bottom-2 left-2`;
    case "bottom-right":
      return `${base} bottom-2 right-2`;
    case "top-right":
    default:
      return `${base} top-2 right-2`;
  }
}

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
  showIndicator = true,
  indicatorPosition = "top-right",
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: AutoSaveFormProps<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const debouncedData = useDebounce(data, debounceMs);
  const previousDataRef = useRef<T | null>(null);
  const isFirstRender = useIsFirstRender();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [savedData, setSavedData] = useLocalStorage<T | null>(
    storageKey || "",
    null,
  );

  useEffect(() => {
    if (isFirstRender) {
      if (debouncedData != null) {
        previousDataRef.current = debouncedData;
      }

      if (storageKey && savedData) {
        try {
          const merged = { ...data, ...savedData };
          onLoadFromStorage?.(merged);
        } catch {
          // Ignore errors
        }
      }
      return;
    }

    if (previousDataRef.current == null || debouncedData == null) {
      if (debouncedData != null) {
        previousDataRef.current = debouncedData;
      }
      return;
    }

    const hasChanged =
      JSON.stringify(previousDataRef.current) !== JSON.stringify(debouncedData);

    if (!hasChanged) return;

    previousDataRef.current = debouncedData;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const saveData = async () => {
      setStatus("saving");
      onSaveStart?.();

      if (storageKey) {
        setSavedData(debouncedData);
      }

      try {
        await Promise.resolve(
          onSave(debouncedData, abortControllerRef.current?.signal),
        );

        if (abortControllerRef.current?.signal.aborted) return;

        setStatus("saved");
        onSaveSuccess?.();
        toast.success(successMessage);

        setTimeout(() => {
          setStatus((prev) => (prev === "saved" ? "idle" : prev));
        }, 2000);
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) return;

        setStatus("error");
        const err = error instanceof Error ? error : new Error(errorMessage);
        onSaveError?.(err);
        toast.error(errorMessage);

        setTimeout(() => {
          setStatus((prev) => (prev === "error" ? "idle" : prev));
        }, 3000);
      }
    };

    saveData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
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
    savedData,
  ]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showIndicator && status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={getIndicatorClasses(indicatorPosition)}
          >
            {status === "saving" && (
              <>
                <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Saving...</span>
              </>
            )}
            {status === "saved" && (
              <>
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">
                  Saved
                </span>
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle className="h-3 w-3 text-destructive" />
                <span className="text-destructive">Error</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
