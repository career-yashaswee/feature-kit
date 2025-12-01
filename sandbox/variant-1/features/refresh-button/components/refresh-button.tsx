"use client";

import { useCallback, useState } from "react";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { type VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RefreshButtonProps extends VariantProps<typeof buttonVariants> {
  queryKeys: QueryKey[];
  resource?: string;
  label?: string;
  ariaLabel?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  showIcon?: boolean;
}

export function RefreshButton({
  queryKeys,
  resource = "data",
  label,
  ariaLabel,
  onSuccess,
  onError,
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
}: RefreshButtonProps) {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClick = useCallback(() => {
    if (!queryKeys.length || isRefreshing) return;

    setIsRefreshing(true);

    const refreshPromise = Promise.all(
      queryKeys.map((key) =>
        queryClient.invalidateQueries({ queryKey: key }).catch((error) => {
          const err = error instanceof Error ? error : new Error("Refresh failed");
          onError?.(err);
          throw err;
        })
      )
    ).then(() => {
      onSuccess?.();
    });

    toast.promise(refreshPromise, {
      loading: `Refreshing ${resource}`,
      success: `${resource} Refreshed Successfully!`,
      error: `Failed to Refresh ${resource}.`,
    });

    refreshPromise.finally(() => {
      setIsRefreshing(false);
    });
  }, [queryClient, queryKeys, resource, isRefreshing, onSuccess, onError]);

  const displayLabel = label ?? "Refresh";
  const displayAriaLabel = ariaLabel ?? `Refresh ${resource}`;

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={displayAriaLabel}
      onClick={handleClick}
      disabled={isRefreshing}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {showIcon && (
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{
            duration: 1,
            repeat: isRefreshing ? Infinity : 0,
            ease: "linear",
          }}
        >
          <RefreshCw className="h-4 w-4 shrink-0" />
        </motion.div>
      )}
      {displayLabel && (
        <span className="hidden sm:inline">{displayLabel}</span>
      )}
    </Button>
  );
}
