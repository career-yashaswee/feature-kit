import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Kit } from '@/lib/supabase/types'

type KitCardProps = {
  kit: Kit
  featureCount?: number
}

export function KitCard({ kit, featureCount = 0 }: KitCardProps) {
  return (
    <Link href={`/kits/${kit.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <CardTitle>{kit.name}</CardTitle>
          {kit.description && (
            <CardDescription>{kit.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {featureCount} {featureCount === 1 ? 'feature' : 'features'}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

