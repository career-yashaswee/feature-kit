"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Warning, Lightning } from "@phosphor-icons/react";
import {
  ReportButton,
  type ReportIssue,
} from "@/features/report-button/components/report-button";

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
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Flag className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Report Button</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Report Button
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive report dialog with issue selection, custom
            descriptions, and TanStack Query integration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Flag className="h-3 w-3" />
              Report
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Warning className="h-3 w-3" />
              Dialog
            </Badge>
          </div>
        </section>

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
