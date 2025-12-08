"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tray,
  Sparkle,
  Code,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { EmptyState } from "@/features/empty-states/components/empty-state";

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

  return (
    <>
      <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Select different empty state types from the buttons below to
                  see them in action
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
