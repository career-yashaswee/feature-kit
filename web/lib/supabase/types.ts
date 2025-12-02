export type Kit = {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  thumbnail_url: string | null;
  created_at: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Tier = "free" | "plus";

export type Feature = {
  id: string;
  name: string;
  description: string | null;
  kit_id: string;
  slug: string;
  youtube_video_url: string | null;
  tier: Tier;
  preview_url: string | null;
  created_at: string;
  kit?: Kit;
  tags?: Tag[];
};

export type Issue = {
  id: string;
  feature_id: string;
  issue_text: string;
  created_at: string;
};

export type FeatureTag = {
  feature_id: string;
  tag_id: string;
  tag?: Tag;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  preview_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
};

export type Dependency = {
  id: string;
  name: string;
  slug: string;
  category:
    | "language"
    | "framework"
    | "styling"
    | "build-tool"
    | "library"
    | "other";
  version: string;
  created_at: string;
};

export type Stack = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Variant = {
  id: string;
  feature_id: string;
  stack_id: string;
  display_name: string;
  code: string;
  markdown_content: string;
  prompt: string | null;
  created_at: string;
  stack?: Stack;
  dependencies?: Dependency[];
};
