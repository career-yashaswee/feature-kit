"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  WarningCircle,
  XCircle,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import type { Notification } from "@/features/notification-shade/types";
import type { NotificationShadeProps } from "@/features/notification-shade/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const NotificationShade = dynamic(
  () =>
    import("@/features/notification-shade/components/notification-shade").then(
      (mod) => ({ default: mod.NotificationShade }),
    ),
  { ssr: false },
);

const features = [
  {
    title: "Tabbed Interface",
    description: "Filter notifications by Unread, All, or System categories",
    icon: Bell,
  },
  {
    title: "Smart Icons",
    description: "Content-aware icons based on notification type and content",
    icon: Gear,
  },
  {
    title: "Responsive Design",
    description: "Dropdown on desktop, dialog on mobile",
    icon: Lightning,
  },
];

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Test Passed",
    message: "All tests passed successfully for your commit",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isRead: false,
    category: "system",
  },
  {
    id: "2",
    type: "info",
    title: "AI Analysis Available",
    message:
      "Your commit has been analyzed. Click to view detailed feedback and suggestions.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isRead: false,
    category: "composition",
    metadata: {
      compositionId: "123",
      attemptId: "456",
    },
  },
  {
    id: "3",
    type: "warning",
    title: "Tests Need Review",
    message:
      "AI analysis is available but some tests failed. Please review the test results.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: true,
    category: "composition",
  },
  {
    id: "4",
    type: "error",
    title: "Analysis Unavailable",
    message:
      "Both AI analysis and tests failed. Please check your code and try again.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    isRead: true,
    category: "composition",
  },
  {
    id: "5",
    type: "success",
    title: "Badge Earned",
    message: "Congratulations! You've earned the 'First Commit' badge.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    category: "user",
    metadata: {
      badgeEarned: true,
    },
  },
  {
    id: "6",
    type: "info",
    title: "System Update",
    message: "New features have been added to the platform. Check them out!",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    category: "system",
  },
];

export default function NotificationShadePage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [, setIsRefreshing] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const initialConfig: PropConfig[] = [
    {
      property: "unreadCount",
      type: "number",
      description:
        "Number of unread notifications (auto-calculated if not provided)",
      defaultValue: unreadCount,
      value: unreadCount,
      inputType: "number",
    },
    {
      property: "isMobile",
      type: "boolean",
      description: "Force mobile layout (dialog instead of dropdown)",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "emptyMessage",
      type: "string",
      description: "Message to show when there are no notifications",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "viewAllLabel",
      type: "string",
      description: "Label text for the 'View All' button",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
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
  ];

  const propMap: Record<string, keyof NotificationShadeProps> = {
    unreadCount: "unreadCount",
    isMobile: "isMobile",
    emptyMessage: "emptyMessage",
    viewAllLabel: "viewAllLabel",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<NotificationShadeProps>({
      initialConfig,
      propMap,
    });

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log("Notification clicked:", notification);
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
    );
  };

  const handleNotificationDismiss = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    return { newCount: 0 };
  };

  const handleViewAll = () => {
    console.log("View all notifications");
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
              Note: Complex props like `notifications`, `onMarkAllAsRead`,
              `onNotificationClick`, `onNotificationDismiss`, `onRefresh`, and
              `onViewAll` are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <NotificationShade
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNotificationClick={handleNotificationClick}
                onNotificationDismiss={handleNotificationDismiss}
                onRefresh={handleRefresh}
                onViewAll={handleViewAll}
                {...getComponentProps}
              />
            </div>
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `notifications`, `onMarkAllAsRead`, `onNotificationClick`, `onNotificationDismiss`, `onRefresh`, and `onViewAll` are not editable here."
        />

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/notification-shade",
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
          return (
            <HowToTestCard
              steps={[
                "Click the bell icon in the top right to open the notification panel",
                "Switch between Unread, All, and System tabs",
                "Click on notifications to mark them as read",
                "Use the dismiss button (X) to remove notifications",
                "Try the refresh button to simulate fetching new notifications",
                "Resize the window to see mobile dialog vs desktop dropdown",
                "Notice the smart icon selection based on notification content",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Test the notification shade with sample notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Notification Shade</h3>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <NotificationShade
                    notifications={notifications}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onNotificationClick={handleNotificationClick}
                    onNotificationDismiss={handleNotificationDismiss}
                    onRefresh={handleRefresh}
                    onViewAll={handleViewAll}
                    {...getComponentProps}
                  />
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  • Click the bell icon above to open the notification panel
                </p>
                <p>• Try different tabs and interactions</p>
                <p>• Notifications update in real-time</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Notification Actions</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newNotification: Notification = {
                      id: Date.now().toString(),
                      type: "info",
                      title: "New Notification",
                      message: "This is a test notification added dynamically",
                      timestamp: new Date().toISOString(),
                      isRead: false,
                      category: "system",
                    };
                    setNotifications((prev) => [newNotification, ...prev]);
                  }}
                >
                  Add Notification
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark All as Read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNotifications([])}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </BaseCard>

        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Notification Types</CardTitle>
            </div>
            <CardDescription>
              Different notification types and their visual indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "success", label: "Success", icon: CheckCircle },
                { type: "info", label: "Info", icon: Bell },
                { type: "warning", label: "Warning", icon: WarningCircle },
                { type: "error", label: "Error", icon: XCircle },
              ].map(({ type, label, icon: Icon }) => (
                <div
                  key={type}
                  className="flex items-center justify-between rounded-lg border bg-muted/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-muted-foreground">
                        {type} notification type
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/notification-shade",
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = features.map((feature) => ({
            icon: <feature.icon className="h-5 w-5 text-primary" />,
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
