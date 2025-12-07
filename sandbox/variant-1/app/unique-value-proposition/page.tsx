"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { UniqueValueProposition } from "@/features/unique-value-proposition/components/unique-value-proposition";
import type { DataPoint } from "@/features/unique-value-proposition/types";

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
    icon: BarChart3,
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
    icon: TrendingUp,
  },
];

export default function UniqueValuePropositionPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Unique Value Proposition
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Unique Value Proposition
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A scatter plot visualization component for comparing products or
            services across two dimensions with interactive tooltips and
            quadrant analysis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <BarChart3 className="h-3 w-3" />
              Scatter Plot
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Target className="h-3 w-3" />
              Quadrants
            </Badge>
          </div>
        </section>

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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Zap className="h-5 w-5 text-primary" />
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
