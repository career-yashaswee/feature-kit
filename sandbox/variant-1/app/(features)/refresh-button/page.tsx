"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const RefreshButton = dynamic(
  () =>
    import("@/features/refresh-button/components/refresh-button").then(
      (mod) => ({
        default: mod.RefreshButton,
      })
    ),
  { ssr: false }
);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightning, CursorClick } from "@phosphor-icons/react";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { RefreshButtonProps } from "@/features/refresh-button/types";

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    timestamp: new Date().toISOString(),
    data: "Sample data",
  };
}

export default function RefreshButtonPage() {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["sample-data"],
    queryFn: fetchData,
  });

  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: '"default" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["default", "outline", "secondary", "ghost", "link"],
      transform: (value) => value as RefreshButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      transform: (value) => value as RefreshButtonProps["size"],
    },
    {
      property: "resource",
      type: "string",
      description: "Name of the resource being refreshed (for toast messages)",
      defaultValue: "sample data",
      value: "sample data",
      inputType: "text",
    },
    {
      property: "label",
      type: "string",
      description: "Optional label text for the button",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the refresh icon",
      defaultValue: true,
      value: true,
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

  const propMap: Record<string, keyof RefreshButtonProps> = {
    variant: "variant",
    size: "size",
    resource: "resource",
    label: "label",
    showIcon: "showIcon",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<RefreshButtonProps>({
      initialConfig,
      propMap,
    });

  return (
    <>
      {/* Live Demo */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Lightning className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">Live Demo</CardTitle>
          </div>
          <CardDescription>
            See the component update in real-time as you change props below.
            Note: Complex props like `queryKeys`, `onSuccess`, and `onError` are
            not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center rounded-lg border bg-card p-8">
            <RefreshButton
              queryKeys={[["sample-data"]]}
              onSuccess={() => console.log("Refreshed!")}
              {...getComponentProps}
            />
          </div>
        </CardContent>
      </Card>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time. Note: Complex props like `queryKeys`, `onSuccess`, and `onError` are not editable here."
      />

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/refresh-button"
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
          (f) => f.path === "/refresh-button"
        );
        if (featureData?.features) {
          const featuresWithIcons = featureData.features.map((feature) => ({
            icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={featuresWithIcons} />;
        }
        return null;
      })()}

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sample Data</CardTitle>
              <CardDescription>
                Click refresh to reload this data
              </CardDescription>
            </div>
            <RefreshButton
              queryKeys={[["sample-data"]]}
              resource="sample data"
              onSuccess={() => console.log("Refreshed!")}
            />
          </div>
        </CardHeader>
        <CardContent>
          {isError ? (
            <p className="text-muted-foreground">
              {error?.message || "Failed to load data"}
            </p>
          ) : isLoading || isFetching ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Timestamp:</span>{" "}
                {data?.timestamp}
              </p>
              <p className="text-sm">
                <span className="font-medium">Data:</span> {data?.data}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
