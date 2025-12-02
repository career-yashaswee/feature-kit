"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedVariantState {
  selectedVariants: Record<string, string | null>; // featureId -> variantId
  setSelectedVariant: (featureId: string, variantId: string | null) => void;
  getSelectedVariant: (featureId: string) => string | null;
  clearSelectedVariant: (featureId: string) => void;
}

export const useSelectedVariantStore = create<SelectedVariantState>()(
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [featureId]: _, ...rest } = state.selectedVariants;
          return { selectedVariants: rest };
        }),
    }),
    {
      name: "selected-variants-storage",
    },
  ),
);
