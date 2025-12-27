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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SquaresFour,
  ComputerTower,
  Gear,
  Database,
  Brain,
  Tag,
  Lightning,
  Code,
} from "@phosphor-icons/react";
import { DomainBadge } from "@/features/domain-badge/components/domain-badge";
import type { DomainConfig } from "@/features/domain-badge/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

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
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "size",
      type: '"sm" | "md" | "lg"',
      description: "Size of the badge",
      defaultValue: "md",
      value: "md",
      inputType: "select",
      options: ["sm", "md", "lg"],
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
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
  ]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean,
  ) => {
    setProps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value: newValue,
      };
      return updated;
    });
  };

  const getComponentProps = () => {
    const componentProps: {
      size?: "sm" | "md" | "lg";
      showTooltip?: boolean;
      tooltipLayout?: "grid" | "list";
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "size") {
        componentProps.size = prop.value as "sm" | "md" | "lg";
      } else if (prop.property === "showTooltip") {
        componentProps.showTooltip = Boolean(prop.value);
      } else if (prop.property === "tooltipLayout") {
        componentProps.tooltipLayout = prop.value as "grid" | "list";
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

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
              {...getComponentProps()}
            />
          </CardContent>
        </Card>

        {/* Props API Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Props API</CardTitle>
            </div>
            <CardDescription>
              Interact with the table below to customize the component in
              real-time. Note: Complex props like `domains` (string[]) and `domainConfigs` (DomainConfig[]) are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Property</TableHead>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[200px]">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop, index) => (
                  <TableRow key={prop.property}>
                    <TableCell
                      className="font-medium text-sm"
                      style={{
                        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                      }}
                    >
                      {prop.property}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif' }}>
                      {prop.type}
                    </TableCell>
                    <TableCell
                    className="text-sm text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
                      {prop.description}
                    </TableCell>
                    <TableCell>
                      {prop.inputType === "select" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : prop.inputType === "boolean" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value === "true")
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">true</SelectItem>
                            <SelectItem value="false">false</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type="text"
                          value={String(prop.value)}
                          onChange={(e) =>
                            handleValueChange(index, e.target.value)
                          }
                          placeholder={`Enter ${prop.property}`}
                          className="h-8"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

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
              {...getComponentProps()}
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
