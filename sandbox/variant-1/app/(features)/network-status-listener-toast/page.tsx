"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import type { NetworkStatusListenerProps } from "@/features/network-status-listener/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const NetworkStatusListener = dynamic(
  () =>
    import("@/features/network-status-listener/components/network-status-listener").then(
      (mod) => ({
        default: mod.NetworkStatusListener,
      }),
    ),
  { ssr: false },
);

export default function HomePage() {
  const initialConfig: PropConfig[] = [
    {
      property: "showToast",
      type: "boolean",
      description: "Whether to show toast notifications on network status changes",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "offlineMessage",
      type: "string",
      description: "Message to show when going offline",
      defaultValue: "You are offline. Please check your connection.",
      value: "You are offline. Please check your connection.",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "onlineMessage",
      type: "string",
      description: "Message to show when connection is restored",
      defaultValue: "Connection restored. You are back online.",
      value: "Connection restored. You are back online.",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof NetworkStatusListenerProps> = {
    showToast: "showToast",
    offlineMessage: "offlineMessage",
    onlineMessage: "onlineMessage",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<NetworkStatusListenerProps>({
      initialConfig,
      propMap,
    });

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
            The component monitors network status and shows toast notifications.
            Try disconnecting your internet to see it in action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed bg-muted/20 p-8 min-h-[200px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Network Status Listener is active. Disconnect your internet to see toast notifications.
              <br />
              Current settings: showToast={String(getComponentProps.showToast ?? true)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time."
      />

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/network-status-listener-toast"
        );
        if (featureData?.howToTest) {
          return (
            <HowToTestCard
              steps={featureData.howToTest.steps}
              conclusion={featureData.howToTest.conclusion || "The component is active on this page. Check the bottom-right corner when you go offline to see the toast notification."}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        }
        return (
          <HowToTestCard
            steps={[
              "Open your browser's DevTools (F12 or Cmd+Option+I)",
              "Navigate to the Network tab",
              "Enable 'Offline' mode or disconnect your WiFi",
              "Watch for the red 'Offline' indicator and toast notification",
              "Reconnect to see the 'Connection restored' toast",
            ]}
            conclusion="The component is active on this page. Check the bottom-right corner when you go offline to see the toast notification."
            icon={<CursorClick className="h-5 w-5 text-primary" />}
          />
        );
      })()}

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/network-status-listener-toast"
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
            icon: renderIcon("Lightning", "h-5 w-5 text-primary"),
            title: "Automatic Detection",
            description:
              "Monitors network state changes in real-time without any manual intervention",
          },
          {
            icon: renderIcon("Bell", "h-5 w-5 text-primary"),
            title: "Toast Notifications",
            description:
              "Elegant toast notifications that appear when connectivity changes",
          },
          {
            icon: renderIcon("WifiSlash", "h-5 w-5 text-primary"),
            title: "Visual Indicators",
            description:
              "Clear visual feedback for offline and online states",
          },
          {
            icon: renderIcon("Gear", "h-5 w-5 text-primary"),
            title: "Customizable Messages",
            description:
              "Fully customizable offline and online messages to match your brand",
          },
          {
            icon: renderIcon("Code", "h-5 w-5 text-primary"),
            title: "TypeScript Support",
            description:
              "Built with TypeScript for type safety and better DX",
          },
          {
            icon: renderIcon("CheckCircle", "h-5 w-5 text-primary"),
            title: "Zero Configuration",
            description:
              "Works out of the box with sensible defaults, no setup required",
          },
        ];
        return <FeaturesGlossary features={defaultFeatures} />;
      })()}

      {/* Network Status Listener Component */}
      <NetworkStatusListener {...getComponentProps} />
    </>
  );
}
