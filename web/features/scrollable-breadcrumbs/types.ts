import type { ReactNode, ComponentType } from "react";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface ScrollableBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  renderLink?: (item: BreadcrumbItem, children: ReactNode) => ReactNode;
  separator?: ReactNode;
  autoScroll?: boolean;
  onSidebarChange?: () => void;
}

