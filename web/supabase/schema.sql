-- Create kits table
CREATE TABLE IF NOT EXISTS kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tier enum type
CREATE TYPE tier_type AS ENUM ('free', 'plus');

-- Create features table
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  kit_id UUID NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  markdown_content TEXT NOT NULL,
  youtube_video_url TEXT,
  code TEXT NOT NULL,
  tier tier_type NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(kit_id, slug)
);

-- Create feature_tags junction table
CREATE TABLE IF NOT EXISTS feature_tags (
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (feature_id, tag_id)
);

-- Create issues table
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  issue_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_features_kit_id ON features(kit_id);
CREATE INDEX IF NOT EXISTS idx_features_slug ON features(slug);
CREATE INDEX IF NOT EXISTS idx_feature_tags_feature_id ON feature_tags(feature_id);
CREATE INDEX IF NOT EXISTS idx_feature_tags_tag_id ON feature_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_kits_slug ON kits(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_issues_feature_id ON issues(feature_id);

-- Enable Row Level Security (RLS) - for now, allow all reads
ALTER TABLE kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on kits" ON kits FOR SELECT USING (true);
CREATE POLICY "Allow public read access on features" ON features FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access on feature_tags" ON feature_tags FOR SELECT USING (true);

-- Create policies for issues - allow anonymous insert, no read access
CREATE POLICY "Allow anonymous insert on issues" ON issues FOR INSERT WITH CHECK (true);

