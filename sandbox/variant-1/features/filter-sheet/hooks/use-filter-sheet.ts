"use client";

import {
  useQueryStates,
  parseAsString,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import type { FilterValue } from "../types";

export interface UseFilterSheetOptions {
  /**
   * Configuration for individual filter parameters
   * Key is the filter ID, value is the default value
   */
  defaults?: Record<string, FilterValue>;
  /**
   * History mode for URL updates
   * 'push' - adds new history entry (default)
   * 'replace' - replaces current history entry
   */
  history?: "push" | "replace";
  /**
   * Whether to use shallow routing (Next.js only)
   */
  shallow?: boolean;
}

export interface UseFilterSheetReturn {
  /**
   * Get the current value of a filter
   */
  getFilter: (id: string) => FilterValue | null;
  /**
   * Set the value of a filter
   */
  setFilter: (id: string, value: FilterValue | null) => Promise<void>;
  /**
   * Clear a specific filter
   */
  clearFilter: (id: string) => Promise<void>;
  /**
   * Clear all filters
   */
  clearAllFilters: () => Promise<void>;
  /**
   * Get all filter values as an object
   */
  getAllFilters: () => Record<string, FilterValue | null>;
}

/**
 * Hook for managing filter state in URL query parameters using nuqs
 *
 * @example
 * ```tsx
 * const { getFilter, setFilter, clearAllFilters } = useFilterSheet({
 *   defaults: {
 *     difficulty: "ALL",
 *     status: "ALL",
 *     favoriteOnly: false,
 *   },
 * });
 *
 * // Get filter value
 * const difficulty = getFilter("difficulty");
 *
 * // Set filter value
 * await setFilter("difficulty", "EASY");
 *
 * // Clear all filters
 * await clearAllFilters();
 * ```
 */
export function useFilterSheet(
  options: UseFilterSheetOptions = {}
): UseFilterSheetReturn {
  const { defaults = {}, history = "push", shallow = false } = options;

  // Create parsers for all filter keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterParsers: Record<string, any> = {};
  const filterDefaults: Record<string, FilterValue> = {};

  // Build parsers and defaults
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    if (typeof defaultValue === "boolean") {
      filterParsers[key] = parseAsBoolean
        .withDefault(defaultValue)
        .withOptions({
          clearOnDefault: true,
        });
    } else if (Array.isArray(defaultValue)) {
      filterParsers[key] = parseAsArrayOf(parseAsString)
        .withDefault(defaultValue)
        .withOptions({
          clearOnDefault: true,
        });
    } else {
      filterParsers[key] = parseAsString
        .withDefault(String(defaultValue || ""))
        .withOptions({
          clearOnDefault: true,
        });
    }
    filterDefaults[key] = defaultValue;
  });

  // Use useQueryStates for batch updates
  const [filterStates, setFilterStates] = useQueryStates(filterParsers, {
    history,
    shallow,
  });

  const getFilter = (id: string): FilterValue | null => {
    const value = filterStates[id];
    if (value === undefined || value === null) {
      return defaults[id] ?? null;
    }
    return value as FilterValue;
  };

  const setFilter = async (
    id: string,
    value: FilterValue | null
  ): Promise<void> => {
    if (value === null) {
      // Remove from URL by setting to null (will trigger clearOnDefault)
      await setFilterStates({
        [id]: null as string | boolean | string[] | null,
      });
    } else {
      // Set the value - clearOnDefault will handle removing it if it matches default
      await setFilterStates({ [id]: value as string | boolean | string[] });
    }
  };

  const clearFilter = async (id: string): Promise<void> => {
    await setFilter(id, null);
  };

  const clearAllFilters = async (): Promise<void> => {
    // Clear all filters by setting them to null (will trigger clearOnDefault)
    const resetValues: Record<string, null> = {};
    Object.keys(filterParsers).forEach((key) => {
      resetValues[key] = null;
    });
    await setFilterStates(
      resetValues as Record<string, string | boolean | string[] | null>
    );
  };

  const getAllFilters = (): Record<string, FilterValue | null> => {
    const all: Record<string, FilterValue | null> = {};
    Object.keys(filterParsers).forEach((key) => {
      all[key] = getFilter(key);
    });
    return all;
  };

  return {
    getFilter,
    setFilter,
    clearFilter,
    clearAllFilters,
    getAllFilters,
  };
}
