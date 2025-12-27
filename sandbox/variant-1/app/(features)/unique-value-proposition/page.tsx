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
import { Target, TrendUp, Lightning, ChartBar, Code, CursorClick } from "@phosphor-icons/react";
import { UniqueValueProposition } from "@/features/unique-value-proposition/components/unique-value-proposition";
import type { DataPoint } from "@/features/unique-value-proposition/types";
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
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "title",
      type: "string",
      description: "Title of the chart",
      defaultValue: "A Unique Value Proposition",
      value: "A Unique Value Proposition",
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description text below the title",
      defaultValue: "See how FeatureKit compares to other platforms",
      value: "See how FeatureKit compares to other platforms",
      inputType: "text",
    },
    {
      property: "xAxisLabel",
      type: "string",
      description: "Label for the X-axis",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "yAxisLabel",
      type: "string",
      description: "Label for the Y-axis",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "footerDescription",
      type: "string",
      description: "Description text at the bottom",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "chartHeight",
      type: '"sm" | "md" | "lg"',
      description: "Height of the chart",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
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
      title?: string;
      description?: string;
      xAxisLabel?: string;
      yAxisLabel?: string;
      footerDescription?: string;
      chartHeight?: "sm" | "md" | "lg";
      showLegend?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "title" && prop.value) {
        componentProps.title = String(prop.value);
      } else if (prop.property === "description" && prop.value) {
        componentProps.description = String(prop.value);
      } else if (prop.property === "xAxisLabel" && prop.value) {
        componentProps.xAxisLabel = String(prop.value);
      } else if (prop.property === "yAxisLabel" && prop.value) {
        componentProps.yAxisLabel = String(prop.value);
      } else if (prop.property === "footerDescription" && prop.value) {
        componentProps.footerDescription = String(prop.value);
      } else if (prop.property === "chartHeight") {
        componentProps.chartHeight = prop.value as "sm" | "md" | "lg";
      } else if (prop.property === "showLegend") {
        componentProps.showLegend = Boolean(prop.value);
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
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UniqueValueProposition
              dataPoints={sampleDataPoints}
              highlightedPoint={highlightedPoint}
              {...getComponentProps()}
            />
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
              real-time. Note: Complex props like `dataPoints`, `highlightedPoint`, `quadrantLabels`, and `legend` are not editable here.
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
                      ) : prop.inputType === "boolean" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value === "true")
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">true</SelectItem>
                            <SelectItem value="false">false</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : prop.inputType === "number" ? (
                        <Input
                          type="number"
                          value={
                            typeof prop.value === "number"
                              ? prop.value
                              : Number(prop.value) || 0
                          }
                          onChange={(e) =>
                            handleValueChange(
                              index,
                              e.target.value === ""
                                ? prop.defaultValue
                                : Number(e.target.value),
                            )
                          }
                          className="h-8"
                        />
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
