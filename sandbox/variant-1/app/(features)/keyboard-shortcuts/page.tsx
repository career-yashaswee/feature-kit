"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Keyboard,
  Sparkle,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { useKeyboardShortcut } from "@/features/keyboard-shortcuts";
import type { KeyboardShortcutsProps } from "@/features/keyboard-shortcuts/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const KeyboardShortcuts = dynamic(
  () =>
    import("@/features/keyboard-shortcuts/components/keyboard-shortcuts").then(
      (mod) => ({
        default: mod.KeyboardShortcuts,
      })
    ),
  { ssr: false }
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

  const initialConfig: PropConfig[] = [
    {
      property: "triggerKey",
      type: "string",
      description: "Keyboard shortcut to open the dialog (e.g., 'mod+k')",
      defaultValue: "mod+k",
      value: "mod+k",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "showHelp",
      type: "boolean",
      description: "Whether to show help text in the dialog",
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
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof KeyboardShortcutsProps> = {
    triggerKey: "triggerKey",
    showHelp: "showHelp",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<KeyboardShortcutsProps>({
      initialConfig,
      propMap,
    });

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
        {/* Live Demo */}
        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the component update in real-time as you change props below.
              Note: Complex props like `shortcuts` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Press the trigger key to open the shortcuts dialog. Current trigger:{" "}
                <Badge variant="outline" className="font-mono text-xs">
                  {getComponentProps.triggerKey || "mod+k"}
                </Badge>
              </p>
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `shortcuts` are not editable here."
        />

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>
      </main>

      <KeyboardShortcuts shortcuts={shortcuts} {...getComponentProps} />
    </div>
  );
}
