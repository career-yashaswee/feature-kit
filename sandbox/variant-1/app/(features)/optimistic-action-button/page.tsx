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
import { Heart } from "@phosphor-icons/react";

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

  return (
    <>
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
