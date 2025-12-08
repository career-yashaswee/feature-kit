"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/features/empty-states";
import { FilterSheet } from "@/features/filter-sheet";
import type { Filter } from "@/features/filter-sheet/types";
import { ScrollToTopButton } from "@/features/scroll-to-top";
import { useSearchInput } from "@/features/search-input";
import {
  ArrowCircleUp,
  ArrowUp,
  ArrowsClockwise,
  Bell,
  ChartBar,
  ChatCircle,
  Compass,
  Copy,
  Download,
  FileText,
  FloppyDisk,
  Keyboard,
  Lightning,
  LinkedinLogo,
  MagnifyingGlass,
  Monitor,
  Rocket,
  Scroll,
  Share,
  SlidersHorizontal,
  SquaresFour,
  Stack,
  Tag,
  Target,
  Tray,
  Warning,
  WifiHigh,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const RestoreScrollPosition = dynamic(
  () =>
    import("@/features/restore-scroll-position").then((mod) => ({
      default: mod.RestoreScrollPosition,
    })),
  { ssr: false }
);

const NetworkStatusListener = dynamic(
  () =>
    import("@/features/network-status-listener").then((mod) => ({
      default: mod.NetworkStatusListener,
    })),
  { ssr: false }
);

import featuresData from "@/data/features.json";

type FeatureData = {
  name: string;
  path: string;
  icon: string;
  description: string;
  category: string;
  statusBadge?: string;
  lastUpdatedAt?: string;
};

type Feature = {
  name: string;
  path: string;
  icon: typeof ArrowUp;
  description: string;
  category: string;
  statusBadge?: string;
  lastUpdatedAt?: string;
};

const getStatusFromBadge = (
  statusBadge?: string
): "online" | "offline" | "maintenance" | "degraded" | null => {
  if (!statusBadge) return null;
  const badgeLower = statusBadge.toLowerCase();
  if (
    badgeLower === "new" ||
    badgeLower === "updated" ||
    badgeLower === "fixed"
  ) {
    return "online";
  }
  if (badgeLower === "maintenance") {
    return "maintenance";
  }
  if (badgeLower === "degraded" || badgeLower === "deprecated") {
    return "degraded";
  }
  if (badgeLower === "offline") {
    return "offline";
  }
  return "online";
};

const iconMap: Record<string, typeof ArrowUp> = {
  ArrowUp,
  ArrowsClockwise,
  Download,
  FloppyDisk,
  WifiHigh,
  Lightning,
  Keyboard,
  Tray,
  FileText,
  Warning,
  Copy,
  Scroll,
  Share,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  LinkedinLogo,
  Target,
  Tag,
  Rocket,
  Compass,
  Bell,
  ChartBar,
  SlidersHorizontal,
  Stack,
  Monitor,
};

const allFeatures: Feature[] = (featuresData as FeatureData[]).map(
  (feature) => ({
    ...feature,
    icon: iconMap[feature.icon] || ArrowUp,
  })
);

function HomePage() {
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFeatureTags, setSelectedFeatureTags] = useState<string[]>([]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(allFeatures.map((f) => f.category))
    );
    return uniqueCategories.sort();
  }, []);

  const {
    query,
    setQuery,
    results: searchResults,
  } = useSearchInput({
    data: allFeatures,
    searchKeys: ["name", "description"],
    debounceMs: 300,
  });

  const filteredFeatures = useMemo(() => {
    let filtered = searchResults;

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((f) => {
        const featureTags = [
          f.category.toLowerCase(),
          ...f.description.toLowerCase().split(" "),
          ...f.name.toLowerCase().split(" "),
        ];
        return selectedTags.some((tag) =>
          featureTags.some((ft) => ft.includes(tag.toLowerCase()))
        );
      });
    }

    if (selectedFeatureTags.length > 0) {
      filtered = filtered.filter((f) => {
        if (!f.statusBadge) return false;
        return selectedFeatureTags.includes(f.statusBadge);
      });
    }

    return filtered;
  }, [searchResults, selectedCategory, selectedTags, selectedFeatureTags]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    allFeatures.forEach((f) => {
      tags.add(f.category.toLowerCase());
      f.description
        .toLowerCase()
        .split(" ")
        .forEach((word) => {
          if (word.length > 3) tags.add(word);
        });
    });
    return Array.from(tags).sort();
  }, []);

  const availableFeatureTags = useMemo(() => {
    const tags = new Set<string>();
    allFeatures.forEach((f) => {
      if (f.statusBadge) {
        tags.add(f.statusBadge);
      }
    });
    return Array.from(tags).sort();
  }, []);

  const filters: Filter[] = [
    {
      type: "select",
      id: "category",
      label: "Category",
      icon: Tag,
      value: selectedCategory,
      options: categories.map((cat) => ({ value: cat, label: cat })),
      onChange: setSelectedCategory,
    },
    {
      type: "tags",
      id: "tags",
      label: "Tags",
      icon: Tag,
      selectedTags,
      availableTags,
      onChange: setSelectedTags,
    },
    {
      type: "tags",
      id: "feature-tags",
      label: "Feature Tags",
      icon: Tag,
      selectedTags: selectedFeatureTags,
      availableTags: availableFeatureTags,
      onChange: setSelectedFeatureTags,
    },
  ];

  const handleClearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedTags([]);
    setSelectedFeatureTags([]);
    setQuery("");
  };

  return (
    <RestoreScrollPosition storageKey="home-page-scroll" persist>
      <NetworkStatusListener />
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 p-8">
          <section className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
              <Lightning className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Feature Kit</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Sandbox React Variant
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore and test all available features. Click on any feature card
              to see it in action.
            </p>
            <Badge variant="default" className="gap-1.5 demo-badge">
              {filteredFeatures.length} of {allFeatures.length} Features
            </Badge>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search features by Name or Description"
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFilterSheetOpen(true)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedCategory !== "ALL" ||
                selectedTags.length > 0 ||
                selectedFeatureTags.length > 0) && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">
                  {(selectedCategory !== "ALL" ? 1 : 0) +
                    selectedTags.length +
                    selectedFeatureTags.length}
                </Badge>
              )}
            </Button>
          </div>

          {filteredFeatures.length === 0 ? (
            <EmptyState
              type="search"
              title="No features found"
              description="Try adjusting your search or filter criteria to find what you're looking for."
              onAction={handleClearFilters}
              actionLabel="Clear all filters"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeatures.map((feature) => (
                <Link key={feature.path} href={feature.path}>
                  <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.category}
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <CardTitle>{feature.name}</CardTitle>
                        {feature.statusBadge &&
                          getStatusFromBadge(feature.statusBadge) && (
                            <Status
                              status={getStatusFromBadge(feature.statusBadge)!}
                            >
                              <StatusIndicator />
                              <StatusLabel>
                                {feature.statusBadge}
                                {feature.lastUpdatedAt && (
                                  <span className="ml-1 text-xs opacity-80">
                                    {(() => {
                                      try {
                                        const date = new Date(
                                          feature.lastUpdatedAt
                                        );
                                        const distance = formatDistanceToNow(
                                          date,
                                          { addSuffix: true }
                                        );
                                        // Convert to short format: "2d ago", "2w ago", "just now", etc.
                                        if (
                                          distance.includes("second") ||
                                          (distance.includes("minute") &&
                                            distance.includes("less than"))
                                        ) {
                                          return "just now";
                                        }
                                        const shortDistance = distance
                                          .replace(/about /g, "")
                                          .replace(/less than a /g, "")
                                          .replace(/over /g, "")
                                          .replace(/almost /g, "")
                                          .replace(/ minutes?/g, "m")
                                          .replace(/ hours?/g, "h")
                                          .replace(/ days?/g, "d")
                                          .replace(/ weeks?/g, "w")
                                          .replace(/ months?/g, "mo")
                                          .replace(/ years?/g, "y");
                                        return shortDistance;
                                      } catch {
                                        return "";
                                      }
                                    })()}
                                  </span>
                                )}
                              </StatusLabel>
                            </Status>
                          )}
                      </div>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>View Demo</span>
                        <ArrowUp className="h-4 w-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <FilterSheet
            open={filterSheetOpen}
            onOpenChange={setFilterSheetOpen}
            filters={filters}
            title="Filter Features"
            description="Filter features by category and tags"
            onClearAll={handleClearFilters}
          />
        </main>
        <ScrollToTopButton position="center" threshold={300}>
          <ArrowCircleUp className="h-4 w-4" />
        </ScrollToTopButton>
      </div>
    </RestoreScrollPosition>
  );
}

export default HomePage;
