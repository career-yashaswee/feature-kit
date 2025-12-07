"use client";

import React from "react";
import { Check, X, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompareAlternativesProps, ComparisonFeature } from "../types";

export function CompareAlternatives({
  features,
  alternatives,
  heading = "Compare Alternatives",
  description,
  className,
  showCrownIcon = false,
  pricingRowId,
}: CompareAlternativesProps) {
  const isPricingRow = (feature: ComparisonFeature) => {
    if (pricingRowId) {
      return feature.id === pricingRowId;
    }
    return feature.isPricingRow ?? false;
  };

  const renderIcon = (
    icon: ComparisonFeature["icon"],
    isPricing: boolean
  ): React.ReactNode => {
    if (!icon) return null;

    // If it's already a ReactNode (JSX element), return it as is
    if (React.isValidElement(icon)) {
      return icon;
    }

    // Check if it's a React component constructor (function)
    // This handles ComponentType from lucide-react and similar libraries
    if (typeof icon === "function") {
      const IconComponent = icon as React.ComponentType<{ className?: string }>;
      return React.createElement(IconComponent, {
        className: cn(
          "h-5 w-5 text-gray-500",
          isPricing && "text-white dark:text-black"
        ),
      });
    }

    // Fallback: return null if we can't render it
    return null;
  };

  const renderValue = (
    value: string | boolean | "partial",
    isPricing: boolean,
    pricingText?: string
  ) => {
    if (isPricing && pricingText) {
      return (
        <span className="text-xs font-bold font-mono text-white dark:text-black sm:text-sm">
          {pricingText}
        </span>
      );
    }

    if (typeof value === "string" && value !== "partial") {
      return (
        <span className="text-xs font-mono text-white dark:text-black sm:text-sm">
          {value}
        </span>
      );
    }

    if (value === true) {
      return <Check className="h-5 w-5 text-green-600" />;
    }

    if (value === "partial") {
      return <Check className="h-5 w-5 text-yellow-500" />;
    }

    return <X className="h-5 w-5 text-destructive" />;
  };

  return (
    <section className={cn("py-32 bg-muted/30", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          {heading}{" "}
          {showCrownIcon && (
            <Crown className="inline-block h-8 w-8 text-yellow-500" />
          )}
        </h2>
        {description && (
          <div className="text-muted-foreground mb-8 text-center">
            {typeof description === "string" ? (
              <p dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              description
            )}
          </div>
        )}
        <div className="divide-border border-border bg-background mx-auto max-w-4xl divide-y overflow-x-auto rounded-lg shadow">
          {/* Desktop Header */}
          <div className="bg-muted text-foreground hidden rounded-t-lg text-left text-base font-semibold lg:flex">
            <div className="w-16 px-6 py-4"></div>
            <div className="flex-1 px-6 py-4">Feature</div>
            {alternatives.map((alt) => (
              <div key={alt.id} className="flex w-40 items-center gap-2 px-6 py-4">
                <div className="flex items-center gap-2">
                  {alt.icon && (
                    <alt.icon className="h-5 w-5 text-primary" />
                  )}
                  <span>{alt.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {features.map((feature) => {
            const isPricing = isPricingRow(feature);

            return (
              <div
                key={feature.id}
                className={cn(isPricing && "bg-black dark:bg-white")}
              >
                {/* Mobile/Tablet: Feature info row */}
                <div
                  className={cn(
                    "flex items-center justify-start px-6 pt-4 lg:hidden",
                    isPricing && "text-white dark:text-black"
                  )}
                >
                  {renderIcon(feature.icon, isPricing)}
                  <span
                    className={cn(
                      "ml-3 text-base font-medium",
                      isPricing && "text-white dark:text-black"
                    )}
                  >
                    {feature.label}
                  </span>
                </div>
                <div
                  className={cn(
                    "px-6 pb-2 lg:hidden",
                    isPricing && "text-white dark:text-black"
                  )}
                >
                  <div
                    className={cn(
                      "mt-2 text-sm",
                      isPricing
                        ? "text-white/90 dark:text-black/90"
                        : "text-muted-foreground"
                    )}
                  >
                    {feature.description}
                  </div>
                </div>

                {/* Mobile/Tablet: Comparison columns */}
                <div className="flex items-center justify-between gap-2 px-6 pb-4 lg:hidden">
                  {alternatives.map((alt) => {
                    const value = feature.values[alt.id];
                    const pricingText = feature.pricingValues?.[alt.id];

                    return (
                      <div
                        key={alt.id}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <span
                          className={cn(
                            "text-xs font-medium",
                            isPricing
                              ? "text-white/70 dark:text-black/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {alt.name}
                        </span>
                        {renderValue(value, isPricing, pricingText)}
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: Horizontal layout */}
                <div className="hidden items-center text-left lg:flex lg:flex-row">
                  <div className="flex w-16 items-center justify-center px-6 py-4">
                    {renderIcon(feature.icon, isPricing)}
                  </div>
                  <div className="flex-1 px-6 py-4">
                    <div
                      className={cn(
                        "font-medium",
                        isPricing && "text-white dark:text-black"
                      )}
                    >
                      {feature.label}
                    </div>
                    <div
                      className={cn(
                        "text-sm",
                        isPricing
                          ? "text-white/90 dark:text-black/90"
                          : "text-muted-foreground"
                      )}
                    >
                      {feature.description}
                    </div>
                  </div>
                  {alternatives.map((alt) => {
                    const value = feature.values[alt.id];
                    const pricingText = feature.pricingValues?.[alt.id];

                    return (
                      <div
                        key={alt.id}
                        className="flex w-40 items-center justify-center px-6 py-4"
                      >
                        {renderValue(value, isPricing, pricingText)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

