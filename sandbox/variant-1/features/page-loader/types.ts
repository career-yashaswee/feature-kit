import type { ComponentType } from "react";
import type { QueryKey } from "@tanstack/react-query";

export interface LoadingState {
  title: string;
  messages: string[];
  icon?: ComponentType<{ className?: string }>;
}

export interface PageLoaderProps {
  isVisible: boolean;
  loadingState?: LoadingState;
  className?: string;
  isFullScreen?: boolean;
  hideBranding?: boolean;
  brandName?: string;
  brandIcon?: ComponentType<{ className?: string }>;
  refreshQueryKeys?: QueryKey[];
  refreshDelay?: number;
  onRefresh?: () => void;
}

