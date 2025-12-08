"use client";

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
  FileText,
  Gear,
  Lightning,
  Plus,
  Download,
  Share,
} from "@phosphor-icons/react";
import { PageHeader } from "@/features/page-header/components/page-header";

const features = [
  {
    title: "Glass Icon Effect",
    description: "3D glass morphism icon with hover animations",
    icon: FileText,
  },
  {
    title: "Decorative Elements",
    description: "Optional corner decorations and dashed borders",
    icon: Gear,
  },
  {
    title: "Flexible Layout",
    description: "Responsive design with optional action slots",
    icon: Lightning,
  },
];

export default function PageHeaderPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Page Header component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Hover over the glass icon to see the 3D transform effect",
                "Notice the dashed border and corner decorations",
                "Try different variants (default, minimal, bordered) below",
                "Test with and without subtitle and action buttons",
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
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Default Variant</CardTitle>
            </div>
            <CardDescription>
              Full-featured header with glass effect, decorations, and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={<FileText className="h-full w-full" />}
              title="Page Title"
              subtitle="This is a descriptive subtitle that provides additional context"
              actionsSlot={
                <>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create
                  </Button>
                </>
              }
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Minimal Variant</CardTitle>
            </div>
            <CardDescription>
              Clean header without glass effect or decorations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={<Gear className="h-full w-full" />}
              title="Settings"
              subtitle="Manage your application settings"
              variant="minimal"
              showCornerDecorations={false}
              showDashedBorder={false}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Bordered Variant</CardTitle>
            </div>
            <CardDescription>
              Header with solid border instead of dashed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={<Download className="h-full w-full" />}
              title="Downloads"
              subtitle="View and manage your downloads"
              variant="bordered"
              showCornerDecorations={false}
              actionsSlot={
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              }
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Icon Sizes</CardTitle>
            </div>
            <CardDescription>
              Page header with different icon sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Small Icon:</p>
              <PageHeader
                icon={<FileText className="h-full w-full" />}
                title="Small Icon Header"
                iconSize="sm"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Medium Icon (Default):</p>
              <PageHeader
                icon={<FileText className="h-full w-full" />}
                title="Medium Icon Header"
                iconSize="md"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Large Icon:</p>
              <PageHeader
                icon={<FileText className="h-full w-full" />}
                title="Large Icon Header"
                iconSize="lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Without Subtitle</CardTitle>
            </div>
            <CardDescription>
              Header with just title and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={<Lightning className="h-full w-full" />}
              title="Simple Header"
              actionsSlot={
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              }
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
