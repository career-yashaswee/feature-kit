"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowUp } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { TextTruncation } from "@/features/text-truncation";

export interface FeatureCardProps {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  statusBadge?: string;
  lastUpdatedAt?: string;
}

const getStatusFromBadge = (
  statusBadge?: string
): "online" | "offline" | "maintenance" | "degraded" | null => {
  if (!statusBadge) return null;
  const badgeLower = statusBadge.toLowerCase();
  if (
    badgeLower === "new" ||
    badgeLower === "updated" ||
    badgeLower === "fixed"
  ) {
    return "online";
  }
  if (badgeLower === "maintenance") {
    return "maintenance";
  }
  if (badgeLower === "degraded" || badgeLower === "deprecated") {
    return "degraded";
  }
  if (badgeLower === "offline") {
    return "offline";
  }
  return "online";
};

const formatLastUpdated = (lastUpdatedAt?: string): string => {
  if (!lastUpdatedAt) return "";
  try {
    const date = new Date(lastUpdatedAt);
    const distance = formatDistanceToNow(date, { addSuffix: true });
    // Convert to short format: "2d ago", "2w ago", "just now", etc.
    if (
      distance.includes("second") ||
      (distance.includes("minute") && distance.includes("less than"))
    ) {
      return "just now";
    }
    const shortDistance = distance
      .replace(/about /g, "")
      .replace(/less than a /g, "")
      .replace(/over /g, "")
      .replace(/almost /g, "")
      .replace(/ minutes?/g, "m")
      .replace(/ hours?/g, "h")
      .replace(/ days?/g, "d")
      .replace(/ weeks?/g, "w")
      .replace(/ months?/g, "mo")
      .replace(/ years?/g, "y");
    return shortDistance;
  } catch {
    return "";
  }
};

export function FeatureCard({
  name,
  path,
  icon: Icon,
  description,
  category,
  statusBadge,
  lastUpdatedAt,
}: FeatureCardProps) {
  const status = getStatusFromBadge(statusBadge);

  return (
    <Link href={path}>
      <Card className="group h-full cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg flex flex-col">
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <CardTitle>{name}</CardTitle>
            {statusBadge && status && (
              <Status status={status}>
                <StatusIndicator />
                <StatusLabel>
                  {statusBadge}
                  {lastUpdatedAt && (
                    <span className="ml-1 text-xs opacity-80">
                      {formatLastUpdated(lastUpdatedAt)}
                    </span>
                  )}
                </StatusLabel>
              </Status>
            )}
          </div>
          <CardDescription>
            <TextTruncation
              text={description}
              maxLines={3}
              showToggle={false}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>View Demo</span>
            <ArrowUp className="h-4 w-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
