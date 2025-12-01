'use client'

import { useTranslation } from 'react-i18next'
import { useFeatures } from '@/features/features/hooks/use-features'
import { FeatureCard } from '@/features/features/components/feature-card'
import { FeatureCardSkeleton } from '@/components/common/loading-skeleton'

export default function FeaturesPage() {
  const { t } = useTranslation()
  const { data: features = [], isLoading: loading } = useFeatures()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t("home.features")}</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
      ) : features.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      ) : (
        <p>{t("home.noFeaturesAvailable")}</p>
      )}
    </div>
  )
}

