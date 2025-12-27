"use client";

import { useQuery } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Feature, Kit, Tag } from "@/lib/supabase/types";

async function fetchKitFeatures(kitSlug: string): Promise<Feature[]> {
  // First get the kit
  const { data: kitData, error: kitError } = await getSupabaseClient()
    .from("kits")
    .select("id")
    .eq("slug", kitSlug)
    .single();

  if (kitError) throw kitError;
  if (!kitData) {
    throw new Error("Kit not found");
  }

  // Then get features for this kit
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
    .eq("kit_id", kitData.id)
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

export function useKitFeatures(kitSlug: string) {
  return useQuery({
    queryKey: ["kit-features", kitSlug],
    queryFn: () => fetchKitFeatures(kitSlug),
    enabled: !!kitSlug,
  });
}
