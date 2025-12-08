"use client";

import dynamic from "next/dynamic";
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
  Keyboard,
  Sparkle,
  Code,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { useKeyboardShortcut } from "@/features/keyboard-shortcuts";

const KeyboardShortcuts = dynamic(
  () =>
    import("@/features/keyboard-shortcuts/components/keyboard-shortcuts").then(
      (mod) => ({
        default: mod.KeyboardShortcuts,
      }),
    ),
  { ssr: false },
);

const shortcuts = [
  {
    keys: ["mod", "k"],
    description: "Open keyboard shortcuts dialog",
    category: "Navigation",
  },
  {
    keys: ["mod", "s"],
    description: "Save current document",
    category: "Actions",
  },
  {
    keys: ["mod", "n"],
    description: "Create new item",
    category: "Actions",
  },
  {
    keys: ["mod", "f"],
    description: "Search",
    category: "Search",
  },
  {
    keys: ["escape"],
    description: "Close dialog or cancel action",
    category: "Navigation",
  },
  {
    keys: ["mod", "shift", "p"],
    description: "Open command palette",
    category: "Navigation",
  },
  {
    keys: ["mod", "b"],
    description: "Toggle sidebar",
    category: "Navigation",
  },
  {
    keys: ["mod", "shift", "d"],
    description: "Duplicate selection",
    category: "Actions",
  },
];

export default function KeyboardShortcutsPage() {
  const [actionCount, setActionCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);

  useKeyboardShortcut("mod+s", () => {
    setSaveCount((prev) => prev + 1);
  });

  useKeyboardShortcut("mod+n", () => {
    setActionCount((prev) => prev + 1);
  });

  useKeyboardShortcut("mod+f", () => {
    setSearchCount((prev) => prev + 1);
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Keyboard className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Keyboard Navigation</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Keyboard Shortcuts Manager
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A powerful keyboard shortcuts manager that helps users discover and
            use keyboard shortcuts efficiently. Press Cmd+K (or Ctrl+K) to open
            the shortcuts dialog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Sparkle className="h-3 w-3" />
              Smart Grouping
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Gear className="h-3 w-3" />
              Customizable
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Lightning className="h-3 w-3" />
              Easy Integration
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Press Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open the
                  keyboard shortcuts dialog
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Press Cmd+K (or Ctrl+K) to open the shortcuts dialog",
                  "Browse through the categorized shortcuts",
                  "Try the active shortcuts below to see them in action",
                  "Use the useKeyboardShortcut hook to add your own shortcuts",
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
            <div className="rounded-sm border-l-8 border-primary bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">
                The shortcuts dialog shows all available shortcuts grouped by
                category. You can customize the trigger key and add your own
                shortcuts using the useKeyboardShortcut hook.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Active Shortcuts</CardTitle>
            </div>
            <CardDescription>
              These shortcuts are active on this page. Try them out!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Cmd+S
                  </Badge>
                  <span className="text-sm font-medium">Save</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Save count: {saveCount}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Cmd+N
                  </Badge>
                  <span className="text-sm font-medium">New</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Action count: {actionCount}
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Cmd+F
                  </Badge>
                  <span className="text-sm font-medium">Search</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Search count: {searchCount}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSaveCount(0);
                  setActionCount(0);
                  setSearchCount(0);
                }}
              >
                Reset Counts
              </Button>
            </div>
          </CardContent>
        </Card>

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
                  icon: Keyboard,
                  title: "Keyboard Shortcuts Dialog",
                  description:
                    "Beautiful dialog showing all available shortcuts grouped by category",
                },
                {
                  icon: Gear,
                  title: "Customizable Trigger",
                  description:
                    "Set your own trigger key combination (default: Cmd+K)",
                },
                {
                  icon: Code,
                  title: "useKeyboardShortcut Hook",
                  description:
                    "Easy-to-use hook for adding custom keyboard shortcuts",
                },
                {
                  icon: Lightning,
                  title: "Platform Aware",
                  description:
                    "Automatically displays correct modifier keys for Mac/Windows",
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

      <KeyboardShortcuts shortcuts={shortcuts} />
    </div>
  );
}
