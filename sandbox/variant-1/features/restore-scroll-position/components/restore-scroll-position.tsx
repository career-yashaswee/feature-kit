"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useScrollPosition } from "../hooks/use-scroll-position";

interface RestoreScrollPositionProps {
  children: ReactNode;
  storageKey: string;
  persist?: boolean;
  container?: HTMLElement | null;
  enabled?: boolean;
  debounceMs?: number;
}

export function RestoreScrollPosition({
  children,
  storageKey,
  persist = false,
  container,
  enabled = true,
  debounceMs = 100,
}: RestoreScrollPositionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollPosition({
    enabled,
    storageKey,
    persist,
    container: container || containerRef.current,
    debounceMs,
  });

  if (container) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {children}
    </div>
  );
}

