export interface Dependency {
  id: string;
  name: string;
  mark_url?: string | null;
}

export interface Stack {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  display_name: string;
  dependencies?: Dependency[];
  stack?: Stack;
}

export interface VariantSelectAdapter {
  getSelectedVariant: (featureId: string) => string | null;
  setSelectedVariant: (featureId: string, variantId: string | null) => void;
  clearSelectedVariant?: (featureId: string) => void;
}

export interface VariantSelectProps {
  featureId: string;
  variants: Variant[] | undefined;
  isLoading?: boolean;
  onVariantSelect?: (variantId: string) => void;
  mode?: "display" | "selector";
  adapter?: VariantSelectAdapter;
  className?: string;
}
