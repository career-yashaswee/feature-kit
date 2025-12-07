import type { ComponentType } from "react";

export type ConsequenceVariant =
  | "default"
  | "destructive"
  | "warning"
  | "info"
  | "consequence";

export interface ConsequenceItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export interface ConsequenceConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConsequenceVariant;
  isLoading?: boolean;
  className?: string;
  subtitle?: string;
  items?: ConsequenceItem[];
  details?: string;
  confirmationText?: string;
  confirmationPlaceholder?: string;
}
