"use client";

import dynamic from "next/dynamic";

const ExportButton = dynamic(
  () =>
    import("@/features/export-button/components/export-button").then((mod) => ({
      default: mod.ExportButton,
    })),
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
import type { ExportButtonProps } from "@/features/export-button/types";

async function fetchExportData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];
}

export default function ExportButtonPage() {
  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: '"default" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["default", "outline", "secondary", "ghost", "link"],
      transform: (value) => value as ExportButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      transform: (value) => value as ExportButtonProps["size"],
    },
    {
      property: "filename",
      type: "string",
      description: "Base filename for the exported file",
      defaultValue: "users",
      value: "users",
      inputType: "text",
    },
    {
      property: "resource",
      type: "string",
      description: "Name of the resource being exported (for toast messages)",
      defaultValue: "user data",
      value: "user data",
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
      property: "format",
      type: '"csv" | "json"',
      description: "Export file format",
      defaultValue: "csv",
      value: "csv",
      inputType: "select",
      options: ["csv", "json"],
      transform: (value) => value as ExportButtonProps["format"],
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the export icon",
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

  const propMap: Record<string, keyof ExportButtonProps> = {
    variant: "variant",
    size: "size",
    filename: "filename",
    resource: "resource",
    label: "label",
    format: "format",
    showIcon: "showIcon",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ExportButtonProps>({
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
            Note: Complex props like `fetchData`, `onSuccess`, and `onError` are
            not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center rounded-lg border bg-card p-8">
            <ExportButton
              fetchData={fetchExportData}
              onSuccess={() => console.log("Exported!")}
              {...getComponentProps}
            />
          </div>
        </CardContent>
      </Card>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time. Note: Complex props like `fetchData`, `onSuccess`, and `onError` are not editable here."
      />

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Data</CardTitle>
              <CardDescription>Export user data to CSV file</CardDescription>
            </div>
            <ExportButton
              fetchData={fetchExportData}
              filename="users"
              resource="user data"
              onSuccess={() => console.log("Exported!")}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>Click the export button to download user data as CSV.</p>
            <p className="text-muted-foreground">
              The file will be timestamped automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/export-button"
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
          (f) => f.path === "/export-button"
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
    </>
  );
}
