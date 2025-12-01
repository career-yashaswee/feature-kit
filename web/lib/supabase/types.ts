export type Kit = {
  id: string
  name: string
  description: string | null
  slug: string
  created_at: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Feature = {
  id: string
  name: string
  description: string | null
  kit_id: string
  slug: string
  markdown_content: string
  youtube_video_url: string | null
  code: string
  created_at: string
  kit?: Kit
  tags?: Tag[]
}

export type FeatureTag = {
  feature_id: string
  tag_id: string
  tag?: Tag
}

