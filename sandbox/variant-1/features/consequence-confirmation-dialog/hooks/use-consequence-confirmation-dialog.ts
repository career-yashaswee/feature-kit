"use client";

import { useState, useCallback } from "react";

interface ConsequenceConfirmationOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive" | "warning" | "info";
  onConfirm: () => void | Promise<void>;
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
