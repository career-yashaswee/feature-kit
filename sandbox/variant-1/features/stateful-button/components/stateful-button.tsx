"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  useStatefulButton,
  type UseStatefulButtonOptions,
} from "@/features/stateful-button/hooks/use-stateful-button";

type StatefulButtonProps = UseStatefulButtonOptions & {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  disabled?: boolean;
};

export function StatefulButton({
  children,
  className,
  variant = "default",
  size = "default",
  disabled = false,
  ...options
}: StatefulButtonProps) {
  const { state, handleClick, isLoading, isSuccess, isError } =
    useStatefulButton(options);

  const getButtonVariant = () => {
    if (isSuccess) return "default";
    if (isError) return "destructive";
    return variant;
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      variant={getButtonVariant()}
      size={size}
      className={cn("relative overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </motion.div>
        )}
        {isSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Success!</span>
          </motion.div>
        )}
        {isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            <span>Error</span>
          </motion.div>
        )}
        {state === "default" && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

