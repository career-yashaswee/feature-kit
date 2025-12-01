'use client'

import { useQuery } from '@tanstack/react-query'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

async function fetchFeatures(): Promise<Feature[]> {
  const { data, error } = await getSupabaseClient()
    .from('features')
    .select(`
      *,
      kit:kits(*),
      tags:feature_tags(
        tag:tags(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []).map((feature: any) => ({
    ...feature,
    kit: feature.kit,
    tags: feature.tags?.map((ft: any) => ft.tag).filter(Boolean) || [],
  }))
}

export function useFeatures() {
  return useQuery({
    queryKey: ['features'],
    queryFn: fetchFeatures,
  })
}
