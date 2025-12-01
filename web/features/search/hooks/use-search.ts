'use client'

import { useState, useMemo } from 'react'
import type { Feature } from '@/lib/supabase/types'

export function useSearch(features: Feature[]) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFeatures = useMemo(() => {
    if (!searchQuery.trim()) return features

    const query = searchQuery.toLowerCase()
    return features.filter((feature) => {
      const nameMatch = (feature.name?.toLowerCase() ?? '').includes(query)
      const descriptionMatch = (feature.description?.toLowerCase() ?? '').includes(query)
      const tagMatch = feature.tags?.some((tag) => (tag.name?.toLowerCase() ?? '').includes(query))
      const kitMatch = (feature.kit?.name?.toLowerCase() ?? '').includes(query)

      return nameMatch || descriptionMatch || tagMatch || kitMatch
    })
  }, [features, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredFeatures,
  }
}

