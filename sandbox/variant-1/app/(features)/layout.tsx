"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import {
  ArrowUp,
  ArrowsClockwise,
  Download,
  FloppyDisk,
  WifiHigh,
  Lightning,
  Keyboard,
  Tray,
  FileText,
  Warning,
  Copy,
  Scroll,
  Share,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  LinkedinLogo,
  Target,
  Tag,
  Rocket,
  Compass,
  Bell,
  ChartBar,
  SlidersHorizontal,
  Stack,
  Monitor,
} from "@phosphor-icons/react";
import featuresData from "@/data/features.json";
import { ReportButton, type ReportIssue } from "@/features/report-button";
import { ShareButton } from "@/features/share-button";
import { getStatusFromBadge } from "@/lib/utils/status";
import { formatTimestamp } from "@/lib/utils/date";

type FeatureData = {
  name: string;
  path: string;
  icon: string;
  summary: string;
  description: string;
  category: string;
  statusBadge?: string;
  lastUpdatedAt?: string;
};

const iconMap: Record<string, typeof ArrowUp> = {
  ArrowUp,
  ArrowsClockwise,
  Download,
  FloppyDisk,
  WifiHigh,
  Lightning,
  Keyboard,
  Tray,
  FileText,
  Warning,
  Copy,
  Scroll,
  Share,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  LinkedinLogo,
  Target,
  Tag,
  Rocket,
  Compass,
  Bell,
  ChartBar,
  SlidersHorizontal,
  Stack,
  Monitor,
};

const reportIssues: ReportIssue[] = [
  {
    id: "INCORRECT",
    label: "Incorrect Information",
    description: "The content contains factual errors or outdated information",
  },
  {
    id: "BROKEN",
    label: "Broken Functionality",
    description: "Something doesn't work as expected or is broken",
  },
  {
    id: "INAPPROPRIATE",
    label: "Inappropriate Content",
    description: "Content that violates community guidelines",
  },
  {
    id: "SPAM",
    label: "Spam or Scam",
    description: "Suspicious or fraudulent content",
  },
  {
    id: "OTHER",
    label: "Other Issue",
    description: "Something else that needs attention",
  },
];

async function submitReport(payload: {
  issues: string[];
  customIssue?: string;
  description?: string;
  context?: { path?: string; url?: string };
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log("Report submitted:", payload);
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const feature = (featuresData as FeatureData[]).find(
    (f) => f.path === pathname,
  );

  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${pathname}`;
    }
    return `https://featurekit.dev${pathname}`;
  }, [pathname]);

  if (!feature) {
    return <>{children}</>;
  }

  const IconComponent = iconMap[feature.icon] || FileText;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="flex items-center gap-2 justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
              <IconComponent className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{feature.category}</span>
            </div>
            {feature.statusBadge && getStatusFromBadge(feature.statusBadge) && (
              <Status
                status={getStatusFromBadge(feature.statusBadge)!}
                className="gap-1.5"
              >
                <StatusIndicator />
                <StatusLabel>
                  {feature.statusBadge}
                  {feature.lastUpdatedAt &&
                    formatTimestamp(feature.lastUpdatedAt) && (
                      <span className="ml-1 text-xs opacity-80">
                        {formatTimestamp(feature.lastUpdatedAt)}
                      </span>
                    )}
                </StatusLabel>
              </Status>
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {feature.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <ShareButton
                url={shareUrl}
                title={feature.name}
                description={feature.description}
                variant="outline"
                size="sm"
              />
              <ReportButton
                reportId={feature.path}
                reportTitle={feature.name}
                issues={reportIssues}
                onSubmit={async (payload) => {
                  await submitReport({
                    ...payload,
                    context: {
                      path: pathname,
                      url: shareUrl,
                    },
                  });
                }}
                triggerLabel="Report"
                variant="outline"
                size="sm"
              />
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {feature.description}
          </p>
        </section>
        {children}
      </main>
    </div>
  );
}
