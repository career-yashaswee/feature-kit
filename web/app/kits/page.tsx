"use client";

import { useTranslation } from "react-i18next";
import { useKits } from "@/features/kits/hooks/use-kits";
import { useFeatures } from "@/features/features/hooks/use-features";
import { KitCard } from "@/features/kits/components/kit-card";
import { KitCardSkeleton } from "@/components/common/loading-skeleton";
import { EmptyState } from "@/features/empty-states";

export default function KitsPage() {
  const { t } = useTranslation();
  const { data: kits = [], isLoading: kitsLoading } = useKits();
  const { data: features = [], isLoading: featuresLoading } = useFeatures();
  const loading = kitsLoading || featuresLoading;

  // Count features per kit
  const kitFeatureCounts = kits.reduce(
    (acc, kit) => {
      acc[kit.id] = features.filter((f) => f.kit_id === kit.id).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t("kits.title")}</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <KitCardSkeleton key={i} />
          ))}
        </div>
      ) : kits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kits.map((kit) => (
            <KitCard
              key={kit.id}
              kit={kit}
              featureCount={kitFeatureCounts[kit.id] || 0}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          type="no-data"
          title={t("kits.noKitsAvailable")}
          description="There are no kits available at the moment."
        />
      )}
    </div>
  );
}
