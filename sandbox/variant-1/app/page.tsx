"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  RefreshCw,
  Download,
  Save,
  Wifi,
  Keyboard,
  Inbox,
  FileText,
  AlertTriangle,
  Copy,
  Scroll,
  Zap,
  Share2,
  Layout,
  Search,
} from "lucide-react";

const features = [
  {
    name: "Scroll to Top",
    path: "/scroll-to-top",
    icon: ArrowUp,
    description: "Smooth scroll-to-top button with animations",
  },
  {
    name: "Refresh Button",
    path: "/refresh-button",
    icon: RefreshCw,
    description: "Button that invalidates React Query keys",
  },
  {
    name: "Export Button",
    path: "/export-button",
    icon: Download,
    description: "Export data with loading states",
  },
  {
    name: "Auto Save Form",
    path: "/auto-save-form",
    icon: Save,
    description: "Automatically save form data",
  },
  {
    name: "Network Status Listener",
    path: "/network-status-listener-toast",
    icon: Wifi,
    description: "Listen to network status changes",
  },
  {
    name: "Optimistic Action Button",
    path: "/optimistic-action-button",
    icon: Zap,
    description: "Optimistic UI updates for actions",
  },
  {
    name: "Keyboard Shortcuts",
    path: "/keyboard-shortcuts",
    icon: Keyboard,
    description: "Manage and display keyboard shortcuts",
  },
  {
    name: "Empty States",
    path: "/empty-states",
    icon: Inbox,
    description: "Contextual empty states for different scenarios",
  },
  {
    name: "Text Truncation",
    path: "/text-truncation",
    icon: FileText,
    description: "Intelligent text truncation with expand/collapse",
  },
  {
    name: "Consequence Confirmation Dialog",
    path: "/consequence-confirmation-dialog",
    icon: AlertTriangle,
    description: "Flexible confirmation dialogs with multiple variants",
  },
  {
    name: "Copy to Clipboard",
    path: "/copy-to-clipboard",
    icon: Copy,
    description: "Copy text to clipboard with animations and toast",
  },
  {
    name: "Restore Scroll Position",
    path: "/restore-scroll-position",
    icon: Scroll,
    description: "Remember and restore scroll positions",
  },
  {
    name: "Share Button",
    path: "/share-button",
    icon: Share2,
    description: "YouTube-style share button with native API and social media",
  },
  {
    name: "Resizable Panels",
    path: "/resizable-panels",
    icon: Layout,
    description: "LeetCode-style resizable panels with persistent layouts",
  },
  {
    name: "Auto Complete Form",
    path: "/auto-complete-form",
    icon: Search,
    description: "Autocomplete with static and async data support",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Feature Kit</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sandbox Variant 1
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore and test all available features. Click on any feature card
            to see it in action.
          </p>
          <Badge variant="default" className="gap-1.5 demo-badge">
            {features.length} Features Available
          </Badge>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.path} href={feature.path}>
              <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>View Demo</span>
                    <ArrowUp className="h-4 w-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
