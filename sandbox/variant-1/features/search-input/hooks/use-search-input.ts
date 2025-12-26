import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@tanstack/react-pacer";
import Fuse from "fuse.js";

export interface UseSearchInputOptions<T> {
  data: T[];
  searchKeys: string[];
  debounceMs?: number;
  fuzzyThreshold?: number;
  onSearch?: (query: string, results: T[]) => void;
}

export function useSearchInput<T>({
  data,
  searchKeys,
  debounceMs = 300,
  fuzzyThreshold = 0.4,
  onSearch,
}: UseSearchInputOptions<T>) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, { wait: debounceMs });

  const handleSearch = useCallback(
    (searchQuery: string, searchResults: T[]) => {
      onSearch?.(searchQuery, searchResults);
    },
    [onSearch],
  );

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: searchKeys,
        threshold: fuzzyThreshold,
        includeScore: true,
      }),
    [data, searchKeys, fuzzyThreshold],
  );

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return data;
    }

    const searchResults = fuse.search(debouncedQuery);
    return searchResults.map((result) => result.item);
  }, [debouncedQuery, fuse, data]);

  useEffect(() => {
    handleSearch(debouncedQuery, results);
  }, [debouncedQuery, results, handleSearch]);

  return {
    query,
    setQuery,
    results,
    isSearching: debouncedQuery !== query,
  };
}
