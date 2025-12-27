"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const OptimisticActionButton = dynamic(
  () =>
    import("@/features/optimistic-action-button/components/optimistic-action-button").then(
      (mod) => ({
        default: mod.OptimisticActionButton,
      })
    ),
  { ssr: false }
);
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
  Heart,
  Lightning,
  Code,
  Star,
  Bookmark,
  Trash,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import type { ReactNode } from "react";

type ChildrenOption = {
  key: string;
  label: string;
  render: () => ReactNode;
};

const childrenOptions: ChildrenOption[] = [
  {
    key: "Favorite",
    label: "Favorite",
    render: () => "Favorite",
  },
  {
    key: "Like",
    label: "Like",
    render: () => "Like",
  },
  {
    key: "Save",
    label: "Save",
    render: () => "Save",
  },
  {
    key: "Subscribe",
    label: "Subscribe",
    render: () => "Subscribe",
  },
  {
    key: "Follow",
    label: "Follow",
    render: () => "Follow",
  },
  {
    key: "icon-heart",
    label: "Heart Icon",
    render: () => <Heart className="h-4 w-4" />,
  },
  {
    key: "icon-star",
    label: "Star Icon",
    render: () => <Star className="h-4 w-4" />,
  },
  {
    key: "icon-bookmark",
    label: "Bookmark Icon",
    render: () => <Bookmark className="h-4 w-4" />,
  },
  {
    key: "heart-text",
    label: "Heart + Text",
    render: () => (
      <>
        <Heart className="h-4 w-4 mr-2" />
        Favorite
      </>
    ),
  },
  {
    key: "heart-filled-text",
    label: "Heart Filled + Text",
    render: () => (
      <>
        <Heart className="h-4 w-4 mr-2 fill-current" />
        Favorited
      </>
    ),
  },
  {
    key: "star-text",
    label: "Star + Text",
    render: () => (
      <>
        <Star className="h-4 w-4 mr-2" />
        Star
      </>
    ),
  },
  {
    key: "bookmark-text",
    label: "Bookmark + Text",
    render: () => (
      <div className="flex-row items-center gap-2">
        <Bookmark className="h-4 w-4 mr-2" />
        Save
      </div>
    ),
  },
];

const childrenMap: Record<string, ChildrenOption> = {};
childrenOptions.forEach((option) => {
  childrenMap[option.key] = option;
});

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean" | "reactnode";
  options?: string[];
}

async function toggleFavorite(id: string, currentState: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) {
    throw new Error("Failed to update favorite");
  }
  return !currentState;
}

export default function OptimisticActionButtonPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const prevIsFavoriteRef = useRef(isFavorite);

  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    {
      property: "disabled",
      type: "boolean",
      description: "Whether the button is disabled",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "loadingMessage",
      type: "string",
      description: "Message to show while action is in progress",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "successMessage",
      type: "string",
      description: "Message to show on successful action",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "errorMessage",
      type: "string",
      description: "Message to show on action error",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "children",
      type: "ReactNode",
      description: "Content to display inside the button",
      defaultValue: "heart-text",
      value: "heart-text",
      inputType: "reactnode",
      options: childrenOptions.map((opt) => opt.key),
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
    {
      property: "doubleTapToConfirm",
      type: "boolean",
      description:
        "Require double tap to confirm action (useful for destructive actions)",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "doubleTapTimeoutMs",
      type: "number",
      description:
        "Timeout in milliseconds before double tap confirmation resets",
      defaultValue: 3000,
      value: 3000,
      inputType: "number",
    },
    {
      property: "doubleTapConfirmMessage",
      type: "string",
      description: "Message to show when waiting for confirmation tap",
      defaultValue: "Press again to confirm",
      value: "Press again to confirm",
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
      variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
      size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
      disabled?: boolean;
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
      className?: string;
      doubleTapToConfirm?: boolean;
      doubleTapTimeoutMs?: number;
      doubleTapConfirmMessage?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "variant") {
        componentProps.variant = prop.value as typeof componentProps.variant;
      } else if (prop.property === "size") {
        componentProps.size = prop.value as typeof componentProps.size;
      } else if (prop.property === "disabled") {
        componentProps.disabled = Boolean(prop.value);
      } else if (prop.property === "loadingMessage" && prop.value) {
        componentProps.loadingMessage = String(prop.value);
      } else if (prop.property === "successMessage" && prop.value) {
        componentProps.successMessage = String(prop.value);
      } else if (prop.property === "errorMessage" && prop.value) {
        componentProps.errorMessage = String(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      } else if (prop.property === "doubleTapToConfirm") {
        componentProps.doubleTapToConfirm = Boolean(prop.value);
      } else if (prop.property === "doubleTapTimeoutMs") {
        const numValue = Number(prop.value);
        if (!isNaN(numValue)) {
          componentProps.doubleTapTimeoutMs = numValue;
        }
      } else if (prop.property === "doubleTapConfirmMessage" && prop.value) {
        componentProps.doubleTapConfirmMessage = String(prop.value);
      }
    });

    return componentProps;
  };

  const getSelectedChildren = () => {
    const childrenProp = props.find((p) => p.property === "children");
    if (childrenProp && typeof childrenProp.value === "string") {
      const option = childrenMap[childrenProp.value];
      if (option) {
        return option.render();
      }
    }
    return (
      <>
        <Heart className="h-4 w-4 mr-2" />
        Favorite
      </>
    );
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
            See the component update in real-time as you change props below.
            Note: Complex props like `action`, `optimisticState`,
            `onOptimisticUpdate`, `onRollback`, `onSuccess`, and `onError` are
            not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <OptimisticActionButton
              action={async () => {
                const newState = await toggleFavorite("item-1", isFavorite);
                setIsFavorite(newState);
              }}
              optimisticState={!isFavorite}
              onOptimisticUpdate={() => {
                prevIsFavoriteRef.current = isFavorite;
                setIsFavorite(!isFavorite);
              }}
              onRollback={() => setIsFavorite(prevIsFavoriteRef.current)}
              variant={
                isFavorite
                  ? "default"
                  : getComponentProps().variant || "outline"
              }
              {...getComponentProps()}
            >
              {getSelectedChildren()}
            </OptimisticActionButton>
            <p className="text-sm text-muted-foreground">
              Current state: {isFavorite ? "Favorited" : "Not favorited"}
            </p>
          </div>
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
            real-time. Note: Complex props like `action`, `optimisticState`,
            `onOptimisticUpdate`, `onRollback`, `onSuccess`, and `onError` are
            not editable here.
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
                    ) : prop.inputType === "reactnode" ? (
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
                          {prop.options?.map((optionKey) => {
                            const option = childrenMap[optionKey];
                            return (
                              <SelectItem key={optionKey} value={optionKey}>
                                <div className="flex items-center gap-2">
                                  {typeof option?.render() === "string" ? (
                                    <span>{option.label}</span>
                                  ) : (
                                    <>
                                      {option?.render()}
                                      <span>{option?.label}</span>
                                    </>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
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

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle>Favorite Item</CardTitle>
          <CardDescription>
            Click to toggle favorite (20% chance of error to test rollback)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <OptimisticActionButton
              action={async () => {
                const newState = await toggleFavorite("item-1", isFavorite);
                setIsFavorite(newState);
              }}
              optimisticState={!isFavorite}
              onOptimisticUpdate={() => {
                prevIsFavoriteRef.current = isFavorite;
                setIsFavorite(!isFavorite);
              }}
              onRollback={() => setIsFavorite(prevIsFavoriteRef.current)}
              variant={isFavorite ? "default" : "outline"}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Favorited" : "Favorite"}
            </OptimisticActionButton>
            <p className="text-sm text-muted-foreground">
              Current state: {isFavorite ? "Favorited" : "Not favorited"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-destructive/10 p-2">
              <Trash className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Double Tap to Confirm</CardTitle>
          </div>
          <CardDescription>
            For destructive actions, require two taps to confirm. First tap
            shows confirmation message, second tap executes the action. If you
            wait too long, it resets automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <OptimisticActionButton
              action={async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                toast.success("Item deleted successfully");
              }}
              optimisticState={false}
              onOptimisticUpdate={() => {}}
              onRollback={() => {}}
              variant="destructive"
              doubleTapToConfirm={true}
              doubleTapTimeoutMs={3000}
              doubleTapConfirmMessage="Press again to delete"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Item
            </OptimisticActionButton>
            <p className="text-sm text-muted-foreground">
              Click once to see confirmation, click again to delete. Wait 3
              seconds to see it reset.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
