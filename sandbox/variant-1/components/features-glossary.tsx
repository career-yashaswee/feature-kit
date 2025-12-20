"use client";

import { Sparkle } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesGlossaryProps {
  title?: string;
  features: FeatureItem[];
  icon?: React.ReactNode;
}

export function FeaturesGlossary({
  title = "Features",
  features,
  icon,
}: FeaturesGlossaryProps) {
  const defaultIcon = <Sparkle className="h-5 w-5 text-primary" />;

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            {icon || defaultIcon}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
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
  );
}

