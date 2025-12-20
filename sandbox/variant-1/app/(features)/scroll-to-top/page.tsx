"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ScrollToTopButton = dynamic(
  () =>
    import("@/features/scroll-to-top/components/scroll-to-top-button").then(
      (mod) => ({
        default: mod.ScrollToTopButton,
      })
    ),
  { ssr: false }
);
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
  ArrowUp,
  CaretUp,
  ArrowCircleUp,
  CursorClick,
  Scroll,
  Sparkle,
  Code,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

type Position = "left" | "center" | "right";

const iconMap: Record<string, Icon> = {
  ArrowUp,
  CaretUp,
  ArrowCircleUp,
};

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number;
  value: string | number;
  inputType: "number" | "select" | "text" | "icon";
  options?: string[];
}

export default function ScrollToTopPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "threshold",
      type: "number",
      description: "Scroll distance in pixels before button appears",
      defaultValue: 100,
      value: 100,
      inputType: "number",
    },
    {
      property: "position",
      type: '"left" | "center" | "right"',
      description: "Horizontal position of the button",
      defaultValue: "center",
      value: "center",
      inputType: "select",
      options: ["left", "center", "right"],
    },
    {
      property: "children",
      type: "ReactNode",
      description: "Icon or content to display inside the button",
      defaultValue: "ArrowUp",
      value: "ArrowUp",
      inputType: "icon",
      options: Object.keys(iconMap),
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

  const handleValueChange = (index: number, newValue: string | number) => {
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
      threshold?: number;
      position?: Position;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "threshold") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.threshold = numValue;
        }
      } else if (prop.property === "position") {
        componentProps.position = prop.value as Position;
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  const getSelectedIcon = () => {
    const childrenProp = props.find((p) => p.property === "children");
    if (childrenProp && typeof childrenProp.value === "string") {
      const IconComponent = iconMap[childrenProp.value];
      if (IconComponent) {
        return <IconComponent className="h-4 w-4" />;
      }
    }
    return <ArrowUp className="h-4 w-4" />;
  };

  return (
    <>
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
            Scroll down to see the button appear.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[200px] rounded-lg border border-dashed bg-muted/20 p-8">
            <div className="text-center text-sm text-muted-foreground mb-4">
              Scroll down this page to see the button appear
            </div>
            <ScrollToTopButton {...getComponentProps()}>
              {getSelectedIcon()}
            </ScrollToTopButton>
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
            real-time
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
                    ) : prop.inputType === "icon" ? (
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
                          {prop.options?.map((iconName) => {
                            const IconComponent = iconMap[iconName];
                            return (
                              <SelectItem key={iconName} value={iconName}>
                                <div className="flex items-center gap-2">
                                  {IconComponent && (
                                    <IconComponent className="h-4 w-4" />
                                  )}
                                  <span>{iconName}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
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
                              : Number(e.target.value)
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
                        placeholder="Enter className"
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
      {/* How to Test Card */}
      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/scroll-to-top"
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

      {/* Features Card */}
      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/scroll-to-top"
        );
        if (featureData?.features) {
          const featuresWithIcons = featureData.features.map((feature) => ({
            icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
            title: feature.title,
            description: feature.description,
          }));

          return <FeaturesGlossary features={featuresWithIcons} />;
        }
        return null;
      })()}

      {/* Demo Content Section */}
      <section className="space-y-6">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Scroll className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Demo Content</CardTitle>
            </div>
            <CardDescription>
              Scroll down to see the scroll-to-top button appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array.from({ length: 15 }).map((_, index) => (
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
                    This is demo content block {index + 1}. Scroll further down
                    to see the scroll-to-top button appear in the bottom-center
                    of the screen. The button will smoothly fade in once
                    you&apos;ve scrolled past the threshold.
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
      </section>

      <ScrollToTopButton {...getComponentProps()}>
        {getSelectedIcon()}
      </ScrollToTopButton>
    </>
  );
}
