"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ExportButton = dynamic(
  () =>
    import("@/features/export-button/components/export-button").then((mod) => ({
      default: mod.ExportButton,
    })),
  { ssr: false }
);
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
import { Lightning, Code, CursorClick } from "@phosphor-icons/react";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

async function fetchExportData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];
}

export default function ExportButtonPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "variant",
      type: '"default" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["default", "outline", "secondary", "ghost", "link"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    {
      property: "filename",
      type: "string",
      description: "Base filename for the exported file",
      defaultValue: "users",
      value: "users",
      inputType: "text",
    },
    {
      property: "resource",
      type: "string",
      description: "Name of the resource being exported (for toast messages)",
      defaultValue: "user data",
      value: "user data",
      inputType: "text",
    },
    {
      property: "label",
      type: "string",
      description: "Optional label text for the button",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "format",
      type: '"csv" | "json"',
      description: "Export file format",
      defaultValue: "csv",
      value: "csv",
      inputType: "select",
      options: ["csv", "json"],
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the export icon",
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
    newValue: string | number | boolean
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
      variant?: "default" | "outline" | "secondary" | "ghost" | "link";
      size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
      filename?: string;
      resource?: string;
      label?: string;
      format?: "csv" | "json";
      showIcon?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "filename" && prop.value) {
        componentProps.filename = String(prop.value);
      } else if (prop.property === "resource" && prop.value) {
        componentProps.resource = String(prop.value);
      } else if (prop.property === "label" && prop.value) {
        componentProps.label = String(prop.value);
      } else if (prop.property === "format") {
        componentProps.format = prop.value as typeof componentProps.format;
      } else if (prop.property === "showIcon") {
        componentProps.showIcon = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  return (
    <>
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
            Note: Complex props like `fetchData`, `onSuccess`, and `onError` are
            not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center rounded-lg border bg-card p-8">
            <ExportButton
              fetchData={fetchExportData}
              onSuccess={() => console.log("Exported!")}
              {...getComponentProps()}
            />
          </div>
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
            real-time. Note: Complex props like `fetchData`, `onSuccess`, and
            `onError` are not editable here.
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
                  <TableCell
                    className="font-medium text-sm"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
                    {prop.property}
                  </TableCell>
                  <TableCell
                    className="text-xs text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
                    {prop.type}
                  </TableCell>
                  <TableCell
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Data</CardTitle>
              <CardDescription>Export user data to CSV file</CardDescription>
            </div>
            <ExportButton
              fetchData={fetchExportData}
              filename="users"
              resource="user data"
              onSuccess={() => console.log("Exported!")}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>Click the export button to download user data as CSV.</p>
            <p className="text-muted-foreground">
              The file will be timestamped automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/export-button"
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
        return null;
      })()}

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/export-button"
        );
        if (featureData?.features) {
          const featuresWithIcons = featureData.features.map((feature) => ({
            icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={featuresWithIcons} />;
        }
        return null;
      })()}
    </>
  );
}
