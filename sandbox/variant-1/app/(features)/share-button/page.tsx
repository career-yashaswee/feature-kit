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
import { Badge } from "@/components/ui/badge";
import {
  Share,
  Sparkle,
  Code,
  Gear,
  Lightning,
  CursorClick,
  Globe,
} from "@phosphor-icons/react";
import { ShareButton } from "@/features/share-button/components/share-button";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

export default function ShareButtonPage() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = "Feature Kit - Share Button";
  const shareDescription = "A beautiful share button with native Share API fallback";
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "url",
      type: "string",
      description: "URL to share",
      defaultValue: shareUrl || "https://example.com",
      value: shareUrl || "https://example.com",
      inputType: "text",
    },
    {
      property: "title",
      type: "string",
      description: "Title of the shared content",
      defaultValue: "Feature Kit - Share Button",
      value: "Feature Kit - Share Button",
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description of the shared content",
      defaultValue: "A beautiful share button with native Share API fallback",
      value: "A beautiful share button with native Share API fallback",
      inputType: "text",
    },
    {
      property: "variant",
      type: '"default" | "outline" | "ghost"',
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "outline", "ghost"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    {
      property: "withUtmParams",
      type: "boolean",
      description: "Whether to add UTM parameters to the URL",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "utmSource",
      type: "string",
      description: "UTM source parameter",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "utmMedium",
      type: "string",
      description: "UTM medium parameter",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "utmCampaign",
      type: "string",
      description: "UTM campaign parameter",
      defaultValue: "",
      value: "",
      inputType: "text",
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
      url: string;
      title?: string;
      description?: string;
      variant?: "default" | "outline" | "ghost";
      size?: "default" | "sm" | "lg" | "icon";
      withUtmParams?: boolean;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      className?: string;
    } = {
      url: shareUrl || "https://example.com",
    };

    props.forEach((prop) => {
      if (prop.property === "url" && prop.value) {
        componentProps.url = String(prop.value);
      } else if (prop.property === "title" && prop.value) {
        componentProps.title = String(prop.value);
      } else if (prop.property === "description" && prop.value) {
        componentProps.description = String(prop.value);
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "withUtmParams") {
        componentProps.withUtmParams = Boolean(prop.value);
      } else if (prop.property === "utmSource" && prop.value) {
        componentProps.utmSource = String(prop.value);
      } else if (prop.property === "utmMedium" && prop.value) {
        componentProps.utmMedium = String(prop.value);
      } else if (prop.property === "utmCampaign" && prop.value) {
        componentProps.utmCampaign = String(prop.value);
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
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <ShareButton {...getComponentProps()} />
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
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Click the share button to open the share modal. Try different
                  share options including native share, copy link, and social
                  media platforms.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Click the share button to open the share modal",
                  "Try copying the link using the copy button",
                  "Test native share (if available on your device)",
                  "Share to social media platforms (Twitter, Facebook, LinkedIn)",
                  "Check that UTM parameters are added when enabled",
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
                <Share className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Basic Examples</CardTitle>
              <CardDescription>
                Share buttons with different configurations
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Default Share</h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <p className="flex-1 text-sm text-muted-foreground">
                    Share this page
                  </p>
                  <ShareButton url={shareUrl} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  With Title and Description
                </h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{shareTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {shareDescription}
                    </p>
                  </div>
                  <ShareButton
                    url={shareUrl}
                    title={shareTitle}
                    description={shareDescription}
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  With UTM Parameters
                </h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <p className="flex-1 text-sm text-muted-foreground">
                    Share with tracking parameters
                  </p>
                  <ShareButton
                    url={shareUrl}
                    title={shareTitle}
                    withUtmParams={true}
                    utmSource="feature-kit"
                    utmMedium="share-button"
                    utmCampaign="demo"
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Different Variants
                </h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <ShareButton url={shareUrl} variant="default" />
                  <ShareButton url={shareUrl} variant="outline" />
                  <ShareButton url={shareUrl} variant="ghost" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Different Sizes</h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <ShareButton url={shareUrl} size="sm" />
                  <ShareButton url={shareUrl} size="default" />
                  <ShareButton url={shareUrl} size="lg" />
                  <ShareButton url={shareUrl} size="icon" />
                </div>
              </div>
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
                  icon: Share,
                  title: "Native Share API",
                  description:
                    "Uses native Share API when available, with fallback to custom modal",
                },
                {
                  icon: Globe,
                  title: "Social Media Integration",
                  description:
                    "Share to Twitter, Facebook, and LinkedIn with pre-filled content",
                },
                {
                  icon: Code,
                  title: "UTM Parameters",
                  description:
                    "Optional UTM parameter support for tracking share sources",
                },
                {
                  icon: Gear,
                  title: "Copy Link",
                  description:
                    "Built-in copy-to-clipboard functionality with visual feedback",
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
