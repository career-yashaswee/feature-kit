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
  FileText,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
} from "lucide-react";
import { TextTruncation } from "@/features/text-truncation/components/text-truncation";

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

const veryLongText =
  "This is a very long text that demonstrates the text truncation feature. It can truncate text based on either the number of lines or the maximum character length. When text is truncated, a 'Show more' button appears, allowing users to expand and see the full content. When expanded, a 'Show less' button appears to collapse it back. The component automatically detects whether truncation is needed and only shows the toggle button when necessary. This makes it perfect for displaying long descriptions, comments, or any text content that might be too long for the available space. The component is fully customizable with props for maxLines, maxLength, expandLabel, collapseLabel, and more.";

export default function TextTruncationPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Text Truncation</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Text Truncation
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Intelligently truncate long text with expand/collapse functionality.
            Supports both line-based and character-based truncation with
            automatic detection.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Sparkles className="h-3 w-3" />
              Auto Detection
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Settings className="h-3 w-3" />
              Customizable
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Zap className="h-3 w-3" />
              Zero Config
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">How to Test</CardTitle>
                <CardDescription className="text-base">
                  Scroll down to see different truncation examples. Click
                  &quot;Show more&quot; to expand and &quot;Show less&quot; to
                  collapse.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Scroll down to see different truncation examples",
                  "Click 'Show more' to expand truncated text",
                  "Click 'Show less' to collapse expanded text",
                  "Notice how the toggle button only appears when truncation is needed",
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
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Line-Based Truncation</CardTitle>
              <CardDescription>
                Truncate text to a specific number of lines
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">2 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={2} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">3 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={3} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">4 Lines</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={longText} maxLines={4} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">
                Character-Based Truncation
              </CardTitle>
              <CardDescription>
                Truncate text to a specific character length
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">100 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={100} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">150 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={150} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">200 Characters</h3>
                <div className="rounded-lg border bg-card p-4">
                  <TextTruncation text={veryLongText} maxLength={200} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Custom Labels</CardTitle>
              <CardDescription>
                Customize the expand and collapse button labels
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-card p-4">
              <TextTruncation
                text={veryLongText}
                maxLines={2}
                expandLabel="Read more"
                collapseLabel="Read less"
              />
            </div>
          </CardContent>
        </Card>

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
                  icon: FileText,
                  title: "Line-Based Truncation",
                  description:
                    "Truncate text to a specific number of lines using CSS line-clamp",
                },
                {
                  icon: Code,
                  title: "Character-Based Truncation",
                  description:
                    "Truncate text to a specific character length with ellipsis",
                },
                {
                  icon: Sparkles,
                  title: "Auto Detection",
                  description:
                    "Automatically detects if truncation is needed and only shows toggle when necessary",
                },
                {
                  icon: Settings,
                  title: "Customizable",
                  description:
                    "Customize labels, styling, and toggle button visibility",
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
