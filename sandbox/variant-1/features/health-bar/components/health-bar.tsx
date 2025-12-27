"use client";

import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { HealthBarProps } from "../types";

export function HealthBar({
  data,
  className,
  showTimer = true,
  showRemaining = true,
  isLoading = false,
}: HealthBarProps) {
  const { current, max, secondsToNext = 0 } = data;
  const percent = Math.min(100, Math.max(0, (current / max) * 100));
  const remaining = max - current;

  const mm = Math.floor(secondsToNext / 60);
  const ss = Math.floor(secondsToNext % 60);

  const barClass =
    percent <= 20
      ? "bg-red-500"
      : percent <= 40
        ? "bg-yellow-400"
        : percent <= 80
          ? "bg-amber-300"
          : "bg-green-500";

  const isFull = percent >= 100;

  return (
    <div
      className={cn(
        "h-10 px-3 rounded-md flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 shadow-[0_1.2px_2.4px_0_rgba(0,0,0,0.05),0_-4px_0_0_rgba(0,0,0,0.12)_inset] dark:shadow-[0_1.2px_2.4px_0_rgba(255,255,255,0.05),0_-4px_0_0_rgba(255,255,255,0.25)_inset]",
        className,
      )}
    >
      <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
      <div className="min-w-[120px]">
        <div className="h-2 w-full rounded bg-muted">
          <div
            className={cn(
              "h-2 rounded transition-[width,background-color] duration-300",
              barClass,
              isFull && "animate-shine shine-strong",
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {showRemaining && remaining > 0 && (
        <span className="text-xs text-muted-foreground leading-none whitespace-nowrap">
          +{remaining}
          {showTimer && secondsToNext > 0 && (
            <>
              {" "}
              • {mm.toString().padStart(2, "0")}:
              {ss.toString().padStart(2, "0")}
            </>
          )}
        </span>
      )}
      {isLoading && (
        <span className="text-xs text-muted-foreground">Loading</span>
      )}
    </div>
  );
}
