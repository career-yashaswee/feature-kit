"use client";

import { useState, useCallback } from "react";
import { Crown, Star, Trophy } from "lucide-react";

export interface ConsequenceItem {
  icon: typeof Crown;
  label: string;
  value: string;
}

interface ConsequenceConfirmationOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "warning" | "info" | "consequence";
  onConfirm: () => void | Promise<void>;
  // Consequence variant props
  subtitle?: string;
  items?: ConsequenceItem[];
  details?: string;
  confirmationText?: string;
  confirmationPlaceholder?: string;
}

export function useConsequenceConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConsequenceConfirmationOptions | null>(
    null,
  );

  const confirm = useCallback((opts: ConsequenceConfirmationOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (options) {
      await options.onConfirm();
      setIsOpen(false);
      setOptions(null);
    }
  }, [options]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
  }, []);

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
