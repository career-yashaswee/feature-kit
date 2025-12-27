"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Crown, Sparkle, Lightning, CursorClick } from "@phosphor-icons/react";
import { SubscriptionIdentifier } from "@/features/subscription-identifier/components/subscription-identifier";
import type { SubscriptionIdentifierProps } from "@/features/subscription-identifier/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const features = [
  {
    title: "Subscription Status",
    description:
      "Visual indicator for subscription status with elegant styling",
    icon: Crown,
  },
  {
    title: "Multiple Variants",
    description: "Outline and solid variants with different styling options",
    icon: Sparkle,
  },
  {
    title: "Flexible Props",
    description: "Accepts subscription status as prop or from store",
    icon: Lightning,
  },
];

export default function SubscriptionIdentifierPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialConfig: PropConfig[] = [
    {
      property: "isUserSubscribed",
      type: "boolean",
      description: "Whether the user is subscribed",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "isLoading",
      type: "boolean",
      description: "Whether the component is in loading state",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the subscription identifier",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
      transform: (value) => value as SubscriptionIdentifierProps["size"],
    },
    {
      property: "variant",
      type: '"outline" | "solid"',
      description: "Visual variant of the identifier",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["outline", "solid"],
      transform: (value) => value as SubscriptionIdentifierProps["variant"],
    },
    {
      property: "label",
      type: "string",
      description: "Custom label text",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the icon",
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

  const propMap: Record<string, keyof SubscriptionIdentifierProps> = {
    isUserSubscribed: "isUserSubscribed",
    isLoading: "isLoading",
    size: "size",
    variant: "variant",
    label: "label",
    showIcon: "showIcon",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<SubscriptionIdentifierProps>({
      initialConfig,
      propMap,
    });

  const toggleSubscription = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(!isSubscribed);
      setIsLoading(false);
    }, 500);
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
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionIdentifier
              isUserSubscribed={getComponentProps.isUserSubscribed ?? false}
              {...getComponentProps}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time."
        />

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Subscription Identifier component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Observe the different styles for subscribed vs non-subscribed states",
                "Click the toggle button to switch between states",
                "Try different sizes (sm, md, lg) and variants (outline, solid)",
                "Notice the loading state when toggling",
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
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different badge styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSubscription}
                disabled={isLoading}
                className="px-4 py-2 border rounded-md hover:bg-muted disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Toggle Subscription"}
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  isLoading={true}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Outline - Not Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Outline - Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Solid - Not Subscribed:
                </p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="solid"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Solid - Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="solid"
                />
              </div>
            </div>
          </CardContent>
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Size Variants</CardTitle>
            </div>
            <CardDescription>
              Subscription identifier available in different sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Small:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Medium:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="md"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Large:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="lg"
                />
              </div>
            </div>
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/subscription-identifier",
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
            (f) => f.path === "/subscription-identifier",
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
