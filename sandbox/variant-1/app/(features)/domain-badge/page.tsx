"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SquaresFour,
  ComputerTower,
  Gear,
  Database,
  Brain,
  Tag,
  Lightning,
} from "@phosphor-icons/react";
import { DomainBadge } from "@/features/domain-badge/components/domain-badge";
import type { DomainConfig, DomainBadgeProps } from "@/features/domain-badge/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

const defaultDomainConfigs: DomainConfig[] = [
  {
    id: "FRONTEND",
    label: "Frontend",
    icon: SquaresFour,
    color: {
      light: "text-blue-600",
      dark: "dark:text-blue-400",
    },
  },
  {
    id: "BACKEND",
    label: "Backend",
    icon: ComputerTower,
    color: {
      light: "text-purple-600",
      dark: "dark:text-purple-400",
    },
  },
  {
    id: "DEVOPS",
    label: "DevOps",
    icon: Gear,
    color: {
      light: "text-orange-600",
      dark: "dark:text-orange-400",
    },
  },
  {
    id: "DATABASE",
    label: "Database",
    icon: Database,
    color: {
      light: "text-green-600",
      dark: "dark:text-green-400",
    },
  },
  {
    id: "AI",
    label: "AI",
    icon: Brain,
    color: {
      light: "text-pink-600",
      dark: "dark:text-pink-400",
    },
  },
];

export default function DomainBadgePage() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([
    "FRONTEND",
    "BACKEND",
  ]);

  const initialConfig: PropConfig[] = [
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the badge",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
      transform: (value) => value as DomainBadgeProps["size"],
    },
    {
      property: "showTooltip",
      type: "boolean",
      description: "Whether to show tooltip on hover",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "tooltipLayout",
      type: '"grid" | "list"',
      description: "Layout of the tooltip",
      defaultValue: "grid",
      value: "grid",
      inputType: "select",
      options: ["grid", "list"],
      transform: (value) => value as DomainBadgeProps["tooltipLayout"],
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

  const propMap: Record<string, keyof DomainBadgeProps> = {
    size: "size",
    showTooltip: "showTooltip",
    tooltipLayout: "tooltipLayout",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<DomainBadgeProps>({
      initialConfig,
      propMap,
    });

  const toggleDomain = (domainId: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
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
              Note: The `domains` and `domainConfigs` props are complex and not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DomainBadge
              domains={selectedDomains}
              domainConfigs={defaultDomainConfigs}
              {...getComponentProps}
            />
          </CardContent>
        </Card>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `domains` (string[]) and `domainConfigs` (DomainConfig[]) are not editable here."
        />

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/domain-badge");
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<Tag className="h-5 w-5 text-primary" />}
              />
            );
          }
          return null;
        })()}

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle domains to see the badge update in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {defaultDomainConfigs.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => toggleDomain(domain.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md border text-sm transition-colors",
                    selectedDomains.includes(domain.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted"
                  )}
                >
                  {domain.label}
                </button>
              ))}
            </div>
            <DomainBadge
              domains={selectedDomains}
              domainConfigs={defaultDomainConfigs}
              {...getComponentProps}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Size Variants</CardTitle>
            </div>
            <CardDescription>
              Domain badge available in different sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Small:</p>
              <DomainBadge
                domains={["FRONTEND", "BACKEND"]}
                domainConfigs={defaultDomainConfigs}
                size="sm"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Medium:</p>
              <DomainBadge
                domains={["FRONTEND", "BACKEND"]}
                domainConfigs={defaultDomainConfigs}
                size="md"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Large:</p>
              <DomainBadge
                domains={["FRONTEND", "BACKEND"]}
                domainConfigs={defaultDomainConfigs}
                size="lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">List Layout Tooltip</CardTitle>
            </div>
            <CardDescription>
              Tooltip with list layout instead of grid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DomainBadge
              domains={["FRONTEND", "DATABASE", "AI"]}
              domainConfigs={defaultDomainConfigs}
              tooltipLayout="list"
            />
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/domain-badge");
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
