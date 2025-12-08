"use client";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  WifiHigh,
  WifiSlash,
  Lightning,
  CheckCircle,
  Code,
  Gear,
  Bell,
} from "@phosphor-icons/react";

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
  return (
    <>
      {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <WifiSlash className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Try disconnecting your internet connection to see the
                  component in action
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Open your browser's DevTools (F12 or Cmd+Option+I)",
                  "Navigate to the Network tab",
                  "Enable 'Offline' mode or disconnect your WiFi",
                  "Watch for the red 'Offline' indicator and toast notification",
                  "Reconnect to see the 'Connection restored' toast",
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
            <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">
                The component is active on this page. Check the bottom-right
                corner when you go offline to see the toast notification.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Lightning,
                  title: "Automatic Detection",
                  description:
                    "Monitors network state changes in real-time without any manual intervention",
                },
                {
                  icon: Bell,
                  title: "Toast Notifications",
                  description:
                    "Elegant toast notifications that appear when connectivity changes",
                },
                {
                  icon: WifiSlash,
                  title: "Visual Indicators",
                  description:
                    "Clear visual feedback for offline and online states",
                },
                {
                  icon: Gear,
                  title: "Customizable Messages",
                  description:
                    "Fully customizable offline and online messages to match your brand",
                },
                {
                  icon: Code,
                  title: "TypeScript Support",
                  description:
                    "Built with TypeScript for type safety and better DX",
                },
                {
                  icon: CheckCircle,
                  title: "Zero Configuration",
                  description:
                    "Works out of the box with sensible defaults, no setup required",
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

      {/* Network Status Listener Component */}
      <NetworkStatusListener
        showToast={true}
        offlineMessage="You are offline. Please check your connection."
        onlineMessage="Connection restored. You are back online."
      />
    </>
  );
}
