"use client";

import { useRef, useCallback, useState } from "react";
import { useScrollPosition } from "../hooks/use-scroll-position";
import type { RestoreScrollPositionProps } from "../types";

export function RestoreScrollPosition({
  children,
  storageKey,
  persist = false,
  container,
  enabled = true,
  debounceMs = 100,
}: RestoreScrollPositionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    container || null,
  );

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (!container && node) {
        setContainerElement(node);
      }
    },
    [container],
  );

  useScrollPosition({
    enabled,
    storageKey,
    persist,
    container: container || containerElement,
    debounceMs,
  });

  if (container) {
    return <>{children}</>;
  }

  return (
    <div ref={setContainerRef} className="h-full w-full">
      {children}
    </div>
  );
}
