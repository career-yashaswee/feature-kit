"use client";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scroll,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
} from "lucide-react";

const RestoreScrollPosition = dynamic(
  () =>
    import(
      "@/features/restore-scroll-position/components/restore-scroll-position"
    ).then((mod) => ({
      default: mod.RestoreScrollPosition,
    })),
  { ssr: false },
);

export default function RestoreScrollPositionPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Scroll className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Scroll Memory</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Scroll Position Memory
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Automatically remember and restore scroll positions when users
            navigate away and come back. Supports both session storage and
            persistent local storage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Sparkles className="h-3 w-3" />
              Auto Restore
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Settings className="h-3 w-3" />
              Configurable
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Zap className="h-3 w-3" />
              Debounced
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Scroll down this page, then navigate away and come back to
                  see your scroll position automatically restored
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Scroll down this page to any position",
                  "Navigate to another page or refresh the page",
                  "Come back to this page",
                  "Your scroll position should be automatically restored",
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
                This page uses session storage by default. Scroll positions are
                saved automatically as you scroll and restored when you return.
                The scroll position is debounced to avoid excessive storage
                writes.
              </p>
            </div>
          </CardContent>
        </Card>

        <RestoreScrollPosition storageKey="restore-scroll-position-demo">
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
                        <div
                          key={i}
                          className="h-20 rounded-md bg-muted/50"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RestoreScrollPosition>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Scroll,
                  title: "Automatic Restoration",
                  description:
                    "Automatically restores scroll position when component mounts or page loads",
                },
                {
                  icon: Settings,
                  title: "Storage Options",
                  description:
                    "Choose between session storage (temporary) or local storage (persistent)",
                },
                {
                  icon: Zap,
                  title: "Debounced Saving",
                  description:
                    "Scroll position is saved with debouncing to avoid excessive storage writes",
                },
                {
                  icon: Code,
                  title: "Flexible Usage",
                  description:
                    "Use as a wrapper component or with the useScrollPosition hook directly",
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

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Settings className="h-5 w-5 text-primary" />
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

