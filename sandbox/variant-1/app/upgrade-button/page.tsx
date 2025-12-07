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
import { ArrowUp, Zap, CreditCard } from "lucide-react";
import { UpgradeButton } from "@/features/upgrade-button/components/upgrade-button";
import type { UpgradeAction } from "@/features/upgrade-button/types";

const features = [
  {
    title: "Smart State Management",
    description:
      "Automatically shows appropriate button based on subscription status",
    icon: CreditCard,
  },
  {
    title: "Configurable Actions",
    description: "Support for trial, upgrade, and manage subscription actions",
    icon: ArrowUp,
  },
  {
    title: "Flexible Styling",
    description: "Multiple variants, sizes, and icon-only mode",
    icon: Zap,
  },
];

export default function UpgradeButtonPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const handleManage = async () => {
    console.log("Navigate to billing page");
  };

  const upgradeAction: UpgradeAction = {
    type: "start_trial",
    buttonText: "Start Free Trial",
    message: "Upgrade to unlock premium features",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <ArrowUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Upgrade Button</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Upgrade Button
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A smart button component that adapts its appearance and behavior
            based on subscription status with configurable actions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <CreditCard className="h-3 w-3" />
              Subscription
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Zap className="h-3 w-3" />
              Smart
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Upgrade Button component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the upgrade button to see the loading state",
                "After loading, the button changes to 'Manage Subscription'",
                "Toggle the subscription status to see different button states",
                "Try different variants and sizes in the examples below",
                "Test the icon-only mode and full-width option",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different button states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="px-4 py-2 border rounded-md hover:bg-muted text-sm"
              >
                Toggle Subscription
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Not Subscribed:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={isLoading}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                  showMessage
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Subscribed:</p>
                <UpgradeButton isSubscribed={true} onUpgrade={handleManage} />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <UpgradeButton
                  isSubscribed={false}
                  isLoading={true}
                  upgradeAction={upgradeAction}
                  onUpgrade={handleUpgrade}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Variants</CardTitle>
            </div>
            <CardDescription>
              Upgrade button available in different button variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="default"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="outline"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="secondary"
              />
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                variant="ghost"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ArrowUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Icon Only & Full Width</CardTitle>
            </div>
            <CardDescription>
              Icon-only mode and full-width button options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Icon Only:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                iconOnly
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Full Width:</p>
              <UpgradeButton
                isSubscribed={false}
                upgradeAction={upgradeAction}
                onUpgrade={handleUpgrade}
                fullWidth
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
