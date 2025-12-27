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
  CircleNotch,
  FileText,
  Lightning,
  ArrowsClockwise,
  Code,
} from "@phosphor-icons/react";
import { PageLoader, type LoadingState } from "@/features/page-loader";
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
    title: "Refresh Integration",
    description: "Built-in refresh button using FeatureKit's RefreshButton",
    icon: ArrowsClockwise,
  },
  {
    title: "Customizable Branding",
    description: "Configurable brand name, icon, and loading messages",
    icon: FileText,
  },
  {
    title: "Smooth Animations",
    description: "Elegant fade and scale transitions for better UX",
    icon: Lightning,
  },
];

async function fetchPageData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: "Loaded!" };
}

export default function PageLoaderPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "isFullScreen",
      type: "boolean",
      description: "Whether to show as full-screen overlay",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "hideBranding",
      type: "boolean",
      description: "Whether to hide the branding section",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "brandName",
      type: "string",
      description: "Brand name to display",
      defaultValue: "FeatureKit",
      value: "FeatureKit",
      inputType: "text",
    },
    {
      property: "refreshDelay",
      type: "number",
      description: "Delay in milliseconds before showing refresh button",
      defaultValue: 10000,
      value: 10000,
      inputType: "number",
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

  const { refetch } = useQuery({
    queryKey: ["page-data"],
    queryFn: fetchPageData,
    enabled: false,
  });

  const loadingState: LoadingState = {
    title: "Loading Page",
    messages: [
      "Preparing your experience...",
      "Loading content...",
      "Almost there...",
    ],
    icon: FileText,
  };

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
      isFullScreen?: boolean;
      hideBranding?: boolean;
      brandName?: string;
      refreshDelay?: number;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "isFullScreen") {
        componentProps.isFullScreen = Boolean(prop.value);
      } else if (prop.property === "hideBranding") {
        componentProps.hideBranding = Boolean(prop.value);
      } else if (prop.property === "brandName" && prop.value) {
        componentProps.brandName = String(prop.value);
      } else if (prop.property === "refreshDelay") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.refreshDelay = numValue;
        }
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
              Click &quot;Show Loader&quot; to see it in action. Note: The `isVisible`, `loadingState`, `brandIcon`, `refreshQueryKeys`, and `onRefresh` props are complex and not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowLoader(true)}>Show Loader</Button>
              <Button variant="outline" onClick={() => setShowLoader(false)}>
                Hide Loader
              </Button>
            </div>
            <div className="relative h-64 border rounded-lg overflow-hidden">
              <PageLoader
                isVisible={showLoader}
                loadingState={loadingState}
                refreshQueryKeys={[["page-data"]]}
                {...getComponentProps()}
              />
              {!showLoader && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Click &quot;Show Loader&quot; to see it in action
                </div>
              )}
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
              real-time. Note: Complex props like `isVisible`, `loadingState`, `brandIcon`, `refreshQueryKeys`, and `onRefresh` are not editable here.
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
                <CircleNotch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Page Loader component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the 'Show Loader' button below to see the loader in action",
                "Wait 10 seconds to see the refresh button appear",
                "Try the full-screen variant for overlay loading",
                "Notice the smooth animations and progress bar",
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
                <CircleNotch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Standard Loader</CardTitle>
            </div>
            <CardDescription>
              Page loader with refresh functionality and custom messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowLoader(true)}>Show Loader</Button>
              <Button variant="outline" onClick={() => setShowLoader(false)}>
                Hide Loader
              </Button>
            </div>
            <div className="relative h-64 border rounded-lg overflow-hidden">
              <PageLoader
                isVisible={showLoader}
                loadingState={loadingState}
                brandName="FeatureKit"
                refreshQueryKeys={[["page-data"]]}
                refreshDelay={10000}
              />
              {!showLoader && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Click &quot;Show Loader&quot; to see it in action
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CircleNotch className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Full Screen Loader</CardTitle>
            </div>
            <CardDescription>
              Full-screen overlay loader for page transitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={() => setShowFullScreen(true)}>
                Show Full Screen
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFullScreen(false)}
              >
                Hide
              </Button>
            </div>
            <PageLoader
              isVisible={showFullScreen}
              loadingState={loadingState}
              isFullScreen
              brandName="FeatureKit"
              onRefresh={() => {
                refetch();
                setShowFullScreen(false);
              }}
              refreshDelay={10000}
            />
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
