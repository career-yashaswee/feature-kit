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
import { Crown, Sparkles, Zap } from "@phosphor-icons/react";
import { SubscriptionIdentifier } from "@/features/subscription-identifier/components/subscription-identifier";

const features = [
  {
    title: "Subscription Status",
    description: "Visual indicator for subscription status with elegant styling",
    icon: Crown,
  },
  {
    title: "Multiple Variants",
    description: "Outline and solid variants with different styling options",
    icon: Sparkles,
  },
  {
    title: "Flexible Props",
    description: "Accepts subscription status as prop or from store",
    icon: Zap,
  },
];

export default function SubscriptionIdentifierPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSubscription = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(!isSubscribed);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Crown size={16} className="text-primary" />
            <span className="text-sm font-medium">Subscription Identifier</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Subscription Identifier
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A badge component that displays subscription status with elegant
            styling and multiple variants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Crown size={12} />
              Subscription
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Sparkles size={12} />
              Badge
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Subscription Identifier component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Observe the different styles for subscribed vs non-subscribed states",
                "Click the toggle button to switch between states",
                "Try different sizes (sm, md, lg) and variants (outline, solid)",
                "Notice the loading state when toggling",
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
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Interactive Demo</CardTitle>
            </div>
            <CardDescription>
              Toggle subscription status to see different badge styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSubscription}
                disabled={isLoading}
                className="px-4 py-2 border rounded-md hover:bg-muted disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Toggle Subscription"}
              </button>
              <span className="text-sm text-muted-foreground">
                Status: {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Loading State:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  isLoading={true}
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Outline - Not Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Outline - Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="outline"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Solid - Not Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={false}
                  variant="solid"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Solid - Subscribed:</p>
                <SubscriptionIdentifier
                  isUserSubscribed={true}
                  variant="solid"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Crown size={20} className="text-primary" />
              </div>
              <CardTitle className="text-2xl">Size Variants</CardTitle>
            </div>
            <CardDescription>
              Subscription identifier available in different sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Small:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Medium:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="md"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm w-20">Large:</span>
                <SubscriptionIdentifier
                  isUserSubscribed={isSubscribed}
                  size="lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Zap size={20} className="text-primary" />
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
                    <feature.icon size={20} className="text-primary" />
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

