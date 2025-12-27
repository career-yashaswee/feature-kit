"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Button } from "@/components/ui/button";
import {
  CircleNotch,
  FileText,
  Lightning,
  ArrowsClockwise,
  CursorClick,
} from "@phosphor-icons/react";
import { PageLoader, type LoadingState } from "@/features/page-loader";
import { useQuery } from "@tanstack/react-query";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { PageLoaderProps } from "@/features/page-loader/types";

const features = [
  {
    title: "Refresh Integration",
    description: "Built-in refresh button using FeatureKit's RefreshButton",
    icon: ArrowsClockwise,
  },
  {
    title: "Customizable Branding",
    description: "Configurable brand name, icon, and loading messages",
    icon: FileText,
  },
  {
    title: "Smooth Animations",
    description: "Elegant fade and scale transitions for better UX",
    icon: Lightning,
  },
];

async function fetchPageData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: "Loaded!" };
}

export default function PageLoaderPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const initialConfig: PropConfig[] = [
    {
      property: "isFullScreen",
      type: "boolean",
      description: "Whether to show as full-screen overlay",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "hideBranding",
      type: "boolean",
      description: "Whether to hide the branding section",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "brandName",
      type: "string",
      description: "Brand name to display",
      defaultValue: "FeatureKit",
      value: "FeatureKit",
      inputType: "text",
    },
    {
      property: "refreshDelay",
      type: "number",
      description: "Delay in milliseconds before showing refresh button",
      defaultValue: 10000,
      value: 10000,
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

  const propMap: Record<string, keyof PageLoaderProps> = {
    isFullScreen: "isFullScreen",
    hideBranding: "hideBranding",
    brandName: "brandName",
    refreshDelay: "refreshDelay",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<PageLoaderProps>({
      initialConfig,
      propMap,
    });

  const { refetch } = useQuery({
    queryKey: ["page-data"],
    queryFn: fetchPageData,
    enabled: false,
  });

  const loadingState: LoadingState = {
    title: "Loading Page",
    messages: [
      "Preparing your experience...",
      "Loading content...",
      "Almost there...",
    ],
    icon: FileText,
  };

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
              Click &quot;Show Loader&quot; to see it in action. Note: The `isVisible`, `loadingState`, `brandIcon`, `refreshQueryKeys`, and `onRefresh` props are complex and not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowLoader(true)}>Show Loader</Button>
              <Button variant="outline" onClick={() => setShowLoader(false)}>
                Hide Loader
              </Button>
            </div>
            <div className="relative h-64 border rounded-lg overflow-hidden">
              <PageLoader
                isVisible={showLoader}
                loadingState={loadingState}
                refreshQueryKeys={[["page-data"]]}
                {...getComponentProps}
              />
              {!showLoader && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Click &quot;Show Loader&quot; to see it in action
                </div>
              )}
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `isVisible`, `loadingState`, `brandIcon`, `refreshQueryKeys`, and `onRefresh` are not editable here."
        />

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/page-loader"
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
                "Click the 'Show Loader' button below to see the loader in action",
                "Wait 10 seconds to see the refresh button appear",
                "Try the full-screen variant for overlay loading",
                "Notice the smooth animations and progress bar",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CircleNotch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Standard Loader</CardTitle>
            </div>
            <CardDescription>
              Page loader with refresh functionality and custom messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowLoader(true)}>Show Loader</Button>
              <Button variant="outline" onClick={() => setShowLoader(false)}>
                Hide Loader
              </Button>
            </div>
            <div className="relative h-64 border rounded-lg overflow-hidden">
              <PageLoader
                isVisible={showLoader}
                loadingState={loadingState}
                brandName="FeatureKit"
                refreshQueryKeys={[["page-data"]]}
                refreshDelay={10000}
              />
              {!showLoader && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Click &quot;Show Loader&quot; to see it in action
                </div>
              )}
            </div>
          </CardContent>
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CircleNotch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Full Screen Loader</CardTitle>
            </div>
            <CardDescription>
              Full-screen overlay loader for page transitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowFullScreen(true)}>
                Show Full Screen
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFullScreen(false)}
              >
                Hide
              </Button>
            </div>
            <PageLoader
              isVisible={showFullScreen}
              loadingState={loadingState}
              isFullScreen
              brandName="FeatureKit"
              onRefresh={() => {
                refetch();
                setShowFullScreen(false);
              }}
              refreshDelay={10000}
            />
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/page-loader"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = features.map((feature) => ({
            icon: <feature.icon className="h-5 w-5 text-primary" />,
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
