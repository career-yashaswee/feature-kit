'use client'

import { useEffect, useState, useRef } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Feature } from '@/lib/supabase/types'

export function useFeature(kitSlug: string, featureSlug: string) {
  const [feature, setFeature] = useState<Feature | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    async function fetchFeature() {
      try {
        // First get the kit
        const { data: kitData, error: kitError } = await getSupabaseClient()
          .from('kits')
          .select('id')
          .eq('slug', kitSlug)
          .single()

        if (!isMountedRef.current) return

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

        if (!isMountedRef.current) return

        if (error) throw error

        const formattedFeature = {
          ...data,
          kit: data.kit,
          tags: data.tags?.map((ft: any) => ft.tag).filter(Boolean) || [],
        }

        if (isMountedRef.current) {
          setFeature(formattedFeature)
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError(err as Error)
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }

    fetchFeature()

    return () => {
      isMountedRef.current = false
    }
  }, [kitSlug, featureSlug])

  return { feature, loading, error }
}

