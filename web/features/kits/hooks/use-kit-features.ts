'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

export function useKitFeatures(kitSlug: string) {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchKitFeatures = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
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

      const formattedFeatures = (data || []).map((feature: any) => ({
        ...feature,
        kit: feature.kit,
        tags: feature.tags?.map((ft: any) => ft.tag).filter(Boolean) || [],
      }))

      setFeatures(formattedFeatures)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [kitSlug])

  useEffect(() => {
    fetchKitFeatures()
  }, [fetchKitFeatures])

  return { features, loading, error, refetch: fetchKitFeatures }
}

