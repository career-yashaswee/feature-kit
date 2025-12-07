import type { ReactNode } from "react";

export interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  actionsSlot?: ReactNode;
  className?: string;
  showCornerDecorations?: boolean;
  showDashedBorder?: boolean;
  variant?: "default" | "minimal" | "bordered";
  iconSize?: "sm" | "md" | "lg";
}
