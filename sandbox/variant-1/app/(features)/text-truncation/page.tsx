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
  FileText,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { TextTruncation } from "@/features/text-truncation/components/text-truncation";
import type { TextTruncationProps } from "@/features/text-truncation/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const veryLongText =
  "This is a very long text that demonstrates the text truncation feature. It can truncate text based on either the number of lines or the maximum character length. When text is truncated, a 'Show more' button appears, allowing users to expand and see the full content. When expanded, a 'Show less' button appears to collapse it back. The component automatically detects whether truncation is needed and only shows the toggle button when necessary. This makes it perfect for displaying long descriptions, comments, or any text content that might be too long for the available space. The component is fully customizable with props for maxLines, maxLength, expandLabel, collapseLabel, and more.";

export default function TextTruncationPage() {
  const initialConfig: PropConfig[] = [
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
      skipIfEmpty: true,
    },
    {
      property: "collapseLabel",
      type: "string",
      description: "Label for the collapse button",
      defaultValue: "Show less",
      value: "Show less",
      inputType: "text",
      skipIfEmpty: true,
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
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof TextTruncationProps> = {
    maxLines: "maxLines",
    maxLength: "maxLength",
    expandLabel: "expandLabel",
    collapseLabel: "collapseLabel",
    showToggle: "showToggle",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<TextTruncationProps>({
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
            <div className="rounded-lg border bg-card p-4">
              <TextTruncation text={veryLongText} {...getComponentProps} />
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time."
        />

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

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

        <BaseCard>
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
        </BaseCard>

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
