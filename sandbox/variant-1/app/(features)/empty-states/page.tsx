"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tray,
  Sparkle,
  Code,
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
import type { EmptyStateType } from "@/features/empty-states/types";
import type { ReactNode } from "react";

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

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType:
    | "number"
    | "select"
    | "text"
    | "boolean"
    | "icon-select"
    | "action-select";
  options?: string[];
  iconOptions?: IconOption[];
  actionOptions?: ActionOption[];
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

  const [props, setProps] = useState<PropConfig[]>([
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
    },
    {
      property: "title",
      type: "string",
      description: "Title text for the empty state",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description text for the empty state",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "icon",
      type: "ReactNode",
      description: "Custom icon to display (overrides default icon)",
      defaultValue: "none",
      value: "none",
      inputType: "icon-select",
      iconOptions: iconOptions,
    },
    {
      property: "actionLabel",
      type: "string",
      description: "Label for the action button",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "onAction",
      type: "() => void",
      description: "Callback function when action button is clicked",
      defaultValue: "none",
      value: "none",
      inputType: "action-select",
      actionOptions: actionOptions,
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
    newValue: string | number | boolean
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
      type?: EmptyStateType;
      title?: string;
      description?: string;
      icon?: ReactNode;
      actionLabel?: string;
      onAction?: () => void;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "type" && prop.value) {
        componentProps.type = prop.value as EmptyStateType;
      } else if (prop.property === "title" && prop.value) {
        componentProps.title = String(prop.value);
      } else if (prop.property === "description" && prop.value) {
        componentProps.description = String(prop.value);
      } else if (
        prop.property === "icon" &&
        prop.value &&
        prop.value !== "none"
      ) {
        const selectedIcon = iconOptions.find(
          (opt) => opt.value === prop.value
        );
        if (selectedIcon) {
          const IconComponent = selectedIcon.icon;
          componentProps.icon = <IconComponent className="h-8 w-8" />;
        }
      } else if (prop.property === "actionLabel" && prop.value) {
        componentProps.actionLabel = String(prop.value);
      } else if (
        prop.property === "onAction" &&
        prop.value &&
        prop.value !== "none"
      ) {
        const selectedAction = actionOptions.find(
          (opt) => opt.value === prop.value
        );
        if (selectedAction) {
          componentProps.onAction = selectedAction.action;
        }
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  return (
    <>
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
            See the component update in real-time as you change props below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState {...getComponentProps()} />
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
            real-time.
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
                  <TableCell
                    className="text-xs text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    }}
                  >
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
                    {prop.inputType === "icon-select" ? (
                      <Select
                        value={String(prop.value)}
                        onValueChange={(value) =>
                          handleValueChange(index, value)
                        }
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue>
                            {(() => {
                              const selectedIcon = prop.iconOptions?.find(
                                (opt) => opt.value === prop.value
                              );
                              if (selectedIcon) {
                                const IconComponent = selectedIcon.icon;
                                return (
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="h-4 w-4" />
                                    <span>{selectedIcon.label}</span>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {prop.iconOptions?.map((option) => {
                            const IconComponent = option.icon;
                            return (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : prop.inputType === "action-select" ? (
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
                          {prop.actionOptions?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : prop.inputType === "select" ? (
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
                    ) : prop.inputType === "number" ? (
                      <Input
                        type="number"
                        value={
                          typeof prop.value === "number"
                            ? prop.value
                            : Number(prop.value) || 0
                        }
                        onChange={(e) =>
                          handleValueChange(
                            index,
                            e.target.value === ""
                              ? prop.defaultValue
                              : Number(e.target.value)
                          )
                        }
                        className="h-8"
                      />
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

      <Card className="border-2 shadow-lg">
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
      </Card>

      <Card className="border-2 shadow-lg">
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
      </Card>

      <Card className="border-2 shadow-lg">
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
      </Card>

      <Card className="border-2 shadow-lg">
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
      </Card>
    </>
  );
}
