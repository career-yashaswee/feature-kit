'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Kit } from '@/lib/supabase/types'

export function useKits() {
  const [kits, setKits] = useState<Kit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchKits() {
      try {
        const { data, error } = await getSupabaseClient()
          .from('kits')
          .select('*')
          .order('name', { ascending: true })

        if (error) throw error
        if (isMounted) {
          setKits(data || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchKits()

    return () => {
      isMounted = false
    }
  }, [])

  return { kits, loading, error }
}

