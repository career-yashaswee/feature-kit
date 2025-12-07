import { useState, useEffect, useMemo, useRef } from "react";
import { useDebounce } from "@uidotdev/usehooks";
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
  const debouncedQuery = useDebounce(query, debounceMs);
  const onSearchRef = useRef(onSearch);

  // Update ref when callback changes
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

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
    onSearchRef.current?.(debouncedQuery, results);
  }, [debouncedQuery, results]);

  return {
    query,
    setQuery,
    results,
    isSearching: debouncedQuery !== query,
  };
}
