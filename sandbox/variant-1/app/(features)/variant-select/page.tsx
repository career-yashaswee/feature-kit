"use client";

import React, { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Stack, Lightning, Gear, CursorClick } from "@phosphor-icons/react";
import { VariantSelect } from "@/features/variant-select";
import type { Variant } from "@/features/variant-select/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { VariantSelectProps } from "@/features/variant-select/types";

export default function VariantSelectPage() {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  const initialConfig: PropConfig[] = [
    {
      property: "mode",
      type: '"display" | "selector"',
      description: "Display mode: 'display' shows count badge, 'selector' shows dropdown",
      defaultValue: "selector",
      value: "selector",
      inputType: "select",
      options: ["display", "selector"],
      transform: (value) => value as VariantSelectProps["mode"],
    },
    {
      property: "isLoading",
      type: "boolean",
      description: "Whether the component is in loading state",
      defaultValue: false,
      value: false,
      inputType: "boolean",
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

  const propMap: Record<string, keyof VariantSelectProps> = {
    mode: "mode",
    isLoading: "isLoading",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<VariantSelectProps>({
      initialConfig,
      propMap,
    });

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
            Note: The `featureId`, `variants`, `onVariantSelect`, and `adapter` props are complex and not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VariantSelect
            featureId="demo-feature"
            variants={sampleVariants}
            onVariantSelect={(variantId) => {
              setSelectedVariantId(variantId);
              console.log("Selected variant:", variantId);
            }}
              {...getComponentProps}
          />
        </CardContent>
      </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `featureId`, `variants`, `onVariantSelect`, and `adapter` are not editable here."
        />

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/variant-select"
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
        return (
          <HowToTestCard
            steps={[
              "Click the variant selector button to open the dropdown",
              "Browse through available variants with their dependencies",
              "Select a variant - it will be persisted automatically",
              "Refresh the page - your selection should persist",
              "Try switching between display and selector modes",
            ]}
            icon={<CursorClick className="h-5 w-5 text-primary" />}
          />
        );
      })()}

        <BaseCard>
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
                onVariantSelect={(variantId) => {
                  setSelectedVariantId(variantId);
                  console.log("Selected variant:", variantId);
                }}
                mode="selector"
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>
    </>
  );
}
