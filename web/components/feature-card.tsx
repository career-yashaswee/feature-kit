import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Feature } from '@/lib/supabase/types'

type FeatureCardProps = {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Link href={`/kits/${feature.kit?.slug}/${feature.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{feature.name}</CardTitle>
            {feature.kit && (
              <Badge variant="secondary">{feature.kit.name}</Badge>
            )}
          </div>
          {feature.description && (
            <CardDescription>{feature.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {feature.tags && feature.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {feature.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

