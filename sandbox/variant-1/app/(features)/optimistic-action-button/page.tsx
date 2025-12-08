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
import { Heart, Lightning, Code } from "@phosphor-icons/react";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
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
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
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
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
      size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
      disabled?: boolean;
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
      className?: string;
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
            See the component update in real-time as you change props below.
            Note: Complex props like `action`, `optimisticState`, `onOptimisticUpdate`, `onRollback`, `onSuccess`, `onError`, and `children` are not editable here.
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
              variant={isFavorite ? "default" : (getComponentProps().variant || "outline")}
              {...getComponentProps()}
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
            real-time. Note: Complex props like `action`, `optimisticState`, `onOptimisticUpdate`, `onRollback`, `onSuccess`, `onError`, and `children` are not editable here.
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
                  <TableCell className="font-medium font-mono text-sm">
                    {prop.property}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {prop.type}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
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
    </>
  );
}
