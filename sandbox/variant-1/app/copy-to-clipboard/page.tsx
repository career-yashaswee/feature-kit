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
  Copy,
  Sparkles,
  Code,
  Settings,
  Zap,
  MousePointerClick,
} from "lucide-react";
import { CopyToClipboard } from "@/features/copy-to-clipboard/components/copy-to-clipboard";

const sampleText = "Hello, World! This is sample text to copy.";
const codeSnippet = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

const htmlContent = `<div>
  <h1>Hello World</h1>
  <p>This is HTML content</p>
</div>`;

export default function CopyToClipboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Copy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Copy to Clipboard</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Copy to Clipboard
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A beautiful copy-to-clipboard button with smooth animations, toast
            notifications, and support for both plain text and HTML content.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground"
            >
              <Sparkles className="h-3 w-3" />
              Smooth Animations
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
              Toast Notifications
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
                  Click any of the copy buttons below to copy text to your
                  clipboard. Watch for the smooth animation and toast
                  notification.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Testing Steps:</h3>
              <ol className="space-y-3">
                {[
                  "Click any copy button to copy text to clipboard",
                  "Watch the icon animate from copy to checkmark",
                  "See the toast notification confirming the copy",
                  "Paste the copied text somewhere to verify it worked",
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
                <Copy className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Basic Examples</CardTitle>
              <CardDescription>
                Simple copy buttons with different variants and sizes
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Plain Text</h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <code className="flex-1 text-sm text-muted-foreground">
                    {sampleText}
                  </code>
                  <CopyToClipboard text={sampleText} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">With Label</h3>
                <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
                  <code className="flex-1 text-sm text-muted-foreground">
                    {sampleText}
                  </code>
                  <CopyToClipboard text={sampleText} label="Copy" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Different Variants
                </h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <CopyToClipboard text={sampleText} variant="default" />
                  <CopyToClipboard text={sampleText} variant="outline" />
                  <CopyToClipboard text={sampleText} variant="secondary" />
                  <CopyToClipboard text={sampleText} variant="ghost" />
                  <CopyToClipboard text={sampleText} variant="destructive" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Different Sizes</h3>
                <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                  <CopyToClipboard text={sampleText} size="sm" />
                  <CopyToClipboard text={sampleText} size="default" />
                  <CopyToClipboard text={sampleText} size="lg" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Code Snippets</CardTitle>
              <CardDescription>
                Copy code snippets with syntax highlighting preserved
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute right-2 top-2">
                  <CopyToClipboard text={codeSnippet} />
                </div>
                <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
                  <code>{codeSnippet}</code>
                </pre>
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
              <CardTitle className="text-2xl">HTML Content</CardTitle>
              <CardDescription>
                Copy both plain text and HTML formats simultaneously
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    HTML content with both text and HTML formats
                  </p>
                  <CopyToClipboard
                    text={htmlContent}
                    html={htmlContent}
                    label="Copy HTML"
                  />
                </div>
                <div
                  className="rounded-md border bg-muted/50 p-3"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
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
                  icon: Copy,
                  title: "Smooth Animations",
                  description:
                    "Beautiful icon transition from copy to checkmark using framer-motion",
                },
                {
                  icon: Zap,
                  title: "Toast Notifications",
                  description:
                    "Built-in toast notifications for success and error states",
                },
                {
                  icon: Code,
                  title: "HTML Support",
                  description:
                    "Support for copying both plain text and HTML content",
                },
                {
                  icon: Settings,
                  title: "Customizable",
                  description:
                    "Custom labels, messages, feedback duration, and styling",
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
