"use client";

import dynamic from "next/dynamic";

const ScrollToTopButton = dynamic(
  () =>
    import("@/features/scroll-to-top/components/scroll-to-top-button").then(
      (mod) => ({
        default: mod.ScrollToTopButton,
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
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  MousePointerClick,
  Scroll,
  Sparkles,
  Code,
  Settings,
  Zap,
} from "lucide-react";

export default function ScrollToTopPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <ArrowUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Scroll Navigation</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Scroll To Top Button
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A beautiful, smooth scroll-to-top button that elegantly appears
            after you scroll down and takes you back to the top with a
            delightful animation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Sparkles className="h-3 w-3" />
              Smooth Animation
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Settings className="h-3 w-3" />
              Customizable
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge variant="default" className="gap-1.5 demo-badge">
              <Zap className="h-3 w-3" />
              Zero Config
            </Badge>
          </div>
        </section>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Try scrolling down to see the button appear and click it to
                  smoothly return to the top
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Scroll down the page until you see the button appear",
                  "Watch the smooth fade-in animation as it appears",
                  "Click the button to smoothly scroll back to the top",
                  "Try scrolling from different positions to see it in action",
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
            <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">
                The scroll-to-top button will appear in the center-bottom of the
                screen after you scroll down 100px. Keep scrolling to see more
                demo content!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Scroll,
                  title: "Smooth Scrolling",
                  description:
                    "Butter-smooth scroll animation that provides a delightful user experience",
                },
                {
                  icon: Sparkles,
                  title: "Elegant Animation",
                  description:
                    "Beautiful fade-in/fade-out animations with framer-motion",
                },
                {
                  icon: Settings,
                  title: "Customizable",
                  description:
                    "Adjust threshold, position, and styling to match your design",
                },
                {
                  icon: Code,
                  title: "TypeScript Support",
                  description:
                    "Fully typed with TypeScript for better developer experience",
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

        {/* Demo Content Section */}
        <section className="space-y-6">
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scroll className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Demo Content</CardTitle>
              </div>
              <CardDescription>
                Scroll down to see the scroll-to-top button appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from({ length: 15 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 px-3 py-1">
                        <span className="text-xs font-semibold text-primary">
                          Section {index + 1}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      This is demo content block {index + 1}. Scroll further
                      down to see the scroll-to-top button appear in the
                      bottom-center of the screen. The button will smoothly fade
                      in once you&apos;ve scrolled past the threshold.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-md bg-muted/50" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <ScrollToTopButton threshold={100} position="center">
        <ArrowUp className="h-4 w-4" />
      </ScrollToTopButton>
    </div>
  );
}
