import type { ReactNode } from "react";
import type { UseStatefulButtonOptions } from "./hooks/use-stateful-button";

export type StatefulButtonProps = UseStatefulButtonOptions & {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  disabled?: boolean;
  doubleTapToConfirm?: boolean;
  doubleTapTimeoutMs?: number;
  doubleTapConfirmMessage?: string;
};
