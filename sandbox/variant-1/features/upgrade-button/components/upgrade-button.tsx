"use client";

import React from "react";
import { CreditCard, Plus, Spinner } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UpgradeButtonProps } from "../types";

export function UpgradeButton({
  isSubscribed,
  isLoading = false,
  upgradeAction,
  onUpgrade,
  variant = "default",
  size = "default",
  className,
  showMessage = false,
  fullWidth = false,
  iconOnly = false,
  loadingText = "Loading...",
  subscribedText = "Manage Subscription",
  subscribedIcon: SubscribedIcon = CreditCard,
  upgradeIcon: UpgradeIcon = Plus,
}: UpgradeButtonProps) {
  const handleClick = async () => {
    await onUpgrade();
  };

  const defaultUpgradeAction = upgradeAction || {
    type: "upgrade" as const,
    buttonText: "Upgrade",
  };

  if (isLoading) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(className, fullWidth && "w-full")}
        type="button"
        disabled
      >
        {iconOnly ? (
          <Spinner className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Spinner className="h-4 w-4 mr-2 animate-spin" />
            {loadingText}
          </>
        )}
      </Button>
    );
  }

  if (isSubscribed) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(className, fullWidth && "w-full")}
        type="button"
        onClick={handleClick}
      >
        {iconOnly ? (
          <SubscribedIcon className="h-4 w-4" />
        ) : (
          <>
            <SubscribedIcon className="h-4 w-4 mr-2" />
            {subscribedText}
          </>
        )}
      </Button>
    );
  }

  return (
    <div className={cn(fullWidth && "w-full")}>
      {showMessage && !iconOnly && upgradeAction?.message && (
        <p className="text-sm text-muted-foreground mb-2">
          {upgradeAction.message}
        </p>
      )}
      <Button
        variant={variant}
        size={size}
        className={cn(className, fullWidth && "w-full")}
        type="button"
        onClick={handleClick}
      >
        {iconOnly ? (
          <UpgradeIcon className="h-4 w-4" />
        ) : (
          <>
            {defaultUpgradeAction.type === "start_trial" ? (
              <UpgradeIcon className="h-4 w-4 mr-2" />
            ) : (
              <SubscribedIcon className="h-4 w-4 mr-2" />
            )}
            {defaultUpgradeAction.buttonText}
          </>
        )}
      </Button>
    </div>
  );
}
