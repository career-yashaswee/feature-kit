"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const OptimisticActionButton = dynamic(
  () =>
    import("@/features/optimistic-action-button/components/optimistic-action-button").then((mod) => ({
      default: mod.OptimisticActionButton,
    })),
  { ssr: false }
);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

async function toggleFavorite(id: string, currentState: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) {
    throw new Error("Failed to update favorite");
  }
  return !currentState;
}

export default function OptimisticActionButtonPage() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Optimistic Action Button</h1>
          <p className="text-muted-foreground">
            A button that updates UI immediately and rolls back on error
          </p>
        </div>

        <Card>
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
                onOptimisticUpdate={() => setIsFavorite(!isFavorite)}
                onRollback={() => setIsFavorite(isFavorite)}
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
      </div>
    </div>
  );
}
