"use client";

import { useMemo } from "react";
import { useFeatures } from "@/features/features/hooks/use-features";
import { useFavoritesStore } from "@/features/favorites/store/use-favorites-store";
import type { Feature } from "@/lib/supabase/types";

export function useFavoriteFeatures() {
  const { data: features = [], isLoading } = useFeatures();
  const favorites = useFavoritesStore((state) => state.favorites);

  const favoriteFeatures = useMemo(() => {
    return features.filter((feature: Feature) =>
      favorites.includes(feature.id),
    );
  }, [features, favorites]);

  return {
    data: favoriteFeatures,
    isLoading,
  };
}
