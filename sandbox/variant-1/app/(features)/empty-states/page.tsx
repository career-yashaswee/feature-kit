"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tray,
  Sparkle,
  Gear,
  Lightning,
  CursorClick,
  WarningCircle,
  Spinner,
  Question,
  MagnifyingGlass,
  ShieldSlash,
  SignIn,
  Database,
  FolderOpen,
  FileX,
  CloudSlash,
} from "@phosphor-icons/react";
import { EmptyState } from "@/features/empty-states/components/empty-state";
import type {
  EmptyStateType,
  EmptyStateProps,
} from "@/features/empty-states/types";
import type { ReactNode } from "react";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

interface IconOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ActionOption {
  value: string;
  label: string;
  action: () => void;
}

export default function EmptyStatesPage() {
  const [selectedType, setSelectedType] = useState<
    | "no-data"
    | "error"
    | "loading"
    | "not-found"
    | "search"
    | "not-authorized"
    | "not-authenticated"
    | "not-sufficient-data"
  >("no-data");

  const iconOptions: IconOption[] = [
    { value: "none", label: "None (Default)", icon: Tray },
    { value: "tray", label: "Tray", icon: Tray },
    { value: "warning", label: "Warning", icon: WarningCircle },
    { value: "spinner", label: "Spinner", icon: Spinner },
    { value: "question", label: "Question", icon: Question },
    {
      value: "magnifying-glass",
      label: "Magnifying Glass",
      icon: MagnifyingGlass,
    },
    { value: "shield-slash", label: "Shield Slash", icon: ShieldSlash },
    { value: "sign-in", label: "Sign In", icon: SignIn },
    { value: "database", label: "Database", icon: Database },
    { value: "folder-open", label: "Folder Open", icon: FolderOpen },
    { value: "file-x", label: "File X", icon: FileX },
    { value: "cloud-slash", label: "Cloud Slash", icon: CloudSlash },
  ];

  const actionOptions: ActionOption[] = [
    {
      value: "none",
      label: "None",
      action: () => {},
    },
    {
      value: "learn-more",
      label: "Learn More",
      action: () => {
        window.open("https://docs.featurekit.dev", "_blank");
      },
    },
    {
      value: "retry",
      label: "Retry",
      action: () => {
        window.location.reload();
      },
    },
  ];

  const [selectedIconKey, setSelectedIconKey] = useState("none");
  const [selectedActionKey, setSelectedActionKey] = useState("none");

  const initialConfig: PropConfig[] = [
    {
      property: "type",
      type: "EmptyStateType",
      description: "Type of empty state to display",
      defaultValue: "no-data",
      value: "no-data",
      inputType: "select",
      options: [
        "no-data",
        "error",
        "loading",
        "not-found",
        "search",
        "not-authorized",
        "not-authenticated",
        "not-sufficient-data",
      ],
      transform: (value) => value as EmptyStateType,
    },
    {
      property: "title",
      type: "string",
      description: "Title text for the empty state",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "description",
      type: "string",
      description: "Description text for the empty state",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "actionLabel",
      type: "string",
      description: "Label for the action button",
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

  const propMap: Record<string, keyof EmptyStateProps> = {
    type: "type",
    title: "title",
    description: "description",
    actionLabel: "actionLabel",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<EmptyStateProps>({
      initialConfig,
      propMap,
    });

  const getSelectedIcon = (): ReactNode | undefined => {
    if (selectedIconKey === "none") return undefined;
    const selectedIcon = iconOptions.find(
      (opt) => opt.value === selectedIconKey,
    );
    if (selectedIcon) {
      const IconComponent = selectedIcon.icon;
      return <IconComponent className="h-8 w-8" />;
    }
    return undefined;
  };

  const getSelectedAction = (): (() => void) | undefined => {
    if (selectedActionKey === "none") return undefined;
    const selectedAction = actionOptions.find(
      (opt) => opt.value === selectedActionKey,
    );
    return selectedAction?.action;
  };

  return (
    <>
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
            See the component update in real-time as you change props below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            {...getComponentProps}
            icon={getSelectedIcon()}
            onAction={getSelectedAction()}
          />
        </CardContent>
      </BaseCard>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time"
      />

      {/* Icon Selector */}
      <BaseCard>
        <CardHeader>
          <CardTitle className="text-xl">Icon</CardTitle>
          <CardDescription>
            Select a custom icon to display (overrides default icon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedIconKey} onValueChange={setSelectedIconKey}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </BaseCard>

      {/* Action Selector */}
      <BaseCard>
        <CardHeader>
          <CardTitle className="text-xl">Action</CardTitle>
          <CardDescription>
            Select a callback function for the action button
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedActionKey}
            onValueChange={setSelectedActionKey}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {actionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <CursorClick className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
              <CardDescription className="text-base">
                Select different empty state types from the buttons below to see
                them in action
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                "no-data",
                "error",
                "loading",
                "not-found",
                "search",
                "not-authorized",
                "not-authenticated",
                "not-sufficient-data",
              ] as const
            ).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type.replace("-", " ")}
              </Button>
            ))}
          </div>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Tray className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">Empty State Preview</CardTitle>
            <CardDescription>
              Current type: {selectedType.replace("-", " ")}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] rounded-lg border border-dashed bg-muted/20">
            <EmptyState
              type={selectedType}
              onAction={
                selectedType === "no-data"
                  ? () => alert("Action clicked!")
                  : undefined
              }
              actionLabel={
                selectedType === "no-data" ? "Create New Item" : undefined
              }
            />
          </div>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Sparkle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">All Empty State Types</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {(
              [
                "no-data",
                "error",
                "loading",
                "not-found",
                "search",
                "not-authorized",
                "not-authenticated",
                "not-sufficient-data",
              ] as const
            ).map((type) => (
              <div
                key={type}
                className="rounded-lg border bg-card p-6"
                onClick={() => setSelectedType(type)}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold capitalize">
                    {type.replace("-", " ")}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {type}
                  </Badge>
                </div>
                <div className="min-h-[200px] rounded-md border border-dashed bg-muted/20">
                  <EmptyState type={type} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </BaseCard>

      <BaseCard>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Gear className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">Custom Example</CardTitle>
          </div>
          <CardDescription>
            You can customize the title, description, icon, and action button
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[300px] rounded-lg border border-dashed bg-muted/20">
            <EmptyState
              title="Custom Empty State"
              description="This is a custom empty state with a custom title and description. You can also add custom icons and action buttons."
              actionLabel="Get Started"
              onAction={() => alert("Custom action triggered!")}
            />
          </div>
        </CardContent>
      </BaseCard>
    </>
  );
}
