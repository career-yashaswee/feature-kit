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
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CircleNotch,
  Flask,
  Code,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { TestCaseBadge } from "@/features/test-case-badge/components/test-case-badge";
import type {
  TestResults,
  TestCaseStatus,
} from "@/features/test-case-badge/types";
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

const features = [
  {
    title: "Test Results Display",
    description: "Shows passed and failed test counts with visual indicators",
    icon: CheckCircle,
  },
  {
    title: "Progress Indicator",
    description: "Circular progress showing test success percentage",
    icon: CircleNotch,
  },
  {
    title: "Multiple Sizes",
    description: "Support for sm, md, and lg size variants",
    icon: Flask,
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
  const [currentStatus, setCurrentStatus] = useState<
    TestCaseStatus | undefined
  >(undefined);
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "status",
      type: "TestCaseStatus",
      description: "Status of the test case",
      defaultValue: "none",
      value: "none",
      inputType: "select",
      options: [
        "none",
        "IN_PROGRESS",
        "COMPLETED",
        "ABANDONED",
        "ANALYSING",
        "ELAPSED",
        "INACTIVE",
      ],
    },
    {
      property: "showProgress",
      type: "boolean",
      description: "Whether to show the circular progress indicator",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the badge",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
    },
    {
      property: "emptyMessage",
      type: "string",
      description: "Message to show when no test results are available",
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
      status?: TestCaseStatus;
      showProgress?: boolean;
      size?: "sm" | "md" | "lg";
      emptyMessage?: string;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "status" && prop.value && prop.value !== "none") {
        componentProps.status = prop.value as TestCaseStatus;
      } else if (prop.property === "showProgress") {
        componentProps.showProgress = Boolean(prop.value);
      } else if (prop.property === "size") {
        componentProps.size = prop.value as "sm" | "md" | "lg";
      } else if (prop.property === "emptyMessage" && prop.value) {
        componentProps.emptyMessage = String(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  const currentResults = sampleTestResults[currentIndex];

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
            <TestCaseBadge
              testResults={currentResults}
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
              real-time. Note: The `testResults` prop (TestResults object) is
              complex and not editable here.
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
                            handleValueChange(index, value || "")
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option === "none" ? "(none)" : option}
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
                <Flask className="h-5 w-5 text-primary" />
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
                <Flask className="h-5 w-5 text-primary" />
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
                    setCurrentIndex(
                      (prev) => (prev + 1) % sampleTestResults.length
                    )
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
                    When status is &quot;ANALYSING&quot;, the badge shows a
                    loading skeleton.
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
                <Flask className="h-5 w-5 text-primary" />
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
                <Flask className="h-5 w-5 text-primary" />
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/test-case-badge"
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
            (f) => f.path === "/test-case-badge"
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
