"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SlidersHorizontal,
  MusicNote,
  MusicNotes,
  MusicNotesPlus,
  CheckCircle,
  Clock,
  Circle,
  Star,
  Palette,
  Stack,
  Tag,
  Database,
  Code,
  HardDrives,
  Brain,
  SquaresFour,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import { FilterSheet } from "@/features/filter-sheet/components/filter-sheet";
import type { Filter, FilterOption } from "@/features/filter-sheet/types";

const features = [
  {
    title: "Multiple Filter Types",
    description: "Support for select, checkbox, multiselect, and tag filters",
    icon: SlidersHorizontal,
  },
  {
    title: "Configurable",
    description: "Fully configurable filters with custom options and icons",
    icon: Gear,
  },
  {
    title: "Responsive",
    description: "Sheet-based filter panel that works on all screen sizes",
    icon: Lightning,
  },
];

export default function FilterSheetPage() {
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(
    []
  );
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const difficultyOptions: FilterOption[] = [
    {
      value: "EASY",
      label: "Easy",
      icon: MusicNote,
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      value: "MEDIUM",
      label: "Medium",
      icon: MusicNotes,
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      value: "HARD",
      label: "Hard",
      icon: MusicNotesPlus,
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ];

  const statusOptions: FilterOption[] = [
    {
      value: "NOT_STARTED",
      label: "Not Started",
      icon: Circle,
      iconColor: "text-slate-600 dark:text-slate-400",
    },
    {
      value: "IN_PROGRESS",
      label: "In Progress",
      icon: Clock,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      value: "COMPLETED",
      label: "Completed",
      icon: CheckCircle,
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const availableTags = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "JavaScript",
    "Tailwind",
    "Shadcn",
  ];

  const availableVariants = [
    { id: "v1", label: "Variant 1" },
    { id: "v2", label: "Variant 2" },
    { id: "v3", label: "Variant 3" },
  ];

  const availableStacks = [
    { id: "stack1", label: "Full Stack", icon: Stack },
    { id: "stack2", label: "Frontend", icon: SquaresFour },
    { id: "stack3", label: "Backend", icon: HardDrives },
  ];

  const availableDependencies = [
    {
      id: "dep1",
      label: "React",
      iconUrl: null,
    },
    {
      id: "dep2",
      label: "TypeScript",
      iconUrl: null,
    },
    {
      id: "dep3",
      label: "Next.js",
      iconUrl: null,
    },
  ];

  const availableDomains = [
    { id: "FRONTEND", label: "Frontend", icon: SquaresFour },
    { id: "BACKEND", label: "Backend", icon: HardDrives },
    { id: "DATABASE", label: "Database", icon: Database },
    { id: "DEVOPS", label: "DevOps", icon: Gear },
    { id: "AI", label: "AI", icon: Brain },
  ];

  const filters: Filter[] = [
    {
      type: "select",
      id: "difficulty",
      label: "Difficulty",
      icon: SlidersHorizontal,
      value: difficulty,
      options: difficultyOptions,
      onChange: setDifficulty,
    },
    {
      type: "select",
      id: "status",
      label: "Status",
      icon: CheckCircle,
      value: status,
      options: statusOptions,
      onChange: setStatus,
    },
    {
      type: "checkbox",
      id: "favorites",
      label: "Favorites",
      icon: Star,
      checked: favoriteOnly,
      onChange: setFavoriteOnly,
      description: "Show only favorite items",
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
      type: "multiselect",
      id: "variants",
      label: "Variants",
      icon: Palette,
      selectedValues: selectedVariants,
      options: availableVariants.map((v) => ({
        id: v.id,
        label: v.label,
      })),
      onChange: setSelectedVariants,
    },
    {
      type: "multiselect",
      id: "stacks",
      label: "Stacks",
      icon: Stack,
      selectedValues: selectedStacks,
      options: availableStacks.map((s) => ({
        id: s.id,
        label: s.label,
        icon: s.icon,
      })),
      onChange: setSelectedStacks,
    },
    {
      type: "multiselect",
      id: "dependencies",
      label: "Dependencies",
      icon: Code,
      selectedValues: selectedDependencies,
      options: availableDependencies.map((d) => ({
        id: d.id,
        label: d.label,
        iconUrl: d.iconUrl,
      })),
      onChange: setSelectedDependencies,
    },
    {
      type: "multiselect",
      id: "domains",
      label: "Domains",
      icon: Database,
      selectedValues: selectedDomains,
      options: availableDomains.map((d) => ({
        id: d.id,
        label: d.label,
        icon: d.icon,
      })),
      onChange: setSelectedDomains,
    },
  ];

  const handleClearAll = () => {
    setDifficulty("ALL");
    setStatus("ALL");
    setFavoriteOnly(false);
    setSelectedTags([]);
    setSelectedVariants([]);
    setSelectedStacks([]);
    setSelectedDependencies([]);
    setSelectedDomains([]);
  };

  const activeFiltersCount =
    (difficulty !== "ALL" ? 1 : 0) +
    (status !== "ALL" ? 1 : 0) +
    (favoriteOnly ? 1 : 0) +
    selectedTags.length +
    selectedVariants.length +
    selectedStacks.length +
    selectedDependencies.length +
    selectedDomains.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Filter Sheet component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the 'Open Filter Sheet' button below",
                "Try different filter types: select, checkbox, multiselect, tags",
                "Select multiple options in multiselect and tag filters",
                "Use the 'Clear All Filters' button to reset",
                "Notice how the active filters count updates",
                "Check the responsive behavior on different screen sizes",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Test the filter sheet with various filter types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Filter Sheet</h3>
                <p className="text-sm text-muted-foreground">
                  {activeFiltersCount} active filter
                  {activeFiltersCount !== 1 ? "s" : ""}
                </p>
              </div>
              <Button onClick={() => setOpen(true)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Open Filter Sheet
              </Button>
            </div>

            {activeFiltersCount > 0 && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="text-sm font-medium mb-2">Active Filters:</div>
                <div className="flex flex-wrap gap-2">
                  {difficulty !== "ALL" && (
                    <Badge variant="default">Difficulty: {difficulty}</Badge>
                  )}
                  {status !== "ALL" && (
                    <Badge variant="default">Status: {status}</Badge>
                  )}
                  {favoriteOnly && <Badge variant="default">Favorites</Badge>}
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="default">
                      Tag: {tag}
                    </Badge>
                  ))}
                  {selectedVariants.map((id) => {
                    const variant = availableVariants.find((v) => v.id === id);
                    return (
                      <Badge key={id} variant="default">
                        Variant: {variant?.label}
                      </Badge>
                    );
                  })}
                  {selectedStacks.map((id) => {
                    const stack = availableStacks.find((s) => s.id === id);
                    return (
                      <Badge key={id} variant="default">
                        Stack: {stack?.label}
                      </Badge>
                    );
                  })}
                  {selectedDependencies.map((id) => {
                    const dep = availableDependencies.find((d) => d.id === id);
                    return (
                      <Badge key={id} variant="default">
                        Dep: {dep?.label}
                      </Badge>
                    );
                  })}
                  {selectedDomains.map((id) => {
                    const domain = availableDomains.find((d) => d.id === id);
                    return (
                      <Badge key={id} variant="default">
                        Domain: {domain?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Filter Types</CardTitle>
            </div>
            <CardDescription>
              Different types of filters supported
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Select",
                  description: "Single selection dropdown with icons",
                  example: "Difficulty, Status",
                },
                {
                  type: "Checkbox",
                  description: "Single boolean toggle",
                  example: "Favorites only",
                },
                {
                  type: "Multiselect",
                  description: "Multiple selection with checkboxes",
                  example: "Variants, Stacks, Dependencies",
                },
                {
                  type: "Tags",
                  description: "Tag-based selection with chips",
                  example: "Tags filter",
                },
              ].map((filterType, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border bg-muted/50 p-4"
                >
                  <div className="flex-1">
                    <div className="font-medium">{filterType.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {filterType.description}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Example: {filterType.example}
                    </div>
                  </div>
                  <Badge variant="outline">{filterType.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <FilterSheet
          open={open}
          onOpenChange={setOpen}
          filters={filters}
          title="Filters"
          description="Filter by various criteria"
          onClearAll={handleClearAll}
        />
      </main>
    </div>
  );
}
