"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { ArrowUp, Lightning, CursorClick } from "@phosphor-icons/react";
import { UpgradeButton } from "@/features/upgrade-button/components/upgrade-button";
import type {
  UpgradeAction,
  UpgradeButtonProps,
} from "@/features/upgrade-button/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

export default function UpgradeButtonPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: "ButtonVariant",
      description: "Visual variant of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "link",
        "destructive",
      ],
      transform: (value) => value as UpgradeButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon"],
      transform: (value) => value as UpgradeButtonProps["size"],
    },
    {
      property: "showMessage",
      type: "boolean",
      description: "Whether to show the upgrade message",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "fullWidth",
      type: "boolean",
      description: "Whether the button should take full width",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "iconOnly",
      type: "boolean",
      description: "Whether to show only the icon",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "loadingText",
      type: "string",
      description: "Text to show during loading",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "subscribedText",
      type: "string",
      description: "Text to show when subscribed",
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

  const propMap: Record<string, keyof UpgradeButtonProps> = {
    variant: "variant",
    size: "size",
    showMessage: "showMessage",
    fullWidth: "fullWidth",
    iconOnly: "iconOnly",
    loadingText: "loadingText",
    subscribedText: "subscribedText",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<UpgradeButtonProps>({
      initialConfig,
      propMap,
    });

  const handleUpgrade = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const handleManage = async () => {
    console.log("Navigate to billing page");
  };

  const upgradeAction: UpgradeAction = {
    type: "start_trial",
    buttonText: "Start Free Trial",
    message: "Upgrade to unlock premium features",
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
            <UpgradeButton
              isSubscribed={isSubscribed}
              isLoading={isLoading}
              upgradeAction={upgradeAction}
              onUpgrade={handleUpgrade}
              {...getComponentProps}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `upgradeAction` (object), `onUpgrade` (function), `subscribedIcon`, and `upgradeIcon` (React components) are not editable here. The `isSubscribed` and `isLoading` props are controlled by the demo state above."
        />

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Upgrade Button component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the upgrade button to see the loading state",
                "After loading, the button changes to 'Manage Subscription'",
                "Toggle the subscription status to see different button states",
                "Try different variants and sizes in the examples below",
                "Test the icon-only mode and full-width option",
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
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different button states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="px-4 py-2 border rounded-md hover:bg-muted text-sm"
              >
                Toggle Subscription
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Not Subscribed:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={isLoading}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                  showMessage
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Subscribed:</p>
                <UpgradeButton isSubscribed={true} onUpgrade={handleManage} />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={true}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                />
              </div>
            </div>
          </CardContent>
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Variants</CardTitle>
            </div>
            <CardDescription>
              Upgrade button available in different button variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="default"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="outline"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="secondary"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="ghost"
              />
            </div>
          </CardContent>
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Icon Only & Full Width</CardTitle>
            </div>
            <CardDescription>
              Icon-only mode and full-width button options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Icon Only:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                iconOnly
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Full Width:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                fullWidth
              />
            </div>
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/upgrade-button",
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
            (f) => f.path === "/upgrade-button",
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
              icon: renderIcon("CreditCard", "h-5 w-5 text-primary"),
              title: "Smart State Management",
              description:
                "Automatically shows appropriate button based on subscription status",
            },
            {
              icon: renderIcon("ArrowUp", "h-5 w-5 text-primary"),
              title: "Configurable Actions",
              description:
                "Support for trial, upgrade, and manage subscription actions",
            },
            {
              icon: renderIcon("Lightning", "h-5 w-5 text-primary"),
              title: "Flexible Styling",
              description: "Multiple variants, sizes, and icon-only mode",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
