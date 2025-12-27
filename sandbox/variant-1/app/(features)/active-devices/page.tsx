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
  Monitor,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { ActiveDevices } from "@/features/active-devices";
import type { Session } from "@/features/active-devices/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { ActiveDevicesProps } from "@/features/active-devices/types";

export default function ActiveDevicesPage() {
  const initialConfig: PropConfig[] = [
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
      skipIfEmpty: true,
    },
    {
      property: "showLocation",
      type: "boolean",
      description: "Whether to show location information for IP addresses",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
  ];

  const propMap: Record<string, keyof ActiveDevicesProps> = {
    isLoading: "isLoading",
    maxSessions: "maxSessions",
    className: "className",
    showLocation: "showLocation",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<ActiveDevicesProps>({
      initialConfig,
      propMap,
    });

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
        <BaseCard>
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
              {...getComponentProps}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `sessions`, `onDeleteSession`, and `onSetActiveSession` are not editable here."
        />

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

        <BaseCard>
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
        </BaseCard>

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
