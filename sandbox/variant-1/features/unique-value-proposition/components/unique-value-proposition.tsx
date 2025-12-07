"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { UniqueValuePropositionProps } from "../types";

export function UniqueValueProposition({
  title = "A Unique Value Proposition",
  description,
  xAxisLabel = "Relevance to Full Stack Web Development",
  yAxisLabel = "Velocity & Accuracy of Feedback",
  dataPoints,
  highlightedPoint,
  quadrantLabels = {
    topLeft: "Fast but Algorithm-Focused",
    topRight: "Fast & Web Dev Focused",
    bottomLeft: "Slow & Limited Relevance",
    bottomRight: "Web Dev Focused but Slow",
  },
  legend = {
    highlightedLabel: "Highlighted",
    otherLabel: "Other Platforms",
  },
  footerDescription,
  className,
  chartHeight = "md",
  showLegend = true,
}: UniqueValuePropositionProps) {
  const heightClasses = {
    sm: "h-[300px]",
    md: "md:h-[400px] lg:h-[500px] h-[300px]",
    lg: "md:h-[500px] lg:h-[600px] h-[400px]",
  };

  // Merge highlighted point into data points if provided
  const allDataPoints = React.useMemo(() => {
    if (!highlightedPoint) return dataPoints;
    
    // Check if highlighted point already exists in dataPoints
    const exists = dataPoints.some((p) => p.id === highlightedPoint.id);
    if (exists) {
      return dataPoints.map((p) =>
        p.id === highlightedPoint.id ? { ...p, ...highlightedPoint, isHighlighted: true } : p
      );
    }
    return [...dataPoints, { ...highlightedPoint, isHighlighted: true }];
  }, [dataPoints, highlightedPoint]);

  return (
    <section className={cn("py-16 md:py-24 bg-muted/30", className)}>
      <div className="container">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative mx-auto w-full max-w-4xl pt-8 pb-8">
          {/* Chart Container */}
          <div
            className={cn(
              "relative w-full border border-border rounded-lg bg-muted/20",
              heightClasses[chartHeight]
            )}
          >
            {/* X-axis label */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-sm font-medium text-muted-foreground">
              {xAxisLabel}
              <span className="ml-1 inline-block h-2 w-2 border-b-2 border-r-2 border-muted-foreground rotate-315"></span>
            </div>

            {/* Y-axis label */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-44 -rotate-90 text-sm font-medium text-muted-foreground">
              {yAxisLabel}
              <span className="ml-1 inline-block h-2 w-2 border-t-2 border-l-2 border-muted-foreground -rotate-225"></span>
            </div>

            {/* Quadrant Dividers - darker and dashed */}
            <div className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-foreground/40"></div>
            <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-foreground/40"></div>

            {/* Data Points */}
            <TooltipProvider>
              {allDataPoints.map((point) => {
                // Calculate dot size based on intensity (default to 3 if not specified)
                // Intensity 1-10 maps to size 4px-16px
                const intensity = point.intensity ?? 3;
                const baseSize = 4;
                const sizeMultiplier = 1.2;
                const dotSize = baseSize + (intensity - 1) * sizeMultiplier;

                // For highlighted points, use larger size
                const finalSize = point.isHighlighted
                  ? Math.max(dotSize, 12)
                  : dotSize;

                // Show name label only for high-intensity points (>= 7) or if highlighted
                const showName = point.isHighlighted || intensity >= 7;

                // Determine color
                const dotColor = point.isHighlighted
                  ? point.color || "bg-blue-600 dark:bg-blue-400"
                  : point.color || "bg-gray-400 dark:bg-gray-500";

                return (
                  <Tooltip key={point.id}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute group cursor-pointer flex items-center"
                        style={{
                          left: `${point.x}%`,
                          bottom: `${point.y}%`,
                          transform: "translate(-50%, 50%)",
                        }}
                      >
                        <span
                          className={cn(
                            "rounded-full transition-all duration-200 group-hover:scale-125",
                            dotColor,
                            point.isHighlighted && "shadow-lg"
                          )}
                          style={{
                            width: `${finalSize}px`,
                            height: `${finalSize}px`,
                            display: "inline-block",
                          }}
                        ></span>
                        {showName && (
                          <span
                            className={cn(
                              "ml-2 text-xs md:text-sm text-muted-foreground transition-all duration-200 whitespace-nowrap",
                              point.isHighlighted &&
                                "font-bold text-blue-600 dark:text-blue-400 text-sm md:text-base"
                            )}
                          >
                            {point.name}
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    {point.tooltip && (
                      <TooltipContent
                        side="top"
                        className="max-w-xs bg-foreground text-background dark:bg-background dark:text-foreground"
                      >
                        <p className="font-semibold mb-1">{point.name}</p>
                        <p className="text-sm">{point.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </TooltipProvider>

            {/* Legend */}
            {showLegend && (
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
                {highlightedPoint && (
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        highlightedPoint.color || "bg-blue-600 dark:bg-blue-400"
                      )}
                    ></span>
                    <span className="text-foreground font-medium">
                      {legend.highlightedLabel}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                  <span className="text-muted-foreground">
                    {legend.otherLabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quadrant Labels - Outside chart with consistent padding */}
          {quadrantLabels.topLeft && (
            <div className="absolute top-0 left-4 text-xs text-muted-foreground font-medium whitespace-nowrap">
              {quadrantLabels.topLeft}
            </div>
          )}
          {quadrantLabels.topRight && (
            <div className="absolute top-0 right-4 text-xs text-muted-foreground font-medium text-right whitespace-nowrap">
              {quadrantLabels.topRight}
            </div>
          )}
          {quadrantLabels.bottomLeft && (
            <div className="absolute bottom-0 left-4 text-xs text-muted-foreground font-medium whitespace-nowrap">
              {quadrantLabels.bottomLeft}
            </div>
          )}
          {quadrantLabels.bottomRight && (
            <div className="absolute bottom-0 right-4 text-xs text-muted-foreground font-medium text-right whitespace-nowrap">
              {quadrantLabels.bottomRight}
            </div>
          )}
        </div>

        {/* Footer Description */}
        {footerDescription && (
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-muted-foreground text-sm md:text-base italic">
              {footerDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

