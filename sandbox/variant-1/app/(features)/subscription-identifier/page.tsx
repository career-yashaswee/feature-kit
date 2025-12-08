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
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkle, Lightning, Code } from "@phosphor-icons/react";
import { SubscriptionIdentifier } from "@/features/subscription-identifier/components/subscription-identifier";

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
    title: "Subscription Status",
    description:
      "Visual indicator for subscription status with elegant styling",
    icon: Crown,
  },
  {
    title: "Multiple Variants",
    description: "Outline and solid variants with different styling options",
    icon: Sparkle,
  },
  {
    title: "Flexible Props",
    description: "Accepts subscription status as prop or from store",
    icon: Lightning,
  },
];

export default function SubscriptionIdentifierPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "isUserSubscribed",
      type: "boolean",
      description: "Whether the user is subscribed",
      defaultValue: false,
      value: false,
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
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the subscription identifier",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
    },
    {
      property: "variant",
      type: '"outline" | "solid"',
      description: "Visual variant of the identifier",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["outline", "solid"],
    },
    {
      property: "label",
      type: "string",
      description: "Custom label text",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the icon",
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
      isUserSubscribed?: boolean;
      isLoading?: boolean;
      size?: "sm" | "md" | "lg";
      variant?: "outline" | "solid";
      label?: string;
      showIcon?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "isUserSubscribed") {
        componentProps.isUserSubscribed = Boolean(prop.value);
      } else if (prop.property === "isLoading") {
        componentProps.isLoading = Boolean(prop.value);
      } else if (prop.property === "size") {
        componentProps.size = prop.value as "sm" | "md" | "lg";
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as "outline" | "solid";
      } else if (prop.property === "label" && prop.value) {
        componentProps.label = String(prop.value);
      } else if (prop.property === "showIcon") {
        componentProps.showIcon = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  const toggleSubscription = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(!isSubscribed);
      setIsLoading(false);
    }, 500);
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
            <SubscriptionIdentifier
              isUserSubscribed={getComponentProps().isUserSubscribed ?? false}
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
                          value={prop.value}
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
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Subscription Identifier component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Observe the different styles for subscribed vs non-subscribed states",
                "Click the toggle button to switch between states",
                "Try different sizes (sm, md, lg) and variants (outline, solid)",
                "Notice the loading state when toggling",
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
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different badge styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSubscription}
                disabled={isLoading}
                className="px-4 py-2 border rounded-md hover:bg-muted disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Toggle Subscription"}
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  isLoading={true}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Outline - Not Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Outline - Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Solid - Not Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="solid"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Solid - Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="solid"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Size Variants</CardTitle>
            </div>
            <CardDescription>
              Subscription identifier available in different sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Small:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Medium:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="md"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Large:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning size={20} className="text-primary" />
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
                    <feature.icon size={20} className="text-primary" />
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
