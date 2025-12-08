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
import { Badge } from "@/components/ui/badge";
import { Flag, Warning, Lightning, Code } from "@phosphor-icons/react";
import { ReportButton, type ReportIssue } from "@/features/report-button";

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

const features = [
  {
    title: "TanStack Query",
    description: "Uses TanStack Query mutations for reliable submission",
    icon: Flag,
  },
  {
    title: "Toast Notifications",
    description: "Built-in success and error notifications with Sonner",
    icon: Warning,
  },
  {
    title: "Flexible Issues",
    description: "Configurable issue types and custom issue support",
    icon: Lightning,
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
  const [props, setProps] = useState<PropConfig[]>([
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
      variant?: "default" | "outline" | "ghost";
      size?: "sm" | "md" | "lg";
      triggerLabel?: string;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "variant") {
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
              Note: Complex props like `reportId`, `reportTitle`, `issues`, `onSubmit`, `open`, and `onOpenChange` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <ReportButton
                reportId="live-demo"
                reportTitle="Live Demo Content"
                issues={sampleIssues}
                onSubmit={submitReport}
                {...getComponentProps()}
              />
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
              real-time. Note: Complex props like `reportId`, `reportTitle`, `issues`, `onSubmit`, `open`, and `onOpenChange` are not editable here.
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
                    <TableCell className="font-medium font-mono text-sm">
                      {prop.property}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Flag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Report Button component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the 'Report' button to open the report dialog",
                "Select one or more issues from the list",
                "Optionally add a custom issue if 'Other Issue' is selected",
                "Add additional details in the textarea",
                "Submit the report and see the success toast notification",
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
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
