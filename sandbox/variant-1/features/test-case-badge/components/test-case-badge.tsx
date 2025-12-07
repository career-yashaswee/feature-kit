"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreProgress } from "./score-progress";
import type { TestCaseBadgeProps } from "../types";

export function TestCaseBadge({
  testResults,
  status,
  className,
  showProgress = true,
  size = "md",
  emptyMessage = "No tests",
}: TestCaseBadgeProps): React.ReactElement {
  // Show loading skeleton when status is ANALYSING
  if (status === "ANALYSING") {
    const sizeClasses = {
      sm: {
        container: "px-3 py-2",
        height: "h-8",
        width: "w-32",
      },
      md: {
        container: "px-4 py-2.5",
        height: "h-10",
        width: "w-36",
      },
      lg: {
        container: "px-5 py-3",
        height: "h-12",
        width: "w-40",
      },
    };

    const sizeConfig = sizeClasses[size];

    return (
      <div
        className={cn(
          "inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm animate-pulse",
          sizeConfig.container,
          className
        )}
      >
        <Skeleton className={cn(sizeConfig.height, sizeConfig.width)} />
      </div>
    );
  }

  // Handle missing or empty test results
  if (!testResults || (testResults.passed === 0 && testResults.failed === 0)) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900",
          className
        )}
      >
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {emptyMessage}
        </span>
      </div>
    );
  }

  const total = testResults.passed + testResults.failed;
  const percentage = Math.round((testResults.passed / total) * 100);

  // Size variants
  const sizeClasses = {
    sm: {
      container: "px-3 py-2",
      icon: "size-4",
      text: "text-sm",
      progress: 32,
      progressStroke: 3,
      progressTextSize: "text-[8px]",
      gap: "gap-2",
      separatorHeight: "h-5",
    },
    md: {
      container: "px-4 py-2.5",
      icon: "size-5",
      text: "text-base",
      progress: 36,
      progressStroke: 4,
      progressTextSize: "text-[9px]",
      gap: "gap-2.5",
      separatorHeight: "h-6",
    },
    lg: {
      container: "px-5 py-3",
      icon: "size-6",
      text: "text-lg",
      progress: 42,
      progressStroke: 4,
      progressTextSize: "text-[10px]",
      gap: "gap-3",
      separatorHeight: "h-7",
    },
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm",
        sizeConfig.container,
        sizeConfig.gap,
        className
      )}
    >
      {/* Passed Count */}
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full border",
            "border-green-600 dark:border-green-400",
            size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6",
            "bg-white dark:bg-slate-900"
          )}
        >
          <Check
            className={cn("h-3 w-3", "text-slate-900 dark:text-white")}
            strokeWidth={3}
          />
        </span>
        <span
          className={cn(
            sizeConfig.text,
            "font-semibold text-green-600 dark:text-green-500"
          )}
        >
          {testResults.passed}
        </span>
      </div>

      {/* Separator */}
      <Separator
        orientation="vertical"
        className={sizeConfig.separatorHeight}
      />

      {/* Failed Count */}
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full border",
            "border-red-600 dark:border-red-400",
            size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6",
            "bg-white dark:bg-slate-900"
          )}
        >
          <X
            className={cn("h-3 w-3", "text-slate-900 dark:text-white")}
            strokeWidth={3}
          />
        </span>
        <span
          className={cn(
            sizeConfig.text,
            "font-semibold text-red-600 dark:text-red-500"
          )}
        >
          {testResults.failed}
        </span>
      </div>

      {/* Progress Indicator */}
      {showProgress && (
        <>
          <Separator
            orientation="vertical"
            className={sizeConfig.separatorHeight}
          />
          <ScoreProgress
            value={percentage}
            size={sizeConfig.progress}
            strokeWidth={sizeConfig.progressStroke}
            textSize={sizeConfig.progressTextSize}
          />
        </>
      )}
    </div>
  );
}

