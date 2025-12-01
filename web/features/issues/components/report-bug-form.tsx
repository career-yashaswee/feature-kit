"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReportBug } from "@/features/issues/hooks/use-report-bug";
import { useTranslation } from "react-i18next";

type ReportBugFormProps = {
  featureId: string;
  onSuccess?: () => void;
};

const MAX_ISSUE_TEXT_LENGTH = 2000;

export function ReportBugForm({ featureId, onSuccess }: ReportBugFormProps) {
  const { t } = useTranslation();
  const [issueText, setIssueText] = useState("");
  const mutation = useReportBug();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = issueText.trim();
    if (!trimmedText) return;
    if (trimmedText.length > MAX_ISSUE_TEXT_LENGTH) return;

    mutation.mutate(
      {
        feature_id: featureId,
        issue_text: trimmedText,
      },
      {
        onSuccess: () => {
          setIssueText("");
          onSuccess?.();
        },
      },
    );
  };

  const handleReset = () => {
    mutation.reset();
    setIssueText("");
  };

  if (mutation.isSuccess) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t("reportBug.success")}
        </p>
        <Button onClick={handleReset} variant="outline">
          {t("reportBug.reportAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="issue-text" className="sr-only">
          {t("reportBug.issueTextLabel")}
        </label>
        <textarea
          id="issue-text"
          value={issueText}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= MAX_ISSUE_TEXT_LENGTH) {
              setIssueText(value);
            }
          }}
          placeholder={t("reportBug.placeholder")}
          required
          maxLength={MAX_ISSUE_TEXT_LENGTH}
          rows={4}
          className="w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <div className="text-xs text-muted-foreground text-right mt-1">
          {issueText.length} / {MAX_ISSUE_TEXT_LENGTH}
        </div>
      </div>
      <Button
        type="submit"
        disabled={
          mutation.isPending ||
          !issueText.trim() ||
          issueText.trim().length > MAX_ISSUE_TEXT_LENGTH
        }
      >
        {mutation.isPending ? t("common.loading") : t("reportBug.submit")}
      </Button>
    </form>
  );
}
