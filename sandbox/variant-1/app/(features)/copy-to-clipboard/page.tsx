"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Code,
  Gear,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { CopyToClipboard } from "@/features/copy-to-clipboard/components/copy-to-clipboard";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { CopyToClipboardProps } from "@/features/copy-to-clipboard/types";

const PersistenceTipTapEditor = dynamic(
  () => import("@/features/persistence-tip-tap-editor").then((mod) => mod.PersistenceTipTapEditor),
  { ssr: false }
);
import { Textarea } from "@/components/ui/textarea";

const sampleText = "Hello, World! This is sample text to copy.";
const codeSnippet = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

const htmlContent = `<div>
  <h1>Hello World</h1>
  <p>This is HTML content</p>
</div>`;

export default function CopyToClipboardPage() {
  const [htmlText, setHtmlText] = useState(htmlContent);
  const [htmlFromEditor, setHtmlFromEditor] = useState("");

  const initialConfig: PropConfig[] = [
    {
      property: "text",
      type: "string",
      description: "Text content to copy to clipboard",
      defaultValue: "Hello, World!",
      value: "Hello, World!",
      inputType: "text",
    },
    {
      property: "variant",
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      description: "Visual variant of the button",
      defaultValue: "outline",
      value: "outline",
      inputType: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      transform: (value) => value as CopyToClipboardProps["variant"],
    },
    {
      property: "size",
      type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
      description: "Size of the button",
      defaultValue: "sm",
      value: "sm",
      inputType: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      transform: (value) => value as CopyToClipboardProps["size"],
    },
    {
      property: "label",
      type: "string",
      description: "Optional label text to display on the button",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
    {
      property: "showIcon",
      type: "boolean",
      description: "Whether to show the copy icon",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "successMessage",
      type: "string",
      description: "Message to show on successful copy",
      defaultValue: "Copied to clipboard!",
      value: "Copied to clipboard!",
      inputType: "text",
    },
    {
      property: "errorMessage",
      type: "string",
      description: "Message to show on copy error",
      defaultValue: "Failed to copy",
      value: "Failed to copy",
      inputType: "text",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof CopyToClipboardProps> = {
    text: "text",
    variant: "variant",
    size: "size",
    label: "label",
    showIcon: "showIcon",
    successMessage: "successMessage",
    errorMessage: "errorMessage",
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<CopyToClipboardProps>({
      initialConfig,
      propMap,
    });

  return (
    <>
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
            See the component update in real-time as you change props below.
            Note: Complex props like `html`, `onCopy`, and `onError` are not editable here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center rounded-lg border bg-card p-8">
              <CopyToClipboard
                text={getComponentProps.text || "Hello, World!"}
                {...getComponentProps}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">HTML Content (Textarea):</label>
              <Textarea
                value={htmlText}
                onChange={(e) => setHtmlText(e.target.value)}
                placeholder="Enter HTML content..."
                className="min-h-[100px] font-mono text-sm"
              />
              <div className="flex items-center gap-2">
                <CopyToClipboard text={htmlText} html={htmlText} label="Copy HTML" />
                <span className="text-xs text-muted-foreground">
                  {htmlText.length} characters
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">HTML Content (TipTap Editor):</label>
              <PersistenceTipTapEditor
                content={htmlFromEditor}
                onContentChange={(content) => setHtmlFromEditor(content)}
                placeholder="Enter HTML content using the rich text editor..."
                storageKey="copy-to-clipboard-html-editor"
                autoSave={false}
                showToolbar={true}
              />
              <div className="flex items-center gap-2">
                <CopyToClipboard text={htmlFromEditor} html={htmlFromEditor} label="Copy HTML from Editor" />
                <span className="text-xs text-muted-foreground">
                  {htmlFromEditor.length} characters
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Props API Card */}
      <PropsApiCard
        props={props}
        onValueChange={handleValueChange}
        description="Interact with the table below to customize the component in real-time. Note: Complex props like `html`, `onCopy`, and `onError` are not editable here."
      />

      {(() => {
        const featureData = featuresData.find(
          (f) => f.path === "/copy-to-clipboard"
        );
        if (featureData?.howToTest) {
          return (
            <HowToTestCard
              steps={featureData.howToTest.steps}
              conclusion={featureData.howToTest.conclusion}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        }
        return null;
      })()}

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
                <Gear className="h-5 w-5 text-primary" />
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

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/copy-to-clipboard"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          return null;
        })()}
    </>
  );
}
