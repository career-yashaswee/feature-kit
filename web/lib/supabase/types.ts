export type Kit = {
  id: string
  name: string
  description: string | null
  slug: string
  thumbnail_url: string | null
  created_at: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Tier = 'free' | 'plus'

export type Feature = {
  id: string
  name: string
  description: string | null
  kit_id: string
  slug: string
  markdown_content: string
  youtube_video_url: string | null
  code: string
  tier: Tier
  created_at: string
  kit?: Kit
  tags?: Tag[]
}

export type Issue = {
  id: string
  feature_id: string
  issue_text: string
  created_at: string
}

export type FeatureTag = {
  feature_id: string
  tag_id: string
  tag?: Tag
}

