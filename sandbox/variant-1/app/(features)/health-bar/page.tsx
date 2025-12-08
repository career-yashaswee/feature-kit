"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Pulse, Lightning } from "@phosphor-icons/react";
import { HealthBar } from "@/features/health-bar/components/health-bar";
import { useQuery } from "@tanstack/react-query";

const features = [
  {
    title: "Visual Health Indicator",
    description: "Color-coded bar that changes based on health percentage",
    icon: Heart,
  },
  {
    title: "Timer Display",
    description: "Shows time until next health regeneration",
    icon: Pulse,
  },
  {
    title: "Customizable",
    description: "Configurable data sources and display options",
    icon: Lightning,
  },
];

async function fetchHealthData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    current: Math.floor(Math.random() * 100),
    max: 100,
    secondsToNext: Math.floor(Math.random() * 300),
  };
}

export default function HealthBarPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["health-data"],
    queryFn: fetchHealthData,
    refetchInterval: 2000,
  });

  const [manualData, setManualData] = useState({
    current: 75,
    max: 100,
    secondsToNext: 120,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Health Bar component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Observe the health bar color changes based on percentage (red < 20%, yellow < 40%, amber < 80%, green > 80%)",
                "Watch the timer countdown for health regeneration",
                "See the remaining health points displayed",
                "Try the manual data example below to test different values",
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
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">With TanStack Query</CardTitle>
            </div>
            <CardDescription>
              Health bar connected to TanStack Query for automatic updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data && (
              <HealthBar
                data={data}
                isLoading={isLoading}
                showTimer
                showRemaining
              />
            )}
            <p className="text-sm text-muted-foreground">
              Data refreshes every 2 seconds automatically
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Manual Data</CardTitle>
            </div>
            <CardDescription>
              Health bar with manually controlled data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthBar data={manualData} showTimer showRemaining />
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setManualData((prev) => ({
                    ...prev,
                    current: Math.max(0, prev.current - 10),
                  }))
                }
                className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
              >
                -10 HP
              </button>
              <button
                onClick={() =>
                  setManualData((prev) => ({
                    ...prev,
                    current: Math.min(100, prev.current + 10),
                  }))
                }
                className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
              >
                +10 HP
              </button>
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
