"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, Info, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "default" | "destructive" | "warning" | "info";

interface ConsequenceConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  isLoading?: boolean;
  className?: string;
}

const variantConfig: Record<
  Variant,
  { icon: typeof AlertTriangle; confirmVariant: "default" | "destructive" }
> = {
  default: {
    icon: HelpCircle,
    confirmVariant: "default",
  },
  destructive: {
    icon: AlertTriangle,
    confirmVariant: "destructive",
  },
  warning: {
    icon: AlertTriangle,
    confirmVariant: "default",
  },
  info: {
    icon: Info,
    confirmVariant: "default",
  },
};

export function ConsequenceConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
  className,
}: ConsequenceConfirmationDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error("Confirmation action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [onConfirm, onOpenChange]);

  const Icon = variantConfig[variant].icon;
  const confirmVariant = variantConfig[variant].confirmVariant;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                variant === "destructive" && "bg-destructive/10 text-destructive",
                variant === "warning" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
                variant === "info" && "bg-blue-500/10 text-blue-600 dark:text-blue-500",
                variant === "default" && "bg-primary/10 text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <DialogTitle className="text-left">{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-left">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing || isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isProcessing || isLoading}
          >
            {isProcessing || isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

