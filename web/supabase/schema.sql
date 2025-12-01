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

-- Create dependency category enum type
CREATE TYPE dependency_category AS ENUM ('language', 'framework', 'styling', 'build-tool', 'library', 'other');

-- Create dependencies table
CREATE TABLE IF NOT EXISTS dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category dependency_category NOT NULL,
  version TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stacks table
CREATE TABLE IF NOT EXISTS stacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stack_dependencies junction table
CREATE TABLE IF NOT EXISTS stack_dependencies (
  stack_id UUID NOT NULL REFERENCES stacks(id) ON DELETE CASCADE,
  dependency_id UUID NOT NULL REFERENCES dependencies(id) ON DELETE CASCADE,
  PRIMARY KEY (stack_id, dependency_id)
);

-- Create features table (updated - code, markdown_content, prompt moved to variants)
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  kit_id UUID NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  youtube_video_url TEXT,
  tier tier_type NOT NULL DEFAULT 'free',
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(kit_id, slug)
);

-- Migrate existing features data to variants (if columns exist)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'features' AND column_name = 'code'
  ) THEN
    -- This will be handled by application-level migration
    -- We'll create variants table first, then migrate data
    NULL;
  END IF;
END $$;

-- Create feature_tags junction table
CREATE TABLE IF NOT EXISTS feature_tags (
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (feature_id, tag_id)
);

-- Create variants table
CREATE TABLE IF NOT EXISTS variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  stack_id UUID NOT NULL REFERENCES stacks(id) ON DELETE RESTRICT,
  display_name TEXT NOT NULL,
  code TEXT NOT NULL,
  markdown_content TEXT NOT NULL,
  prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create variant_dependencies junction table
CREATE TABLE IF NOT EXISTS variant_dependencies (
  variant_id UUID NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  dependency_id UUID NOT NULL REFERENCES dependencies(id) ON DELETE RESTRICT,
  PRIMARY KEY (variant_id, dependency_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create issues table (updated - now references variant_id)
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  issue_text TEXT NOT NULL CHECK (char_length(issue_text) <= 2000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraint to existing issues table if it already exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'issues') THEN
    -- Add variant_id column if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'issues' AND column_name = 'variant_id'
    ) THEN
      -- First add as nullable
      ALTER TABLE issues ADD COLUMN variant_id UUID REFERENCES variants(id) ON DELETE CASCADE;
      
      -- If there are existing issues, they need to be migrated to variants first
      -- For now, we'll make it NOT NULL only if there are no existing rows
      -- Otherwise, this should be handled by application-level migration
      IF (SELECT COUNT(*) FROM issues) = 0 THEN
        ALTER TABLE issues ALTER COLUMN variant_id SET NOT NULL;
      END IF;
    END IF;
    
    -- Add text length constraint if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_name = 'issues' 
      AND constraint_name = 'issues_issue_text_length_check'
    ) THEN
      ALTER TABLE issues ADD CONSTRAINT issues_issue_text_length_check 
      CHECK (char_length(issue_text) <= 2000);
    END IF;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_features_kit_id ON features(kit_id);
CREATE INDEX IF NOT EXISTS idx_features_slug ON features(slug);
CREATE INDEX IF NOT EXISTS idx_feature_tags_feature_id ON feature_tags(feature_id);
CREATE INDEX IF NOT EXISTS idx_feature_tags_tag_id ON feature_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_kits_slug ON kits(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_issues_feature_id ON issues(feature_id);
CREATE INDEX IF NOT EXISTS idx_issues_variant_id ON issues(variant_id);
CREATE INDEX IF NOT EXISTS idx_variants_feature_id ON variants(feature_id);
CREATE INDEX IF NOT EXISTS idx_variants_stack_id ON variants(stack_id);
CREATE INDEX IF NOT EXISTS idx_variant_dependencies_variant_id ON variant_dependencies(variant_id);
CREATE INDEX IF NOT EXISTS idx_variant_dependencies_dependency_id ON variant_dependencies(dependency_id);
CREATE INDEX IF NOT EXISTS idx_stack_dependencies_stack_id ON stack_dependencies(stack_id);
CREATE INDEX IF NOT EXISTS idx_stack_dependencies_dependency_id ON stack_dependencies(dependency_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_slug ON dependencies(slug);
CREATE INDEX IF NOT EXISTS idx_stacks_slug ON stacks(slug);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Function to validate that all variant dependencies belong to the variant's stack
CREATE OR REPLACE FUNCTION validate_variant_dependencies()
RETURNS TRIGGER AS $$
DECLARE
  v_stack_id UUID;
  invalid_dependency_count INTEGER;
  invalid_dependency_name TEXT;
BEGIN
  -- Get the stack_id for this variant
  SELECT stack_id INTO v_stack_id
  FROM variants
  WHERE id = NEW.variant_id;
  
  IF v_stack_id IS NULL THEN
    RAISE EXCEPTION 'Variant not found';
  END IF;
  
  -- Check if ALL dependencies for this variant belong to the stack
  SELECT COUNT(*) INTO invalid_dependency_count
  FROM variant_dependencies vd
  WHERE vd.variant_id = NEW.variant_id
    AND vd.dependency_id NOT IN (
      SELECT dependency_id
      FROM stack_dependencies
      WHERE stack_id = v_stack_id
    );
  
  IF invalid_dependency_count > 0 THEN
    -- Get name of invalid dependency for better error message
    SELECT d.name INTO invalid_dependency_name
    FROM variant_dependencies vd
    JOIN dependencies d ON d.id = vd.dependency_id
    WHERE vd.variant_id = NEW.variant_id
      AND vd.dependency_id NOT IN (
        SELECT dependency_id
        FROM stack_dependencies
        WHERE stack_id = v_stack_id
      )
    LIMIT 1;
    
    RAISE EXCEPTION 'Variant dependency "%" does not belong to the variant''s stack', invalid_dependency_name;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to validate variant dependencies on insert/update
DROP TRIGGER IF EXISTS trigger_validate_variant_dependencies ON variant_dependencies;
CREATE TRIGGER trigger_validate_variant_dependencies
  AFTER INSERT OR UPDATE ON variant_dependencies
  FOR EACH ROW
  EXECUTE FUNCTION validate_variant_dependencies();

-- Function to prevent deletion of dependencies in use
CREATE OR REPLACE FUNCTION prevent_dependency_deletion()
RETURNS TRIGGER AS $$
DECLARE
  usage_count INTEGER;
BEGIN
  -- Check if dependency is used in any variant
  SELECT COUNT(*) INTO usage_count
  FROM variant_dependencies
  WHERE dependency_id = OLD.id;
  
  IF usage_count > 0 THEN
    RAISE EXCEPTION 'Cannot delete dependency: it is used in % variant(s)', usage_count;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to prevent deletion of dependencies in use
DROP TRIGGER IF EXISTS trigger_prevent_dependency_deletion ON dependencies;
CREATE TRIGGER trigger_prevent_dependency_deletion
  BEFORE DELETE ON dependencies
  FOR EACH ROW
  EXECUTE FUNCTION prevent_dependency_deletion();

-- Function to prevent deletion of stacks in use
CREATE OR REPLACE FUNCTION prevent_stack_deletion()
RETURNS TRIGGER AS $$
DECLARE
  usage_count INTEGER;
BEGIN
  -- Check if stack is used in any variant
  SELECT COUNT(*) INTO usage_count
  FROM variants
  WHERE stack_id = OLD.id;
  
  IF usage_count > 0 THEN
    RAISE EXCEPTION 'Cannot delete stack: it is used in % variant(s)', usage_count;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger to prevent deletion of stacks in use
DROP TRIGGER IF EXISTS trigger_prevent_stack_deletion ON stacks;
CREATE TRIGGER trigger_prevent_stack_deletion
  BEFORE DELETE ON stacks
  FOR EACH ROW
  EXECUTE FUNCTION prevent_stack_deletion();

-- Enable Row Level Security (RLS) - for now, allow all reads
ALTER TABLE kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE stack_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE variant_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on kits" ON kits FOR SELECT USING (true);
CREATE POLICY "Allow public read access on features" ON features FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access on feature_tags" ON feature_tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access on dependencies" ON dependencies FOR SELECT USING (true);
CREATE POLICY "Allow public read access on stacks" ON stacks FOR SELECT USING (true);
CREATE POLICY "Allow public read access on stack_dependencies" ON stack_dependencies FOR SELECT USING (true);
CREATE POLICY "Allow public read access on variants" ON variants FOR SELECT USING (true);
CREATE POLICY "Allow public read access on variant_dependencies" ON variant_dependencies FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);

-- Create policies for issues - allow anonymous insert, no read access
CREATE POLICY "Allow anonymous insert on issues" ON issues FOR INSERT WITH CHECK (true);

-- Migration: Create default stack and dependencies
DO $$
DECLARE
  default_stack_id UUID;
  nextjs_id UUID;
  react_id UUID;
  shadcn_id UUID;
  framer_motion_id UUID;
BEGIN
  -- Create default stack if it doesn't exist
  INSERT INTO stacks (name, slug, description)
  VALUES ('Next.js Stack', 'nextjs-stack', 'Default stack with Next.js, React, Shadcn, and Framer Motion')
  ON CONFLICT (slug) DO NOTHING
  RETURNING id INTO default_stack_id;
  
  -- Get stack ID if it already exists
  IF default_stack_id IS NULL THEN
    SELECT id INTO default_stack_id FROM stacks WHERE slug = 'nextjs-stack';
  END IF;
  
  -- Create dependencies
  INSERT INTO dependencies (name, slug, category, version)
  VALUES 
    ('Next.js', 'nextjs', 'framework', '14.0.0'),
    ('React', 'react', 'library', '18.2.0'),
    ('Shadcn', 'shadcn', 'library', 'latest'),
    ('Framer Motion', 'framer-motion', 'library', '10.16.0')
  ON CONFLICT (slug) DO NOTHING;
  
  -- Get dependency IDs
  SELECT id INTO nextjs_id FROM dependencies WHERE slug = 'nextjs';
  SELECT id INTO react_id FROM dependencies WHERE slug = 'react';
  SELECT id INTO shadcn_id FROM dependencies WHERE slug = 'shadcn';
  SELECT id INTO framer_motion_id FROM dependencies WHERE slug = 'framer-motion';
  
  -- Link dependencies to default stack
  INSERT INTO stack_dependencies (stack_id, dependency_id)
  VALUES 
    (default_stack_id, nextjs_id),
    (default_stack_id, react_id),
    (default_stack_id, shadcn_id),
    (default_stack_id, framer_motion_id)
  ON CONFLICT DO NOTHING;
END $$;

