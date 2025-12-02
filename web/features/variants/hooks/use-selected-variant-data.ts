"use client";

import { useMemo } from "react";
import { useVariants } from "./use-variants";
import { useSelectedVariantStore } from "../store/use-selected-variant-store";

export function useSelectedVariantData(featureId: string | undefined) {
  const { data: variants, isLoading } = useVariants(featureId);
  const { getSelectedVariant } = useSelectedVariantStore();

  const selectedVariantId = featureId ? getSelectedVariant(featureId) : null;
  const selectedVariant = useMemo(
    () => variants?.find((v) => v.id === selectedVariantId) ?? null,
    [variants, selectedVariantId]
  );

  return {
    selectedVariant,
    selectedVariantId,
    variants,
    isLoading,
  };
}
