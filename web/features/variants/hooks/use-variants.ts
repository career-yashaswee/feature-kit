"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Variant, Stack, Dependency } from "@/lib/supabase/types";

async function fetchVariants(featureId: string): Promise<Variant[]> {
  const { data, error } = await getSupabaseClient()
    .from("variants")
    .select(
      `
      *,
      stack:stacks(*),
      dependencies:variant_dependencies(
        dependency:dependencies(*)
      )
    `,
    )
    .eq("feature_id", featureId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  type VariantDependencyWithDependency = {
    dependency: Dependency | null;
  };

  type VariantWithRelations = Variant & {
    stack: Stack | null;
    dependencies: VariantDependencyWithDependency[] | null;
  };

  return (data || []).map((variant: VariantWithRelations) => ({
    ...variant,
    stack: variant.stack,
    dependencies:
      variant.dependencies
        ?.map((vd: VariantDependencyWithDependency) => vd.dependency)
        .filter((dep): dep is Dependency => Boolean(dep)) || [],
  }));
}

export function useVariants(featureId: string | undefined) {
  return useQuery({
    queryKey: ["variants", featureId],
    queryFn: () => fetchVariants(featureId!),
    enabled: !!featureId,
  });
}
