"use client";

import { useState } from "react";
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

export default function ShareQRCodePage() {
  const [isOpen, toggleOpen] = useToggle(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const username = "ISTUDIO2001";

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
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
          url={shareUrl}
          username={username}
          title="Feature Kit - Share QR Code"
          description="Share this profile via QR code"
          isOpen={isOpen}
          onOpenChange={toggleOpen}
        />
      </main>
    </div>
  );
}
