"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Shield, MapPin, Zap } from "lucide-react";
import { ActiveDevices } from "@/features/active-devices";
import type { Session } from "@/features/active-devices/types";

export default function ActiveDevicesPage() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "session-1",
      token: "token-1",
      device: "MacBook Pro",
      browser: "Chrome 120",
      ipAddress: "192.168.1.100",
      location: "Local",
      updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isCurrent: true,
    },
    {
      id: "session-2",
      token: "token-2",
      device: "iPhone 15",
      browser: "Safari 17",
      ipAddress: "203.0.113.42",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isCurrent: false,
    },
    {
      id: "session-3",
      token: "token-3",
      device: "Windows PC",
      browser: "Edge 120",
      ipAddress: "198.51.100.10",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      isCurrent: false,
    },
  ]);

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
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Monitor className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Active Devices</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Active Devices Manager
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Manage and monitor active sessions across all your devices. View
            device information, locations, and revoke sessions securely.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Shield className="h-3 w-3" />
              Secure
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <MapPin className="h-3 w-3" />
              Location
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Zap className="h-3 w-3" />
              Real-time
            </Badge>
          </div>
        </section>

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
                <Zap className="h-5 w-5 text-primary" />
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
                  icon: Zap,
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

