"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { FloppyDisk, Spinner } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PersistenceTipTapEditorProps } from "../types";

// Note: TipTap packages need to be installed:
// npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
// For this component to work, you'll need to install TipTap and create a basic editor wrapper
// This is a placeholder implementation that shows the structure

export function PersistenceTipTapEditor({
  content: propContent,
  onContentChange,
  onSave,
  placeholder = "Start writing...",
  saveStatus: propSaveStatus,
  storageKey,
  persistenceType = "localStorage",
  debounceMs = 1000,
  className,
  autoSave = true,
  showToolbar = true,
  editable = true,
}: PersistenceTipTapEditorProps) {
  const [localContent, setLocalContent] = useLocalStorage<string>(
    storageKey || "tiptap-editor-content",
    "",
  );
  const [content, setContent] = useState(propContent || localContent || "");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [debouncedContent] = useDebouncedValue(content, { wait: debounceMs });
  const previousContentRef = useRef<string>(content);

  // Initialize content from prop or storage
  useEffect(() => {
    if (propContent !== undefined) {
      setContent(propContent);
      previousContentRef.current = propContent;
    } else if (localContent) {
      setContent(localContent);
      previousContentRef.current = localContent;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (storageKey && persistenceType === "localStorage") {
      setLocalContent(newContent);
    }
    onContentChange?.(newContent);
    setHasUnsavedChanges(newContent !== previousContentRef.current);
  };

  // Auto-save to localStorage
  useEffect(() => {
    if (autoSave && storageKey && persistenceType === "localStorage") {
      setLocalContent(debouncedContent);
    }
  }, [
    debouncedContent,
    autoSave,
    storageKey,
    persistenceType,
    setLocalContent,
  ]);

  // Auto-save to DB if onSave is provided
  useEffect(() => {
    if (
      autoSave &&
      onSave &&
      debouncedContent &&
      debouncedContent !== previousContentRef.current
    ) {
      const saveToDb = async () => {
        setIsSaving(true);
        try {
          await onSave(debouncedContent);
          setLastSaved(new Date());
          setHasUnsavedChanges(false);
          previousContentRef.current = debouncedContent;
        } catch (error) {
          console.error("Failed to save:", error);
          toast.error("Failed to save content");
        } finally {
          setIsSaving(false);
        }
      };

      saveToDb();
    }
  }, [debouncedContent, autoSave, onSave]);

  // Manual save handler
  const handleManualSave = async () => {
    if (!onSave) return;

    setIsSaving(true);
    try {
      await onSave(content);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      previousContentRef.current = content;
      toast.success("Content saved successfully");
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const saveStatus: typeof propSaveStatus = propSaveStatus || {
    hasUnsavedChanges,
    lastSaved,
    isSaving,
  };

  // For now, return a placeholder until TipTap is installed
  // In production, this would render the actual TipTap editor
  return (
    <div className={cn("space-y-3", className)}>
      {showToolbar && (
        <div className="flex items-center justify-between p-2 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            {saveStatus.isSaving && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner size={16} className="animate-spin" />
                <span>Saving</span>
              </div>
            )}
            {saveStatus.lastSaved && !saveStatus.isSaving && (
              <div className="text-xs text-muted-foreground">
                Last saved: {saveStatus.lastSaved.toLocaleTimeString()}
              </div>
            )}
            {saveStatus.hasUnsavedChanges && !saveStatus.isSaving && (
              <div className="text-xs text-orange-500">Unsaved changes</div>
            )}
          </div>
          {onSave && (
            <Button
              size="sm"
              onClick={handleManualSave}
              disabled={saveStatus.isSaving || !saveStatus.hasUnsavedChanges}
            >
              <FloppyDisk size={16} className="mr-2" />
              Save
            </Button>
          )}
        </div>
      )}

      <div className="w-full min-h-[200px] rounded-md border bg-background p-4">
        <div className="text-sm text-muted-foreground mb-4">
          <p className="font-semibold mb-2">TipTap Editor Placeholder</p>
          <p>To use this component, install TipTap packages:</p>
          <code className="block mt-2 p-2 bg-muted rounded text-xs">
            npm install @tiptap/react @tiptap/starter-kit
            @tiptap/extension-placeholder
          </code>
          <p className="mt-4">The editor will support:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>LocalStorage persistence (automatic)</li>
            <li>Zustand/TanStack Store persistence (configurable)</li>
            <li>Database sync via onSave callback</li>
            <li>Auto-save with debouncing</li>
            <li>Manual save button</li>
          </ul>
        </div>

        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[200px] p-3 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!editable}
        />
      </div>
    </div>
  );
}
