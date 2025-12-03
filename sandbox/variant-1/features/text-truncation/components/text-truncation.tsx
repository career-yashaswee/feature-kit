"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToggle } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TextTruncationProps {
  text: string;
  maxLines?: number;
  maxLength?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
  showToggle?: boolean;
}

export function TextTruncation({
  text,
  maxLines,
  maxLength,
  expandLabel = "Show more",
  collapseLabel = "Show less",
  className,
  showToggle = true,
}: TextTruncationProps) {
  const [isExpanded, toggleExpanded] = useToggle(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      if (maxLines) {
        const lineHeight = parseInt(
          window.getComputedStyle(element).lineHeight || "20",
          10,
        );
        const maxHeight = lineHeight * maxLines;
        setNeedsTruncation(element.scrollHeight > maxHeight);
      } else if (maxLength) {
        setNeedsTruncation(text.length > maxLength);
      }
    }
  }, [text, maxLines, maxLength]);

  const displayText =
    isExpanded || !needsTruncation
      ? text
      : maxLength
        ? `${text.slice(0, maxLength)}...`
        : text;

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
          onClick={() => toggleExpanded()}
          className="h-auto p-0 text-xs text-primary hover:text-primary/80"
        >
          {isExpanded ? (
            <>
              {collapseLabel}
              <ChevronUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              {expandLabel}
              <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
