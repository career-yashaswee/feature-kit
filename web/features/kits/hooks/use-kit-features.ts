'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

async function fetchKitFeatures(kitSlug: string): Promise<Feature[]> {
  // First get the kit
  const { data: kitData, error: kitError } = await getSupabaseClient()
    .from('kits')
    .select('id')
    .eq('slug', kitSlug)
    .single()

  if (kitError) throw kitError
  if (!kitData) {
    throw new Error('Kit not found')
  }

  // Then get features for this kit
  const { data, error } = await getSupabaseClient()
    .from('features')
    .select(`
      *,
      kit:kits(*),
      tags:feature_tags(
        tag:tags(*)
      )
    `)
    .eq('kit_id', kitData.id)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []).map((feature: any) => ({
    ...feature,
    kit: feature.kit,
    tags: feature.tags?.map((ft: any) => ft.tag).filter(Boolean) || [],
  }))
}

export function useKitFeatures(kitSlug: string) {
  return useQuery({
    queryKey: ['kit-features', kitSlug],
    queryFn: () => fetchKitFeatures(kitSlug),
    enabled: !!kitSlug,
  })
}
