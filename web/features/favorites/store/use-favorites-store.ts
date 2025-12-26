import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: Set<string>;
  addFavorite: (featureId: string) => void;
  removeFavorite: (featureId: string) => void;
  toggleFavorite: (featureId: string) => void;
  isFavorite: (featureId: string) => boolean;
}

// Helper to convert Set to Array for persistence
const setToArray = (set: Set<string>): string[] => Array.from(set);
const arrayToSet = (arr: string[]): Set<string> => new Set(arr);

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      addFavorite: (featureId: string) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.add(featureId);
          return { favorites: newFavorites };
        }),
      removeFavorite: (featureId: string) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          newFavorites.delete(featureId);
          return { favorites: newFavorites };
        }),
      toggleFavorite: (featureId: string) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(featureId)) {
            newFavorites.delete(featureId);
          } else {
            newFavorites.add(featureId);
          }
          return { favorites: newFavorites };
        }),
      isFavorite: (featureId: string) => get().favorites.has(featureId),
    }),
    {
      name: "favorites-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: arrayToSet(parsed.state.favorites || []),
            },
          };
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify({
              ...value,
              state: {
                ...value.state,
                favorites: setToArray(value.state.favorites),
              },
            }),
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
