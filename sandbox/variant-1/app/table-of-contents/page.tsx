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
import {
  List,
  MousePointerClick,
  FileText,
  Sparkles,
  Code,
  Settings,
  Zap,
} from "lucide-react";
import { TableOfContents } from "@/features/table-of-contents/components/table-of-contents";
import { useTableOfContents } from "@/features/table-of-contents/hooks/use-table-of-contents";
import ReactMarkdown from "react-markdown";

const sampleMarkdown = `# Introduction

This is a sample markdown document to demonstrate the Table of Contents feature.

## Getting Started

To get started with this feature, you need to understand the basics.

### Installation

First, install the required package.

### Configuration

Then configure it according to your needs.

## Features

The Table of Contents feature provides several benefits.

### Automatic Generation

It automatically generates a table of contents from your markdown headings.

### Active Section Highlighting

It highlights the currently active section as you scroll.

### Smooth Scrolling

Clicking on a TOC item smoothly scrolls to that section.

## Advanced Usage

For advanced usage, you can customize the behavior.

### Custom Styling

You can style the TOC to match your design.

### Filtering Headings

You can filter which headings appear in the TOC.

## Conclusion

This feature makes it easy to navigate long markdown documents.`;

export default function TableOfContentsPage() {
  const tocItems = useTableOfContents(sampleMarkdown);

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <List className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Markdown Navigation</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Table of Contents
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Automatically generate a table of contents from markdown content
            with active section highlighting and smooth scrolling navigation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <FileText className="h-3 w-3" />
              Markdown
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Sparkles className="h-3 w-3" />
              Auto-Generated
            </Badge>
            <Badge
              variant="default"
              className="gap-1.5 bg-secondary/80 dark:bg-secondary/60"
            >
              <Code className="h-3 w-3" />
              TypeScript
            </Badge>
          </div>
        </section>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <MousePointerClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Scroll through the markdown content and watch the table of
              contents highlight the active section. Click on any TOC item to
              smoothly scroll to that section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Scroll down through the markdown content below",
                "Watch the table of contents highlight the active section",
                "Click on any item in the table of contents to scroll to that section",
                "Notice the smooth scrolling animation when clicking TOC items",
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

        {/* Demo Content Section */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Markdown Content</CardTitle>
              </div>
              <CardDescription>
                Sample markdown content with headings that generate the table of
                contents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => {
                      const text = props.children?.toString() || "";
                      const id = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")
                        .trim();
                      return (
                        <h1 id={id} className="scroll-mt-24" {...props} />
                      );
                    },
                    h2: ({ node, ...props }) => {
                      const text = props.children?.toString() || "";
                      const id = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")
                        .trim();
                      return (
                        <h2 id={id} className="scroll-mt-24" {...props} />
                      );
                    },
                    h3: ({ node, ...props }) => {
                      const text = props.children?.toString() || "";
                      const id = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")
                        .trim();
                      return (
                        <h3 id={id} className="scroll-mt-24" {...props} />
                      );
                    },
                  }}
                >
                  {sampleMarkdown}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <div className="order-first lg:order-last">
            {tocItems.length > 0 ? (
              <Card className="border-2 shadow-lg lg:border-0 lg:shadow-none lg:bg-transparent">
                <CardContent className="p-0">
                  <TableOfContents items={tocItems} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    No headings found in markdown content.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
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
                  title: "Automatic Generation",
                  description:
                    "Automatically generates table of contents from markdown headings using markdown-toc",
                },
                {
                  icon: Sparkles,
                  title: "Active Highlighting",
                  description:
                    "Highlights the currently active section as you scroll through the content",
                },
                {
                  icon: Settings,
                  title: "Smooth Scrolling",
                  description:
                    "Smooth scroll animation when clicking TOC items with proper offset",
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
      </main>
    </div>
  );
}

