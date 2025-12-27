"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowScroll } from "@uidotdev/usehooks";
import { CaretUp } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ScrollToTopButtonProps } from "../types";

export function ScrollToTopButton({
  threshold = 300,
  children,
  position = "right",
  className,
}: ScrollToTopButtonProps) {
  const [{ y }, scrollTo] = useWindowScroll();
  const currentY = typeof y === "number" ? y : 0;
  const previousY = useRef<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useLayoutEffect(() => {
    const scrollingUp = currentY < previousY.current;
    setIsScrollingUp(scrollingUp);
    previousY.current = currentY;
  }, [currentY]);

  const isVisible = currentY > threshold && isScrollingUp;

  const alignmentClass =
    position === "left"
      ? "left-6"
      : position === "center"
        ? "left-1/2 -translate-x-1/2"
        : "right-6";

  const handleClick = useCallback(() => {
    scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [scrollTo]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn("fixed bottom-6 z-40", alignmentClass)}
        >
          <Button
            type="button"
            size="icon"
            aria-label="Scroll to top"
            onClick={handleClick}
            className={cn(
              "rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90",
              className,
            )}
          >
            {children ?? <CaretUp />}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
