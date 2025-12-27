"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Gear,
  Lightning,
  Plus,
  Download,
  Share,
  Folder,
  User,
  GearSix,
  Bell,
  Heart,
  Star,
  Bookmark,
  Trash,
  CursorClick,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { PageHeader } from "@/features/page-header/components/page-header";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { PageHeaderProps } from "@/features/page-header/types";

const iconMap: Record<string, Icon> = {
  FileText,
  Gear,
  Lightning,
  Plus,
  Download,
  Share,
  Folder,
  User,
  GearSix,
  Bell,
  Heart,
  Star,
  Bookmark,
  Trash,
};

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
  const [selectedIconKey, setSelectedIconKey] = useState("FileText");

  const initialConfig: PropConfig[] = [
    {
      property: "title",
      type: "string",
      description: "Title text for the header",
      defaultValue: "Page Title",
      value: "Page Title",
      inputType: "text",
    },
    {
      property: "subtitle",
      type: "string",
      description: "Subtitle text below the title",
      defaultValue: "This is a descriptive subtitle",
      value: "This is a descriptive subtitle",
      inputType: "text",
    },
    {
      property: "variant",
      type: '"default" | "minimal" | "bordered"',
      description: "Visual variant of the header",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "minimal", "bordered"],
      transform: (value) => value as PageHeaderProps["variant"],
    },
    {
      property: "iconSize",
      type: '"sm" | "md" | "lg"',
      description: "Size of the icon",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
      transform: (value) => value as PageHeaderProps["iconSize"],
    },
    {
      property: "showCornerDecorations",
      type: "boolean",
      description: "Whether to show corner decorations",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "showDashedBorder",
      type: "boolean",
      description: "Whether to show dashed border",
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

  const propMap: Record<string, keyof PageHeaderProps> = {
    title: "title",
    subtitle: "subtitle",
    variant: "variant",
    iconSize: "iconSize",
    showCornerDecorations: "showCornerDecorations",
    showDashedBorder: "showDashedBorder",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<PageHeaderProps>({
      initialConfig,
      propMap,
    });

  const getSelectedIcon = () => {
    const IconComponent = iconMap[selectedIconKey];
    if (IconComponent) {
      return <IconComponent className="h-full w-full" />;
    }
    return <FileText className="h-full w-full" />;
  };

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
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={getSelectedIcon()}
              {...getComponentProps}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: The `actionsSlot` prop (ReactNode) is not editable here."
        />

        {/* Icon Selector */}
        <BaseCard>
          <CardHeader>
            <CardTitle className="text-xl">Icon</CardTitle>
            <CardDescription>
              Select the icon to display in the header
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedIconKey} onValueChange={setSelectedIconKey}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(iconMap).map((iconName) => {
                  const IconComponent = iconMap[iconName];
                  return (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{iconName}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/page-header"
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
                "Hover over the glass icon to see the 3D transform effect",
                "Notice the dashed border and corner decorations",
                "Try different variants (default, minimal, bordered) below",
                "Test with and without subtitle and action buttons",
                "Resize the window to see responsive behavior",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/page-header"
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
