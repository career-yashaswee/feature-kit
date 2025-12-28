"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { ReportPayload } from "../types";

export interface UseReportButtonOptions {
  featureId: string;
  variantId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useReportButton({
  featureId,
  variantId,
  onSuccess,
  onError,
}: UseReportButtonOptions) {
  const queryClient = useQueryClient();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customIssue, setCustomIssue] = useState("");
  const [description, setDescription] = useState("");
  const [pageContext] = useState<{
    path?: string;
    url?: string;
  }>(() => {
    if (typeof window !== "undefined") {
      return {
        path: window.location.pathname,
        url: window.location.href,
      };
    }
    return {};
  });

  const resetForm = useCallback(() => {
    setSelectedIssues([]);
    setCustomIssue("");
    setDescription("");
  }, []);

  const handleIssueToggle = useCallback((issueId: string, checked: boolean) => {
    setSelectedIssues((prev) => {
      if (checked) {
        if (prev.includes(issueId)) return prev;
        return [...prev, issueId];
      }
      const newIssues = prev.filter((item) => item !== issueId);
      if (issueId === "OTHER") {
        setCustomIssue("");
      }
      return newIssues;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const trimmedCustom = customIssue.trim();
    const trimmedDescription = description.trim();
    const reportIssues = selectedIssues;

    if (reportIssues.length === 0 && !trimmedCustom && !trimmedDescription) {
      toast.warning("Add a report", {
        description:
          "Select an issue or add a short note so we know what to fix.",
        duration: 3000,
      });
      throw new Error("Please select an issue or add a note");
    }

    const payload: ReportPayload = {
      issues: reportIssues,
      customIssue: trimmedCustom || undefined,
      description: trimmedDescription || undefined,
      context: pageContext,
    };

    // Combine issues, customIssue, and description into a single issue_text
    const parts: string[] = [];

    if (payload.issues && payload.issues.length > 0) {
      parts.push(`Selected issues: ${payload.issues.join(", ")}`);
    }

    if (payload.customIssue) {
      parts.push(`Custom issue: ${payload.customIssue}`);
    }

    if (payload.description) {
      parts.push(`Details: ${payload.description}`);
    }

    if (payload.context) {
      const contextParts: string[] = [];
      if (payload.context.path) {
        contextParts.push(`Path: ${payload.context.path}`);
      }
      if (payload.context.url) {
        contextParts.push(`URL: ${payload.context.url}`);
      }
      if (contextParts.length > 0) {
        parts.push(`Context: ${contextParts.join(", ")}`);
      }
    }

    const issueText = parts.join("\n\n");

    const { error } = await getSupabaseClient().from("issues").insert({
      feature_id: featureId,
      variant_id: variantId,
      issue_text: issueText,
    });

    if (error) {
      const errorMessage = error.message || "Please try again in a moment.";
      toast.error("Unable to submit report", {
        description: errorMessage,
        duration: 3500,
      });
      onError?.(error);
      throw error;
    }

    toast.success("Report submitted", {
      description:
        "Thanks for the feedback. Our team will review this shortly.",
      duration: 3500,
    });
    resetForm();
    queryClient.invalidateQueries({ queryKey: ["issues"] });
    onSuccess?.();
  }, [customIssue, description, selectedIssues, pageContext, featureId, variantId, resetForm, queryClient, onSuccess, onError]);

  const isSubmitDisabled =
    selectedIssues.length === 0 &&
    customIssue.trim().length === 0 &&
    description.trim().length === 0;

  return {
    selectedIssues,
    customIssue,
    description,
    setCustomIssue,
    setDescription,
    handleIssueToggle,
    handleSubmit,
    resetForm,
    isSubmitDisabled,
  };
}

