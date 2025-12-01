'use client'

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

export default function FeaturePage() {
  const params = useParams()
  const kitSlug = typeof params.kitSlug === 'string' ? params.kitSlug : ''
  const featureSlug = typeof params.featureSlug === 'string' ? params.featureSlug : ''
  
  if (!kitSlug || !featureSlug) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Invalid route parameters</p>
      </div>
    )
  }
  const { data: feature, isLoading: loading, error } = useFeature(kitSlug, featureSlug)
  const [copied, copy] = useCopyToClipboard()

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
        <p>Feature not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{feature.name}</h1>
      {feature.description && (
        <p className="text-muted-foreground mb-8">{feature.description}</p>
      )}

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
          <h2 className="text-2xl font-semibold">Code</h2>
          <Button 
            onClick={handleCopyCode}
            aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          >
            {copied ? 'Copied!' : 'Copy Code'}
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

      <div>
        <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {feature.markdown_content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

