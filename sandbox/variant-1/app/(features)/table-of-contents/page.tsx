"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import slugify from "slugify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  List,
  CursorClick,
  FileText,
  Sparkle,
  Code,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import { TableOfContents } from "@/features/table-of-contents/components/table-of-contents";
import { useTableOfContents } from "@/features/table-of-contents/hooks/use-table-of-contents";
import type { TocItem } from "@/features/table-of-contents/hooks/use-table-of-contents";

const PersistenceTipTapEditor = dynamic(
  () =>
    import("@/features/persistence-tip-tap-editor").then(
      (mod) => mod.PersistenceTipTapEditor
    ),
  { ssr: false }
);

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

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

// Helper function to parse HTML and extract headings
function parseHtmlToTocItems(html: string): TocItem[] {
  if (!html || typeof window === "undefined") return [];

  try {
    // Create a temporary DOM element to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = [];
    const seenCounts: Record<string, number> = {};

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const content = heading.textContent?.trim() || "";
      if (!content) return;

      // Generate slug
      const baseSlug = slugify(content, {
        lower: true,
        strict: true,
        trim: true,
      });

      // Handle duplicate slugs
      const count = seenCounts[baseSlug] || 0;
      seenCounts[baseSlug] = count + 1;
      const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

      // Set ID on the heading element for scrolling
      heading.id = slug;

      tocItems.push({
        content,
        slug,
        lvl: level,
        i: tocItems.length,
        seen: count,
      });
    });

    return tocItems;
  } catch (error) {
    console.error("Error parsing HTML to TOC:", error);
    return [];
  }
}

// Helper function to convert markdown to HTML with heading IDs
function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  const lines = markdown.split("\n");
  const htmlLines: string[] = [];
  const seenCounts: Record<string, number> = {};

  lines.forEach((line) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const content = match[2].trim();
      const baseSlug = slugify(content, {
        lower: true,
        strict: true,
        trim: true,
      });

      const count = seenCounts[baseSlug] || 0;
      seenCounts[baseSlug] = count + 1;
      const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

      htmlLines.push(
        `<h${level} id="${slug}" class="scroll-mt-24">${content}</h${level}>`
      );
    } else {
      htmlLines.push(line);
    }
  });

  return htmlLines.join("\n");
}

export default function TableOfContentsPage() {
  const [editorContent, setEditorContent] = useState(sampleMarkdown);

  // Convert markdown to HTML for display
  const htmlContent = useMemo(
    () => markdownToHtml(editorContent),
    [editorContent]
  );

  // Parse content to get TOC items - try HTML first, then markdown
  const tocItemsFromHtml = useMemo(
    () => parseHtmlToTocItems(editorContent),
    [editorContent]
  );
  const tocItemsFromMarkdown = useTableOfContents(editorContent);

  // Use HTML TOC if available, otherwise use markdown TOC
  const tocItems =
    tocItemsFromHtml.length > 0 ? tocItemsFromHtml : tocItemsFromMarkdown;

  // Ensure rendered HTML has proper heading IDs for scrolling
  const renderedHtmlWithIds = useMemo(() => {
    if (!htmlContent || typeof window === "undefined") return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading) => {
      const content = heading.textContent?.trim() || "";
      const tocItem = tocItems.find((item) => item.content === content);
      if (tocItem) {
        heading.id = tocItem.slug;
        heading.className = "scroll-mt-24";
      }
    });

    return doc.body.innerHTML;
  }, [htmlContent, tocItems]);
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
  ]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean
  ) => {
    setProps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value: newValue,
      };
      return updated;
    });
  };

  const getComponentProps = () => {
    const componentProps: {
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Live Demo */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              Edit the markdown content in the editor below to see the table of
              contents update dynamically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tocItems.length > 0 ? (
              <TableOfContents items={tocItems} {...getComponentProps()} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No headings found in markdown content.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Props API Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Props API</CardTitle>
            </div>
            <CardDescription>
              Interact with the table below to customize the component styling.
              The TOC items are automatically generated from the editor content
              above.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Property</TableHead>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[200px]">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop, index) => (
                  <TableRow key={prop.property}>
                    <TableCell className="font-medium font-mono text-sm">
                      {prop.property}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {prop.description}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={String(prop.value)}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        placeholder={`Enter ${prop.property}`}
                        className="h-8"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Edit the markdown content in the editor and watch the table of
              contents update dynamically. Scroll through the preview to see
              active section highlighting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Edit the markdown content in the TipTap editor above",
                "Add headings using # for H1, ## for H2, ### for H3, etc.",
                "Watch the table of contents update automatically as you type",
                "Scroll through the preview content below",
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
                <CardTitle className="text-2xl">Editable Content</CardTitle>
              </div>
              <CardDescription>
                Edit the markdown content below. The table of contents will
                update automatically as you add or modify headings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PersistenceTipTapEditor
                content={editorContent}
                onContentChange={(content) => {
                  setEditorContent(content);
                }}
                placeholder="Start writing markdown with headings (e.g., # Heading 1, ## Heading 2)..."
                storageKey="table-of-contents-editor"
                autoSave={true}
                showToolbar={true}
                editable={true}
              />

              {/* Rendered Preview */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold mb-4">Preview:</h3>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderedHtmlWithIds }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="order-first lg:order-last">
            {tocItems.length > 0 ? (
              <Card className="border-2 shadow-lg lg:border-0 lg:shadow-none lg:bg-transparent">
                <CardContent className="p-0">
                  <TableOfContents items={tocItems} {...getComponentProps()} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    No headings found. Add headings (e.g., # Heading) to
                    generate the table of contents.
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
                <Sparkle className="h-5 w-5 text-primary" />
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
                  icon: Sparkle,
                  title: "Active Highlighting",
                  description:
                    "Highlights the currently active section as you scroll through the content",
                },
                {
                  icon: Gear,
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
