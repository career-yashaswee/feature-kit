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
import {
  MousePointerClick,
  Zap,
  Sparkles,
  Code,
  Settings,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StatefulButton } from "@/features/stateful-button/components/stateful-button";
import { toast } from "sonner";

export default function StatefulButtonPage() {
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

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
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Button States</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Stateful Button
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A button component that manages loading, success, and error states
            with animations, rate limiting, and automatic state transitions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Loader2 className="h-3 w-3" />
              Loading States
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Sparkles className="h-3 w-3" />
              Animations
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Code className="h-3 w-3" />
              Rate Limiting
            </Badge>
          </div>
        </section>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <MousePointerClick className="h-5 w-5 text-primary" />
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
                  <CheckCircle2 className="h-5 w-5 text-primary" />
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
                <Zap className="h-5 w-5 text-primary" />
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

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Loader2,
                  title: "Loading State",
                  description:
                    "Shows spinner and loading text while action is in progress",
                },
                {
                  icon: CheckCircle2,
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
                  icon: Zap,
                  title: "Rate Limiting",
                  description:
                    "Uses TanStack Pacer to prevent rapid consecutive clicks",
                },
                {
                  icon: Sparkles,
                  title: "Smooth Animations",
                  description:
                    "Framer Motion animations for smooth state transitions",
                },
                {
                  icon: Settings,
                  title: "Customizable",
                  description:
                    "Configurable rate limits, callbacks, and styling options",
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
