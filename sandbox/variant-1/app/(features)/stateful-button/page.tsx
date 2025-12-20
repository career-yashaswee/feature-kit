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
import {
  CursorClick,
  Lightning,
  Sparkle,
  Code,
  Gear,
  CircleNotch,
  CheckCircle,
  XCircle,
  Plus,
  Trash,
  Download,
  Upload,
  FloppyDisk,
  Share,
  Heart,
  Star,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { StatefulButton } from "@/features/stateful-button/components/stateful-button";
import { toast } from "sonner";

type ChildrenOption = {
  key: string;
  label: string;
  render: () => ReactNode;
};

const childrenOptions: ChildrenOption[] = [
  {
    key: "Click Me",
    label: "Click Me",
    render: () => "Click Me",
  },
  {
    key: "Submit",
    label: "Submit",
    render: () => "Submit",
  },
  {
    key: "Save",
    label: "Save",
    render: () => "Save",
  },
  {
    key: "Delete",
    label: "Delete",
    render: () => "Delete",
  },
  {
    key: "Download",
    label: "Download",
    render: () => "Download",
  },
  {
    key: "Upload",
    label: "Upload",
    render: () => "Upload",
  },
  {
    key: "icon-plus",
    label: "Plus Icon",
    render: () => <Plus className="h-4 w-4" />,
  },
  {
    key: "icon-trash",
    label: "Trash Icon",
    render: () => <Trash className="h-4 w-4" />,
  },
  {
    key: "icon-download",
    label: "Download Icon",
    render: () => <Download className="h-4 w-4" />,
  },
  {
    key: "icon-heart",
    label: "Heart Icon",
    render: () => <Heart className="h-4 w-4" />,
  },
  {
    key: "icon-star",
    label: "Star Icon",
    render: () => <Star className="h-4 w-4" />,
  },
  {
    key: "plus-text",
    label: "Plus + Text",
    render: () => (
      <>
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </>
    ),
  },
  {
    key: "save-text",
    label: "Save + Text",
    render: () => (
      <>
        <FloppyDisk className="h-4 w-4 mr-2" />
        Save Changes
      </>
    ),
  },
  {
    key: "download-text",
    label: "Download + Text",
    render: () => (
      <>
        <Download className="h-4 w-4 mr-2" />
        Download File
      </>
    ),
  },
  {
    key: "share-text",
    label: "Share + Text",
    render: () => (
      <>
        <Share className="h-4 w-4 mr-2" />
        Share
      </>
    ),
  },
];

const childrenMap: Record<string, ChildrenOption> = {};
childrenOptions.forEach((option) => {
  childrenMap[option.key] = option;
});

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean" | "reactnode";
  options?: string[];
}

export default function StatefulButtonPage() {
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    {
      property: "disabled",
      type: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "rateLimitMs",
      type: "number",
      description: "Rate limit in milliseconds between actions",
      defaultValue: 1000,
      value: 1000,
      inputType: "number",
    },
    {
      property: "children",
      type: "ReactNode",
      description: "Content to display inside the button",
      defaultValue: "Click Me",
      value: "Click Me",
      inputType: "reactnode",
      options: childrenOptions.map((opt) => opt.key),
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "doubleTapToConfirm",
      type: "boolean",
      description: "Require double tap to confirm action (useful for destructive actions)",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "doubleTapTimeoutMs",
      type: "number",
      description: "Timeout in milliseconds before double tap confirmation resets",
      defaultValue: 3000,
      value: 3000,
      inputType: "number",
    },
    {
      property: "doubleTapConfirmMessage",
      type: "string",
      description: "Message to show when waiting for confirmation tap",
      defaultValue: "Press again to confirm",
      value: "Press again to confirm",
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
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
      size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
      disabled?: boolean;
      rateLimitMs?: number;
      className?: string;
      doubleTapToConfirm?: boolean;
      doubleTapTimeoutMs?: number;
      doubleTapConfirmMessage?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "disabled") {
        componentProps.disabled = Boolean(prop.value);
      } else if (prop.property === "rateLimitMs") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.rateLimitMs = numValue;
        }
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      } else if (prop.property === "doubleTapToConfirm") {
        componentProps.doubleTapToConfirm = Boolean(prop.value);
      } else if (prop.property === "doubleTapTimeoutMs") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.doubleTapTimeoutMs = numValue;
        }
      } else if (prop.property === "doubleTapConfirmMessage" && prop.value) {
        componentProps.doubleTapConfirmMessage = String(prop.value);
      }
    });

    return componentProps;
  };

  const getSelectedChildren = () => {
    const childrenProp = props.find((p) => p.property === "children");
    if (childrenProp && typeof childrenProp.value === "string") {
      const option = childrenMap[childrenProp.value];
      if (option) {
        return option.render();
      }
    }
    return "Click Me";
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccessCount((prev) => prev + 1);
    toast.success("Action completed successfully!");
  };

  const handleError = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setErrorCount((prev) => prev + 1);
    throw new Error("Something went wrong!");
  };

  const handleRateLimited = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.info("Action executed (rate limited)");
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
              Note: Complex props like `onAction`, `onSuccess`, and `onError` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <StatefulButton
                onAction={handleSuccess}
                onSuccess={() => {
                  console.log("Success callback executed");
                }}
                {...getComponentProps()}
              >
                {getSelectedChildren()}
              </StatefulButton>
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
              real-time. Note: Complex props like `onAction`, `onSuccess`, and `onError` are not editable here.
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
                                : Number(e.target.value)
                            )
                          }
                          className="h-8"
                        />
                      ) : prop.inputType === "reactnode" ? (
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
                            {prop.options?.map((optionKey) => {
                              const option = childrenMap[optionKey];
                              return (
                                <SelectItem key={optionKey} value={optionKey}>
                                  <div className="flex items-center gap-2">
                                    {typeof option?.render() === "string" ? (
                                      <span>{option.label}</span>
                                    ) : (
                                      <>
                                        {option?.render()}
                                        <span>{option?.label}</span>
                                      </>
                                    )}
                                  </div>
                                </SelectItem>
                              );
                            })}
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

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Click the buttons below to see different states in action. Try
              clicking rapidly to test rate limiting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Click the 'Success Action' button to see loading → success transition",
                "Click the 'Error Action' button to see loading → error transition",
                "Try clicking rapidly to test rate limiting (1 second interval)",
                "Test double tap confirmation on the 'Delete Item' button below",
                "Watch the smooth animations between states",
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

        {/* Example Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Success State</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the button to see a successful action with automatic state
                reset after 2 seconds.
              </p>
              <StatefulButton
                onAction={handleSuccess}
                onSuccess={() => {
                  console.log("Success callback executed");
                }}
                rateLimitMs={1000}
              >
                Success Action
              </StatefulButton>
              <div className="text-sm text-muted-foreground">
                Success count: {successCount}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <XCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Error State</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the button to see an error state with automatic recovery
                after 2 seconds.
              </p>
              <StatefulButton
                onAction={handleError}
                onError={(error) => {
                  console.error("Error callback executed:", error);
                }}
                rateLimitMs={1000}
              >
                Error Action
              </StatefulButton>
              <div className="text-sm text-muted-foreground">
                Error count: {errorCount}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Rate Limiting</CardTitle>
            </div>
            <CardDescription>
              Test rate limiting by clicking rapidly. The button uses TanStack
              Pacer to limit actions to once per second.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatefulButton
              onAction={handleRateLimited}
              rateLimitMs={1000}
              variant="outline"
            >
              Rate Limited Action (1s)
            </StatefulButton>
            <p className="text-sm text-muted-foreground">
              Try clicking this button multiple times quickly. You&apos;ll
              notice it only executes once per second due to rate limiting.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-destructive/10 p-2 shrink-0">
                <Trash className="h-5 w-5 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Double Tap to Confirm</CardTitle>
            </div>
            <CardDescription>
              For destructive actions, require two taps to confirm. First tap
              shows confirmation message, second tap executes the action. If
              you wait too long, it resets automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatefulButton
              onAction={async () => {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                toast.success("Item deleted successfully");
              }}
              variant="destructive"
              doubleTapToConfirm={true}
              doubleTapTimeoutMs={3000}
              doubleTapConfirmMessage="Press again to delete"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Item
            </StatefulButton>
            <p className="text-sm text-muted-foreground">
              Click once to see confirmation message, click again to delete.
              Wait 3 seconds to see it reset automatically.
            </p>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: CircleNotch,
                  title: "Loading State",
                  description:
                    "Shows spinner and loading text while action is in progress",
                },
                {
                  icon: CheckCircle,
                  title: "Success State",
                  description:
                    "Displays success icon and message, auto-resets after 2 seconds",
                },
                {
                  icon: XCircle,
                  title: "Error State",
                  description:
                    "Shows error icon and message, auto-recovers after 2 seconds",
                },
                {
                  icon: Lightning,
                  title: "Rate Limiting",
                  description:
                    "Uses TanStack Pacer to prevent rapid consecutive clicks",
                },
                {
                  icon: Sparkle,
                  title: "Smooth Animations",
                  description:
                    "Framer Motion animations for smooth state transitions",
                },
                {
                  icon: Gear,
                  title: "Customizable",
                  description:
                    "Configurable rate limits, callbacks, and styling options",
                },
                {
                  icon: CursorClick,
                  title: "Double Tap to Confirm",
                  description:
                    "Require two taps for destructive actions with automatic timeout reset",
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
      </main>
    </div>
  );
}
