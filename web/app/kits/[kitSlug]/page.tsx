'use client'

import { useKitFeatures } from '@/features/kits/hooks/use-kit-features'
import { FeatureCard } from '@/components/feature-card'
import { useParams } from 'next/navigation'

export default function KitPage() {
  const params = useParams()
  const kitSlug = params.kitSlug as string
  const { features, loading } = useKitFeatures(kitSlug)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      {loading ? (
        <p>Loading...</p>
      ) : features.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      ) : (
        <p>No features available in this kit</p>
      )}
    </div>
  )
}

