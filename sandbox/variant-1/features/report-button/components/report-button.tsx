"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Flag, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export interface ReportIssue {
  id: string;
  label: string;
  description: string;
}

export interface ReportButtonProps {
  reportId: string;
  reportTitle: string;
  issues: ReportIssue[];
  onSubmit: (payload: ReportPayload) => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export interface ReportPayload {
  issues: string[];
  customIssue?: string;
  description?: string;
  context?: {
    path?: string;
    url?: string;
  };
}

export function ReportButton({
  reportId,
  reportTitle,
  issues,
  onSubmit,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  triggerLabel = "Report",
  className,
  variant = "outline",
  size = "sm",
}: ReportButtonProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customIssue, setCustomIssue] = useState("");
  const [description, setDescription] = useState("");
  const [pageContext, setPageContext] = useState<{
    path?: string;
    url?: string;
  }>({});

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageContext({
        path: window.location.pathname,
        url: window.location.href,
      });
    }
  }, []);

  const resetForm = useCallback(() => {
    setSelectedIssues([]);
    setCustomIssue("");
    setDescription("");
  }, []);

  const mutation = useMutation({
    mutationFn: async (payload: ReportPayload) => {
      await onSubmit(payload);
    },
    onSuccess: () => {
      toast.success("Report submitted", {
        description:
          "Thanks for the feedback. Our team will review this shortly.",
        duration: 3500,
      });
      resetForm();
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast.error("Unable to submit report", {
        description:
          error instanceof Error
            ? error.message
            : "Please try again in a moment.",
        duration: 3500,
      });
    },
  });

  const handleIssueToggle = useCallback(
    (issueId: string, checked: boolean) => {
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
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (mutation.isPending) return;

    const trimmedCustom = customIssue.trim();
    const trimmedDescription = description.trim();
    const reportIssues = selectedIssues;

    if (
      reportIssues.length === 0 &&
      !trimmedCustom &&
      !trimmedDescription
    ) {
      toast.warning("Add a report", {
        description:
          "Select an issue or add a short note so we know what to fix.",
        duration: 3000,
      });
      return;
    }

    mutation.mutate({
      issues: reportIssues,
      customIssue: trimmedCustom || undefined,
      description: trimmedDescription || undefined,
      context: pageContext,
    });
  }, [customIssue, description, mutation, pageContext, selectedIssues]);

  const isSubmitDisabled =
    mutation.isPending ||
    (selectedIssues.length === 0 &&
      customIssue.trim().length === 0 &&
      description.trim().length === 0);

  const handleOpenChange = (open: boolean): void => {
    if (!open) {
      resetForm();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={className}
          >
            <Flag className="size-4" />
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report {reportTitle}</DialogTitle>
          <DialogDescription>
            Flag issues with "{reportTitle}" so we can investigate.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/40 px-4 py-3">
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Problem
            </p>
            <p className="text-sm font-semibold text-foreground mt-1">
              {reportTitle}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              Issues encountered
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {issues.map((issue) => {
                const isSelected = selectedIssues.includes(issue.id);

                return (
                  <div
                    key={issue.id}
                    className={`flex items-start gap-3 rounded-lg border px-3 py-3 transition-colors ${
                      isSelected
                        ? "border-primary/70 bg-primary/10"
                        : "hover:border-primary/50 hover:bg-muted/40"
                    }`}
                  >
                    <Checkbox
                      id={`report-${issue.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleIssueToggle(issue.id, checked === true)
                      }
                      className="mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={`report-${issue.id}`}
                        className="text-sm font-medium text-foreground block"
                      >
                        {issue.label}
                      </Label>
                      <p className="text-xs text-muted-foreground leading-5">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {selectedIssues.includes("OTHER") && (
              <div className="space-y-2">
                <Label
                  htmlFor="report-custom-issue"
                  className="text-sm text-foreground"
                >
                  Add your own issue
                </Label>
                <Input
                  id="report-custom-issue"
                  placeholder="Summarize what is wrong"
                  value={customIssue}
                  onChange={(event) => setCustomIssue(event.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="report-details"
                className="text-sm text-foreground"
              >
                Additional details
              </Label>
              <Textarea
                id="report-details"
                placeholder="Share details, examples, or steps to reproduce..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/2000
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Reports are private and help us improve.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenChange(false)}
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2"
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 !text-white"
              >
                {mutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                Submit report
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

