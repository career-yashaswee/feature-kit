import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Kit } from '@/lib/supabase/types'

type KitCardProps = {
  kit: Kit
  featureCount?: number
}

export function KitCard({ kit, featureCount = 0 }: KitCardProps) {
  return (
    <Link 
      href={`/kits/${kit.slug}`}
      aria-label={`Browse ${kit.name} kit with ${featureCount} ${featureCount === 1 ? 'feature' : 'features'}`}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" role="article">
        <CardHeader>
          <CardTitle>{kit.name}</CardTitle>
          {kit.description && (
            <CardDescription>{kit.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground" aria-label={`${featureCount} ${featureCount === 1 ? 'feature' : 'features'} available`}>
            {featureCount} {featureCount === 1 ? 'feature' : 'features'}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

