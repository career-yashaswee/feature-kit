"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Feature } from "@/lib/supabase/types";
import { TierTag } from "@/features/features/components/tier-tag";
import { useFavoritesStore } from "@/features/favorites/store/use-favorites-store";
import { VariantSelect } from "@/features/variants/components/variant-select";
import { useVariants } from "@/features/variants/hooks/use-variants";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { data: variants } = useVariants(feature.id);
  const favorite = isFavorite(feature.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(feature.id);
  };

  return (
    <Link
      href={`/kits/${feature.kit?.slug}/${feature.slug}`}
      aria-label={`View ${feature.name} feature${feature.kit ? ` from ${feature.kit.name} kit` : ""}`}
    >
      <Card
        className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
        role="article"
      >
        <CardHeader className="flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <CardTitle className="flex-1 min-w-0">{feature.name}</CardTitle>
              <TierTag tier={feature.tier} className="flex-shrink-0" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={handleFavoriteClick}
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  favorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground",
                )}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {feature.description && (
            <CardDescription>{feature.description}</CardDescription>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2 flex-shrink-0">
          {feature.kit && (
            <Badge variant="secondary" aria-label={`Kit: ${feature.kit.name}`}>
              {feature.kit.name}
            </Badge>
          )}
          {variants && variants.length > 0 && (
            <VariantSelect
              featureId={feature.id}
              variants={variants}
              mode="display"
            />
          )}
          {feature.tags && feature.tags.length > 0 && (
            <>
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
            </>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
