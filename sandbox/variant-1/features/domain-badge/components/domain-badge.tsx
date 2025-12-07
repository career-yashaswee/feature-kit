"use client";

import React from "react";
import { Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DomainBadgeProps } from "../types";

export function DomainBadge({
  domains = [],
  domainConfigs,
  className,
  size = "md",
  showTooltip = true,
  tooltipLayout = "grid",
}: DomainBadgeProps) {
  const sizeClasses = {
    sm: {
      container: "px-2 py-1.5",
      icon: "size-3.5",
      gap: "gap-1.5",
    },
    md: {
      container: "px-3 py-2",
      icon: "size-4",
      gap: "gap-2",
    },
    lg: {
      container: "px-4 py-2.5",
      icon: "size-5",
      gap: "gap-2.5",
    },
  };

  const sizeConfig = sizeClasses[size];

  const badgeContent = (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm",
        sizeConfig.container,
        sizeConfig.gap,
        showTooltip && "cursor-pointer",
        className,
      )}
    >
      {domainConfigs.map((domain) => {
        const IconComponent = domain.icon;
        const isActive = domains.includes(domain.id);

        return (
          <div
            key={domain.id}
            className={cn(
              "flex items-center justify-center transition-all duration-200",
              sizeConfig.icon,
              !isActive && "opacity-30 dark:opacity-20",
            )}
          >
            <IconComponent
              className={cn(
                sizeConfig.icon,
                isActive
                  ? cn(domain.color.light, domain.color.dark)
                  : "text-slate-400 dark:text-slate-600",
              )}
            />
          </div>
        );
      })}
    </div>
  );

  if (!showTooltip) {
    return badgeContent;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-slate-900 dark:bg-slate-800 text-slate-100 dark:text-slate-200 border-slate-700 dark:border-slate-600 p-3"
        >
          {tooltipLayout === "grid" ? (
            <div className="flex flex-col gap-2 min-w-[240px]">
              <div className="grid grid-cols-3 gap-3">
                {domainConfigs.map((domain) => {
                  const isActive = domains.includes(domain.id);
                  return (
                    <div key={domain.id} className="flex items-center gap-1.5">
                      {isActive ? (
                        <Check className="size-3.5 text-green-500 dark:text-green-400 shrink-0" />
                      ) : (
                        <X className="size-3.5 text-red-500 dark:text-red-400 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isActive
                            ? "text-slate-100 dark:text-slate-200"
                            : "text-slate-400 dark:text-slate-500 line-through",
                        )}
                      >
                        {domain.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 min-w-[200px]">
              {domainConfigs.map((domain) => {
                const isActive = domains.includes(domain.id);
                return (
                  <div key={domain.id} className="flex items-center gap-2">
                    {isActive ? (
                      <Check className="size-3.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="size-3.5 text-red-500 dark:text-red-400 flex-shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isActive
                          ? "text-slate-100 dark:text-slate-200"
                          : "text-slate-400 dark:text-slate-500 line-through",
                      )}
                    >
                      {domain.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
