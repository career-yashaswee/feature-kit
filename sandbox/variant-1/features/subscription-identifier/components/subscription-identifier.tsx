"use client";

import { Crown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type SubscriptionIdentifierSize = "sm" | "md" | "lg";
export type SubscriptionIdentifierVariant = "outline" | "solid";

export interface SubscriptionIdentifierProps {
  isUserSubscribed: boolean;
  isLoading?: boolean;
  size?: SubscriptionIdentifierSize;
  variant?: SubscriptionIdentifierVariant;
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export function SubscriptionIdentifier({
  isUserSubscribed,
  isLoading = false,
  size = "md",
  variant = "outline",
  className,
  label = "Plus",
  showIcon = true,
}: SubscriptionIdentifierProps) {
  const wrapperClasses = "inline-block isolate";
  const baseClasses =
    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium relative";
  const sizeClasses =
    size === "sm"
      ? "text-[10px]"
      : size === "md"
        ? "text-xs"
        : "text-sm";

  if (isLoading) {
    return (
      <span className={wrapperClasses}>
        <span
          className={cn(
            baseClasses,
            sizeClasses,
            "bg-gradient-to-b from-yellow-50/80 to-yellow-100/60 border border-yellow-200/80 text-yellow-700 animate-pulse",
            className
          )}
          style={{
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
            isolation: "isolate",
            contain: "layout style paint",
          }}
        />
      </span>
    );
  }

  const palette = (() => {
    const isSolid = variant === "solid";
    if (isUserSubscribed) {
      return isSolid
        ? "bg-gradient-to-b from-slate-900/50 to-slate-900/40 !text-slate-300 [&>*]:!text-slate-300"
        : "bg-gradient-to-b from-black to-slate-900 border border-slate-400/60 !text-white dark:from-slate-700 dark:to-slate-600 dark:border-slate-300/50 !text-slate-300 [&>*]:!text-white dark:[&>*]:!text-slate-300";
    }
    return isSolid
      ? "bg-gradient-to-b from-yellow-400 to-yellow-500/90 !text-yellow-900 [&>*]:!text-yellow-900"
      : "bg-gradient-to-b from-yellow-50 to-yellow-100/90 border border-yellow-200/70 !text-yellow-700 [&>*]:!text-yellow-700";
  })();

  const getShadowStyle = () => {
    if (isUserSubscribed) {
      if (variant === "solid") {
        return {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15)",
        };
      } else {
        return {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
        };
      }
    } else {
      if (variant === "solid") {
        return {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.12)",
        };
      } else {
        return {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
        };
      }
    }
  };

  const iconSizeClasses = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const iconColor = isUserSubscribed
    ? variant === "solid"
      ? "!text-slate-300"
      : "!text-white dark:!text-slate-300"
    : "!text-yellow-700";

  const shadowStyle = {
    ...getShadowStyle(),
    isolation: "isolate",
    contain: "layout style paint",
  } as React.CSSProperties;

  return (
    <span className={wrapperClasses}>
      <span
        className={cn(baseClasses, sizeClasses, palette, className)}
        style={shadowStyle}
      >
        {showIcon && (
          <Crown size={iconSizeClasses[size]} className={iconColor} />
        )}
        <span className={iconColor}>{label}</span>
      </span>
    </span>
  );
}

