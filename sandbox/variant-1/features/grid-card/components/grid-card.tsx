"use client";

import React from "react";
import { motion } from "framer-motion";
import { PushPin } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type {
  GridCardProps,
  GridCardHeaderProps,
  GridCardTitleProps,
  GridCardDescriptionProps,
  GridCardContentProps,
  GridCardFooterProps,
} from "../types";

export function GridCard({
  children,
  className,
  onClick,
  href,
  disabled = false,
  variant = "default",
  size = "md",
  isPinned = false,
  headerContent,
  footerContent,
  showBlurOverlay = false,
  onNavigate,
}: GridCardProps) {
  const baseClasses = cn(
    "group relative overflow-hidden rounded-xl border-2 transition-all duration-150",
    "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    "dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900",
    {
      "cursor-pointer": onClick || href,
      "cursor-default": !onClick && !href,
      "opacity-50 cursor-not-allowed": disabled,
      "hover:scale-[1.005] active:scale-[0.995]":
        onClick || (href && !disabled),
    },
  );

  const variantClasses = {
    default:
      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-250 dark:hover:border-gray-650",
    elevated:
      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-gray-250 dark:hover:border-gray-650",
    outlined:
      "bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/30",
  };

  const sizeClasses = {
    sm: "p-0",
    md: "p-0",
    lg: "p-0",
  };

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (href && onNavigate) {
      onNavigate(href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && (onClick || href)) {
      e.preventDefault();
      handleClick();
    }
  };

  const cardContent = (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
        "relative",
        "flex flex-col h-full",
      )}
      whileHover={onClick || href ? { y: -1 } : undefined}
      whileTap={onClick || href ? { y: 0 } : undefined}
      onClick={handleClick}
      role={onClick || href ? "button" : undefined}
      tabIndex={onClick || href ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {showBlurOverlay && (
        <div className="absolute inset-0 z-30 bg-black/3 backdrop-blur-[2px] pointer-events-none rounded-xl" />
      )}

      {isPinned && (
        <Badge className="absolute -top-3 -right-3 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500 text-white border-blue-500 z-10">
          <PushPin size={10} weight="fill" />
        </Badge>
      )}

      {headerContent && (
        <div className="px-6 py-3 relative z-40 shrink-0">
          {headerContent}
        </div>
      )}

      {headerContent && <div className="h-1 bg-border/30 shrink-0" />}

      <div className="flex-1 px-6 py-4 min-h-0 overflow-auto">{children}</div>

      {footerContent && <div className="h-1 bg-border/30 shrink-0" />}

      {footerContent && (
        <div className="px-6 py-3 shrink-0">{footerContent}</div>
      )}
    </motion.div>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className="block h-full"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate(href);
          }
        }}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export function GridCardHeader({
  children,
  className,
  action,
}: GridCardHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-3 mb-3", className)}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function GridCardTitle({
  children,
  className,
  as: Component = "h3",
}: GridCardTitleProps) {
  return (
    <Component
      className={cn(
        "font-semibold text-gray-900 dark:text-gray-100 leading-tight",
        "group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-150",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function GridCardDescription({
  children,
  className,
  maxLines = 3,
}: GridCardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-gray-600 dark:text-gray-400 leading-relaxed",
        className,
      )}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {children}
    </p>
  );
}

export function GridCardContent({ children, className }: GridCardContentProps) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function GridCardFooter({ children, className }: GridCardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-gray-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
