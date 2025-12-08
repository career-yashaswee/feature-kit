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
import { Stack, Lightning, Gear } from "@phosphor-icons/react";
import { VariantSelect } from "@/features/variant-select";
import type { Variant } from "@/features/variant-select/types";

export default function VariantSelectPage() {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
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
    <>
      <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Stack className="h-5 w-5 text-primary" />
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
                <Stack className="h-5 w-5 text-primary" />
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
                <Stack className="h-5 w-5 text-primary" />
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
                <Lightning className="h-5 w-5 text-primary" />
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
                  icon: Stack,
                  title: "Dependency Icons",
                  description:
                    "Visual representation of variant dependencies with icons",
                },
                {
                  icon: Lightning,
                  title: "Persistent State",
                  description:
                    "Selection state persists across page reloads using Zustand",
                },
                {
                  icon: Gear,
                  title: "Adapter Pattern",
                  description:
                    "Configurable adapter for custom state management",
                },
                {
                  icon: Stack,
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
    </>
  );
}
