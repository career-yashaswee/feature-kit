'use client'

import { useKits } from '@/features/kits/hooks/use-kits'
import { useFeatures } from '@/features/features/hooks/use-features'
import { KitCard } from '@/components/kit-card'

export default function KitsPage() {
  const { kits, loading } = useKits()
  const { features } = useFeatures()

  // Count features per kit
  const kitFeatureCounts = kits.reduce((acc, kit) => {
    acc[kit.id] = features.filter((f) => f.kit_id === kit.id).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Kits</h1>
      {loading ? (
        <p>Loading...</p>
      ) : kits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kits.map((kit) => (
            <KitCard
              key={kit.id}
              kit={kit}
              featureCount={kitFeatureCounts[kit.id] || 0}
            />
          ))}
        </div>
      ) : (
        <p>No kits available</p>
      )}
    </div>
  )
}

