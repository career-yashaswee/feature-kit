"use client";

import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PageHeaderProps } from "../types";

interface GlassIconProps {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
}

function GlassIcon({ icon, size = "md" }: GlassIconProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <div
      className={cn(
        "relative bg-transparent outline-none perspective-[24em] transform-3d group shrink-0",
        sizeClasses[size]
      )}
    >
      <span
        className="absolute top-0 left-0 w-full h-full bg-primary/20 dark:bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:transform-[translateZ(2em)]"
        style={{
          boxShadow: "0 0 0 0.1em hsla(var(--primary), 0.2) inset",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="hsla(var(--primary), 0.3)"
            strokeWidth="2"
            strokeDasharray="20 6"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={cn(
            "m-auto flex items-center justify-center text-primary dark:text-white relative z-10",
            iconSizeClasses[size]
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      </span>
    </div>
  );
}

function CornerDecoration() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0V12M0 6H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageHeader({
  icon,
  title,
  subtitle,
  actionsSlot,
  className,
  showCornerDecorations = true,
  showDashedBorder = true,
  variant = "default",
  iconSize = "md",
}: PageHeaderProps) {
  const variantClasses = {
    default:
      "bg-background/70 dark:bg-slate-900/60 backdrop-blur-lg backdrop-saturate-150 shadow-sm supports-backdrop-filter:bg-background/60",
    minimal: "bg-background border border-border",
    bordered: "bg-background border-2 border-border shadow-md",
  };

  return (
    <div
      className={cn(
        "w-full text-sidebar-foreground p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative",
        variantClasses[variant],
        className
      )}
    >
      {showDashedBorder && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            fill="none"
            stroke="hsl(var(--sidebar-border))"
            strokeWidth="2"
            strokeDasharray="20 6"
            strokeLinecap="round"
          />
        </svg>
      )}

      {showCornerDecorations && (
        <>
          <div className="absolute -top-2 -left-2 w-4 h-4 flex items-center justify-center text-sidebar-foreground/60 z-10 pointer-events-none">
            <CornerDecoration />
          </div>
          <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-sidebar-foreground/60 z-10 pointer-events-none">
            <CornerDecoration />
          </div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 flex items-center justify-center text-sidebar-foreground/60 z-10 pointer-events-none">
            <CornerDecoration />
          </div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 flex items-center justify-center text-sidebar-foreground/60 z-10 pointer-events-none">
            <CornerDecoration />
          </div>
        </>
      )}

      <div className="flex items-center gap-4 flex-1">
        <GlassIcon icon={icon} size={iconSize} />

        <div className="flex flex-col gap-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {actionsSlot && (
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0 relative z-10">
          {actionsSlot}
        </div>
      )}
    </div>
  );
}

export default memo(PageHeader);

