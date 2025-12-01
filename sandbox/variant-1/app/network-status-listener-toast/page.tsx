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
  Wifi,
  WifiOff,
  Zap,
  CheckCircle2,
  Code,
  Settings,
  Bell,
} from "lucide-react";

const NetworkStatusListener = dynamic(
  () =>
    import("@/components/network-status-listener").then((mod) => ({
      default: mod.NetworkStatusListener,
    })),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-5xl space-y-12 p-8">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Wifi className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Network Status</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Network Status Listener
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A powerful React component that automatically monitors network
            connectivity and provides elegant toast notifications when you go
            offline or come back online.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <Zap className="h-3 w-3" />
              Real-time Detection
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Bell className="h-3 w-3" />
              Toast Notifications
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Settings className="h-3 w-3" />
              Zero Config
            </Badge>
          </div>
        </div>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <WifiOff className="h-5 w-5 text-primary" />
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
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Zap,
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
                  icon: WifiOff,
                  title: "Visual Indicators",
                  description:
                    "Clear visual feedback for offline and online states",
                },
                {
                  icon: Settings,
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
                  icon: CheckCircle2,
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
      </div>

      {/* Network Status Listener Component */}
      <NetworkStatusListener
        showToast={true}
        offlineMessage="You are offline. Please check your connection."
        onlineMessage="Connection restored. You are back online."
      />
    </div>
  );
}
