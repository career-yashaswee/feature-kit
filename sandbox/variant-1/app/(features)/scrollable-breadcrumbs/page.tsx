"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  House,
  Folder,
  FileText,
  Gear,
  CaretRight,
  Compass,
  ArrowRight,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { ScrollableBreadcrumb } from "@/features/scrollable-breadcrumbs/components/scrollable-breadcrumb";
import type { BreadcrumbItem } from "@/features/scrollable-breadcrumbs/types";
import type { ScrollableBreadcrumbProps } from "@/features/scrollable-breadcrumbs/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const features = [
  {
    title: "Auto-scroll",
    description: "Automatically scrolls to show the current page",
    icon: Compass,
  },
  {
    title: "Custom Icons",
    description: "Support for custom icons per breadcrumb item",
    icon: House,
  },
  {
    title: "Configurable Links",
    description: "Custom link rendering for different routing libraries",
    icon: ArrowRight,
  },
];

const sampleBreadcrumbs: BreadcrumbItem[][] = [
  [
    { href: "/", label: "House", icon: House },
    { href: "/docs", label: "Documentation" },
    { href: "/docs/getting-started", label: "Getting Started" },
  ],
  [
    { href: "/", label: "House", icon: House },
    { href: "/projects", label: "Projects", icon: Folder },
    { href: "/projects/feature-kit", label: "Feature Kit", icon: Folder },
    {
      href: "/projects/feature-kit/components",
      label: "Components",
      icon: FileText,
    },
  ],
  [
    { href: "/", label: "House", icon: House },
    { href: "/settings", label: "Gear", icon: Gear },
    { href: "/settings/account", label: "Account" },
    { href: "/settings/account/profile", label: "Profile" },
  ],
  [
    { href: "/", label: "House" },
    { href: "/category", label: "Category" },
    { href: "/category/subcategory", label: "Subcategory" },
    { href: "/category/subcategory/item", label: "Item" },
    { href: "/category/subcategory/item/details", label: "Details" },
  ],
];

export default function ScrollableBreadcrumbsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [useNextLink, setUseNextLink] = useState(false);
  const initialConfig: PropConfig[] = [
    {
      property: "autoScroll",
      type: "boolean",
      description: "Whether to automatically scroll to show the current page",
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

  const propMap: Record<string, keyof ScrollableBreadcrumbProps> = {
    autoScroll: "autoScroll",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ScrollableBreadcrumbProps>({
      initialConfig,
      propMap,
    });

  const currentBreadcrumbs = sampleBreadcrumbs[currentIndex];

  // Custom renderLink for Next.js Link
  const nextLinkRenderer = (
    item: BreadcrumbItem,
    children: React.ReactNode
  ) => {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
      >
        {children}
      </Link>
    );
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
              Note: The `items`, `renderLink`, `separator`, and `onSidebarChange` props are complex and not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollableBreadcrumb
              items={currentBreadcrumbs}
              renderLink={useNextLink ? nextLinkRenderer : undefined}
              {...getComponentProps}
            />
          </CardContent>
        </Card>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `items`, `renderLink`, `separator`, and `onSidebarChange` are not editable here."
        />

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/scrollable-breadcrumbs"
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
                "Use the buttons below to cycle through different breadcrumb scenarios",
                "Try scrolling horizontally to see the fade indicators",
                "Toggle between default links and Next.js Link rendering",
                "Notice how it auto-scrolls to show the current (last) item",
                "Test with different numbers of breadcrumb items",
                "Resize the window to see responsive behavior",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Test different breadcrumb configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Breadcrumb Scenarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Scenario {currentIndex + 1} of {sampleBreadcrumbs.length}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev + 1) % sampleBreadcrumbs.length
                    )
                  }
                >
                  Next Scenario
                </Button>
              </div>

              <div className="p-6 border rounded-lg bg-muted/50">
                <ScrollableBreadcrumb
                  items={currentBreadcrumbs}
                  renderLink={useNextLink ? nextLinkRenderer : undefined}
                  {...getComponentProps()}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Link Rendering</h3>
              <div className="flex gap-2">
                <Button
                  variant={!useNextLink ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseNextLink(false)}
                >
                  Default (Anchor)
                </Button>
                <Button
                  variant={useNextLink ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseNextLink(true)}
                >
                  Next.js Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Example Scenarios</CardTitle>
            </div>
            <CardDescription>
              Different breadcrumb configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sampleBreadcrumbs.map((breadcrumbs, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Scenario {index + 1}
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <ScrollableBreadcrumb items={breadcrumbs} {...getComponentProps()} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Custom Separator</CardTitle>
            </div>
            <CardDescription>Using a custom separator icon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg bg-muted/50 space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">
                  Default Separator
                </div>
                <ScrollableBreadcrumb items={currentBreadcrumbs} {...getComponentProps()} />
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Custom Separator</div>
                <ScrollableBreadcrumb
                  items={currentBreadcrumbs}
                  separator={<CaretRight className="h-4 w-4 text-primary" />}
                  {...getComponentProps()}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/scrollable-breadcrumbs"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = features.map((feature) => ({
            icon: <feature.icon className="h-5 w-5 text-primary" />,
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
