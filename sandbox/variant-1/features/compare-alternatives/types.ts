import type { ReactNode, ComponentType } from "react";

export type SupportValue = true | false | "partial";

export interface Alternative {
  id: string;
  name: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface ComparisonFeature {
  id: string;
  icon: ReactNode | ComponentType<{ className?: string }>;
  label: string;
  description: string;
  values: Record<string, SupportValue | string>; // alternativeId -> value
  isPricingRow?: boolean;
  pricingValues?: Record<string, string>; // alternativeId -> pricing text
}

export interface CompareAlternativesProps {
  features: ComparisonFeature[];
  alternatives: Alternative[];
  heading?: string;
  description?: string | ReactNode;
  className?: string;
  showCrownIcon?: boolean;
  pricingRowId?: string; // ID of the feature that should be styled as pricing row
}

