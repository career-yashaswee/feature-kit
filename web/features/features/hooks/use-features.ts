"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Feature } from "@/lib/supabase/types";

async function fetchFeatures(): Promise<Feature[]> {
  const { data, error } = await getSupabaseClient()
    .from("features")
    .select(
      `
      *,
      kit:kits(*),
      tags:feature_tags(
        tag:tags(*)
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  type FeatureTagWithTag = {
    tag: { id: string; name: string; slug: string; created_at: string } | null;
  };

  type FeatureWithRelations = {
    kit: { id: string; name: string; description: string | null; slug: string; thumbnail_url: string | null; created_at: string } | null;
    tags: FeatureTagWithTag[] | null;
  };

  return (data || []).map((feature: FeatureWithRelations) => ({
    ...feature,
    kit: feature.kit,
    tags:
      feature.tags
        ?.map((ft: FeatureTagWithTag) => ft.tag)
        .filter(Boolean) || [],
  }));
}

export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: fetchFeatures,
  });
}
