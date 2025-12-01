"use client";

import { type ReactNode, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { type VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptimisticActionButtonProps extends VariantProps<typeof buttonVariants> {
  action: () => Promise<void>;
  optimisticState: boolean;
  onOptimisticUpdate: () => void;
  onRollback: () => void;
  children: ReactNode;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
}

export function OptimisticActionButton({
  action,
  optimisticState,
  onOptimisticUpdate,
  onRollback,
  children,
  loadingMessage = "Processing...",
  successMessage = "Action completed successfully.",
  errorMessage = "Action failed. Please try again.",
  onSuccess,
  onError,
  variant,
  size,
  className,
  disabled = false,
}: OptimisticActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (isLoading || disabled) return;

    onOptimisticUpdate();
    setIsLoading(true);

    const actionPromise = Promise.resolve(action())
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        onRollback();
        const err = error instanceof Error ? error : new Error("Action failed");
        onError?.(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(actionPromise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  }, [
    isLoading,
    disabled,
    action,
    onOptimisticUpdate,
    onRollback,
    loadingMessage,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  ]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={cn("relative overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
            />
            <span className="hidden sm:inline">Processing...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
