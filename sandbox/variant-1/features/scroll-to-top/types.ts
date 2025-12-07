import type { ReactNode } from "react";

export interface ScrollToTopButtonProps {
  threshold?: number;
  children?: ReactNode;
  position?: "left" | "center" | "right";
  className?: string;
}
