'use client'

import { useTranslation } from 'react-i18next'
import { useKitFeatures } from '@/features/kits/hooks/use-kit-features'
import { FeatureCard } from '@/components/feature-card'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FeatureCardSkeleton } from '@/components/loading-skeleton'

export default function KitPage() {
  const { t } = useTranslation()
  const params = useParams()
  const kitSlug = typeof params.kitSlug === 'string' ? params.kitSlug : ''
  
  if (!kitSlug) {
    return <div className="container mx-auto px-4 py-8"><p>{t("feature.invalidRoute")}</p></div>
  }
  const { data: features = [], isLoading: loading, error, refetch } = useKitFeatures(kitSlug)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t("kit.title")}</h1>
      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <h2 className="text-lg font-semibold text-destructive mb-2">
            {t("kit.errorLoading")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {error.message || t("kit.errorMessage")}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="mt-2"
          >
            {t("common.tryAgain")}
          </Button>
        </div>
      ) : loading ? (
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
        <p>{t("kit.noFeaturesAvailable")}</p>
      )}
    </div>
  )
}

