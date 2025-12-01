"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AutoSaveFormProps<T extends Record<string, unknown>> {
  children: ReactNode;
  onSave: (data: T) => Promise<void> | void;
  data: T;
  debounceMs?: number;
  storageKey?: string;
  onSaveStart?: () => void;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
  showIndicator?: boolean;
  indicatorPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  successMessage?: string;
  errorMessage?: string;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

function getIndicatorClasses(position: AutoSaveFormProps<never>["indicatorPosition"]): string {
  const base = "absolute z-10 flex items-center gap-1.5 rounded-md bg-background/95 backdrop-blur-sm border px-2 py-1 text-xs font-medium shadow-sm";
  
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
  showIndicator = true,
  indicatorPosition = "top-right",
  successMessage = "Changes saved",
  errorMessage = "Failed to save changes",
}: AutoSaveFormProps<T>) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const debouncedData = useDebounce(data, debounceMs);
  const previousDataRef = useRef<T>(data);
  const isInitialMount = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousDataRef.current = debouncedData;
      
      if (storageKey && typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            const parsed = JSON.parse(saved) as Partial<T>;
            Object.assign(data, parsed);
          }
        } catch {
          // Ignore localStorage errors
        }
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

      if (storageKey && typeof window !== "undefined") {
        try {
          localStorage.setItem(storageKey, JSON.stringify(debouncedData));
        } catch {
          // Ignore localStorage errors
        }
      }

      try {
        await Promise.resolve(onSave(debouncedData));
        
        if (abortControllerRef.current?.signal.aborted) return;
        
        setStatus("saved");
        onSaveSuccess?.();
        toast.success(successMessage);
        
        setTimeout(() => {
          if (status === "saved") {
            setStatus("idle");
          }
        }, 2000);
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) return;
        
        setStatus("error");
        const err = error instanceof Error ? error : new Error(errorMessage);
        onSaveError?.(err);
        toast.error(errorMessage);
        
        setTimeout(() => {
          if (status === "error") {
            setStatus("idle");
          }
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
    status,
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
                <span className="text-green-600 dark:text-green-400">Saved</span>
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
