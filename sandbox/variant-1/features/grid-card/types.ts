import type { ReactNode } from "react";

export interface GridCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: "default" | "elevated" | "outlined";
  size?: "sm" | "md" | "lg";
  isPinned?: boolean;
  menuItems?: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: ReactNode;
  }>;
  onTogglePin?: () => void;
  menuAlwaysVisible?: boolean;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  showBlurOverlay?: boolean;
  onNavigate?: (href: string) => void;
}

export interface GridCardHeaderProps {
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export interface GridCardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface GridCardDescriptionProps {
  children: ReactNode;
  className?: string;
  maxLines?: number;
}

export interface GridCardContentProps {
  children: ReactNode;
  className?: string;
}

export interface GridCardFooterProps {
  children: ReactNode;
  className?: string;
}

