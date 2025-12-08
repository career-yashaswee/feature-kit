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
import { ArrowUp, Lightning, CreditCard, Code } from "@phosphor-icons/react";
import { UpgradeButton } from "@/features/upgrade-button/components/upgrade-button";
import type { UpgradeAction } from "@/features/upgrade-button/types";

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
    title: "Smart State Management",
    description:
      "Automatically shows appropriate button based on subscription status",
    icon: CreditCard,
  },
  {
    title: "Configurable Actions",
    description: "Support for trial, upgrade, and manage subscription actions",
    icon: ArrowUp,
  },
  {
    title: "Flexible Styling",
    description: "Multiple variants, sizes, and icon-only mode",
    icon: Lightning,
  },
];

export default function UpgradeButtonPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "isSubscribed",
      type: "boolean",
      description: "Whether the user is subscribed",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "isLoading",
      type: "boolean",
      description: "Whether the button is in loading state",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "variant",
      type: "ButtonVariant",
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "link",
        "destructive",
      ],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    {
      property: "showMessage",
      type: "boolean",
      description: "Whether to show the upgrade message",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "fullWidth",
      type: "boolean",
      description: "Whether the button should take full width",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "iconOnly",
      type: "boolean",
      description: "Whether to show only the icon",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "loadingText",
      type: "string",
      description: "Text to show during loading",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "subscribedText",
      type: "string",
      description: "Text to show when subscribed",
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
      isSubscribed?: boolean;
      isLoading?: boolean;
      variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
      size?: "default" | "sm" | "lg" | "icon";
      showMessage?: boolean;
      fullWidth?: boolean;
      iconOnly?: boolean;
      loadingText?: string;
      subscribedText?: string;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "isSubscribed") {
        componentProps.isSubscribed = Boolean(prop.value);
      } else if (prop.property === "isLoading") {
        componentProps.isLoading = Boolean(prop.value);
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "showMessage") {
        componentProps.showMessage = Boolean(prop.value);
      } else if (prop.property === "fullWidth") {
        componentProps.fullWidth = Boolean(prop.value);
      } else if (prop.property === "iconOnly") {
        componentProps.iconOnly = Boolean(prop.value);
      } else if (prop.property === "loadingText" && prop.value) {
        componentProps.loadingText = String(prop.value);
      } else if (prop.property === "subscribedText" && prop.value) {
        componentProps.subscribedText = String(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const handleManage = async () => {
    console.log("Navigate to billing page");
  };

  const upgradeAction: UpgradeAction = {
    type: "start_trial",
    buttonText: "Start Free Trial",
    message: "Upgrade to unlock premium features",
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
            <UpgradeButton
              upgradeAction={upgradeAction}
              onUpgrade={handleUpgrade}
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
              real-time. Note: Complex props like `upgradeAction` (object), `onUpgrade` (function), `subscribedIcon`, and `upgradeIcon` (React components) are not editable here.
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
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Upgrade Button component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the upgrade button to see the loading state",
                "After loading, the button changes to 'Manage Subscription'",
                "Toggle the subscription status to see different button states",
                "Try different variants and sizes in the examples below",
                "Test the icon-only mode and full-width option",
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
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different button states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="px-4 py-2 border rounded-md hover:bg-muted text-sm"
              >
                Toggle Subscription
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Not Subscribed:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={isLoading}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                  showMessage
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Subscribed:</p>
                <UpgradeButton isSubscribed={true} onUpgrade={handleManage} />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={true}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Variants</CardTitle>
            </div>
            <CardDescription>
              Upgrade button available in different button variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="default"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="outline"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="secondary"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="ghost"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Icon Only & Full Width</CardTitle>
            </div>
            <CardDescription>
              Icon-only mode and full-width button options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Icon Only:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                iconOnly
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Full Width:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                fullWidth
              />
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
