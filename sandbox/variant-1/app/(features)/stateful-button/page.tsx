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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CursorClick,
  Lightning,
  CheckCircle,
  XCircle,
  Plus,
  Trash,
  Download,
  FloppyDisk,
  Share,
  Heart,
  Star,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { StatefulButton } from "@/features/stateful-button/components/stateful-button";
import type { StatefulButtonProps } from "@/features/stateful-button/types";
import { toast } from "sonner";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

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

export default function StatefulButtonPage() {
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [selectedChildrenKey, setSelectedChildrenKey] = useState("Click Me");

  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      transform: (value) => value as StatefulButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg"],
      transform: (value) => value as StatefulButtonProps["size"],
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
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
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
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof StatefulButtonProps> = {
    variant: "variant",
    size: "size",
    disabled: "disabled",
    rateLimitMs: "rateLimitMs",
    className: "className",
    doubleTapToConfirm: "doubleTapToConfirm",
    doubleTapTimeoutMs: "doubleTapTimeoutMs",
    doubleTapConfirmMessage: "doubleTapConfirmMessage",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<StatefulButtonProps>({
      initialConfig,
      propMap,
    });

  const getSelectedChildren = () => {
    const option = childrenMap[selectedChildrenKey];
    if (option) {
      return option.render();
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
                {...getComponentProps}
              >
                {getSelectedChildren()}
              </StatefulButton>
            </div>
          </CardContent>
        </Card>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `onAction`, `onSuccess`, and `onError` are not editable here."
        />

        {/* Children Selector */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Children (Button Content)</CardTitle>
            <CardDescription>
              Select the content to display inside the button
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedChildrenKey}
              onValueChange={setSelectedChildrenKey}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {childrenOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    <div className="flex items-center gap-2">
                      {typeof option.render() === "string" ? (
                        <span>{option.label}</span>
                      ) : (
                        <>
                          {option.render()}
                          <span>{option.label}</span>
                        </>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/stateful-button"
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
            (f) => f.path === "/stateful-button"
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
              icon: renderIcon("CircleNotch", "h-5 w-5 text-primary"),
              title: "Loading State",
              description:
                "Shows spinner and loading text while action is in progress",
            },
            {
              icon: renderIcon("CheckCircle", "h-5 w-5 text-primary"),
              title: "Success State",
              description:
                "Displays success icon and message, auto-resets after 2 seconds",
            },
            {
              icon: renderIcon("XCircle", "h-5 w-5 text-primary"),
              title: "Error State",
              description:
                "Shows error icon and message, auto-recovers after 2 seconds",
            },
            {
              icon: renderIcon("Lightning", "h-5 w-5 text-primary"),
              title: "Rate Limiting",
              description:
                "Uses TanStack Pacer to prevent rapid consecutive clicks",
            },
            {
              icon: renderIcon("Sparkle", "h-5 w-5 text-primary"),
              title: "Smooth Animations",
              description:
                "Framer Motion animations for smooth state transitions",
            },
            {
              icon: renderIcon("Gear", "h-5 w-5 text-primary"),
              title: "Customizable",
              description:
                "Configurable rate limits, callbacks, and styling options",
            },
            {
              icon: renderIcon("CursorClick", "h-5 w-5 text-primary"),
              title: "Double Tap to Confirm",
              description:
                "Require two taps for destructive actions with automatic timeout reset",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
