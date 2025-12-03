"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layout,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
  FileCode,
  Folder,
  Search,
} from "lucide-react";
import { ResizablePanels } from "@/features/resizable-panels/components/resizable-panels";

export default function ResizablePanelsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Layout className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Resizable Panels</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Resizable Panels
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            LeetCode-style resizable panels with horizontal and vertical layouts,
            collapsible panels, persistent layouts, and custom cursors.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Sparkles className="h-3 w-3" />
              Horizontal & Vertical
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Settings className="h-3 w-3" />
              Persistent Layout
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Code className="h-3 w-3" />
              Collapsible
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Zap className="h-3 w-3" />
              Custom Cursor
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
                  Drag the resize handles between panels to resize them. Click
                  the collapse button to collapse panels. The layout will persist
                  in localStorage.
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
                <Layout className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Horizontal Layout</CardTitle>
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
                          <FileCode className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Code Editor</p>
                        </div>
                      </div>
                    ),
                    icon: <FileCode className="h-5 w-5" />,
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
                <Layout className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Vertical Layout</CardTitle>
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
                          <FileCode className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Content Area</p>
                        </div>
                      </div>
                    ),
                    icon: <FileCode className="h-5 w-5" />,
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
                          <Search className="mx-auto h-12 w-12 mb-2" />
                          <p className="text-sm">Preview</p>
                        </div>
                      </div>
                    ),
                    icon: <Search className="h-5 w-5" />,
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
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Layout,
                  title: "Horizontal & Vertical",
                  description:
                    "Support for both horizontal and vertical panel layouts",
                },
                {
                  icon: Settings,
                  title: "Persistent Layout",
                  description:
                    "Panel sizes are saved to localStorage and restored on page load",
                },
                {
                  icon: Zap,
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

