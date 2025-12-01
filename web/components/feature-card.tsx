import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Feature } from "@/lib/supabase/types";
import { TierTag } from "@/components/tier-tag";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Link 
      href={`/kits/${feature.kit?.slug}/${feature.slug}`}
      aria-label={`View ${feature.name} feature${feature.kit ? ` from ${feature.kit.name} kit` : ''}`}
    >
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" role="article">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="flex-1">{feature.name}</CardTitle>
            <div className="flex items-center gap-2 shrink-0">
              <TierTag tier={feature.tier} />
              {feature.kit && (
                <Badge variant="secondary" aria-label={`Kit: ${feature.kit.name}`}>
                  {feature.kit.name}
                </Badge>
              )}
            </div>
          </div>
          {feature.description && (
            <CardDescription>{feature.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {feature.tags && feature.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2" role="list" aria-label="Tags">
              {feature.tags.map((tag) => (
                <Badge 
                  key={tag.id} 
                  variant="outline" 
                  className="text-xs"
                  role="listitem"
                  aria-label={`Tag: ${tag.name}`}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
