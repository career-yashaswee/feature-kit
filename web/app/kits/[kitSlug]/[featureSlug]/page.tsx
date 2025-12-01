'use client'

import { useState } from 'react'
import { useFeature } from '@/features/features/hooks/use-feature'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import getYouTubeId from 'get-youtube-id'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FeaturePageSkeleton } from '@/components/loading-skeleton'
import { useTranslation } from 'react-i18next'
import { TierTag } from '@/components/tier-tag'
import { ReportBugForm } from '@/components/report-bug-form'

export default function FeaturePage() {
  const params = useParams()
  const kitSlug = typeof params.kitSlug === 'string' ? params.kitSlug : ''
  const featureSlug = typeof params.featureSlug === 'string' ? params.featureSlug : ''
  
  const { t } = useTranslation()
  
  if (!kitSlug || !featureSlug) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>{t("feature.invalidRoute")}</p>
      </div>
    )
  }
  const { data: feature, isLoading: loading, error } = useFeature(kitSlug, featureSlug)
  const [copied, copy] = useCopyToClipboard()
  const [showReportBug, setShowReportBug] = useState(false)

  const handleCopyCode = () => {
    if (feature?.code) {
      copy(feature.code)
    }
  }

  if (loading) {
    return <FeaturePageSkeleton />
  }

  if (error || !feature) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>{t("feature.notFound")}</p>
      </div>
    )
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
            <p className="text-muted-foreground mb-8">{feature.description}</p>
          )}
        </div>
      </div>

      {feature.youtube_video_url && (() => {
        const videoId = getYouTubeId(feature.youtube_video_url)
        
        if (!videoId) return null

        return (
          <div className="mb-8">
            <LiteYouTubeEmbed
              id={videoId}
              title={feature.name}
              wrapperClass="yt-lite rounded-lg"
            />
          </div>
        )
      })()}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">{t("feature.code")}</h2>
          <Button 
            onClick={handleCopyCode}
            aria-label={copied ? t("common.codeCopied") : t("common.copyToClipboard")}
          >
            {copied ? t("common.copied") : t("common.copyCode")}
          </Button>
        </div>
        <div className="rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
            showLineNumbers
          >
            {feature.code}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("feature.documentation")}</h2>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {feature.markdown_content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="mb-8">
        {!showReportBug ? (
          <Button
            variant="outline"
            onClick={() => setShowReportBug(true)}
            aria-label={t("reportBug.buttonAria")}
          >
            {t("reportBug.button")}
          </Button>
        ) : (
          <ReportBugForm
            featureId={feature.id}
            onSuccess={() => setShowReportBug(false)}
          />
        )}
      </div>
    </div>
  )
}

