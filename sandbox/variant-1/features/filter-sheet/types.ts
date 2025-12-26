import type { ReactNode, ComponentType } from "react";

export type FilterValue = string | boolean | string[];

export interface FilterOption {
  value: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  iconColor?: string;
}

export interface SelectFilter {
  type: "select";
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  value: string;
  options: FilterOption[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export interface CheckboxFilter {
  type: "checkbox";
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export interface MultiSelectFilter {
  type: "multiselect";
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  selectedValues: string[];
  options: Array<{
    id: string;
    label: string;
    icon?: ComponentType<{ className?: string }>;
    iconUrl?: string | null;
  }>;
  onChange: (values: string[]) => void;
}

export interface TagFilter {
  type: "tags";
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  selectedTags: string[];
  availableTags: string[];
  onChange: (tags: string[]) => void;
}

export type Filter =
  | SelectFilter
  | CheckboxFilter
  | MultiSelectFilter
  | TagFilter;

export interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filter[];
  title?: string;
  description?: string;
  onClearAll?: () => void;
  clearAllLabel?: string;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
  width?: string;
  /**
   * Whether to use nuqs for URL state management
   * When enabled, filter values will be synced with URL query parameters
   * @default false
   */
  useNuqs?: boolean;
}
