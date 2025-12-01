'use client'

import { useFeature } from '@/features/features/hooks/use-feature'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

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
  const { feature, loading, error } = useFeature(kitSlug, featureSlug)
  const [copied, copy] = useCopyToClipboard()

  const handleCopyCode = () => {
    if (feature?.code) {
      copy(feature.code)
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
        // Extract video ID from various YouTube URL formats
        const getVideoId = (url: string): string | null => {
          if (!url) return null
          
          // Already a video ID
          if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return url
          }
          
          // Extract from embed URL: https://www.youtube.com/embed/VIDEO_ID
          const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/)
          if (embedMatch) return embedMatch[1]
          
          // Extract from watch URL: https://www.youtube.com/watch?v=VIDEO_ID
          const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/)
          if (watchMatch) return watchMatch[1]
          
          // Extract from short URL: https://youtu.be/VIDEO_ID
          const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
          if (shortMatch) return shortMatch[1]
          
          return null
        }

        const videoId = getVideoId(feature.youtube_video_url)
        
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

