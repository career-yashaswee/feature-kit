"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
}

/**
 * CircularProgress renders a circular progress indicator with an optional centered label.
 */
export default function CircularProgress({
  value,
  size = 40,
  strokeWidth = 6,
  className,
  showLabel = true,
}: CircularProgressProps): React.ReactElement {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={`Progress ${clamped}%`}
      role="img"
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-700"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-blue-600 dark:text-blue-500 transition-[stroke-dasharray] duration-300 ease-out"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-[11px] font-semibold text-slate-900 dark:text-slate-100">
          {clamped}
        </span>
      )}
    </div>
  );
}
