"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  FileText,
  Gear,
  Lightning,
  Plus,
  Download,
  Share,
  Code,
  Folder,
  User,
  GearSix,
  Bell,
  Heart,
  Star,
  Bookmark,
  Trash,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { PageHeader } from "@/features/page-header/components/page-header";

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

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean" | "icon";
  options?: string[];
}

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
  const [props, setProps] = useState<PropConfig[]>([
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
    },
    {
      property: "iconSize",
      type: '"sm" | "md" | "lg"',
      description: "Size of the icon",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
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
      property: "icon",
      type: "ReactNode",
      description: "Icon to display in the header",
      defaultValue: "FileText",
      value: "FileText",
      inputType: "icon",
      options: Object.keys(iconMap),
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
      title: string;
      subtitle?: string;
      variant?: "default" | "minimal" | "bordered";
      iconSize?: "sm" | "md" | "lg";
      showCornerDecorations?: boolean;
      showDashedBorder?: boolean;
      className?: string;
    } = {
      title: "Page Title",
    };

    props.forEach((prop) => {
      if (prop.property === "title" && prop.value) {
        componentProps.title = String(prop.value);
      } else if (prop.property === "subtitle" && prop.value) {
        componentProps.subtitle = String(prop.value);
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "iconSize") {
        componentProps.iconSize = prop.value as typeof componentProps.iconSize;
      } else if (prop.property === "showCornerDecorations") {
        componentProps.showCornerDecorations = Boolean(prop.value);
      } else if (prop.property === "showDashedBorder") {
        componentProps.showDashedBorder = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  const getSelectedIcon = () => {
    const iconProp = props.find((p) => p.property === "icon");
    if (iconProp && typeof iconProp.value === "string") {
      const IconComponent = iconMap[iconProp.value];
      if (IconComponent) {
        return <IconComponent className="h-full w-full" />;
      }
    }
    return <FileText className="h-full w-full" />;
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
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PageHeader
              icon={getSelectedIcon()}
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
              real-time. Note: The `actionsSlot` prop (ReactNode) is not editable here.
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
                      {prop.inputType === "select" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : prop.inputType === "boolean" ? (
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
                      ) : prop.inputType === "icon" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((iconName) => {
                              const IconComponent = iconMap[iconName];
                              return (
                                <SelectItem key={iconName} value={iconName}>
                                  <div className="flex items-center gap-2">
                                    {IconComponent && (
                                      <IconComponent className="h-4 w-4" />
                                    )}
                                    <span>{iconName}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
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
