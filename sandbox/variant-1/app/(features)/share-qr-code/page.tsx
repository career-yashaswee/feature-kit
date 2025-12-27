"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  QrCode,
  CursorClick,
  Lightning,
  Download,
  Share,
  Copy,
  Palette,
} from "@phosphor-icons/react";
import { ShareQRCode } from "@/features/share-qr-code/components/share-qr-code";
import type { ShareQRCodeProps } from "@/features/share-qr-code/types";
import { useToggle } from "@uidotdev/usehooks";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

export default function ShareQRCodePage() {
  const [isOpen, toggleOpen] = useToggle(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const username = "ISTUDIO2001";

  const initialConfig: PropConfig[] = [
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
      skipIfEmpty: true,
    },
    {
      property: "title",
      type: "string",
      description: "Title text for the share modal",
      defaultValue: "Feature Kit - Share QR Code",
      value: "Feature Kit - Share QR Code",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "description",
      type: "string",
      description: "Description text for the share modal",
      defaultValue: "Share this profile via QR code",
      value: "Share this profile via QR code",
      inputType: "text",
      skipIfEmpty: true,
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

  const propMap: Record<string, keyof ShareQRCodeProps> = {
    url: "url",
    username: "username",
    title: "title",
    description: "description",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ShareQRCodeProps>({
      initialConfig,
      propMap,
    });

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
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `isOpen` and `onOpenChange` are not editable here."
        />

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
        <BaseCard>
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
        </BaseCard>

        {/* Example Card */}
        <BaseCard>
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
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/share-qr-code"
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
            (f) => f.path === "/share-qr-code"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: <QrCode className="h-5 w-5 text-primary" />,
              title: "QR Code Generation",
              description:
                "Generates QR codes using react-qr-code with customizable colors and sizes",
            },
            {
              icon: <Palette className="h-5 w-5 text-primary" />,
              title: "Theme Customization",
              description:
                "Cycle through multiple gradient themes with matching QR code colors",
            },
            {
              icon: <Share className="h-5 w-5 text-primary" />,
              title: "Share Profile",
              description:
                "Integrated share button using native Share API with fallback",
            },
            {
              icon: <Copy className="h-5 w-5 text-primary" />,
              title: "Copy Link",
              description:
                "Copy URL to clipboard using the CopyToClipboard component",
            },
            {
              icon: <Download className="h-5 w-5 text-primary" />,
              title: "Download QR Code",
              description:
                "Download QR code as PNG image with custom styling and username",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript Support",
              description:
                "Fully typed with TypeScript for better developer experience",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}

        {/* QR Code Modal */}
        <ShareQRCode
          {...getComponentProps}
          isOpen={isOpen}
          onOpenChange={toggleOpen}
        />
      </main>
    </div>
  );
}
