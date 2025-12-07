"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Wand } from "lucide-react";
import { cn } from "@/lib/utils";
import { RefreshButton } from "@/features/refresh-button/components/refresh-button";
import type { QueryKey } from "@tanstack/react-query";

export interface LoadingState {
  title: string;
  messages: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

export interface PageLoaderProps {
  isVisible: boolean;
  loadingState?: LoadingState;
  className?: string;
  isFullScreen?: boolean;
  hideBranding?: boolean;
  brandName?: string;
  brandIcon?: React.ComponentType<{ className?: string }>;
  refreshQueryKeys?: QueryKey[];
  refreshDelay?: number;
  onRefresh?: () => void;
}

export function PageLoader({
  isVisible,
  loadingState,
  className,
  isFullScreen = false,
  hideBranding = false,
  brandName = "Loading",
  brandIcon: BrandIcon = Wand,
  refreshQueryKeys,
  refreshDelay = 10000,
  onRefresh,
}: PageLoaderProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  const defaultLoadingState: LoadingState = {
    title: "Loading",
    messages: ["Preparing your experience..."],
  };

  const state = loadingState || defaultLoadingState;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      setShowRefreshButton(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && (refreshQueryKeys || onRefresh)) {
      const refreshTimer = setTimeout(() => {
        setShowRefreshButton(true);
      }, refreshDelay);

      return () => clearTimeout(refreshTimer);
    } else {
      setShowRefreshButton(false);
    }
  }, [isVisible, refreshQueryKeys, onRefresh, refreshDelay]);

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={cn(
          "top-0 left-0 right-0 z-[10000] h-1 bg-transparent",
          isFullScreen ? "fixed" : "absolute"
        )}
      >
        <div className="h-full bg-primary animate-progress-smooth" />
      </div>

      <div
        className={cn(
          "inset-0 z-[9999] flex items-center justify-center",
          isFullScreen ? "fixed" : "absolute",
          "transition-all duration-300 ease-in-out",
          isAnimating
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none",
          className
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/80 transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={cn(
            "relative z-10 w-full h-full flex flex-col",
            "transition-all duration-300 ease-in-out",
            isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          {!hideBranding && (
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <BrandIcon className="size-4 text-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium flex items-baseline gap-2">
                  <span className="text-lg font-semibold tracking-tighter text-foreground">
                    {brandName}
                  </span>
                </span>
              </div>
            </div>
          )}

          <div className="absolute top-6 right-6 flex items-center gap-3">
            {state.icon && (
              <div className="bg-primary/10 text-secondary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <state.icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className="grid flex-1 text-right text-sm leading-tight">
              <span className="truncate font-medium">
                <span className="text-lg font-semibold tracking-tighter text-foreground">
                  {state.title}
                </span>
              </span>
            </div>
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <div className="space-y-4 text-center">
              {state.messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-lg text-muted-foreground"
                >
                  {message}
                </motion.div>
              ))}
            </div>

            {showRefreshButton && (
              <motion.div
                className="absolute top-[60%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <p className="text-sm text-muted-foreground text-center">
                  Taking longer than expected?
                </p>
                {refreshQueryKeys ? (
                  <RefreshButton
                    queryKeys={refreshQueryKeys}
                    resource="page"
                  />
                ) : onRefresh ? (
                  <button
                    onClick={onRefresh}
                    className="px-4 py-2 rounded-md border bg-background hover:bg-muted transition-colors"
                  >
                    Refresh
                  </button>
                ) : null}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

