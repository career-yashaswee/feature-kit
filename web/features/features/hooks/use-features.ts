"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Feature, Kit, Tag } from "@/lib/supabase/types";

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
    tag: Tag | null;
  };

  type FeatureWithRelations = Feature & {
    kit: Kit | null;
    tags: FeatureTagWithTag[] | null;
  };

  return (data || []).map((feature: FeatureWithRelations) => ({
    ...feature,
    kit: feature.kit,
    tags:
      feature.tags
        ?.map((ft: FeatureTagWithTag) => ft.tag)
        .filter((tag): tag is Tag => Boolean(tag)) || [],
  }));
}

export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: fetchFeatures,
  });
}
