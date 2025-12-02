"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFeatures } from "@/features/features/hooks/use-features";
import { useKits } from "@/features/kits/hooks/use-kits";
import { useStacks } from "@/features/stacks/hooks/use-stacks";
import { useSearch } from "@/features/search/hooks/use-search";
import { Input } from "@/components/ui/input";
import { FeatureCard } from "@/features/features/components/feature-card";
import { KitCard } from "@/features/kits/components/kit-card";
import { StackCard } from "@/features/stacks/components/stack-card";
import {
  FeatureCardSkeleton,
  KitCardSkeleton,
  StackCardSkeleton,
} from "@/components/common/loading-skeleton";

export default function HomePage() {
  const { t } = useTranslation();
  const { data: features = [], isLoading: featuresLoading } = useFeatures();
  const { data: kits = [], isLoading: kitsLoading } = useKits();
  const { data: stacks = [], isLoading: stacksLoading } = useStacks();
  const { searchQuery, setSearchQuery, filteredFeatures } = useSearch(features);

  const kitFeatureCounts = useMemo(() => {
    if (featuresLoading || kitsLoading) return {};
    return kits.reduce(
      (acc, kit) => {
        acc[kit.id] = features.filter((f) => f.kit_id === kit.id).length;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [kits, features, featuresLoading, kitsLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("home.subtitle")}</p>
        <Input
          type="search"
          placeholder={t("home.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
          aria-label={t("home.searchAria")}
        />
      </div>

      {searchQuery ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {t("home.searchResults")} ({filteredFeatures.length})
          </h2>
          {featuresLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <FeatureCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          ) : (
            <p>{t("home.noFeaturesFound")}</p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("home.kits")}</h2>
            {kitsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <KitCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kits.map((kit) => (
                  <KitCard
                    key={kit.id}
                    kit={kit}
                    featureCount={kitFeatureCounts[kit.id] || 0}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t("home.features")}
            </h2>
            {featuresLoading ? (
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
              <p>{t("home.noFeaturesAvailable")}</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Stacks</h2>
            {stacksLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <StackCardSkeleton key={i} />
                ))}
              </div>
            ) : stacks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stacks.map((stack) => (
                  <StackCard key={stack.id} stack={stack} />
                ))}
              </div>
            ) : (
              <p>No stacks available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
