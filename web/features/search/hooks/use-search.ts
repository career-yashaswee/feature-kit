"use client";

import { useSearchInput } from "./use-search-input";
import type { Feature } from "@/lib/supabase/types";

export function useSearch(features: Feature[] = []) {
  const { query, setQuery, results } = useSearchInput({
    data: features,
    searchKeys: [
      { name: "name", weight: 0.7 },
      { name: "description", weight: 0.3 },
      { name: "kit.name", weight: 0.2 },
      { name: "tags.name", weight: 0.1 },
    ],
    debounceMs: 300,
    fuzzyThreshold: 0.3,
    queryParam: "q",
    enableUrlSync: true,
  });

  return {
    searchQuery: query,
    setSearchQuery: setQuery,
    filteredFeatures: results,
  };
}
