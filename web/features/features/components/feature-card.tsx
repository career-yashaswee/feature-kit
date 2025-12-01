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
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
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
        className="hover:shadow-lg transition-shadow cursor-pointer h-full relative"
        role="article"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8"
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              favorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
            )}
          />
        </Button>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="flex-1">{feature.name}</CardTitle>
            <TierTag tier={feature.tier} />
          </div>
          {feature.description && (
            <CardDescription>{feature.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {feature.tags && feature.tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mt-2"
              role="list"
              aria-label="Tags"
            >
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
        {feature.kit && (
          <CardFooter className="pt-0">
            <Badge variant="secondary" aria-label={`Kit: ${feature.kit.name}`}>
              {feature.kit.name}
            </Badge>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
