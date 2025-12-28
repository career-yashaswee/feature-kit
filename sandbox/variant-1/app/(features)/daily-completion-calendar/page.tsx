"use client";

import { useState, useMemo } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Calendar,
  CursorClick,
  CheckCircle,
  XCircle,
  Sparkle,
  Code,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import { DailyCompletionCalendar } from "@/features/daily-completion-calendar/components/daily-completion-calendar";
import type {
  DailyCompletionCalendarProps,
  DayCompletion,
} from "@/features/daily-completion-calendar/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import { Badge } from "@/components/ui/badge";

// Generate sample completion data for the current month
function generateSampleCompletions(): DayCompletion[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const completions: DayCompletion[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    // Skip future dates
    if (date > today) continue;

    // Randomly assign status (70% completed, 20% failed, 10% none)
    const rand = Math.random();
    let status: "completed" | "failed" | "none";
    if (rand < 0.7) {
      status = "completed";
    } else if (rand < 0.9) {
      status = "failed";
    } else {
      status = "none";
    }

    completions.push({ date, status });
  }

  return completions;
}

export default function DailyCompletionCalendarPage() {
  const [completions, setCompletions] = useState<DayCompletion[]>(
    generateSampleCompletions(),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "completed" | "failed" | "none" | null
  >(null);

  const initialConfig: PropConfig[] = [
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

  const propMap: Record<string, keyof DailyCompletionCalendarProps> = {
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<DailyCompletionCalendarProps>({
      initialConfig,
      propMap,
    });

  const handleDayClick = (
    date: Date,
    status: "completed" | "failed" | "none",
  ) => {
    setSelectedDate(date);
    setSelectedStatus(status);
  };

  const handleToggleStatus = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0];
    setCompletions((prev) => {
      const newCompletions = [...prev];
      const index = newCompletions.findIndex(
        (c) => c.date.toISOString().split("T")[0] === dateKey,
      );

      if (index >= 0) {
        const current = newCompletions[index];
        // Cycle through: none -> completed -> failed -> none
        let newStatus: "completed" | "failed" | "none";
        if (current.status === "none") {
          newStatus = "completed";
        } else if (current.status === "completed") {
          newStatus = "failed";
        } else {
          newStatus = "none";
        }
        newCompletions[index] = { ...current, status: newStatus };
      } else {
        newCompletions.push({ date, status: "completed" });
      }

      return newCompletions;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Live Demo */}
        <BaseCard>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the calendar update in real-time. Click on any day to toggle
              its completion status. Completed days show a checkmark, failed
              days show a red dot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <DailyCompletionCalendar
                {...getComponentProps}
                completions={completions}
                onDayClick={handleToggleStatus}
              />
            </div>
            {selectedDate && selectedStatus && (
              <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedDate.toLocaleDateString()} - Status:{" "}
                  <span className="font-medium capitalize">
                    {selectedStatus}
                  </span>
                </p>
              </div>
            )}
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `completions` and `onDayClick` are not editable here."
        />

        {/* How to Test */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/daily-completion-calendar",
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
          return (
            <HowToTestCard
              steps={[
                "Click on any day in the calendar to toggle its completion status",
                "Watch completed days show a checkmark icon instead of the date number",
                "See failed days display a red dot below the date number",
                "Navigate between months using the arrow buttons",
                "Try clicking different days to see the status change in real-time",
              ]}
              conclusion="The calendar tracks your daily actions with visual indicators. Completed actions show a checkmark, while failed actions show a red dot below the date."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        {/* Example Cards */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Example Usage</CardTitle>
            </div>
            <CardDescription>
              Different ways to use the Daily Completion Calendar component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Basic Usage</h3>
              <p className="text-sm text-muted-foreground">
                Pass an array of day completions with dates and statuses
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const completions = [
  { date: new Date(2024, 0, 15), status: "completed" },
  { date: new Date(2024, 0, 16), status: "failed" },
  { date: new Date(2024, 0, 17), status: "none" },
];

<DailyCompletionCalendar
  completions={completions}
  onDayClick={(date, status) => {
    console.log(date, status);
  }}
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Using Map</h3>
              <p className="text-sm text-muted-foreground">
                You can also pass a Map for better performance with many dates
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`const completionsMap = new Map([
  ["2024-01-15", "completed"],
  ["2024-01-16", "failed"],
]);

<DailyCompletionCalendar
  completions={completionsMap}
  onDayClick={(date, status) => {
    console.log(date, status);
  }}
/>`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </BaseCard>

        {/* Features Glossary */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/daily-completion-calendar",
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: <CheckCircle className="h-5 w-5 text-primary" />,
              title: "Visual Indicators",
              description:
                "Clear visual feedback with checkmarks for completed days and red dots for failed days",
            },
            {
              icon: <Calendar className="h-5 w-5 text-primary" />,
              title: "Shadcn Calendar",
              description:
                "Built on top of Shadcn Calendar component for consistent styling and behavior",
            },
            {
              icon: <Gear className="h-5 w-5 text-primary" />,
              title: "Flexible Data",
              description:
                "Accept completions as an array or Map for different use cases",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript Support",
              description:
                "Fully typed with TypeScript for better developer experience",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
