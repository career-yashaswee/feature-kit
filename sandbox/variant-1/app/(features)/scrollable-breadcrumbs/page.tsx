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
import { Badge } from "@/components/ui/badge";
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
  Code,
} from "@phosphor-icons/react";
import { ScrollableBreadcrumb } from "@/features/scrollable-breadcrumbs/components/scrollable-breadcrumb";
import type { BreadcrumbItem } from "@/features/scrollable-breadcrumbs/types";

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
  const [props, setProps] = useState<PropConfig[]>([
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
    },
  ]);

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
      autoScroll?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "autoScroll") {
        componentProps.autoScroll = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

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
              {...getComponentProps()}
            />
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
              real-time. Note: Complex props like `items`, `renderLink`, `separator`, and `onSidebarChange` are not editable here.
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
                <Compass className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Scrollable Breadcrumbs component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Use the buttons below to cycle through different breadcrumb scenarios",
                "Try scrolling horizontally to see the fade indicators",
                "Toggle between default links and Next.js Link rendering",
                "Notice how it auto-scrolls to show the current (last) item",
                "Test with different numbers of breadcrumb items",
                "Resize the window to see responsive behavior",
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Compass className="h-5 w-5 text-primary" />
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
