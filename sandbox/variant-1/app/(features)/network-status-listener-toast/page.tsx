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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

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
  const [props, setProps] = useState<PropConfig[]>([
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
    },
    {
      property: "onlineMessage",
      type: "string",
      description: "Message to show when connection is restored",
      defaultValue: "Connection restored. You are back online.",
      value: "Connection restored. You are back online.",
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
      showToast?: boolean;
      offlineMessage?: string;
      onlineMessage?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "showToast") {
        componentProps.showToast = Boolean(prop.value);
      } else if (prop.property === "offlineMessage" && prop.value) {
        componentProps.offlineMessage = String(prop.value);
      } else if (prop.property === "onlineMessage" && prop.value) {
        componentProps.onlineMessage = String(prop.value);
      }
    });

    return componentProps;
  };

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
              Current settings: showToast={String(getComponentProps().showToast ?? true)}
            </p>
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
            real-time
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
                    {prop.inputType === "boolean" ? (
                      <Select
                        value={String(prop.value)}
                        onValueChange={(value) =>
                          handleValueChange(index, value === "true")
                        }
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">true</SelectItem>
                          <SelectItem value="false">false</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type="text"
                        value={String(prop.value)}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        placeholder={`Enter ${prop.property}`}
                        className="h-8"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
      <NetworkStatusListener {...getComponentProps()} />
    </>
  );
}
