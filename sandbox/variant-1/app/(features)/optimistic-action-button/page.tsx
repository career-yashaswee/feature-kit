"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const OptimisticActionButton = dynamic(
  () =>
    import("@/features/optimistic-action-button/components/optimistic-action-button").then(
      (mod) => ({
        default: mod.OptimisticActionButton,
      }),
    ),
  { ssr: false },
);
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
import { Heart, Lightning, Star, Bookmark, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { OptimisticActionButtonProps } from "@/features/optimistic-action-button/types";

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
  const [selectedChildrenKey, setSelectedChildrenKey] = useState("heart-text");

  const initialConfig: PropConfig[] = [
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
      transform: (value) => value as OptimisticActionButtonProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      transform: (value) => value as OptimisticActionButtonProps["size"],
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
      skipIfEmpty: true,
    },
    {
      property: "successMessage",
      type: "string",
      description: "Message to show on successful action",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "errorMessage",
      type: "string",
      description: "Message to show on action error",
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
  ];

  const propMap: Record<string, keyof OptimisticActionButtonProps> = {
    variant: "variant",
    size: "size",
    disabled: "disabled",
    loadingMessage: "loadingMessage",
    successMessage: "successMessage",
    errorMessage: "errorMessage",
    className: "className",
    doubleTapToConfirm: "doubleTapToConfirm",
    doubleTapTimeoutMs: "doubleTapTimeoutMs",
    doubleTapConfirmMessage: "doubleTapConfirmMessage",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<OptimisticActionButtonProps>({
      initialConfig,
      propMap,
    });

  const getSelectedChildren = () => {
    const option = childrenMap[selectedChildrenKey];
    if (option) {
      return option.render();
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
              {...getComponentProps}
              variant={
                isFavorite ? "default" : getComponentProps.variant || "outline"
              }
            >
              {getSelectedChildren()}
            </OptimisticActionButton>
            <p className="text-sm text-muted-foreground">
              Current state: {isFavorite ? "Favorited" : "Not favorited"}
            </p>
          </div>
        </CardContent>
      </BaseCard>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time. Note: Complex props like `action`, `optimisticState`, `onOptimisticUpdate`, `onRollback`, `onSuccess`, and `onError` are not editable here."
      />

      {/* Children Selector */}
      <BaseCard>
        <CardHeader>
          <CardTitle className="text-xl">Children (Button Content)</CardTitle>
          <CardDescription>
            Select the content to display inside the button
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedChildrenKey}
            onValueChange={setSelectedChildrenKey}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {childrenOptions.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  <div className="flex items-center gap-2">
                    {typeof option.render() === "string" ? (
                      <span>{option.label}</span>
                    ) : (
                      <>
                        {option.render()}
                        <span>{option.label}</span>
                      </>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </BaseCard>

      <BaseCard>
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
      </BaseCard>

      <BaseCard>
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
      </BaseCard>
    </>
  );
}
