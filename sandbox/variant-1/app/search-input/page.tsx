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
  const [searchResults, setMagnifyingGlassResults] = useState<typeof sampleData>([]);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <MagnifyingGlass className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">MagnifyingGlass & Voice</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            MagnifyingGlass Input Box
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A powerful search input with fuzzy search, debouncing, and speech
            recognition capabilities for enhanced user experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <MagnifyingGlass className="h-3 w-3" />
              Fuzzy MagnifyingGlass
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Microphone className="h-3 w-3" />
              Voice Input
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Lightning className="h-3 w-3" />
              Debounced
            </Badge>
          </div>
        </section>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
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
        </Card>

        {/* Example Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <MagnifyingGlass className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">MagnifyingGlass Input</CardTitle>
              </div>
              <CardDescription>
                MagnifyingGlass through sample food items with fuzzy matching and
                debouncing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchInput
                data={sampleData}
                searchKeys={["name", "category", "description"]}
                debounceMs={300}
                fuzzyThreshold={0.4}
                placeholder="MagnifyingGlass foods..."
                onMagnifyingGlass={(query, results) => {
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
          </Card>

          <Card className="border-2 shadow-lg">
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
          </Card>
        </div>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: MagnifyingGlass,
                  title: "Fuzzy MagnifyingGlass",
                  description:
                    "Uses Fuse.js for intelligent fuzzy matching with configurable threshold",
                },
                {
                  icon: Lightning,
                  title: "Debouncing",
                  description:
                    "Debounced search queries to reduce API calls and improve performance",
                },
                {
                  icon: Microphone,
                  title: "Speech Recognition",
                  description:
                    "Voice input support using react-speech-recognition and Web Speech API",
                },
                {
                  icon: Gear,
                  title: "Customizable",
                  description:
                    "Configurable search keys, debounce delay, and fuzzy threshold",
                },
                {
                  icon: Sparkle,
                  title: "Real-time Results",
                  description:
                    "Instant search results with loading indicators and empty states",
                },
                {
                  icon: Code,
                  title: "TypeScript",
                  description:
                    "Fully typed with TypeScript for better developer experience",
                },
              ].map((feature, index) => (
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
      </main>
    </div>
  );
}
