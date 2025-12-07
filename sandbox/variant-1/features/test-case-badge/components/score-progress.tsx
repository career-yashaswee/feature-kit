"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScoreProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  textSize?: string;
  className?: string;
}

export function ScoreProgress({
  value,
  size = 36,
  strokeWidth = 4,
  textSize = "text-[9px]",
  className,
}: ScoreProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`${value}% complete`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            value >= 80
              ? "text-green-500"
              : value >= 50
                ? "text-yellow-500"
                : "text-red-500"
          )}
        />
      </svg>
      {/* Percentage text */}
      <span
        className={cn(
          "absolute font-semibold",
          textSize,
          value >= 80
            ? "text-green-600 dark:text-green-400"
            : value >= 50
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-red-600 dark:text-red-400"
        )}
      >
        {value}%
      </span>
    </div>
  );
}

