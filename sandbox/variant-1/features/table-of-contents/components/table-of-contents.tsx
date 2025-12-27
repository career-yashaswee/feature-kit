"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import scrollIntoView from "scroll-into-view-if-needed";
import { cn } from "@/lib/utils";
import { List } from "@phosphor-icons/react";
import type { TableOfContentsProps, TocItem } from "../types";

function TocItemLink({
  item,
  isActive,
  onActiveChange,
}: {
  item: TocItem;
  isActive: boolean;
  onActiveChange: (slug: string) => void;
}) {
  const { ref } = useInView({
    threshold: 0,
    rootMargin: "-20% 0% -35% 0%",
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) {
        onActiveChange(item.slug);
      }
    },
  });

  // Attach ref to the target element in the DOM
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const element = document.getElementById(item.slug);
      if (element && ref) {
        (ref as (node: Element | null) => void)(element);
      }
    }
  }, [ref, item.slug]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(item.slug);
    if (element) {
      scrollIntoView(element, {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
        scrollMode: "if-needed",
      });

      // Apply header offset after scroll
      setTimeout(() => {
        window.scrollBy(0, -100);
      }, 100);
    }
  };

  const indentClass =
    item.lvl === 1
      ? "ml-0"
      : item.lvl === 2
        ? "ml-4"
        : item.lvl === 3
          ? "ml-8"
          : "ml-12";

  return (
    <a
      href={`#${item.slug}`}
      onClick={handleClick}
      className={cn(
        "block py-1.5 px-2 rounded-sm transition-colors",
        "hover:bg-muted hover:text-foreground",
        indentClass,
        isActive
          ? "text-foreground font-medium bg-muted border-l-2 border-primary -ml-4 pl-6"
          : "text-muted-foreground",
      )}
    >
      {item.content}
    </a>
  );
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        "lg:sticky lg:top-[124px] lg:h-[calc(100vh-124px)] lg:overflow-y-auto px-4 py-4 lg:px-6 lg:py-6",
        className,
      )}
      aria-label="Table of contents"
    >
      <div className="border-l-2 border-border pl-4">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">
            On this page
          </h3>
        </div>
        <ul className="space-y-1 text-sm">
          {items.map((item) => (
            <li key={item.slug}>
              <TocItemLink
                item={item}
                isActive={activeId === item.slug}
                onActiveChange={setActiveId}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
