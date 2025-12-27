import { useState, useRef, useEffect } from "react";

export interface UseTextTruncationOptions {
  text: string;
  maxLines?: number;
  maxLength?: number;
}

export function useTextTruncation({
  text,
  maxLines,
  maxLength,
}: UseTextTruncationOptions) {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return {
    isExpanded,
    needsTruncation,
    displayText,
    textRef,
    toggleExpanded,
  };
}
