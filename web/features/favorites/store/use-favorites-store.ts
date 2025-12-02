import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Feature } from "@/lib/supabase/types";

interface FavoritesState {
  favorites: string[];
  addFavorite: (featureId: string) => void;
  removeFavorite: (featureId: string) => void;
  toggleFavorite: (featureId: string) => void;
  isFavorite: (featureId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (featureId: string) =>
        set((state) => ({
          favorites: state.favorites.includes(featureId)
            ? state.favorites
            : [...state.favorites, featureId],
        })),
      removeFavorite: (featureId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== featureId),
        })),
      toggleFavorite: (featureId: string) =>
        set((state) => ({
          favorites: state.favorites.includes(featureId)
            ? state.favorites.filter((id) => id !== featureId)
            : [...state.favorites, featureId],
        })),
      isFavorite: (featureId: string) => get().favorites.includes(featureId),
    }),
    {
      name: "favorites-storage",
    },
  ),
);
