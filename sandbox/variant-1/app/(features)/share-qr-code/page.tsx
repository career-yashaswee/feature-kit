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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  CursorClick,
  Sparkle,
  Code,
  Gear,
  Lightning,
  Download,
  Share,
  Copy,
  Palette,
} from "@phosphor-icons/react";
import { ShareQRCode } from "@/features/share-qr-code/components/share-qr-code";
import { useToggle } from "@uidotdev/usehooks";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

export default function ShareQRCodePage() {
  const [isOpen, toggleOpen] = useToggle(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const username = "ISTUDIO2001";

  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "url",
      type: "string",
      description: "URL to encode in the QR code",
      defaultValue: shareUrl,
      value: shareUrl,
      inputType: "text",
    },
    {
      property: "username",
      type: "string",
      description: "Username to display on the QR code",
      defaultValue: "ISTUDIO2001",
      value: "ISTUDIO2001",
      inputType: "text",
    },
    {
      property: "title",
      type: "string",
      description: "Title text for the share modal",
      defaultValue: "Feature Kit - Share QR Code",
      value: "Feature Kit - Share QR Code",
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description text for the share modal",
      defaultValue: "Share this profile via QR code",
      value: "Share this profile via QR code",
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
      url?: string;
      username?: string;
      title?: string;
      description?: string;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "url" && prop.value) {
        componentProps.url = String(prop.value);
      } else if (prop.property === "username" && prop.value) {
        componentProps.username = String(prop.value);
      } else if (prop.property === "title" && prop.value) {
        componentProps.title = String(prop.value);
      } else if (prop.property === "description" && prop.value) {
        componentProps.description = String(prop.value);
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
              See the component update in real-time as you change props below.
              Note: Complex props like `isOpen` and `onOpenChange` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <Button onClick={() => toggleOpen()} size="lg">
                <QrCode className="h-4 w-4 mr-2" />
                Open QR Code
              </Button>
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
              real-time. Note: Complex props like `isOpen` and `onOpenChange` are not editable here.
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
                      <Input
                        type="text"
                        value={String(prop.value)}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        placeholder={`Enter ${prop.property}`}
                        className="h-8"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            variant="default"
            className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
          >
            <QrCode className="h-3 w-3" />
            QR Code
          </Badge>
          <Badge
            variant="default"
            className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
          >
            <Palette className="h-3 w-3" />
            Customizable
          </Badge>
          <Badge
            variant="default"
            className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
          >
            <Download className="h-3 w-3" />
            Downloadable
          </Badge>
        </div>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Click the button below to open the QR code share modal. Try
              different color themes, download the QR code, and test the share
              actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Click the 'Open QR Code' button to open the share modal",
                "Tap the COLOR button to cycle through different gradient themes",
                "Click 'Share profile' to use the native share API",
                "Click 'Copy link' to copy the URL to clipboard",
                "Click 'Download' to save the QR code as an image",
                "Notice how the QR code and text colors adapt to each theme",
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
            <div className="pt-4">
              <Button
                onClick={() => toggleOpen()}
                size="lg"
                className="w-full sm:w-auto"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Open QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Example Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">QR Code Share</CardTitle>
            </div>
            <CardDescription>
              Instagram-style QR code sharing interface with customizable themes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Share URL:</p>
                  <p className="text-sm text-muted-foreground break-all">
                    {shareUrl}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Username:</p>
                  <p className="text-sm text-muted-foreground">@{username}</p>
                </div>
                <Button
                  onClick={() => toggleOpen()}
                  variant="outline"
                  className="w-full"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Open QR Code Share Modal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: QrCode,
                  title: "QR Code Generation",
                  description:
                    "Generates QR codes using react-qr-code with customizable colors and sizes",
                },
                {
                  icon: Palette,
                  title: "Theme Customization",
                  description:
                    "Cycle through multiple gradient themes with matching QR code colors",
                },
                {
                  icon: Share,
                  title: "Share Profile",
                  description:
                    "Integrated share button using native Share API with fallback",
                },
                {
                  icon: Copy,
                  title: "Copy Link",
                  description:
                    "Copy URL to clipboard using the CopyToClipboard component",
                },
                {
                  icon: Download,
                  title: "Download QR Code",
                  description:
                    "Download QR code as PNG image with custom styling and username",
                },
                {
                  icon: Code,
                  title: "TypeScript Support",
                  description:
                    "Fully typed with TypeScript for better developer experience",
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

        {/* QR Code Modal */}
        <ShareQRCode
          {...getComponentProps()}
          isOpen={isOpen}
          onOpenChange={toggleOpen}
        />
      </main>
    </div>
  );
}
