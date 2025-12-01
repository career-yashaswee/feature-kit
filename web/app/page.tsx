'use client'

import { useMemo } from 'react'
import { useFeatures } from '@/features/features/hooks/use-features'
import { useKits } from '@/features/kits/hooks/use-kits'
import { useSearch } from '@/features/search/hooks/use-search'
import { Input } from '@/components/ui/input'
import { FeatureCard } from '@/components/feature-card'
import { KitCard } from '@/components/kit-card'

export default function HomePage() {
  const { data: features = [], isLoading: featuresLoading } = useFeatures()
  const { data: kits = [], isLoading: kitsLoading } = useKits()
  const { searchQuery, setSearchQuery, filteredFeatures } = useSearch(features)

  const kitFeatureCounts = useMemo(() => {
    if (featuresLoading || kitsLoading) return {}
    return kits.reduce((acc, kit) => {
      acc[kit.id] = features.filter((f) => f.kit_id === kit.id).length
      return acc
    }, {} as Record<string, number>)
  }, [kits, features, featuresLoading, kitsLoading])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Feature Kit</h1>
        <p className="text-muted-foreground mb-6">
          Discover and copy niche components for your web projects
        </p>
        <Input
          type="search"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {searchQuery ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Search Results ({filteredFeatures.length})
          </h2>
          {featuresLoading ? (
            <p>Loading...</p>
          ) : filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          ) : (
            <p>No features found</p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kits</h2>
            {kitsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kits.map((kit) => (
                  <KitCard
                    key={kit.id}
                    kit={kit}
                    featureCount={kitFeatureCounts[kit.id] || 0}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            {featuresLoading ? (
              <p>Loading...</p>
            ) : features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            ) : (
              <p>No features available</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
