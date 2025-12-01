'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import type { Kit } from '@/lib/supabase/types'

export function useKits() {
  const [kits, setKits] = useState<Kit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchKits() {
      try {
        const { data, error } = await getSupabaseClient()
          .from('kits')
          .select('*')
          .order('name', { ascending: true })

        if (error) throw error
        setKits(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchKits()
  }, [])

  return { kits, loading, error }
}

