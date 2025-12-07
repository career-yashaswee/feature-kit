"use client";

import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TextTruncationProps } from "../types";
import { useTextTruncation } from "../hooks/use-text-truncation";

export function TextTruncation({
  text,
  maxLines,
  maxLength,
  expandLabel = "Show more",
  collapseLabel = "Show less",
  className,
  showToggle = true,
}: TextTruncationProps) {
  const {
    isExpanded,
    needsTruncation,
    displayText,
    textRef,
    toggleExpanded,
  } = useTextTruncation({ text, maxLines, maxLength });

  return (
    <div className={cn("space-y-2", className)}>
      <div
        ref={textRef}
        className={cn(
          "text-sm text-foreground",
          !isExpanded && maxLines && "line-clamp-" + maxLines,
        )}
        style={
          !isExpanded && maxLines
            ? {
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {displayText}
      </div>
      {needsTruncation && showToggle && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          className="h-auto p-0 text-xs text-primary hover:text-primary/80"
        >
          {isExpanded ? (
            <>
              {collapseLabel}
              <CaretUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              {expandLabel}
              <CaretDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
