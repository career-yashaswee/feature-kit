"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Share,
  Gear,
  Lightning,
  CursorClick,
  Globe,
  Code,
} from "@phosphor-icons/react";
import { ShareButton } from "@/features/share-button/components/share-button";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { ShareButtonProps } from "@/features/share-button/types";

export default function ShareButtonPage() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = "Feature Kit - Share Button";
  const shareDescription =
    "A beautiful share button with native Share API fallback";

  const initialConfig: PropConfig[] = [
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
      defaultValue: shareTitle,
      value: shareTitle,
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description of the shared content",
      defaultValue: shareDescription,
      value: shareDescription,
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
      transform: (value) => value as ShareButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon"],
      transform: (value) => value as ShareButtonProps["size"],
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
      skipIfEmpty: true,
    },
    {
      property: "utmMedium",
      type: "string",
      description: "UTM medium parameter",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "utmCampaign",
      type: "string",
      description: "UTM campaign parameter",
      defaultValue: "",
      value: "",
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

  const propMap: Record<string, keyof ShareButtonProps> = {
    url: "url",
    title: "title",
    description: "description",
    variant: "variant",
    size: "size",
    withUtmParams: "withUtmParams",
    utmSource: "utmSource",
    utmMedium: "utmMedium",
    utmCampaign: "utmCampaign",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ShareButtonProps>({
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
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <ShareButton
                {...getComponentProps}
                url={getComponentProps.url || shareUrl || "https://example.com"}
              />
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time"
        />

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/share-button",
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
            (f) => f.path === "/share-button",
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
              icon: <Share className="h-5 w-5 text-primary" />,
              title: "Native Share API",
              description:
                "Uses native Share API when available, with fallback to custom modal",
            },
            {
              icon: <Globe className="h-5 w-5 text-primary" />,
              title: "Social Media Integration",
              description:
                "Share to Twitter, Facebook, and LinkedIn with pre-filled content",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "UTM Parameters",
              description:
                "Optional UTM parameter support for tracking share sources",
            },
            {
              icon: <Gear className="h-5 w-5 text-primary" />,
              title: "Copy Link",
              description:
                "Built-in copy-to-clipboard functionality with visual feedback",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
