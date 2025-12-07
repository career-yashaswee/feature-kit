"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VariantSelectAdapter } from "../types";

interface VariantSelectState {
  selectedVariants: Record<string, string | null>;
  setSelectedVariant: (featureId: string, variantId: string | null) => void;
  getSelectedVariant: (featureId: string) => string | null;
  clearSelectedVariant: (featureId: string) => void;
}

export const useVariantSelectStore = create<VariantSelectState>()(
  persist(
    (set, get) => ({
      selectedVariants: {},
      setSelectedVariant: (featureId: string, variantId: string | null) =>
        set((state) => ({
          selectedVariants: {
            ...state.selectedVariants,
            [featureId]: variantId,
          },
        })),
      getSelectedVariant: (featureId: string) =>
        get().selectedVariants[featureId] || null,
      clearSelectedVariant: (featureId: string) =>
        set((state) => {
          const { [featureId]: _, ...rest } = state.selectedVariants;
          return { selectedVariants: rest };
        }),
    }),
    {
      name: "variant-select-storage",
    },
  ),
);

export function createVariantSelectAdapter(): VariantSelectAdapter {
  return {
    getSelectedVariant: (featureId: string) =>
      useVariantSelectStore.getState().getSelectedVariant(featureId),
    setSelectedVariant: (featureId: string, variantId: string | null) =>
      useVariantSelectStore.getState().setSelectedVariant(featureId, variantId),
    clearSelectedVariant: (featureId: string) =>
      useVariantSelectStore.getState().clearSelectedVariant(featureId),
  };
}
