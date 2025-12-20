"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const PersistenceTipTapEditor = dynamic(
  () =>
    import("@/features/persistence-tip-tap-editor").then((mod) => ({
      default: mod.PersistenceTipTapEditor,
    })),
  { ssr: false }
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
  FileText,
  FloppyDisk,
  Database,
  Lightning,
} from "@phosphor-icons/react";

export default function PersistenceTipTapEditorPage() {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async (newContent: string) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setContent(newContent);
    setLastSaved(new Date());
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Test the editor&apos;s persistence and save functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Type some content in the editor below",
                "Content is automatically saved to localStorage (check DevTools)",
                "Click the 'Save' button to sync to database (simulated)",
                "Refresh the page - your content should persist",
                "Try editing and watch the 'Unsaved changes' indicator",
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
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Editor Example</CardTitle>
            </div>
            <CardDescription>
              Rich text editor with localStorage persistence and database sync
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PersistenceTipTapEditor
              content={content}
              onContentChange={setContent}
              onSave={handleSave}
              placeholder="Start writing your notes here... Use the toolbar above to format your text."
              storageKey="demo-tiptap-editor"
              persistenceType="localStorage"
              debounceMs={1000}
              autoSave={true}
              showToolbar={true}
              saveStatus={{
                hasUnsavedChanges: content !== "",
                lastSaved,
                isSaving,
              }}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
            <CardDescription>
              Key capabilities of the persistence TipTap editor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: FloppyDisk,
                  title: "Auto-Save",
                  description:
                    "Automatically saves content to localStorage with debouncing",
                },
                {
                  icon: Database,
                  title: "DB Sync",
                  description:
                    "Optional database synchronization via onSave callback",
                },
                {
                  icon: Lightning,
                  title: "Debounced",
                  description:
                    "Configurable debounce delay to prevent excessive saves",
                },
                {
                  icon: FileText,
                  title: "Rich Text",
                  description:
                    "Full-featured rich text editing with TipTap (when installed)",
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
