'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" role="article">
        <CardHeader>
          <CardTitle>{kit.name}</CardTitle>
          {kit.description && (
            <CardDescription>{kit.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground" aria-label={`${featureCount} ${featureText} ${t("card.available")}`}>
            {featureCount} {featureText}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

