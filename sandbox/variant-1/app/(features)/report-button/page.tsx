"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag, Lightning, Code, CursorClick } from "@phosphor-icons/react";
import { ReportButton, type ReportIssue } from "@/features/report-button";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

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

  const [props, setProps] = useState<PropConfig[]>([
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
    },
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the button",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
    },
    {
      property: "triggerLabel",
      type: "string",
      description: "Label text for the report button trigger",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
  ]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean,
  ) => {
    setProps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value: newValue,
      };
      return updated;
    });
  };

  const getComponentProps = () => {
    const componentProps: {
      reportId?: string;
      reportTitle?: string;
      variant?: "default" | "outline" | "ghost";
      size?: "sm" | "md" | "lg";
      triggerLabel?: string;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "reportId" && prop.value) {
        componentProps.reportId = String(prop.value);
      } else if (prop.property === "reportTitle" && prop.value) {
        componentProps.reportTitle = String(prop.value);
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "triggerLabel" && prop.value) {
        componentProps.triggerLabel = String(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

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
                  reportId={getComponentProps().reportId || "live-demo"}
                  reportTitle={getComponentProps().reportTitle || "Live Demo Content"}
                  issues={sampleIssues}
                  onSubmit={submitReport}
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  {...getComponentProps()}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Props API Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Props API</CardTitle>
            </div>
            <CardDescription>
              Interact with the table below to customize the component in
              real-time. Note: Complex props like `issues`, `onSubmit`, `open`, and `onOpenChange` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Property</TableHead>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[200px]">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop, index) => (
                  <TableRow key={prop.property}>
                    <TableCell
                      className="font-medium text-sm"
                      style={{
                        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                      }}
                    >
                      {prop.property}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif' }}>
                      {prop.type}
                    </TableCell>
                    <TableCell
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
                      {prop.description}
                    </TableCell>
                    <TableCell>
                      {prop.inputType === "select" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type="text"
                          value={String(prop.value)}
                          onChange={(e) =>
                            handleValueChange(index, e.target.value)
                          }
                          placeholder={`Enter ${prop.property}`}
                          className="h-8"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
