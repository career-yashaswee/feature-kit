import type { ComponentType } from "react";

export interface DomainConfig {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  color: {
    light: string;
    dark: string;
  };
}

export interface DomainBadgeProps {
  domains: string[];
  domainConfigs: DomainConfig[];
  className?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  tooltipLayout?: "grid" | "list";
}

