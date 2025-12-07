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
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, TestTube } from "lucide-react";
import { TestCaseBadge } from "@/features/test-case-badge/components/test-case-badge";
import type { TestResults, TestCaseStatus } from "@/features/test-case-badge/types";

const features = [
  {
    title: "Test Results Display",
    description: "Shows passed and failed test counts with visual indicators",
    icon: CheckCircle2,
  },
  {
    title: "Progress Indicator",
    description: "Circular progress showing test success percentage",
    icon: Loader2,
  },
  {
    title: "Multiple Sizes",
    description: "Support for sm, md, and lg size variants",
    icon: TestTube,
  },
];

const sampleTestResults: TestResults[] = [
  { passed: 25, failed: 3 },
  { passed: 10, failed: 0 },
  { passed: 5, failed: 15 },
  { passed: 0, failed: 0 },
  { passed: 50, failed: 2 },
];

const statuses: TestCaseStatus[] = [
  "IN_PROGRESS",
  "COMPLETED",
  "ABANDONED",
  "ANALYSING",
  "ELAPSED",
  "INACTIVE",
];

export default function TestCaseBadgePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<TestCaseStatus | undefined>(
    undefined
  );

  const currentResults = sampleTestResults[currentIndex];

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <TestTube className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Test Case Badge</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Test Case Badge
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A badge component that displays test results with passed/failed counts
            and a circular progress indicator showing success percentage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <CheckCircle2 className="h-3 w-3" />
              Test Results
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Loader2 className="h-3 w-3" />
              Progress
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Test Case Badge component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Use the buttons below to cycle through different test result scenarios",
                "Try different status values to see the ANALYSING skeleton state",
                "Toggle the 'Show Progress' option to hide/show the circular progress",
                "Test different sizes (sm, md, lg) to see size variations",
                "Notice the color coding: green for passed, red for failed",
                "Check the empty state when no tests are available",
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
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Test different scenarios and configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Current: {currentResults.passed} passed,{" "}
                    {currentResults.failed} failed
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % sampleTestResults.length)
                  }
                >
                  Next Scenario
                </Button>
              </div>

              <div className="p-6 border rounded-lg bg-muted/50 space-y-4">
                <div className="flex items-center gap-4">
                  <TestCaseBadge
                    testResults={currentResults}
                    status={currentStatus}
                    size="sm"
                  />
                  <span className="text-sm text-muted-foreground">Small</span>
                </div>
                <div className="flex items-center gap-4">
                  <TestCaseBadge
                    testResults={currentResults}
                    status={currentStatus}
                    size="md"
                  />
                  <span className="text-sm text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-4">
                  <TestCaseBadge
                    testResults={currentResults}
                    status={currentStatus}
                    size="lg"
                  />
                  <span className="text-sm text-muted-foreground">Large</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Status Options</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={currentStatus === undefined ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentStatus(undefined)}
                >
                  None
                </Button>
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={currentStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentStatus(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
              {currentStatus === "ANALYSING" && (
                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <p className="text-sm text-muted-foreground">
                    When status is "ANALYSING", the badge shows a loading skeleton.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Without Progress</h3>
              <div className="p-6 border rounded-lg bg-muted/50">
                <TestCaseBadge
                  testResults={currentResults}
                  status={currentStatus}
                  showProgress={false}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Example Scenarios</CardTitle>
            </div>
            <CardDescription>
              Different test result combinations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleTestResults.map((results, index) => {
                const total = results.passed + results.failed;
                const percentage =
                  total > 0 ? Math.round((results.passed / total) * 100) : 0;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-muted/50 p-4"
                  >
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        Scenario {index + 1}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {results.passed} passed, {results.failed} failed
                        {total > 0 && ` (${percentage}% success)`}
                      </div>
                    </div>
                    <TestCaseBadge testResults={results} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <TestTube className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Empty State</CardTitle>
            </div>
            <CardDescription>
              When no test results are available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg bg-muted/50">
              <TestCaseBadge testResults={undefined} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <TestTube className="h-5 w-5 text-primary" />
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

