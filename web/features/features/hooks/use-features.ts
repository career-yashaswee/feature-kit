'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchFeatures() {
      try {
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
    }

    fetchFeatures()
  }, [])

  return { features, loading, error }
}

