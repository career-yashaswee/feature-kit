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
import {
  FileText,
  Code,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { TextTruncation } from "@/features/text-truncation/components/text-truncation";
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

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const veryLongText =
  "This is a very long text that demonstrates the text truncation feature. It can truncate text based on either the number of lines or the maximum character length. When text is truncated, a 'Show more' button appears, allowing users to expand and see the full content. When expanded, a 'Show less' button appears to collapse it back. The component automatically detects whether truncation is needed and only shows the toggle button when necessary. This makes it perfect for displaying long descriptions, comments, or any text content that might be too long for the available space. The component is fully customizable with props for maxLines, maxLength, expandLabel, collapseLabel, and more.";

export default function TextTruncationPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "maxLines",
      type: "number",
      description: "Maximum number of lines to show before truncating",
      defaultValue: 3,
      value: 3,
      inputType: "number",
    },
    {
      property: "maxLength",
      type: "number",
      description: "Maximum character length before truncating",
      defaultValue: 100,
      value: 100,
      inputType: "number",
    },
    {
      property: "expandLabel",
      type: "string",
      description: "Label for the expand button",
      defaultValue: "Show more",
      value: "Show more",
      inputType: "text",
    },
    {
      property: "collapseLabel",
      type: "string",
      description: "Label for the collapse button",
      defaultValue: "Show less",
      value: "Show less",
      inputType: "text",
    },
    {
      property: "showToggle",
      type: "boolean",
      description: "Whether to show the expand/collapse toggle button",
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
      maxLines?: number;
      maxLength?: number;
      expandLabel?: string;
      collapseLabel?: string;
      showToggle?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "maxLines" && typeof prop.value === "number") {
        componentProps.maxLines = prop.value;
      } else if (
        prop.property === "maxLength" &&
        typeof prop.value === "number"
      ) {
        componentProps.maxLength = prop.value;
      } else if (prop.property === "expandLabel" && prop.value) {
        componentProps.expandLabel = String(prop.value);
      } else if (prop.property === "collapseLabel" && prop.value) {
        componentProps.collapseLabel = String(prop.value);
      } else if (prop.property === "showToggle") {
        componentProps.showToggle = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
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
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card p-4">
              <TextTruncation text={veryLongText} {...getComponentProps()} />
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
              real-time
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
                      ) : prop.inputType === "number" ? (
                        <Input
                          type="number"
                          value={
                            typeof prop.value === "number"
                              ? prop.value
                              : Number(prop.value) || 0
                          }
                          onChange={(e) =>
                            handleValueChange(
                              index,
                              e.target.value === ""
                                ? prop.defaultValue
                                : Number(e.target.value)
                            )
                          }
                          className="h-8"
                        />
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/text-truncation"
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

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Line-Based Truncation</CardTitle>
              <CardDescription>
                Truncate text to a specific number of lines
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">2 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={2} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">3 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={3} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">4 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={4} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                Character-Based Truncation
              </CardTitle>
              <CardDescription>
                Truncate text to a specific character length
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">100 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={100} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">150 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={150} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">200 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={200} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Gear className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Custom Labels</CardTitle>
              <CardDescription>
                Customize the expand and collapse button labels
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card p-4">
              <TextTruncation
                text={veryLongText}
                maxLines={2}
                expandLabel="Read more"
                collapseLabel="Read less"
              />
            </div>
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/text-truncation"
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
      </main>
    </div>
  );
}
