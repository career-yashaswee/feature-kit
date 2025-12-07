"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "@phosphor-icons/react";
import type { TableOfContentsProps } from "../types";

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observerOptions = {
      rootMargin: "-20% 0% -35% 0%",
      threshold: 0,
    };

    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const element = document.getElementById(item.slug);
      if (!element) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(item.slug);
          }
        });
      }, observerOptions);

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
          {items.map((item) => {
            const isActive = activeId === item.slug;
            const indentClass =
              item.lvl === 1
                ? "ml-0"
                : item.lvl === 2
                  ? "ml-4"
                  : item.lvl === 3
                    ? "ml-8"
                    : "ml-12";

            return (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  onClick={(e) => handleClick(e, item.slug)}
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
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
