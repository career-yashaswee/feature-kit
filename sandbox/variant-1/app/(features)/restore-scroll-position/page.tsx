"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
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
import {
  Scroll,
  Code,
  Lightning,
  CursorClick,
  Gear,
} from "@phosphor-icons/react";
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

const RestoreScrollPosition = dynamic(
  () =>
    import("@/features/restore-scroll-position/components/restore-scroll-position").then(
      (mod) => ({
        default: mod.RestoreScrollPosition,
      })
    ),
  { ssr: false }
);

export default function RestoreScrollPositionPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "storageKey",
      type: "string",
      description: "Unique key for storing scroll position in storage",
      defaultValue: "restore-scroll-position-demo",
      value: "restore-scroll-position-demo",
      inputType: "text",
    },
    {
      property: "persist",
      type: "boolean",
      description: "If true, uses localStorage (persistent). If false, uses sessionStorage (temporary)",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "debounceMs",
      type: "number",
      description: "Debounce delay in milliseconds for saving scroll position",
      defaultValue: 100,
      value: 100,
      inputType: "number",
    },
    {
      property: "enabled",
      type: "boolean",
      description: "Enable or disable scroll position memory",
      defaultValue: true,
      value: true,
      inputType: "boolean",
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
      storageKey: string;
      persist?: boolean;
      debounceMs?: number;
      enabled?: boolean;
    } = {
      storageKey: "restore-scroll-position-demo",
    };

    props.forEach((prop) => {
      if (prop.property === "storageKey" && prop.value) {
        componentProps.storageKey = String(prop.value);
      } else if (prop.property === "persist") {
        componentProps.persist = Boolean(prop.value);
      } else if (prop.property === "debounceMs") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.debounceMs = numValue;
        }
      } else if (prop.property === "enabled") {
        componentProps.enabled = Boolean(prop.value);
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
              Note: The `children` and `container` props are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed bg-muted/20 p-8 min-h-[200px]">
              <RestoreScrollPosition {...getComponentProps()}>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Scroll down this demo area to test scroll position restoration.
                    The component wraps content and saves scroll position.
                  </p>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-card">
                      <p className="text-sm">Content block {i + 1}</p>
                    </div>
                  ))}
                </div>
              </RestoreScrollPosition>
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
              real-time. Note: The `children` and `container` props are not editable here.
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/restore-scroll-position"
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion || "This page uses session storage by default. Scroll positions are saved automatically as you scroll and restored when you return. The scroll position is debounced to avoid excessive storage writes."}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return (
            <HowToTestCard
              steps={[
                "Scroll down this page to any position",
                "Navigate to another page or refresh the page",
                "Come back to this page",
                "Your scroll position should be automatically restored",
              ]}
              conclusion="This page uses session storage by default. Scroll positions are saved automatically as you scroll and restored when you return. The scroll position is debounced to avoid excessive storage writes."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <RestoreScrollPosition {...getComponentProps()}>
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scroll className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Demo Content</CardTitle>
                <CardDescription>
                  Scroll down to see the scroll position memory in action
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 px-3 py-1">
                        <span className="text-xs font-semibold text-primary">
                          Section {index + 1}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      This is demo content block {index + 1}. Scroll further
                      down to test the scroll position memory feature. When you
                      navigate away and come back, your scroll position will be
                      automatically restored to where you left off.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-md bg-muted/50" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RestoreScrollPosition>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/restore-scroll-position"
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
              icon: <Scroll className="h-5 w-5 text-primary" />,
              title: "Automatic Restoration",
              description:
                "Automatically restores scroll position when component mounts or page loads",
            },
            {
              icon: renderIcon("Gear", "h-5 w-5 text-primary"),
              title: "Storage Options",
              description:
                "Choose between session storage (temporary) or local storage (persistent)",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Debounced Saving",
              description:
                "Scroll position is saved with debouncing to avoid excessive storage writes",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "Flexible Usage",
              description:
                "Use as a wrapper component or with the useScrollPosition hook directly",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Gear className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Configuration Options</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">storageKey</h3>
                <p className="text-sm text-muted-foreground">
                  Unique key for storing scroll position in storage
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">persist</h3>
                <p className="text-sm text-muted-foreground">
                  If true, uses localStorage (persistent). If false, uses
                  sessionStorage (temporary, default)
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">debounceMs</h3>
                <p className="text-sm text-muted-foreground">
                  Debounce delay in milliseconds for saving scroll position
                  (default: 100ms)
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-2 font-semibold">enabled</h3>
                <p className="text-sm text-muted-foreground">
                  Enable or disable scroll position memory (default: true)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
