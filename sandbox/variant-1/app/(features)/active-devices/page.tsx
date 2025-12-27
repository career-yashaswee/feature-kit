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
  Lightning,
  Code,
  CursorClick,
} from "@phosphor-icons/react";
import { ActiveDevices } from "@/features/active-devices";
import type { Session } from "@/features/active-devices/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

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
                    <TableCell
                      className="font-medium text-sm"
                      style={{
                        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                      }}
                    >
                      {prop.property}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif' }}>
                      {prop.type}
                    </TableCell>
                    <TableCell
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/active-devices"
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/active-devices"
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
