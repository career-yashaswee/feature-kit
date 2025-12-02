"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/features/table-of-contents/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

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
      const element = document.getElementById(item.id);
      if (!element) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(item.id);
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
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
        "sticky top-[124px] h-[calc(100vh-124px)] overflow-y-auto px-6 py-6",
        className
      )}
      aria-label="Table of contents"
    >
      <div className="border-l-2 border-border pl-4">
        <h3 className="text-sm font-semibold mb-4 text-foreground">
          On this page
        </h3>
        <ul className="space-y-1 text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const indentClass =
              item.level === 1
                ? "ml-0"
                : item.level === 2
                  ? "ml-4"
                  : item.level === 3
                    ? "ml-8"
                    : "ml-12";

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    "block py-1.5 px-2 rounded-md transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    indentClass,
                    isActive
                      ? "text-foreground font-medium bg-muted border-l-2 border-primary -ml-4 pl-6"
                      : "text-muted-foreground"
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
