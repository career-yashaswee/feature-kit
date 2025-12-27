"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Flag, Lightning, CursorClick } from "@phosphor-icons/react";
import { ReportButton, type ReportIssue } from "@/features/report-button";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { ReportButtonProps } from "@/features/report-button/types";

const sampleIssues: ReportIssue[] = [
  {
    id: "INCORRECT",
    label: "Incorrect Information",
    description: "The content contains factual errors or outdated information",
  },
  {
    id: "BROKEN",
    label: "Broken Functionality",
    description: "Something doesn't work as expected or is broken",
  },
  {
    id: "INAPPROPRIATE",
    label: "Inappropriate Content",
    description: "Content that violates community guidelines",
  },
  {
    id: "SPAM",
    label: "Spam or Scam",
    description: "Suspicious or fraudulent content",
  },
  {
    id: "OTHER",
    label: "Other Issue",
    description: "Something else that needs attention",
  },
];

async function submitReport(payload: {
  issues: string[];
  customIssue?: string;
  description?: string;
  context?: { path?: string; url?: string };
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Report submitted:", payload);
}

export default function ReportButtonPage() {
  const [isOpen, setIsOpen] = useState(false);

  const initialConfig: PropConfig[] = [
    {
      property: "reportId",
      type: "string",
      description: "Unique identifier for the report",
      defaultValue: "live-demo",
      value: "live-demo",
      inputType: "text",
    },
    {
      property: "reportTitle",
      type: "string",
      description: "Title of the content being reported",
      defaultValue: "Live Demo Content",
      value: "Live Demo Content",
      inputType: "text",
    },
    {
      property: "variant",
      type: '"default" | "outline" | "ghost"',
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "outline", "ghost"],
      transform: (value) => value as ReportButtonProps["variant"],
    },
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the button",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
      transform: (value) => value as ReportButtonProps["size"],
    },
    {
      property: "triggerLabel",
      type: "string",
      description: "Label text for the report button trigger",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
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

  const propMap: Record<string, keyof ReportButtonProps> = {
    reportId: "reportId",
    reportTitle: "reportTitle",
    variant: "variant",
    size: "size",
    triggerLabel: "triggerLabel",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ReportButtonProps>({
      initialConfig,
      propMap,
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
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
              Note: Complex props like `issues`, `onSubmit`, `open`, and `onOpenChange` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Controlled State:</label>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
                >
                  {isOpen ? "Close Dialog" : "Open Dialog"}
                </button>
                <span className="text-sm text-muted-foreground">
                  isOpen: {String(isOpen)}
                </span>
              </div>
              <div className="flex items-center justify-center rounded-lg border bg-card p-8">
                <ReportButton
                  reportId={getComponentProps.reportId || "live-demo"}
                  reportTitle={getComponentProps.reportTitle || "Live Demo Content"}
                  issues={sampleIssues}
                  onSubmit={submitReport}
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  {...getComponentProps}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `issues`, `onSubmit`, `open`, and `onOpenChange` are not editable here."
        />

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/report-button"
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Flag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Basic Usage</CardTitle>
            </div>
            <CardDescription>
              Report button with issue selection and custom description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm font-medium mb-2">Sample Content:</p>
              <p className="text-sm text-muted-foreground">
                This is a sample piece of content that you can report issues
                with. Click the report button to test the functionality.
              </p>
            </div>
            <ReportButton
              reportId="sample-1"
              reportTitle="Sample Content"
              issues={sampleIssues}
              onSubmit={submitReport}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Flag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Variants</CardTitle>
            </div>
            <CardDescription>
              Report button available in different button variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <ReportButton
                reportId="sample-2"
                reportTitle="Default Variant"
                issues={sampleIssues}
                onSubmit={submitReport}
                variant="default"
              />
              <ReportButton
                reportId="sample-3"
                reportTitle="Outline Variant"
                issues={sampleIssues}
                onSubmit={submitReport}
                variant="outline"
              />
              <ReportButton
                reportId="sample-4"
                reportTitle="Ghost Variant"
                issues={sampleIssues}
                onSubmit={submitReport}
                variant="ghost"
              />
            </div>
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/report-button"
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
      </main>
    </div>
  );
}
