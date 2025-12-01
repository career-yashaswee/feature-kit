'use client'

import { useFeature } from '@/features/features/hooks/use-feature'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'

export default function FeaturePage() {
  const params = useParams()
  const kitSlug = params.kitSlug as string
  const featureSlug = params.featureSlug as string
  const { feature, loading, error } = useFeature(kitSlug, featureSlug)
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (feature?.code) {
      await navigator.clipboard.writeText(feature.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    )
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
        // Convert YouTube URL to embed format
        const getEmbedUrl = (url: string) => {
          if (url.includes('embed/')) return url
          if (url.includes('watch?v=')) {
            const videoId = url.split('watch?v=')[1].split('&')[0]
            return `https://www.youtube.com/embed/${videoId}`
          }
          if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0]
            return `https://www.youtube.com/embed/${videoId}`
          }
          return url
        }

        return (
          <div className="mb-8">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(feature.youtube_video_url)}
                title={feature.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )
      })()}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Code</h2>
          <Button onClick={handleCopyCode}>
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
        </div>
        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{feature.code}</code>
          </pre>
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

