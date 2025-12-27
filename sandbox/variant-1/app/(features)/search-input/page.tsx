"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  MagnifyingGlass,
  CursorClick,
  Microphone,
  Sparkle,
  Code,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import { SearchInput } from "@/features/search-input/components/search-input";
import type { SearchInputProps } from "@/features/search-input/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const sampleData = [
  {
    id: 1,
    name: "Apple",
    category: "Fruit",
    description: "A red or green fruit",
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruit",
    description: "A yellow curved fruit",
  },
  {
    id: 3,
    name: "Carrot",
    category: "Vegetable",
    description: "An orange root vegetable",
  },
  {
    id: 4,
    name: "Broccoli",
    category: "Vegetable",
    description: "A green vegetable",
  },
  {
    id: 5,
    name: "Chicken",
    category: "Meat",
    description: "A white meat protein",
  },
  { id: 6, name: "Salmon", category: "Fish", description: "A pink fish" },
  { id: 7, name: "Rice", category: "Grain", description: "A white grain" },
  {
    id: 8,
    name: "Bread",
    category: "Grain",
    description: "Baked flour product",
  },
  { id: 9, name: "Milk", category: "Dairy", description: "White dairy drink" },
  {
    id: 10,
    name: "Cheese",
    category: "Dairy",
    description: "Fermented dairy product",
  },
];

export default function SearchInputPage() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof sampleData)[0] | null
  >(null);
  const [searchQuery, setMagnifyingGlassQuery] = useState("");
  const [searchResults, setMagnifyingGlassResults] = useState<
    typeof sampleData
  >([]);

  const initialConfig: PropConfig[] = [
    {
      property: "placeholder",
      type: "string",
      description: "Placeholder text for the search input",
      defaultValue: "Search...",
      value: "Search...",
      inputType: "text",
    },
    {
      property: "debounceMs",
      type: "number",
      description: "Debounce delay in milliseconds",
      defaultValue: 300,
      value: 300,
      inputType: "number",
    },
    {
      property: "fuzzyThreshold",
      type: "number",
      description: "Fuzzy search threshold (0-1, lower is more strict)",
      defaultValue: 0.4,
      value: 0.4,
      inputType: "number",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<
    string,
    keyof SearchInputProps<(typeof sampleData)[0]>
  > = {
    placeholder: "placeholder",
    debounceMs: "debounceMs",
    fuzzyThreshold: "fuzzyThreshold",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } = usePropsApi<
    SearchInputProps<(typeof sampleData)[0]>
  >({
    initialConfig,
    propMap,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Live Demo */}
        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the component update in real-time as you change props below.
              Note: Complex props like `data`, `searchKeys`, `onSearch`,
              `onResultClick`, and `renderResult` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchInput
              data={sampleData}
              searchKeys={["name", "category", "description"]}
              onSearch={(query, results) => {
                setMagnifyingGlassQuery(query);
                setMagnifyingGlassResults(results);
              }}
              onResultClick={(item) => {
                setSelectedItem(item);
              }}
              renderResult={(item) => (
                <div className="space-y-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.category} • {item.description}
                  </div>
                </div>
              )}
              {...getComponentProps}
            />
            {searchQuery && (
              <div className="mt-2 text-sm text-muted-foreground">
                Found {searchResults.length} result
                {searchResults.length !== 1 ? "s" : ""} for &quot;
                {searchQuery}&quot;
              </div>
            )}
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `data`, `searchKeys`, `onSearch`, `onResultClick`, and `renderResult` are not editable here."
        />

        {/* How to Test Card */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Type in the search box or use voice input to search through the
              sample data. Notice the debouncing and fuzzy search capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Type in the search box to see fuzzy search results",
                "Try searching for partial words (e.g., 'app' finds 'Apple')",
                "Click the microphone icon to use voice input (if supported)",
                "Notice the debouncing - results update after you stop typing",
                "Click on any result to select it",
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
        </BaseCard>

        {/* Example Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <BaseCard>
            <CardHeader className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <MagnifyingGlass className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Search Input Example</CardTitle>
              </div>
              <CardDescription>
                Search through sample food items with fuzzy matching and
                debouncing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchInput
                data={sampleData}
                searchKeys={["name", "category", "description"]}
                debounceMs={300}
                fuzzyThreshold={0.4}
                placeholder="Search foods..."
                onSearch={(query, results) => {
                  setMagnifyingGlassQuery(query);
                  setMagnifyingGlassResults(results);
                }}
                onResultClick={(item) => {
                  setSelectedItem(item);
                }}
                renderResult={(item) => (
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.category} • {item.description}
                    </div>
                  </div>
                )}
              />
              {searchQuery && (
                <div className="text-sm text-muted-foreground">
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""} for &quot;
                  {searchQuery}&quot;
                </div>
              )}
            </CardContent>
          </BaseCard>

          <BaseCard>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <Sparkle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Selected Item</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-2">
                  <div className="text-lg font-semibold">
                    {selectedItem.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {selectedItem.category}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedItem.description}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Click on a search result to see details here
                </div>
              )}
            </CardContent>
          </BaseCard>
        </div>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/search-input",
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return null;
        })()}

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/search-input",
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: <MagnifyingGlass className="h-5 w-5 text-primary" />,
              title: "Fuzzy Search",
              description:
                "Uses Fuse.js for intelligent fuzzy matching with configurable threshold",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Debouncing",
              description:
                "Debounced search queries to reduce API calls and improve performance",
            },
            {
              icon: <Microphone className="h-5 w-5 text-primary" />,
              title: "Speech Recognition",
              description:
                "Voice input support using react-speech-recognition and Web Speech API",
            },
            {
              icon: <Gear className="h-5 w-5 text-primary" />,
              title: "Customizable",
              description:
                "Configurable search keys, debounce delay, and fuzzy threshold",
            },
            {
              icon: <Sparkle className="h-5 w-5 text-primary" />,
              title: "Real-time Results",
              description:
                "Instant search results with loading indicators and empty states",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript",
              description:
                "Fully typed with TypeScript for better developer experience",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
