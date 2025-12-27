"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  Code,
  GitBranch,
  ChartBar,
  Crown,
  Stack,
  Robot,
  Lightning,
  Gear,
} from "@phosphor-icons/react";
import { CompareAlternatives } from "@/features/compare-alternatives/components/compare-alternatives";
import type {
  ComparisonFeature,
  Alternative,
} from "@/features/compare-alternatives/types";

const features = [
  {
    title: "Comparison Table",
    description: "Compare features across multiple alternatives",
    icon: ChartBar,
  },
  {
    title: "Responsive Design",
    description: "Adapts to mobile and desktop layouts",
    icon: Gear,
  },
  {
    title: "Flexible Values",
    description: "Support for true, false, partial, or custom text values",
    icon: Lightning,
  },
];

const alternatives: Alternative[] = [
  {
    id: "recompose",
    name: "Recompose",
    icon: Crown,
  },
  {
    id: "onlineCourse",
    name: "Online Course",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: Robot,
  },
];

const sampleFeatures: ComparisonFeature[] = [
  {
    id: "fullStack",
    icon: Stack,
    label: "Full Stack Problems",
    description: "Comprehensive full-stack development challenges",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: false,
    },
  },
  {
    id: "github",
    icon: GitBranch,
    label: "GitHub Integration",
    description: "Seamless integration with GitHub repositories",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: false,
    },
  },
  {
    id: "aiFeedback",
    icon: Robot,
    label: "Contextual AI Feedback",
    description: "AI-powered feedback based on your code context",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: "partial",
    },
  },
  {
    id: "localIde",
    icon: Code,
    label: "Local IDE Development",
    description: "Develop and test in your local IDE environment",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: false,
    },
  },
  {
    id: "analysis",
    icon: ChartBar,
    label: "Comprehensive Analysis",
    description: "Detailed analysis of your attempts and solutions",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: "partial",
    },
  },
  {
    id: "pricing",
    icon: Star,
    label: "Pricing",
    description: "Compare pricing across different platforms",
    values: {
      recompose: true,
      onlineCourse: false,
      chatgpt: "partial",
    },
    isPricingRow: true,
    pricingValues: {
      recompose: "$29/mo",
      onlineCourse: "$199",
      chatgpt: "$20/mo",
    },
  },
];

export default function CompareAlternativesPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ChartBar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Compare Alternatives component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Scroll down to see the comparison table",
                "Notice the responsive layout - different on mobile vs desktop",
                "Check the pricing row with special styling",
                "See how icons, checkmarks, and X marks indicate support levels",
                "Try resizing the window to see mobile layout",
                "Notice the partial support indicators (yellow checkmarks)",
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

        <CompareAlternatives
          features={sampleFeatures}
          alternatives={alternatives}
          heading="Compare Alternatives"
          description="See how different platforms compare across key features"
          showCrownIcon={true}
          pricingRowId="pricing"
        />

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ChartBar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Value Types</CardTitle>
            </div>
            <CardDescription>
              Different types of values supported in the comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950/20">
                  <Code className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">True / Full Support</div>
                  <div className="text-sm text-muted-foreground">
                    Green checkmark indicates full support
                  </div>
                </div>
                <div className="text-green-600">✓</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <Code className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Partial Support</div>
                  <div className="text-sm text-muted-foreground">
                    Yellow checkmark indicates partial support
                  </div>
                </div>
                <div className="text-yellow-500">✓</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/20">
                  <Code className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">No Support</div>
                  <div className="text-sm text-muted-foreground">
                    Red X indicates no support
                  </div>
                </div>
                <div className="text-destructive">✗</div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <Code className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Custom Text</div>
                  <div className="text-sm text-muted-foreground">
                    Custom text values (e.g., pricing) for special rows
                  </div>
                </div>
                <div className="text-sm font-mono">$29/mo</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ChartBar className="h-5 w-5 text-primary" />
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
