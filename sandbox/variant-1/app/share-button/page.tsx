"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Share,
  Sparkle,
  Code,
  Gear,
  Lightning,
  CursorClick,
  Globe,
} from "@phosphor-icons/react";
import { ShareButton } from "@/features/share-button/components/share-button";

export default function ShareButtonPage() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = "Feature Kit - Share Button";
  const shareDescription =
    "A beautiful share button with native Share API fallback and social media integration";

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Share className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Share Button</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Share Button
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A YouTube-style share button with native Share API fallback, copy
            link functionality, and social media integration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Sparkle className="h-3 w-3" />
              Native Share API
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Gear className="h-3 w-3" />
              Social Media
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Code className="h-3 w-3" />
              UTM Params
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Lightning className="h-3 w-3" />
              Copy Link
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Click the share button to open the share modal. Try different
                  share options including native share, copy link, and social
                  media platforms.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Click the share button to open the share modal",
                  "Try copying the link using the copy button",
                  "Test native share (if available on your device)",
                  "Share to social media platforms (Twitter, Facebook, LinkedIn)",
                  "Check that UTM parameters are added when enabled",
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
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Share className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Basic Examples</CardTitle>
              <CardDescription>
                Share buttons with different configurations
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Default Share</h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <p className="flex-1 text-sm text-muted-foreground">
                    Share this page
                  </p>
                  <ShareButton url={shareUrl} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  With Title and Description
                </h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{shareTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {shareDescription}
                    </p>
                  </div>
                  <ShareButton
                    url={shareUrl}
                    title={shareTitle}
                    description={shareDescription}
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  With UTM Parameters
                </h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <p className="flex-1 text-sm text-muted-foreground">
                    Share with tracking parameters
                  </p>
                  <ShareButton
                    url={shareUrl}
                    title={shareTitle}
                    withUtmParams={true}
                    utmSource="feature-kit"
                    utmMedium="share-button"
                    utmCampaign="demo"
                  />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Different Variants
                </h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <ShareButton url={shareUrl} variant="default" />
                  <ShareButton url={shareUrl} variant="outline" />
                  <ShareButton url={shareUrl} variant="ghost" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Different Sizes</h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <ShareButton url={shareUrl} size="sm" />
                  <ShareButton url={shareUrl} size="default" />
                  <ShareButton url={shareUrl} size="lg" />
                  <ShareButton url={shareUrl} size="icon" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Share,
                  title: "Native Share API",
                  description:
                    "Uses native Share API when available, with fallback to custom modal",
                },
                {
                  icon: Globe,
                  title: "Social Media Integration",
                  description:
                    "Share to Twitter, Facebook, and LinkedIn with pre-filled content",
                },
                {
                  icon: Code,
                  title: "UTM Parameters",
                  description:
                    "Optional UTM parameter support for tracking share sources",
                },
                {
                  icon: Gear,
                  title: "Copy Link",
                  description:
                    "Built-in copy-to-clipboard functionality with visual feedback",
                },
              ].map((feature, index) => (
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
