"use client";

import { useMemo } from "react";
import Fuse from "fuse.js";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useSearchStore } from "../store/use-search-store";
import type { Feature } from "@/lib/supabase/types";

export function useSearch(features: Feature[] = []) {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const [debouncedSearch] = useDebouncedValue(searchQuery, { wait: 300 });

  const fuse = useMemo(
    () =>
      new Fuse(features, {
        keys: [
          { name: "name", weight: 0.7 },
          { name: "description", weight: 0.3 },
          { name: "kit.name", weight: 0.2 },
          { name: "tags.name", weight: 0.1 },
        ],
        threshold: 0.3,
        includeScore: false,
        minMatchCharLength: 2,
      }),
    [features],
  );

  const filteredFeatures = useMemo(() => {
    if (!debouncedSearch.trim()) return features;

    const results = fuse.search(debouncedSearch);
    return results.map((result) => result.item);
  }, [fuse, debouncedSearch, features]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFeatures,
  };
}
