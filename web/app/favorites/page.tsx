"use client";

import { useFavoriteFeatures } from "@/features/favorites/hooks/use-favorite-features";
import { FeatureCard } from "@/features/features/components/feature-card";
import { FeatureCardSkeleton } from "@/components/common/loading-skeleton";

export default function FavoritesPage() {
  const { data: favoriteFeatures = [], isLoading: loading } =
    useFavoriteFeatures();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Favorites</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
      ) : favoriteFeatures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      ) : (
        <p>No favorite features yet. Start adding some!</p>
      )}
    </div>
  );
}
