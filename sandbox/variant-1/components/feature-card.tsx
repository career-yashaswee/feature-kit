"use client";

import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import { TextTruncation } from "@/features/text-truncation";
import { getStatusFromBadge } from "@/lib/utils/status";
import { formatLastUpdated } from "@/lib/utils/date";

export interface Feature {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  statusBadge?: string;
  lastUpdatedAt?: string;
}

export interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const {
    name,
    path,
    icon: Icon,
    description,
    category,
    statusBadge,
    lastUpdatedAt,
  } = feature;
  const status = getStatusFromBadge(statusBadge);

  return (
    <Link href={path}>
      <BaseCard className="group h-full cursor-pointer transition-all flex flex-col">
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary">
              <Icon className="h-5 w-5 text-primary/60 transition-colors group-hover:text-white" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
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
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <CardTitle>{name}</CardTitle>
          </div>
          <CardDescription>
            <TextTruncation
              text={description}
              maxLines={3}
              showToggle={false}
              className="text-sm text-muted-foreground font-ibm-plex-sans italic"
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex items-center text-sm text-muted-foreground font-ibm-plex-sans gap-2">
            <span className="group-hover:text-foreground cursor-pointer">
              View Demo
            </span>
            <ArrowUp className="h-4 w-4 rotate-90 transition-transform group-hover:translate-x-1 group-hover:text-foreground cursor-pointer" />
          </div>
        </CardContent>
      </BaseCard>
    </Link>
  );
}
