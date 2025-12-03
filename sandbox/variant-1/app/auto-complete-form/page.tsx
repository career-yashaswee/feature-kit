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
  Search,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
  Database,
} from "lucide-react";
import { AutoCompleteForm } from "@/features/auto-complete-form/components/auto-complete-form";

const staticOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Lemon", value: "lemon" },
];

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "India", value: "in" },
  { label: "Brazil", value: "br" },
  { label: "China", value: "cn" },
];

export default function AutoCompleteFormPage() {
  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const asyncOptions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return countries;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Form Auto-complete</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Form Auto-complete
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A powerful autocomplete component with static and async data
            support, debouncing, custom filtering, and flexible rendering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Sparkles className="h-3 w-3" />
              Static & Async
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Settings className="h-3 w-3" />
              Debounced
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Code className="h-3 w-3" />
              Customizable
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Zap className="h-3 w-3" />
              Type-safe
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription className="text-base">
              Start typing in any autocomplete field to see suggestions appear.
              Select an option or continue typing for custom values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Start typing in the autocomplete field",
                  "See suggestions appear as you type",
                  "Click on a suggestion to select it",
                  "Try typing something that doesn't match (if allowCustom is enabled)",
                  "Test the async autocomplete with debouncing",
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
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Static Options</CardTitle>
            </div>
            <CardDescription>
              Autocomplete with predefined static options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Select a Fruit
                </label>
                <AutoCompleteForm
                  options={staticOptions}
                  value={selectedFruit}
                  onChange={setSelectedFruit}
                  onSelect={(option) => {
                    console.log("Selected:", option);
                    setSelectedFruit(option.value);
                  }}
                  placeholder="Type to search fruits..."
                  allowCustom={true}
                />
                {selectedFruit && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {selectedFruit}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Async Options</CardTitle>
            </div>
            <CardDescription>
              Autocomplete with async data loading and debouncing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Select a Country
                </label>
                <AutoCompleteForm
                  options={asyncOptions}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  onSelect={(option) => {
                    console.log("Selected:", option);
                    setSelectedCountry(option.value);
                  }}
                  placeholder="Type to search countries..."
                  debounceMs={500}
                  minLength={2}
                  allowCustom={false}
                />
                {selectedCountry && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {selectedCountry}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Configuration Options</CardTitle>
            </div>
            <CardDescription>
              Different configurations and use cases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Minimum 2 Characters
                </label>
                <AutoCompleteForm
                  options={staticOptions}
                  placeholder="Type at least 2 characters..."
                  minLength={2}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Custom Debounce (800ms)
                </label>
                <AutoCompleteForm
                  options={asyncOptions}
                  placeholder="Debounced search (800ms)..."
                  debounceMs={800}
                  minLength={1}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Disabled State
                </label>
                <AutoCompleteForm
                  options={staticOptions}
                  placeholder="This field is disabled..."
                  disabled={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Database,
                  title: "Static & Async Data",
                  description:
                    "Support for both static arrays and async data fetching functions",
                },
                {
                  icon: Zap,
                  title: "Debounced Search",
                  description:
                    "Configurable debounce delay to reduce API calls during typing",
                },
                {
                  icon: Settings,
                  title: "Custom Filtering",
                  description:
                    "Custom filter functions for advanced search logic",
                },
                {
                  icon: Code,
                  title: "Type-safe",
                  description:
                    "Full TypeScript support with proper type definitions",
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
