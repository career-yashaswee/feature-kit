'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Img } from 'react-image'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Kit } from '@/lib/supabase/types'

type KitCardProps = {
  kit: Kit
  featureCount?: number
}

export function KitCard({ kit, featureCount = 0 }: KitCardProps) {
  const { t } = useTranslation()
  const featureText = featureCount === 1 ? t("card.feature") : t("card.features")
  
  return (
    <Link 
      href={`/kits/${kit.slug}`}
      aria-label={`${t("header.kitsAria")}: ${kit.name} - ${featureCount} ${featureText}`}
      className="block"
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full overflow-hidden group" role="article">
        {kit.thumbnail_url && (
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
            <Img
              src={kit.thumbnail_url}
              alt={kit.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loader={
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton className="w-full h-full" />
                </div>
              }
              unloader={
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  <span className="text-sm">{t("card.imageError")}</span>
                </div>
              }
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <CardTitle className="text-xl mb-2">{kit.name}</CardTitle>
          <p className="text-sm text-muted-foreground" aria-label={`${featureCount} ${featureText} ${t("card.available")}`}>
            {featureCount} {featureText}
          </p>
        </CardHeader>
      </Card>
    </Link>
  )
}

