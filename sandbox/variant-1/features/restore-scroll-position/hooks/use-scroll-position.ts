"use client";

import { useEffect, useRef, useState } from "react";
import {
  useDebounce,
  useLocalStorage,
  useSessionStorage,
} from "@uidotdev/usehooks";
import {
  useWindowScrollPosition,
  useOverflowScrollPosition,
  type UseWindowScrollPositionCallbackOptions,
} from "@n8tb1t/use-scroll-position";

interface UseScrollPositionOptions {
  enabled?: boolean;
  storageKey?: string;
  persist?: boolean;
  container?: HTMLElement | null;
  debounceMs?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const {
    enabled = true,
    storageKey,
    persist = false,
    container,
    debounceMs = 100,
  } = options;

  const scrollContainer =
    container || (typeof window !== "undefined" ? window : null);
  const hasRestoredRef = useRef(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(
    scrollContainer && scrollContainer !== window
      ? (scrollContainer as HTMLElement)
      : null,
  );
  const containerElementRef = useRef<HTMLElement | null>(
    scrollContainer && scrollContainer !== window
      ? (scrollContainer as HTMLElement)
      : null,
  );
  const [savedPositionLocal, setSavedPositionLocal] = useLocalStorage<
    string | null
  >(persist && storageKey ? storageKey : "", null);
  const [savedPositionSession, setSavedPositionSession] = useSessionStorage<
    string | null
  >(!persist && storageKey ? storageKey : "", null);

  const handleScrollPosition = (
    options: UseWindowScrollPositionCallbackOptions,
  ) => {
    if (!enabled || !storageKey) return;
    setScrollY(options.currPos.y);
  };

  const setWindowTargetRef = useWindowScrollPosition(handleScrollPosition, {
    wait: debounceMs,
  });

  const [setRootRef, setOverflowTargetRef] = useOverflowScrollPosition(
    handleScrollPosition,
    {
      wait: debounceMs,
    },
  );

  useEffect(() => {
    if (scrollContainer === window) {
      setWindowTargetRef(null);
    } else if (containerRef.current) {
      setRootRef(containerRef.current);
      setOverflowTargetRef(null);
    }
  }, [scrollContainer, setWindowTargetRef, setRootRef, setOverflowTargetRef]);

  const debouncedScrollY = useDebounce(scrollY, debounceMs);

  useEffect(() => {
    if (scrollContainer && scrollContainer !== window) {
      containerElementRef.current = scrollContainer as HTMLElement;
    }
  }, [scrollContainer]);

  useEffect(() => {
    if (!enabled || !scrollContainer || !storageKey || hasRestoredRef.current)
      return;

    const savedPosition = persist ? savedPositionLocal : savedPositionSession;

    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (!isNaN(position)) {
        if (scrollContainer === window) {
          window.scrollTo(0, position);
        } else {
          const elementToRestore = containerElementRef.current;
          if (elementToRestore) {
            elementToRestore.scrollTop = position;
          }
        }
        hasRestoredRef.current = true;
      }
    }
  }, [
    enabled,
    storageKey,
    persist,
    scrollContainer,
    savedPositionLocal,
    savedPositionSession,
  ]);

  useEffect(() => {
    if (!enabled || !storageKey) return;

    if (persist) {
      setSavedPositionLocal(debouncedScrollY.toString());
    } else {
      setSavedPositionSession(debouncedScrollY.toString());
    }
  }, [
    debouncedScrollY,
    enabled,
    storageKey,
    persist,
    setSavedPositionLocal,
    setSavedPositionSession,
  ]);
}
