"use client";

import { useEffect, useRef, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { CaretLeft, CaretUp } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ResizablePanelsProps } from "../types";

export function ResizablePanels({
  panels,
  direction = "horizontal",
  persistLayout = true,
  storageKey = "resizable-panels-layout",
  showIconsWhenCollapsed = true,
  className,
  ...panelGroupProps
}: ResizablePanelsProps) {
  const panelRefs = useRef<Record<string, ImperativePanelHandle>>({});
  const [collapsedStates, setCollapsedStates] = useState<
    Record<string, boolean>
  >({});
  const [savedLayout, setSavedLayout] = useState<Record<string, number> | null>(
    () => {
      if (!persistLayout || typeof window === "undefined") return null;
      try {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    },
  );

  useEffect(() => {
    if (!persistLayout || !savedLayout) return;

    try {
      Object.entries(savedLayout).forEach(([id, size]) => {
        const panelRef = panelRefs.current[id];
        if (panelRef && typeof size === "number") {
          panelRef.resize(size);
        }
      });
    } catch (error) {
      console.error("Failed to restore panel layout:", error);
    }
  }, [persistLayout, savedLayout]);

  const saveLayout = () => {
    if (!persistLayout || typeof window === "undefined") return;

    const layout: Record<string, number> = {};
    Object.entries(panelRefs.current).forEach(([id, ref]) => {
      const size = ref.getSize();
      if (size !== undefined) {
        layout[id] = size;
      }
    });

    setSavedLayout(layout);
    try {
      localStorage.setItem(storageKey, JSON.stringify(layout));
    } catch {
      // Ignore errors
    }
  };

  const handleResize = () => {
    saveLayout();
  };

  const handleCollapse = (panelId: string) => {
    const panelRef = panelRefs.current[panelId];
    if (panelRef) {
      panelRef.collapse();
      setCollapsedStates((prev) => ({ ...prev, [panelId]: true }));
      saveLayout();
    }
  };

  const handleExpand = (panelId: string) => {
    const panelRef = panelRefs.current[panelId];
    if (panelRef) {
      panelRef.expand();
      setCollapsedStates((prev) => ({ ...prev, [panelId]: false }));
      saveLayout();
    }
  };

  const handleToggleCollapse = (panelId: string) => {
    const panelRef = panelRefs.current[panelId];
    if (panelRef) {
      const isCollapsed = panelRef.isCollapsed();
      if (isCollapsed) {
        handleExpand(panelId);
      } else {
        handleCollapse(panelId);
      }
    }
  };

  const CollapseIcon = direction === "horizontal" ? CaretLeft : CaretUp;

  return (
    <PanelGroup
      direction={direction}
      className={cn("flex h-full w-full", className)}
      onLayout={handleResize}
      {...panelGroupProps}
    >
      {panels.flatMap((panel, index) => {
        const isLast = index === panels.length - 1;
        const panelRef = (ref: ImperativePanelHandle | null) => {
          if (ref) {
            panelRefs.current[panel.id] = ref;
          }
        };

        const elements = [
          <Panel
            key={panel.id}
            ref={panelRef}
            defaultSize={panel.defaultSize}
            minSize={panel.minSize}
            maxSize={panel.maxSize}
            collapsible={panel.collapsible}
            collapsedSize={panel.collapsedSize}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-lg border bg-background",
              direction === "horizontal" && !isLast && "",
              direction === "vertical" && !isLast && "",
            )}
          >
            {panel.label && (
              <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center gap-2">
                  {panel.icon && (
                    <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                      {panel.icon}
                    </div>
                  )}
                  <span className="text-sm font-medium">{panel.label}</span>
                </div>
                {panel.collapsible && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleToggleCollapse(panel.id)}
                    className="h-6 w-6"
                  >
                    <CollapseIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            <div className="flex-1 overflow-auto p-4">{panel.content}</div>

            {showIconsWhenCollapsed && panel.icon && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-background transition-opacity pointer-events-none",
                  collapsedStates[panel.id] ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  {panel.icon}
                  {panel.label && (
                    <span className="text-xs font-medium">{panel.label}</span>
                  )}
                </div>
              </div>
            )}
          </Panel>,
        ];

        if (!isLast) {
          elements.push(
            <PanelResizeHandle
              key={`handle-${panel.id}`}
              className={cn(
                "group relative flex items-center justify-center bg-border transition-colors hover:bg-primary/20",
                direction === "horizontal"
                  ? "w-2 cursor-col-resize mx-0.5"
                  : "h-2 cursor-row-resize my-0.5",
              )}
            >
              <div
                className={cn(
                  "absolute rounded-full bg-primary/40 opacity-0 transition-opacity group-hover:opacity-100",
                  direction === "horizontal" ? "h-8 w-1" : "h-1 w-8",
                )}
              />
            </PanelResizeHandle>,
          );
        }

        return elements;
      })}
    </PanelGroup>
  );
}
