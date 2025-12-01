'use client'

import { useFeatures } from '@/features/features/hooks/use-features'
import { FeatureCard } from '@/components/feature-card'

export default function FeaturesPage() {
  const { features, loading } = useFeatures()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Features</h1>
      {loading ? (
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
  )
}

