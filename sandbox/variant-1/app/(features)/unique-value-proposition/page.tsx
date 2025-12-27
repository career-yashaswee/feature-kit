"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Target, TrendUp, Lightning, ChartBar, CursorClick } from "@phosphor-icons/react";
import { UniqueValueProposition } from "@/features/unique-value-proposition/components/unique-value-proposition";
import type { DataPoint } from "@/features/unique-value-proposition/types";
import type { UniqueValuePropositionProps } from "@/features/unique-value-proposition/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const sampleDataPoints: DataPoint[] = [
  // Top-Left Quadrant (Low Relevance to Full Stack, High Velocity but Low Accuracy)
  {
    id: "leetcode",
    name: "LeetCode",
    x: 15,
    y: 85,
    intensity: 10,
    tooltip:
      "Instant feedback, but focuses on algorithms only. Limited relevance to full-stack web development.",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    x: 18,
    y: 82,
    intensity: 9,
    tooltip:
      "Fast auto-testing, primarily algorithm-focused with minimal web development coverage.",
  },
  {
    id: "codesignal",
    name: "CodeSignal",
    x: 12,
    y: 80,
    intensity: 8,
    tooltip:
      "Quick coding challenges with instant results, but algorithm-centric, not web development.",
  },
  // Top-Right Quadrant (High Relevance to Full Stack, High Velocity & Meaningful Insights)
  {
    id: "frontend-mentor",
    name: "Frontend Mentor",
    x: 78,
    y: 70,
    intensity: 5,
    tooltip:
      "High relevance to frontend development, but relies on peer review leading to slow, inconsistent feedback.",
  },
  {
    id: "codepen",
    name: "CodePen",
    x: 82,
    y: 75,
    intensity: 4,
    tooltip:
      "Great for frontend experimentation with instant visual feedback, limited to frontend only.",
  },
  // Bottom-Left Quadrant (Low Relevance, Low Velocity)
  {
    id: "project-euler",
    name: "Project Euler",
    x: 10,
    y: 30,
    intensity: 2,
    tooltip:
      "Mathematical problem-solving with minimal relevance to web development and no feedback system.",
  },
  {
    id: "codewars",
    name: "CodeWars",
    x: 28,
    y: 40,
    intensity: 4,
    tooltip:
      "Algorithm kata with peer review, slow feedback process, limited web dev relevance.",
  },
  // Bottom-Right Quadrant (High Relevance, Low Velocity/Accuracy)
  {
    id: "freecodecamp",
    name: "FreeCodeCamp",
    x: 76,
    y: 45,
    intensity: 6,
    tooltip:
      "Broad web development curriculum, but relies on community help and less accurate automated feedback.",
  },
  {
    id: "codecademy",
    name: "Codecademy",
    x: 72,
    y: 32,
    intensity: 5,
    tooltip:
      "Structured learning paths for web development, but feedback is educational rather than production-focused.",
  },
];

const highlightedPoint: DataPoint = {
  id: "featurekit",
  name: "FeatureKit",
  x: 92,
  y: 95,
  isHighlighted: true,
  intensity: 10,
  tooltip:
    "Real web development practice with AI-powered instant feedback, GitHub integration, and meaningful code analysis. Highest in both axes.",
};

const features = [
  {
    title: "Scatter Plot Visualization",
    description: "Interactive scatter plot with tooltips and hover effects",
    icon: ChartBar,
  },
  {
    title: "Quadrant Analysis",
    description:
      "Four-quadrant layout with customizable labels and descriptions",
    icon: Target,
  },
  {
    title: "Customizable Data",
    description: "Accept data points as props with full control over styling",
    icon: TrendUp,
  },
];

export default function UniqueValuePropositionPage() {
  const initialConfig: PropConfig[] = [
    {
      property: "title",
      type: "string",
      description: "Title of the chart",
      defaultValue: "A Unique Value Proposition",
      value: "A Unique Value Proposition",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "description",
      type: "string",
      description: "Description text below the title",
      defaultValue: "See how FeatureKit compares to other platforms",
      value: "See how FeatureKit compares to other platforms",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "xAxisLabel",
      type: "string",
      description: "Label for the X-axis",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "yAxisLabel",
      type: "string",
      description: "Label for the Y-axis",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "footerDescription",
      type: "string",
      description: "Description text at the bottom",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "chartHeight",
      type: '"sm" | "md" | "lg"',
      description: "Height of the chart",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
      transform: (value) => value as UniqueValuePropositionProps["chartHeight"],
    },
    {
      property: "showLegend",
      type: "boolean",
      description: "Whether to show the legend",
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

  const propMap: Record<string, keyof UniqueValuePropositionProps> = {
    title: "title",
    description: "description",
    xAxisLabel: "xAxisLabel",
    yAxisLabel: "yAxisLabel",
    footerDescription: "footerDescription",
    chartHeight: "chartHeight",
    showLegend: "showLegend",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<UniqueValuePropositionProps>({
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
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniqueValueProposition
              dataPoints={sampleDataPoints}
              highlightedPoint={highlightedPoint}
              {...getComponentProps}
            />
          </CardContent>
        </Card>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `dataPoints`, `highlightedPoint`, `quadrantLabels`, and `legend` are not editable here."
        />

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Unique Value Proposition component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Hover over any data point to see detailed tooltip information",
                "Notice the highlighted point (FeatureKit) stands out with different color and size",
                "Observe the four quadrants and their labels",
                "Check the legend in the bottom-left corner",
                "Try different chart heights and configurations in the examples below",
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
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Default Configuration</CardTitle>
            </div>
            <CardDescription>
              Full-featured scatter plot with all default settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniqueValueProposition
              title="A Unique Value Proposition"
              description="See how FeatureKit compares to other platforms in terms of relevance to full-stack web development and feedback quality"
              dataPoints={sampleDataPoints}
              highlightedPoint={highlightedPoint}
              footerDescription="FeatureKit stands out by combining high relevance to full-stack web development with fast, accurate, and meaningful feedback. Unlike platforms that focus only on algorithms or rely on slow peer review, FeatureKit provides real-world web development practice with actual repositories, instant AI-powered analysis, and professional workflows that mirror industry standards."
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Custom Axes</CardTitle>
            </div>
            <CardDescription>
              Scatter plot with custom axis labels and quadrant descriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniqueValueProposition
              title="Product Comparison"
              description="Compare products across different dimensions"
              xAxisLabel="Feature Completeness"
              yAxisLabel="User Satisfaction"
              dataPoints={sampleDataPoints.slice(0, 5)}
              highlightedPoint={highlightedPoint}
              quadrantLabels={{
                topLeft: "High Satisfaction, Low Features",
                topRight: "High Satisfaction & Features",
                bottomLeft: "Low Satisfaction & Features",
                bottomRight: "High Features, Low Satisfaction",
              }}
              chartHeight="sm"
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Minimal Configuration</CardTitle>
            </div>
            <CardDescription>
              Simple scatter plot with minimal configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniqueValueProposition
              dataPoints={sampleDataPoints.slice(0, 6)}
              showLegend={false}
              chartHeight="sm"
            />
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/unique-value-proposition"
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
            (f) => f.path === "/unique-value-proposition"
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
