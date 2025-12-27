"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFeatures } from "@/features/features/hooks/use-features";
import { useKits } from "@/features/kits/hooks/use-kits";
import { useStacks } from "@/features/stacks/hooks/use-stacks";
import { useSearch } from "@/features/search";
import { FilterSheet, useFilterSheet } from "@/features/filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sliders } from "lucide-react";
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
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Search functionality
  const {
    searchQuery,
    setSearchQuery,
    filteredFeatures: searchResults,
  } = useSearch(features);

  // Filter functionality
  const { getFilter, setFilter, clearAllFilters } = useFilterSheet({
    defaults: {
      kit: "ALL",
      tier: "ALL",
      tags: [] as string[],
    },
  });

  const selectedKit = getFilter("kit");
  const selectedTier = getFilter("tier");
  const selectedTagsRaw = getFilter("tags");
  const selectedTags = useMemo(() => selectedTagsRaw || [], [selectedTagsRaw]);

  // Get all unique tags from features
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    features.forEach((feature) => {
      feature.tags?.forEach((tag) => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet).sort();
  }, [features]);

  // Apply filters to search results
  const filteredFeatures = useMemo(() => {
    let result = searchResults;

    // Filter by kit
    if (selectedKit && selectedKit !== "ALL") {
      result = result.filter((f) => f.kit?.id === selectedKit);
    }

    // Filter by tier
    if (selectedTier && selectedTier !== "ALL") {
      result = result.filter((f) => f.tier === selectedTier);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((f) => {
        const featureTags = f.tags?.map((t) => t.name) || [];
        return selectedTags.some((tag) => featureTags.includes(tag));
      });
    }

    return result;
  }, [searchResults, selectedKit, selectedTier, selectedTags]);

  const kitFeatureCounts = useMemo(() => {
    if (featuresLoading || kitsLoading) return {};
    return kits.reduce(
      (acc, kit) => {
        acc[kit.id] = features.filter((f) => f.kit_id === kit.id).length;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [kits, features, featuresLoading, kitsLoading]);

  // Build filter configuration
  const filters = useMemo(() => {
    return [
      {
        type: "select" as const,
        id: "kit",
        label: t("filter.kit"),
        value: selectedKit || "ALL",
        options: [
          { value: "ALL", label: t("filter.allKits") },
          ...kits.map((kit) => ({
            value: kit.id,
            label: kit.name,
          })),
        ],
        onChange: (value: string) => setFilter("kit", value),
      },
      {
        type: "select" as const,
        id: "tier",
        label: t("filter.tier"),
        value: selectedTier || "ALL",
        options: [
          { value: "ALL", label: t("filter.allTiers") },
          { value: "free", label: t("tier.free") },
          { value: "plus", label: t("tier.plus") },
        ],
        onChange: (value: string) => setFilter("tier", value),
      },
      {
        type: "tags" as const,
        id: "tags",
        label: t("filter.tags"),
        selectedTags: selectedTags,
        availableTags: allTags,
        onChange: (tags: string[]) => setFilter("tags", tags),
      },
    ];
  }, [selectedKit, selectedTier, selectedTags, allTags, kits, setFilter, t]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
        <p className="text-muted-foreground mb-6">{t("home.subtitle")}</p>
        <div className="flex items-center gap-2 max-w-md">
          <Input
            type="search"
            placeholder={t("home.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            aria-label={t("home.searchAria")}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFilterSheetOpen(true)}
            aria-label={t("filter.openFilters")}
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        filters={filters}
        title={t("filter.title")}
        description={t("filter.description")}
        onClearAll={async () => {
          await clearAllFilters();
        }}
        clearAllLabel={t("filter.clearAll")}
        enableUrlSync={true}
      />

      {searchQuery ||
      selectedKit !== "ALL" ||
      selectedTier !== "ALL" ||
      selectedTags.length > 0 ? (
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
