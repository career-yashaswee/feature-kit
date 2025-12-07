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
  MessageSquare,
  Linkedin,
  Target,
  Tag,
  Rocket,
  Navigation,
  Bell,
  BarChart3,
  SlidersHorizontal,
  Layers,
  Monitor,
} from "lucide-react";

function HomePage() {
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
    name: "Table of Contents",
    path: "/table-of-contents",
    icon: FileText,
    description: "Auto-generated table of contents from markdown with active highlighting",
  },
  {
    name: "Stateful Button",
    path: "/stateful-button",
    icon: Zap,
    description: "Button with loading, success, and error states with rate limiting",
  },
  {
    name: "Search Input",
    path: "/search-input",
    icon: Search,
    description: "Search input with fuzzy search, debouncing, and speech recognition",
  },
  {
    name: "Share QR Code",
    path: "/share-qr-code",
    icon: Share2,
    description: "Instagram-style QR code sharing with customizable themes",
  },
  {
    name: "Ask Agent",
    path: "/ask-agent",
    icon: MessageSquare,
    description: "Reddit-style Ask Agent page with animated tags and voice input",
  },
  {
    name: "User Card",
    path: "/user-card",
    icon: Linkedin,
    description: "User card component with LinkedIn and Twitter variants, light and dark mode",
  },
  {
    name: "FAQ Hints",
    path: "/faq-hints",
    icon: MessageSquare,
    description: "FAQ component with short answer hints and expandable details",
  },
  {
    name: "Health Bar",
    path: "/health-bar",
    icon: AlertTriangle,
    description: "Visual health indicator with color-coded status and timer",
  },
  {
    name: "Language Switcher",
    path: "/language-switcher",
    icon: Linkedin,
    description: "Flexible language switcher with adapter pattern and country flags",
  },
  {
    name: "Page Loader",
    path: "/page-loader",
    icon: RefreshCw,
    description: "Full-featured page loader with refresh functionality and animations",
  },
  {
    name: "Premium Identifier",
    path: "/premium-identifier",
    icon: Zap,
    description: "Badge component for premium/subscription status with multiple variants",
  },
  {
    name: "Report Button",
    path: "/report-button",
    icon: AlertTriangle,
    description: "Comprehensive report dialog with issue selection and TanStack Query",
  },
  {
    name: "Unique Value Proposition",
    path: "/unique-value-proposition",
    icon: Target,
    description: "Scatter plot visualization for comparing products across two dimensions",
  },
  {
    name: "Domain Badge",
    path: "/domain-badge",
    icon: Tag,
    description: "Visual badge component displaying multiple domain indicators with tooltips",
  },
  {
    name: "Upgrade Button",
    path: "/upgrade-button",
    icon: ArrowUp,
    description: "Smart button that adapts based on subscription status with configurable actions",
  },
  {
    name: "Page Header",
    path: "/page-header",
    icon: FileText,
    description: "Full-width page header with glass morphism icon and optional actions",
  },
  {
    name: "Grid Card",
    path: "/grid-card",
    icon: Layout,
    description: "Flexible card component for grid layouts with header, content, and footer",
  },
  {
    name: "Onboarding",
    path: "/on-boarding",
    icon: Rocket,
    description: "Multi-step onboarding layout with stepper navigation and progress tracking",
  },
  {
    name: "Test Case Badge",
    path: "/test-case-badge",
    icon: Tag,
    description: "Test results badge with passed/failed counts and progress indicator",
  },
  {
    name: "Scrollable Breadcrumbs",
    path: "/scrollable-breadcrumbs",
    icon: Navigation,
    description: "Horizontally scrollable breadcrumb navigation with auto-scroll",
  },
  {
    name: "Notification Shade",
    path: "/notification-shade",
    icon: Bell,
    description: "Comprehensive notification panel with tabbed filtering and smart icons",
  },
  {
    name: "Compare Alternatives",
    path: "/compare-alternatives",
    icon: BarChart3,
    description: "Flexible comparison table for comparing features across alternatives",
  },
        {
          name: "Filter Sheet",
          path: "/filter-sheet",
          icon: SlidersHorizontal,
          description: "Comprehensive filter sheet with multiple filter types and configurations",
        },
        {
          name: "Persistence TipTap Editor",
          path: "/persistence-tip-tap-editor",
          icon: FileText,
          description: "Rich text editor with localStorage persistence and database sync",
        },
        {
          name: "Variant Select",
          path: "/variant-select",
          icon: Layers,
          description: "Flexible variant selector with dependency visualization and persistent state",
        },
        {
          name: "Active Devices",
          path: "/active-devices",
          icon: Monitor,
          description: "Manage and monitor active sessions across all devices with location tracking",
        },
      ];

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

export default HomePage;
