"use client";

import { useState, useCallback } from "react";
import {
  Warning,
  Info,
  Question,
  Crown,
  Trash,
  X,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatefulButton } from "@/features/stateful-button";
import { cn } from "@/lib/utils";
import type {
  ConsequenceConfirmationDialogProps,
  ConsequenceVariant,
} from "../types";

const variantConfig: Record<
  ConsequenceVariant,
  { icon: typeof Warning; confirmVariant: "default" | "destructive" }
> = {
  default: {
    icon: Question,
    confirmVariant: "default",
  },
  destructive: {
    icon: Warning,
    confirmVariant: "destructive",
  },
  warning: {
    icon: Warning,
    confirmVariant: "default",
  },
  info: {
    icon: Info,
    confirmVariant: "default",
  },
  consequence: {
    icon: Warning,
    confirmVariant: "destructive",
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
  subtitle,
  items = [],
  details,
  confirmationText = "DELETE",
  confirmationPlaceholder = "DELETE",
}: ConsequenceConfirmationDialogProps) {
  const [confirmationInput, setConfirmationInput] = useState("");
  const isConsequenceVariant = variant === "consequence";
  const isConfirmed = confirmationInput === confirmationText;

  const handleConfirm = useCallback(async () => {
    if (isConsequenceVariant && !isConfirmed) return;
    await onConfirm();
    onOpenChange(false);
    setConfirmationInput("");
  }, [onConfirm, onOpenChange, isConsequenceVariant, isConfirmed]);

  const Icon = variantConfig[variant].icon;
  const confirmVariant = variantConfig[variant].confirmVariant;

  if (isConsequenceVariant) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "sm:max-w-md bg-[#1a1a1a] border-red-500/20",
            className,
          )}
        >
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                <div className="flex h-6 w-6 items-center justify-center rotate-45 bg-red-500 rounded-sm">
                  <Icon className="h-4 w-4 text-white -rotate-45" />
                </div>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-left text-white font-bold text-lg">
                  {title}
                </DialogTitle>
                {subtitle && (
                  <DialogDescription className="pt-1 text-left text-white/70 text-sm">
                    {subtitle}
                  </DialogDescription>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {items.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-bold text-sm">
                  This will permanently delete:
                </h3>
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <ItemIcon className="h-4 w-4 text-yellow-400" />
                          <span className="text-white text-sm">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {details && (
              <p className="text-white/70 text-sm leading-relaxed">{details}</p>
            )}

            <div className="space-y-2">
              <label className="text-white font-bold text-sm block">
                Type {confirmationText} to confirm
              </label>
              <Input
                type="text"
                value={confirmationInput}
                onChange={(e) =>
                  setConfirmationInput(e.target.value.toUpperCase())
                }
                placeholder={confirmationPlaceholder}
                className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-white/40 uppercase"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setConfirmationInput("");
              }}
              className="bg-[#2a2a2a] border-gray-600 text-white hover:bg-[#3a3a3a]"
            >
              <X className="h-4 w-4 mr-2" />
              {cancelLabel}
            </Button>
            <StatefulButton
              onAction={handleConfirm}
              variant="destructive"
              disabled={!isConfirmed}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash className="h-4 w-4 mr-2" />
              {confirmLabel}
            </StatefulButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                variant === "destructive" &&
                  "bg-destructive/10 text-destructive",
                variant === "warning" &&
                  "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
                variant === "info" &&
                  "bg-blue-500/10 text-blue-600 dark:text-blue-500",
                variant === "default" && "bg-primary/10 text-primary",
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <DialogTitle className="text-left">{title}</DialogTitle>
          </div>
          {message && (
            <DialogDescription className="pt-2 text-left">
              {message}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <StatefulButton
            onAction={handleConfirm}
            variant={confirmVariant}
            disabled={isLoading}
          >
            {confirmLabel}
          </StatefulButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
