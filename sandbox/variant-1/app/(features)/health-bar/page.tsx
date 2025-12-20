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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Heart, Pulse, Lightning, Code } from "@phosphor-icons/react";
import { HealthBar } from "@/features/health-bar/components/health-bar";
import { useQuery } from "@tanstack/react-query";

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

  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "showTimer",
      type: "boolean",
      description: "Whether to show the timer countdown",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "showRemaining",
      type: "boolean",
      description: "Whether to show remaining health points",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "isLoading",
      type: "boolean",
      description: "Whether the component is in loading state",
      defaultValue: false,
      value: false,
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
      showTimer?: boolean;
      showRemaining?: boolean;
      isLoading?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "showTimer") {
        componentProps.showTimer = Boolean(prop.value);
      } else if (prop.property === "showRemaining") {
        componentProps.showRemaining = Boolean(prop.value);
      } else if (prop.property === "isLoading") {
        componentProps.isLoading = Boolean(prop.value);
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
              Note: The `data` prop (HealthBarData object) is complex and not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <HealthBar data={manualData} {...getComponentProps()} />
              <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                <h3 className="text-sm font-semibold">Edit Health Bar Data:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current" className="text-xs">Current</Label>
                    <Input
                      id="current"
                      type="number"
                      min="0"
                      max={manualData.max}
                      value={manualData.current}
                      onChange={(e) =>
                        setManualData((prev) => ({
                          ...prev,
                          current: Math.max(0, Math.min(prev.max, parseInt(e.target.value) || 0)),
                        }))
                      }
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max" className="text-xs">Max</Label>
                    <Input
                      id="max"
                      type="number"
                      min="1"
                      value={manualData.max}
                      onChange={(e) => {
                        const newMax = Math.max(1, parseInt(e.target.value) || 100);
                        setManualData((prev) => ({
                          ...prev,
                          max: newMax,
                          current: Math.min(prev.current, newMax),
                        }));
                      }}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondsToNext" className="text-xs">Seconds to Next</Label>
                    <Input
                      id="secondsToNext"
                      type="number"
                      min="0"
                      value={manualData.secondsToNext}
                      onChange={(e) =>
                        setManualData((prev) => ({
                          ...prev,
                          secondsToNext: Math.max(0, parseInt(e.target.value) || 0),
                        }))
                      }
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
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
              real-time. Note: The `data` prop (HealthBarData object) is complex and not editable here.
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
                      {prop.inputType === "boolean" ? (
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
            <HealthBar data={manualData} {...getComponentProps()} />
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
