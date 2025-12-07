"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CircleNotch,
  FileText,
  Lightning,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { PageLoader, type LoadingState } from "@/features/page-loader";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <CircleNotch className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Page Loader</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Page Loader
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A full-featured page loader with refresh functionality, customizable
            branding, and smooth animations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <CircleNotch className="h-3 w-3" />
              Loading
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <ArrowsClockwise className="h-3 w-3" />
              Refresh
            </Badge>
          </div>
        </section>

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
