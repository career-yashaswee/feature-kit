"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const PersistenceTipTapEditor = dynamic(
  () =>
    import("@/features/persistence-tip-tap-editor").then((mod) => ({
      default: mod.PersistenceTipTapEditor,
    })),
  { ssr: false },
);
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  FileText,
  FloppyDisk,
  Database,
  Lightning,
  CursorClick,
} from "@phosphor-icons/react";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

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
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/persistence-tip-tap-editor",
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
          return (
            <HowToTestCard
              steps={[
                "Type some content in the editor below",
                "Content is automatically saved to localStorage (check DevTools)",
                "Click the 'Save' button to sync to database (simulated)",
                "Refresh the page - your content should persist",
                "Try editing and watch the 'Unsaved changes' indicator",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <BaseCard>
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
        </BaseCard>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/persistence-tip-tap-editor",
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: <FloppyDisk className="h-5 w-5 text-primary" />,
              title: "Auto-Save",
              description:
                "Automatically saves content to localStorage with debouncing",
            },
            {
              icon: <Database className="h-5 w-5 text-primary" />,
              title: "DB Sync",
              description:
                "Optional database synchronization via onSave callback",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Debounced",
              description:
                "Configurable debounce delay to prevent excessive saves",
            },
            {
              icon: <FileText className="h-5 w-5 text-primary" />,
              title: "Rich Text",
              description:
                "Full-featured rich text editing with TipTap (when installed)",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
