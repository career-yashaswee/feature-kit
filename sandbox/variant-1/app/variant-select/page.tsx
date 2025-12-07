"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Zap, Settings } from "lucide-react";
import { VariantSelect } from "@/features/variant-select";
import type { Variant } from "@/features/variant-select/types";

export default function VariantSelectPage() {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const sampleVariants: Variant[] = [
    {
      id: "variant-1",
      display_name: "React + TypeScript",
      dependencies: [
        { id: "dep-1", name: "React", mark_url: null },
        { id: "dep-2", name: "TypeScript", mark_url: null },
      ],
      stack: { id: "stack-1", name: "Frontend" },
    },
    {
      id: "variant-2",
      display_name: "Next.js + Tailwind",
      dependencies: [
        { id: "dep-3", name: "Next.js", mark_url: null },
        { id: "dep-4", name: "Tailwind CSS", mark_url: null },
      ],
      stack: { id: "stack-1", name: "Frontend" },
    },
    {
      id: "variant-3",
      display_name: "Node.js + Express",
      dependencies: [
        { id: "dep-5", name: "Node.js", mark_url: null },
        { id: "dep-6", name: "Express", mark_url: null },
      ],
      stack: { id: "stack-2", name: "Backend" },
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Variant Select</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Variant Selector
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Flexible variant selector with dependency visualization, stack
            badges, and persistent selection state. Supports both display and
            selector modes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Layers className="h-3 w-3" />
              Variants
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Zap className="h-3 w-3" />
              Persistent
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Settings className="h-3 w-3" />
              Configurable
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Test the variant selector functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the variant selector button to open the dropdown",
                "Browse through available variants with their dependencies",
                "Select a variant - it will be persisted automatically",
                "Refresh the page - your selection should persist",
                "Try switching between display and selector modes",
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
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Selector Mode</CardTitle>
            </div>
            <CardDescription>
              Full-featured variant selector with dropdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <VariantSelect
                featureId="demo-feature"
                variants={sampleVariants}
                mode="selector"
                onVariantSelect={(variantId) => {
                  setSelectedVariantId(variantId);
                  console.log("Selected variant:", variantId);
                }}
              />
            </div>
            {selectedVariantId && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Selected:{" "}
                  <span className="font-semibold">{selectedVariantId}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Display Mode</CardTitle>
            </div>
            <CardDescription>
              Simple badge display showing variant count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VariantSelect
              featureId="demo-feature-2"
              variants={sampleVariants}
              mode="display"
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
            <CardDescription>
              Key capabilities of the variant selector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Layers,
                  title: "Dependency Icons",
                  description:
                    "Visual representation of variant dependencies with icons",
                },
                {
                  icon: Zap,
                  title: "Persistent State",
                  description:
                    "Selection state persists across page reloads using Zustand",
                },
                {
                  icon: Settings,
                  title: "Adapter Pattern",
                  description:
                    "Configurable adapter for custom state management",
                },
                {
                  icon: Layers,
                  title: "Stack Badges",
                  description: "Display stack information with visual badges",
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
