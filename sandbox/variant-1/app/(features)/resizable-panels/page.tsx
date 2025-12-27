"use client";

export const dynamic = "force-dynamic";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  SquaresFour,
  Code,
  CursorClick,
  CodeBlock,
  Folder,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { ResizablePanels } from "@/features/resizable-panels/components/resizable-panels";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

export default function ResizablePanelsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/resizable-panels",
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
          return (
            <HowToTestCard
              steps={[
                "Drag the resize handle between panels to resize them",
                "Click the collapse button to collapse a panel",
                "When collapsed, you'll see the icon and label",
                "Refresh the page to see the layout persist",
                "Try both horizontal and vertical layouts",
              ]}
              conclusion="Drag the resize handles between panels to resize them. Click the collapse button to collapse panels. The layout will persist in localStorage."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/resizable-panels",
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
              icon: renderIcon("SquaresFour", "h-5 w-5 text-primary"),
              title: "Horizontal & Vertical",
              description:
                "Support for both horizontal and vertical panel layouts",
            },
            {
              icon: renderIcon("Gear", "h-5 w-5 text-primary"),
              title: "Persistent Layout",
              description:
                "Panel sizes are saved to localStorage and restored on page load",
            },
            {
              icon: renderIcon("Lightning", "h-5 w-5 text-primary"),
              title: "Collapsible Panels",
              description:
                "Panels can be collapsed to show only icons and labels",
            },
            {
              icon: renderIcon("Code", "h-5 w-5 text-primary"),
              title: "Custom Cursor",
              description:
                "Custom resize cursors (col-resize, row-resize) for better UX",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
