-- Migration: Remove markdown_content, code, and prompt columns from features table
-- These columns have been moved to the variants table

DO $$
BEGIN
  -- Remove markdown_content column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'features' AND column_name = 'markdown_content'
  ) THEN
    ALTER TABLE features DROP COLUMN markdown_content;
    RAISE NOTICE 'Dropped markdown_content column from features table';
  END IF;

  -- Remove code column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'features' AND column_name = 'code'
  ) THEN
    ALTER TABLE features DROP COLUMN code;
    RAISE NOTICE 'Dropped code column from features table';
  END IF;

  -- Remove prompt column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'features' AND column_name = 'prompt'
  ) THEN
    ALTER TABLE features DROP COLUMN prompt;
    RAISE NOTICE 'Dropped prompt column from features table';
  END IF;
END $$;

-- Add mark_url column to dependencies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dependencies' AND column_name = 'mark_url'
  ) THEN
    ALTER TABLE dependencies ADD COLUMN mark_url TEXT;
    RAISE NOTICE 'Added mark_url column to dependencies table';
  END IF;
END $$;

