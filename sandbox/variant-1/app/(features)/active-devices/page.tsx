"use client";

import { useState } from "react";
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
import {
  Monitor,
  Shield,
  MapPin,
  Lightning,
  Code,
} from "@phosphor-icons/react";
import { ActiveDevices } from "@/features/active-devices";
import type { Session } from "@/features/active-devices/types";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

export default function ActiveDevicesPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "isLoading",
      type: "boolean",
      description: "Whether the component is in loading state",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "maxSessions",
      type: "number",
      description: "Maximum number of sessions to display",
      defaultValue: 5,
      value: 5,
      inputType: "number",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "showLocation",
      type: "boolean",
      description: "Whether to show location information for IP addresses",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
  ]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean
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
      isLoading?: boolean;
      maxSessions?: number;
      className?: string;
      showLocation?: boolean;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "isLoading") {
        componentProps.isLoading = Boolean(prop.value);
      } else if (prop.property === "maxSessions") {
        componentProps.maxSessions = Number(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      } else if (prop.property === "showLocation") {
        componentProps.showLocation = Boolean(prop.value);
      }
    });

    return componentProps;
  };

  const initialSessions: Session[] = [
    {
      id: "session-1",
      token: "token-1",
      device: "MacBook Pro",
      browser: "Chrome 120",
      ipAddress: "192.168.1.100",
      location: "Local",
      updatedAt: "2024-01-15T10:30:00.000Z",
      isCurrent: true,
    },
    {
      id: "session-2",
      token: "token-2",
      device: "iPhone 15",
      browser: "Safari 17",
      ipAddress: "203.0.113.42",
      updatedAt: "2024-01-15T08:30:00.000Z",
      isCurrent: false,
    },
    {
      id: "session-3",
      token: "token-3",
      device: "Windows PC",
      browser: "Edge 120",
      ipAddress: "198.51.100.10",
      updatedAt: "2024-01-14T10:30:00.000Z",
      isCurrent: false,
    },
  ];
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const handleDeleteSession = async (sessionToken: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSessions((prev) => prev.filter((s) => s.token !== sessionToken));
  };

  const handleSetActiveSession = async (sessionToken: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSessions((prev) =>
      prev.map((s) => ({
        ...s,
        isCurrent: s.token === sessionToken,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
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
              Note: Complex props like `sessions`, `onDeleteSession`, and
              `onSetActiveSession` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveDevices
              sessions={sessions}
              onDeleteSession={handleDeleteSession}
              onSetActiveSession={handleSetActiveSession}
              {...getComponentProps()}
            />
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
              real-time. Note: Complex props like `sessions`, `onDeleteSession`,
              and `onSetActiveSession` are not editable here.
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
                      ) : prop.inputType === "number" ? (
                        <Input
                          type="number"
                          value={String(prop.value)}
                          onChange={(e) =>
                            handleValueChange(
                              index,
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder={`Enter ${prop.property}`}
                          className="h-8"
                        />
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Test the active devices management functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "View the list of active sessions with device information",
                "Click 'Switch' on a non-current session to set it as active",
                "Click the trash icon to revoke a session",
                "Try revoking the current session - see the confirmation dialog",
                "Observe location data loading for IP addresses",
                "Use the Props API table above to toggle isLoading, maxSessions, showLocation, and className",
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
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Active Devices</CardTitle>
            </div>
            <CardDescription>
              Manage your active sessions and devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActiveDevices
              sessions={sessions}
              onDeleteSession={handleDeleteSession}
              onSetActiveSession={handleSetActiveSession}
              maxSessions={5}
              showLocation={true}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
            <CardDescription>
              Key capabilities of the active devices manager
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Monitor,
                  title: "Device Detection",
                  description:
                    "Automatically detects and displays device type with icons",
                },
                {
                  icon: MapPin,
                  title: "Location Tracking",
                  description:
                    "Fetches and displays location data from IP addresses",
                },
                {
                  icon: Shield,
                  title: "Session Management",
                  description:
                    "Revoke sessions securely with confirmation dialogs",
                },
                {
                  icon: Lightning,
                  title: "Real-time Updates",
                  description:
                    "Live session status with last activity timestamps",
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
      </main>
    </div>
  );
}
