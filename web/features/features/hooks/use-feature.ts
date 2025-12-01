'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

async function fetchFeature(kitSlug: string, featureSlug: string): Promise<Feature> {
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

  // Then get the feature
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
    .eq('slug', featureSlug)
    .single()

  if (error) throw error

  return {
    ...data,
    kit: data.kit,
    tags: data.tags?.map((ft: any) => ft.tag).filter(Boolean) || [],
  }
}

export function useFeature(kitSlug: string, featureSlug: string) {
  return useQuery({
    queryKey: ['feature', kitSlug, featureSlug],
    queryFn: () => fetchFeature(kitSlug, featureSlug),
    enabled: !!kitSlug && !!featureSlug,
  })
}
