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
                        value={prop.value}
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
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <CursorClick className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
              <CardDescription className="text-base">
                Try scrolling down to see the button appear and click it to
                smoothly return to the top
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Testing Steps:</h3>
            <ol className="space-y-3">
              {[
                "Scroll down the page until you see the button appear",
                "Watch the smooth fade-in animation as it appears",
                "Click the button to smoothly scroll back to the top",
                "Try scrolling from different positions to see it in action",
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
          </div>
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground">
              The scroll-to-top button will appear in the center-bottom of the
              screen after you scroll down 100px. Keep scrolling to see more
              demo content!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Sparkle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Scroll,
                title: "Smooth Scrolling",
                description:
                  "Butter-smooth scroll animation that provides a delightful user experience",
              },
              {
                icon: Sparkle,
                title: "Elegant Animation",
                description:
                  "Beautiful fade-in/fade-out animations with framer-motion",
              },
              {
                icon: Gear,
                title: "Customizable",
                description:
                  "Adjust threshold, position, and styling to match your design",
              },
              {
                icon: Code,
                title: "TypeScript Support",
                description:
                  "Fully typed with TypeScript for better developer experience",
              },
            ].map((feature, index) => (
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
