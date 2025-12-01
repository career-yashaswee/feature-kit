"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import getYouTubeId from "get-youtube-id";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { FeaturePageSkeleton } from "@/components/common/loading-skeleton";
import { useTranslation } from "react-i18next";
import { useFeature } from "@/features/features/hooks/use-feature";
import { TierTag } from "@/features/features/components/tier-tag";
import { ReportBugForm } from "@/features/issues/components/report-bug-form";
import { useCopyPrompt } from "@/features/features/hooks/use-copy-prompt";
import { Bug, Copy, ExternalLink, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FeaturePage() {
  const params = useParams();
  const kitSlug = typeof params.kitSlug === "string" ? params.kitSlug : "";
  const featureSlug =
    typeof params.featureSlug === "string" ? params.featureSlug : "";
  const {
    data: feature,
    isLoading: loading,
    error,
  } = useFeature(kitSlug, featureSlug);
  const [copied, copy] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);
  const [showReportBug, setShowReportBug] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const { copyPrompt } = useCopyPrompt();

  const { t } = useTranslation();

  const markdownComponents: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");
      const isInline = !className || !className.includes("language-");

      if (!isInline && language) {
        return (
          <div className="rounded-lg overflow-hidden my-4">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
              }}
              showLineNumbers
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre({ children }) {
      return <>{children}</>;
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-border">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-muted">{children}</thead>;
    },
    tbody({ children }) {
      return <tbody>{children}</tbody>;
    },
    tr({ children }) {
      return <tr className="border-b border-border">{children}</tr>;
    },
    th({ children }) {
      return (
        <th className="border border-border px-4 py-2 text-left font-semibold">
          {children}
        </th>
      );
    },
    td({ children }) {
      return <td className="border border-border px-4 py-2">{children}</td>;
    },
  };

  if (!kitSlug || !featureSlug) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>{t("feature.invalidRoute")}</p>
      </div>
    );
  }

  const handleCopyCode = () => {
    if (feature?.code) {
      copy(feature.code);
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  };

  if (loading) {
    return <FeaturePageSkeleton />;
  }

  if (error || !feature) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>{t("feature.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{feature.name}</h1>
            <TierTag tier={feature.tier} />
          </div>
          {feature.description && (
            <p className="text-muted-foreground mb-4">{feature.description}</p>
          )}
          {feature.tags && feature.tags.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mb-8"
              role="list"
              aria-label="Tags"
            >
              {feature.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-xs"
                  role="listitem"
                  aria-label={`Tag: ${tag.name}`}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {feature.preview_url && (
          <Button
            variant="outline"
            onClick={() =>
              window.open(feature.preview_url!, "_blank", "noopener,noreferrer")
            }
            aria-label={t("feature.previewAria")}
          >
            <ExternalLink className="size-4 mr-2" />
            {t("feature.preview")}
          </Button>
        )}
        {feature.prompt && (
          <Button
            variant="outline"
            onClick={() => copyPrompt(feature.prompt)}
            aria-label={t("feature.copyPromptAria")}
          >
            <Copy className="size-4 mr-2" />
            {t("feature.copyPrompt")}
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => setShowReportBug(true)}
          aria-label={t("reportBug.buttonAria")}
        >
          <Bug className="size-4 mr-2" />
          {t("reportBug.button")}
        </Button>
      </div>

      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="code">{t("feature.code")}</TabsTrigger>
              <TabsTrigger
                value="preview"
                disabled={!feature.youtube_video_url}
              >
                {t("feature.preview")}
              </TabsTrigger>
            </TabsList>
            {activeTab === "code" && (
              <Button
                onClick={handleCopyCode}
                aria-label={
                  showCopied
                    ? t("common.codeCopied")
                    : t("common.copyToClipboard")
                }
              >
                <Copy className="size-4 mr-2" />
                {showCopied ? t("common.copied") : t("common.copyCode")}
              </Button>
            )}
          </div>
          <TabsContent value="code" className="mt-4">
            <div className="rounded-lg overflow-hidden border">
              <div className="max-h-[600px] overflow-y-auto">
                <SyntaxHighlighter
                  language="typescript"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                  showLineNumbers
                >
                  {feature.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-4">
            {feature.youtube_video_url &&
              (() => {
                const videoId = getYouTubeId(feature.youtube_video_url);

                if (!videoId) return null;

                return (
                  <div className="rounded-lg overflow-hidden">
                    <LiteYouTubeEmbed
                      id={videoId}
                      title={feature.name}
                      wrapperClass="yt-lite rounded-lg"
                    />
                  </div>
                );
              })()}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("feature.documentation")}
        </h2>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {feature.markdown_content}
          </ReactMarkdown>
        </div>
      </div>

      {showReportBug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-bug-dialog-title"
            className="w-full max-w-lg rounded-lg border bg-background shadow-lg"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2
                id="report-bug-dialog-title"
                className="text-lg font-semibold"
              >
                {t("reportBug.title")}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReportBug(false)}
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <ReportBugForm
                featureId={feature.id}
                onSuccess={() => setShowReportBug(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
