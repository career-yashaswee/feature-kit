"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretDown, Circle, Stack } from "@phosphor-icons/react";
import { Img } from "react-image";
import type { VariantSelectProps } from "../types";
import {
  useVariantSelectStore,
  createVariantSelectAdapter,
} from "../store/use-variant-select-store";

export function VariantSelect({
  featureId,
  variants,
  isLoading = false,
  onVariantSelect,
  mode = "display",
  adapter,
  className,
}: VariantSelectProps) {
  const defaultAdapter = React.useMemo(() => createVariantSelectAdapter(), []);
  const activeAdapter = adapter || defaultAdapter;

  const selectedVariantId = activeAdapter.getSelectedVariant(featureId);
  const selectedVariant = variants?.find((v) => v.id === selectedVariantId);
  const [isOpen, setIsOpen] = React.useState(false);

  const onVariantSelectRef = React.useRef(onVariantSelect);

  React.useEffect(() => {
    onVariantSelectRef.current = onVariantSelect;
  }, [onVariantSelect]);

  // Auto-select first variant if none selected and variants are available
  React.useEffect(() => {
    if (
      featureId &&
      variants &&
      variants.length > 0 &&
      !selectedVariantId &&
      !isLoading
    ) {
      activeAdapter.setSelectedVariant(featureId, variants[0].id);
      onVariantSelectRef.current?.(variants[0].id);
    }
  }, [featureId, variants, selectedVariantId, isLoading, activeAdapter]);

  const handleVariantSelect = (variantId: string) => {
    activeAdapter.setSelectedVariant(featureId, variantId);
    onVariantSelect?.(variantId);
    setIsOpen(false);
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  const variantCount = variants.length;

  // Display mode: just show count, no dropdown
  if (mode === "display") {
    return (
      <Badge variant="outline" className={cn("text-xs", className)}>
        {variantCount} variant{variantCount !== 1 ? "s" : ""}
      </Badge>
    );
  }

  // Selector mode: show selected variant name with badge
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <span>{selectedVariant?.display_name || "Select variant"}</span>
          <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
            {variantCount}
          </Badge>
          <CaretDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[400px] max-h-[500px] overflow-y-auto"
      >
        {isLoading ? (
          <div className="p-3 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <div className="flex items-center gap-1.5 shrink-0">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="size-5 rounded shrink-0" />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 border rounded-md">
                  <Skeleton className="size-3 rounded" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : variants.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No variants available
          </div>
        ) : (
          variants.map((variant) => {
            const isSelected = selectedVariantId === variant.id;
            const topDependencies = variant.dependencies?.slice(0, 4) || [];

            return (
              <DropdownMenuItem
                key={variant.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer focus:bg-accent",
                  "hover:bg-accent",
                )}
                onSelect={(e) => {
                  e.preventDefault();
                  handleVariantSelect(variant.id);
                }}
              >
                {/* Radio Button - only in selector mode */}
                {mode === "selector" && (
                  <div className="shrink-0 flex items-center justify-center size-5">
                    {isSelected ? (
                      <div className="size-4 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                        <div className="size-2 rounded-full bg-primary-foreground" />
                      </div>
                    ) : (
                      <Circle size={16} className="text-muted-foreground" />
                    )}
                  </div>
                )}

                {/* Dependency Icons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {topDependencies.map((dep) =>
                    dep.mark_url ? (
                      <div
                        key={dep.id}
                        className="size-5 flex items-center justify-center p-0.5"
                        title={dep.name}
                        style={{
                          filter: "grayscale(100%)",
                        }}
                      >
                        <Img
                          src={dep.mark_url}
                          alt={dep.name}
                          className="size-full object-contain"
                          loader={
                            <div className="size-full flex items-center justify-center">
                              <Skeleton className="size-3 rounded" />
                            </div>
                          }
                          unloader={
                            <div className="size-5 flex items-center justify-center overflow-hidden rounded bg-muted border border-border">
                              <span className="text-[10px] font-semibold text-muted-foreground">
                                {dep.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          }
                        />
                      </div>
                    ) : (
                      <div
                        key={dep.id}
                        className="size-5 flex items-center justify-center overflow-hidden rounded bg-muted border border-border"
                        title={dep.name}
                        style={{
                          filter: "grayscale(100%)",
                        }}
                      >
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {dep.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ),
                  )}
                  {variant.dependencies && variant.dependencies.length > 4 && (
                    <div
                      className="size-5 bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground rounded border border-border"
                      style={{
                        filter: "grayscale(100%)",
                      }}
                    >
                      +{variant.dependencies.length - 4}
                    </div>
                  )}
                </div>

                {/* Variant Name */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {variant.display_name}
                  </div>
                </div>

                {/* Stack Badge */}
                {variant.stack && (
                  <Badge
                    variant="outline"
                    className="shrink-0 text-xs px-2 py-0.5 inline-flex items-center gap-1"
                  >
                    <Stack size={12} />
                    {variant.stack.name}
                  </Badge>
                )}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
