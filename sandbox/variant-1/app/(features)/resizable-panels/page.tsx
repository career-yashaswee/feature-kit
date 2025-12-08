"use client";

export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SquaresFour,
  Sparkle,
  Code,
  Gear,
  Lightning,
  CursorClick,
  CodeBlock,
  Folder,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { ResizablePanels } from "@/features/resizable-panels/components/resizable-panels";

export default function ResizablePanelsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Drag the resize handles between panels to resize them. Click
                  the collapse button to collapse panels. The layout will
                  persist in localStorage.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Drag the resize handle between panels to resize them",
                  "Click the collapse button to collapse a panel",
                  "When collapsed, you'll see the icon and label",
                  "Refresh the page to see the layout persist",
                  "Try both horizontal and vertical layouts",
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
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <SquaresFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Horizontal SquaresFour</CardTitle>
              <CardDescription>
                Three-panel horizontal layout with collapsible panels
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] w-full">
              <ResizablePanels
                panels={[
                  {
                    id: "explorer",
                    content: (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Folder className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">File Explorer</p>
                        </div>
                      </div>
                    ),
                    icon: <Folder className="h-5 w-5" />,
                    label: "Explorer",
                    defaultSize: 20,
                    minSize: 10,
                    maxSize: 40,
                    collapsible: true,
                    collapsedSize: 5,
                  },
                  {
                    id: "editor",
                    content: (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <CodeBlock className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Code Editor</p>
                        </div>
                      </div>
                    ),
                    icon: <CodeBlock className="h-5 w-5" />,
                    label: "Editor",
                    defaultSize: 50,
                    minSize: 30,
                    maxSize: 70,
                  },
                  {
                    id: "terminal",
                    content: (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <Code className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Terminal</p>
                        </div>
                      </div>
                    ),
                    icon: <Code className="h-5 w-5" />,
                    label: "Terminal",
                    defaultSize: 30,
                    minSize: 15,
                    maxSize: 50,
                    collapsible: true,
                    collapsedSize: 5,
                  },
                ]}
                direction="horizontal"
                persistLayout={true}
                storageKey="resizable-panels-horizontal-demo"
                showIconsWhenCollapsed={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <SquaresFour className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Vertical SquaresFour</CardTitle>
              <CardDescription>
                Two-panel vertical layout example
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResizablePanels
                panels={[
                  {
                    id: "content",
                    content: (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <CodeBlock className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Content Area</p>
                        </div>
                      </div>
                    ),
                    icon: <CodeBlock className="h-5 w-5" />,
                    label: "Content",
                    defaultSize: 60,
                    minSize: 40,
                    maxSize: 80,
                  },
                  {
                    id: "preview",
                    content: (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <MagnifyingGlass className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Preview</p>
                        </div>
                      </div>
                    ),
                    icon: <MagnifyingGlass className="h-5 w-5" />,
                    label: "Preview",
                    defaultSize: 40,
                    minSize: 20,
                    maxSize: 60,
                    collapsible: true,
                    collapsedSize: 5,
                  },
                ]}
                direction="vertical"
                persistLayout={true}
                storageKey="resizable-panels-vertical-demo"
                showIconsWhenCollapsed={true}
              />
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
                  icon: SquaresFour,
                  title: "Horizontal & Vertical",
                  description:
                    "Support for both horizontal and vertical panel layouts",
                },
                {
                  icon: Gear,
                  title: "Persistent SquaresFour",
                  description:
                    "Panel sizes are saved to localStorage and restored on page load",
                },
                {
                  icon: Lightning,
                  title: "Collapsible Panels",
                  description:
                    "Panels can be collapsed to show only icons and labels",
                },
                {
                  icon: Code,
                  title: "Custom Cursor",
                  description:
                    "Custom resize cursors (col-resize, row-resize) for better UX",
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
