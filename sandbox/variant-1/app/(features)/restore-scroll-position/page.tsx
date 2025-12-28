"use client";

import dynamic from "next/dynamic";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Scroll,
  Lightning,
  CursorClick,
  Gear,
  Code,
} from "@phosphor-icons/react";
import type { RestoreScrollPositionProps } from "@/features/restore-scroll-position/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const RestoreScrollPosition = dynamic(
  () =>
    import("@/features/restore-scroll-position/components/restore-scroll-position").then(
      (mod) => ({
        default: mod.RestoreScrollPosition,
      }),
    ),
  { ssr: false },
);

export default function RestoreScrollPositionPage() {
  const initialConfig: PropConfig[] = [
    {
      property: "storageKey",
      type: "string",
      description: "Unique key for storing scroll position in storage",
      defaultValue: "restore-scroll-position-demo",
      value: "restore-scroll-position-demo",
      inputType: "text",
    },
    {
      property: "persist",
      type: "boolean",
      description:
        "If true, uses localStorage (persistent). If false, uses sessionStorage (temporary)",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "debounceMs",
      type: "number",
      description: "Debounce delay in milliseconds for saving scroll position",
      defaultValue: 100,
      value: 100,
      inputType: "number",
    },
    {
      property: "enabled",
      type: "boolean",
      description: "Enable or disable scroll position memory",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
  ];

  const propMap: Record<string, keyof RestoreScrollPositionProps> = {
    storageKey: "storageKey",
    persist: "persist",
    debounceMs: "debounceMs",
    enabled: "enabled",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<RestoreScrollPositionProps>({
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
              Note: The `children` and `container` props are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed bg-muted/20 p-8 min-h-[200px]">
              <RestoreScrollPosition
                {...getComponentProps}
                storageKey={
                  getComponentProps.storageKey || "restore-scroll-position-demo"
                }
              >
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Scroll down this demo area to test scroll position
                    restoration. The component wraps content and saves scroll
                    position.
                  </p>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-card">
                      <p className="text-sm">Content block {i + 1}</p>
                    </div>
                  ))}
                </div>
              </RestoreScrollPosition>
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: The `children` and `container` props are not editable here."
        />

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/restore-scroll-position",
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={
                  featureData.howToTest.conclusion ||
                  "This page uses session storage by default. Scroll positions are saved automatically as you scroll and restored when you return. The scroll position is debounced to avoid excessive storage writes."
                }
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return (
            <HowToTestCard
              steps={[
                "Scroll down this page to any position",
                "Navigate to another page or refresh the page",
                "Come back to this page",
                "Your scroll position should be automatically restored",
              ]}
              conclusion="This page uses session storage by default. Scroll positions are saved automatically as you scroll and restored when you return. The scroll position is debounced to avoid excessive storage writes."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <RestoreScrollPosition
          {...getComponentProps}
          storageKey={
            getComponentProps.storageKey || "restore-scroll-position-demo"
          }
        >
          <BaseCard>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scroll className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Demo Content</CardTitle>
                <CardDescription>
                  Scroll down to see the scroll position memory in action
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 px-3 py-1">
                        <span className="text-xs font-semibold text-primary">
                          Section {index + 1}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      This is demo content block {index + 1}. Scroll further
                      down to test the scroll position memory feature. When you
                      navigate away and come back, your scroll position will be
                      automatically restored to where you left off.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-md bg-muted/50" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </BaseCard>
        </RestoreScrollPosition>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/restore-scroll-position",
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
              icon: <Scroll className="h-5 w-5 text-primary" />,
              title: "Automatic Restoration",
              description:
                "Automatically restores scroll position when component mounts or page loads",
            },
            {
              icon: renderIcon("Gear", "h-5 w-5 text-primary"),
              title: "Storage Options",
              description:
                "Choose between session storage (temporary) or local storage (persistent)",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Debounced Saving",
              description:
                "Scroll position is saved with debouncing to avoid excessive storage writes",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "Flexible Usage",
              description:
                "Use as a wrapper component or with the useScrollPosition hook directly",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}

        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Gear className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Configuration Options</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">storageKey</h3>
                <p className="text-sm text-muted-foreground">
                  Unique key for storing scroll position in storage
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">persist</h3>
                <p className="text-sm text-muted-foreground">
                  If true, uses localStorage (persistent). If false, uses
                  sessionStorage (temporary, default)
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">debounceMs</h3>
                <p className="text-sm text-muted-foreground">
                  Debounce delay in milliseconds for saving scroll position
                  (default: 100ms)
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">enabled</h3>
                <p className="text-sm text-muted-foreground">
                  Enable or disable scroll position memory (default: true)
                </p>
              </div>
            </div>
          </CardContent>
        </BaseCard>
      </main>
    </div>
  );
}
