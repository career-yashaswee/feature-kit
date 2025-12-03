#!/usr/bin/env tsx

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as readline from "readline";
import { createSlug } from "../../../lib/utils/slug";
import type { Tier } from "../../../lib/supabase/types";

type Environment = "local" | "production";

interface FeatureData {
  name: string;
  description: string | null;
  slug: string;
  youtube_video_url: string | null;
  preview_url: string | null;
  tier: Tier;
  tags: string[];
  kitSlug: string;
}

interface VariantData {
  display_name: string;
  code: string;
  markdown_content: string;
  prompt: string | null;
}

interface Kit {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Stack {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Dependency {
  id: string;
  name: string;
  slug: string;
  category: string;
  version: string;
  mark_url: string | null;
}

class EnvironmentLoader {
  static load(env: Environment): { url: string; key: string } {
    const envFile = env === "production" ? ".env.production" : ".env.local";
    const envPath = resolve(process.cwd(), envFile);

    if (!existsSync(envPath)) {
      throw new Error(
        `Environment file ${envFile} not found. Please create it with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY`,
      );
    }

    const envContent = readFileSync(envPath, "utf-8");
    const envVars: Record<string, string> = {};

    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").replace(/^["']|["']$/g, "");
          envVars[key.trim()] = value.trim();
        }
      }
    });

    const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) {
      throw new Error(`Missing NEXT_PUBLIC_SUPABASE_URL in ${envFile}`);
    }

    if (!serviceRoleKey) {
      throw new Error(
        `Missing SUPABASE_SERVICE_ROLE_KEY in ${envFile}.\n` +
          `The seed script requires the service role key to bypass RLS policies.\n` +
          `You can find it in your Supabase dashboard: Settings → API → service_role key (secret)\n` +
          `Add it to your ${envFile} file as: SUPABASE_SERVICE_ROLE_KEY=your_key_here`,
      );
    }

    console.log("Using service role key (bypasses RLS)");

    return { url, key: serviceRoleKey };
  }
}

class FeatureDataParser {
  static findFeatureDirectories(basePath: string): string[] {
    const featuresPath = resolve(basePath);
    if (!existsSync(featuresPath)) {
      return [];
    }

    const entries = readdirSync(featuresPath);
    return entries
      .map((entry) => join(featuresPath, entry))
      .filter((path) => {
        const stat = statSync(path);
        return stat.isDirectory();
      });
  }

  static parseFeatureDirectory(featurePath: string): FeatureData | null {
    const configPath = join(featurePath, "config.md");
    const promptPath = join(featurePath, "prompt.txt");

    if (!existsSync(configPath) || !existsSync(promptPath)) {
      return null;
    }

    const configContent = readFileSync(configPath, "utf-8");

    const name = this.extractName(configContent, featurePath);
    const description = this.extractDescription(configContent);
    const slug = createSlug(name);
    const youtube_video_url = this.extractYouTubeUrl(configContent);
    const preview_url = this.extractPreviewUrl(configContent);
    const tier = this.extractTier(configContent);

    return {
      name,
      description,
      slug,
      youtube_video_url,
      preview_url,
      tier,
      tags: [],
      kitSlug: "",
    };
  }

  static getVariantData(featurePath: string): VariantData | null {
    const configPath = join(featurePath, "config.md");
    const promptPath = join(featurePath, "prompt.txt");
    const componentsPath = join(featurePath, "components");

    if (!existsSync(configPath) || !existsSync(promptPath)) {
      return null;
    }

    const configContent = readFileSync(configPath, "utf-8");
    const promptContent = readFileSync(promptPath, "utf-8");
    const code = this.extractCode(componentsPath);
    const name = this.extractName(configContent, featurePath);

    return {
      display_name: name,
      markdown_content: configContent,
      code,
      prompt: promptContent || null,
    };
  }

  private static extractName(
    configContent: string,
    fallbackPath: string,
  ): string {
    const titleMatch = configContent.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim();
    }

    const pathParts = fallbackPath.split("/");
    const folderName = pathParts[pathParts.length - 1];
    return folderName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private static extractDescription(configContent: string): string | null {
    const lines = configContent.split("\n");
    let inDescription = false;
    const descriptionLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("#")) {
        if (inDescription) break;
        inDescription = true;
        continue;
      }

      if (inDescription && line && !line.startsWith("##")) {
        descriptionLines.push(line);
      } else if (inDescription && line.startsWith("##")) {
        break;
      }
    }

    const description = descriptionLines.join(" ").trim();
    return description || null;
  }

  private static extractCode(componentsPath: string): string {
    if (!existsSync(componentsPath)) {
      return "";
    }

    const files = readdirSync(componentsPath);
    const tsxFiles = files.filter(
      (file) => file.endsWith(".tsx") || file.endsWith(".ts"),
    );

    if (tsxFiles.length === 0) {
      return "";
    }

    const mainFile =
      tsxFiles.find((file) => {
        const name = file.replace(/\.(tsx?|jsx?)$/, "");
        const dirName = componentsPath.split("/").pop() || "";
        return name === dirName || name === "index";
      }) || tsxFiles[0];

    const filePath = join(componentsPath, mainFile);
    return readFileSync(filePath, "utf-8");
  }

  private static extractYouTubeUrl(configContent: string): string | null {
    const youtubeMatch = configContent.match(
      /youtube[:\s]+(https?:\/\/[^\s\n]+)/i,
    );
    if (youtubeMatch) {
      return youtubeMatch[1];
    }
    return null;
  }

  private static extractPreviewUrl(configContent: string): string | null {
    const previewMatch = configContent.match(
      /preview[:\s]+(https?:\/\/[^\s\n]+)/i,
    );
    if (previewMatch) {
      return previewMatch[1];
    }
    return null;
  }

  private static extractTier(configContent: string): Tier {
    const tierMatch = configContent.match(/tier[:\s]+(free|plus)/i);
    if (tierMatch) {
      return tierMatch[1].toLowerCase() as Tier;
    }
    return "free";
  }
}

class DatabaseOperations {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getOrCreateKit(name: string, slug: string): Promise<string> {
    const { data: existing } = await this.supabase
      .from("kits")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return existing.id;
    }

    const { data, error } = await this.supabase
      .from("kits")
      .insert({ name, slug })
      .select("id")
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create kit");

    return data.id;
  }

  async getOrCreateTag(name: string, slug: string): Promise<string> {
    const { data: existing } = await this.supabase
      .from("tags")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return existing.id;
    }

    const { data, error } = await this.supabase
      .from("tags")
      .insert({ name, slug })
      .select("id")
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create tag");

    return data.id;
  }

  async getAllKits(): Promise<Kit[]> {
    const { data, error } = await this.supabase
      .from("kits")
      .select("id, name, slug")
      .order("name");

    if (error) throw error;
    return data || [];
  }

  async getAllTags(): Promise<Tag[]> {
    const { data, error } = await this.supabase
      .from("tags")
      .select("id, name, slug")
      .order("name");

    if (error) throw error;
    return data || [];
  }

  async getAllStacks(): Promise<Stack[]> {
    const { data, error } = await this.supabase
      .from("stacks")
      .select("id, name, slug, description")
      .order("name");

    if (error) throw error;
    return data || [];
  }

  async getOrCreateStack(
    name: string,
    slug: string,
    description?: string,
  ): Promise<string> {
    const { data: existing } = await this.supabase
      .from("stacks")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return existing.id;
    }

    const { data, error } = await this.supabase
      .from("stacks")
      .insert({ name, slug, description: description || null })
      .select("id")
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create stack");

    return data.id;
  }

  async getAllDependencies(): Promise<Dependency[]> {
    const { data, error } = await this.supabase
      .from("dependencies")
      .select("id, name, slug, category, version, mark_url")
      .order("name");

    if (error) throw error;
    return data || [];
  }

  async getOrCreateDependency(
    name: string,
    slug: string,
    category: string,
    version: string,
    mark_url?: string | null,
  ): Promise<string> {
    const { data: existing } = await this.supabase
      .from("dependencies")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return existing.id;
    }

    const { data, error } = await this.supabase
      .from("dependencies")
      .insert({ name, slug, category, version, mark_url: mark_url || null })
      .select("id")
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create dependency");

    return data.id;
  }

  async linkDependencyToStack(
    stackId: string,
    dependencyId: string,
  ): Promise<void> {
    const { error } = await this.supabase
      .from("stack_dependencies")
      .insert({ stack_id: stackId, dependency_id: dependencyId })
      .select();

    if (error && !error.message.includes("duplicate")) {
      throw error;
    }
  }

  async createFeature(
    featureData: FeatureData,
    kitId: string,
    tagIds: string[],
  ): Promise<string> {
    const { data: existing } = await this.supabase
      .from("features")
      .select("id")
      .eq("kit_id", kitId)
      .eq("slug", featureData.slug)
      .single();

    let featureId: string;

    if (existing) {
      const { error: updateError } = await this.supabase
        .from("features")
        .update({
          name: featureData.name,
          description: featureData.description,
          youtube_video_url: featureData.youtube_video_url,
          preview_url: featureData.preview_url,
          tier: featureData.tier,
        })
        .eq("id", existing.id);

      if (updateError) throw updateError;
      featureId = existing.id;
    } else {
      const { data, error: insertError } = await this.supabase
        .from("features")
        .insert({
          name: featureData.name,
          description: featureData.description,
          kit_id: kitId,
          slug: featureData.slug,
          youtube_video_url: featureData.youtube_video_url,
          preview_url: featureData.preview_url,
          tier: featureData.tier,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;
      if (!data) throw new Error("Failed to create feature");
      featureId = data.id;
    }

    if (tagIds.length > 0) {
      await this.syncFeatureTags(featureId, tagIds);
    }

    return featureId;
  }

  async createVariant(
    featureId: string,
    stackId: string,
    variantData: VariantData,
  ): Promise<string> {
    const { data: existing } = await this.supabase
      .from("variants")
      .select("id")
      .eq("feature_id", featureId)
      .eq("stack_id", stackId)
      .eq("display_name", variantData.display_name)
      .single();

    let variantId: string;

    if (existing) {
      const { error: updateError } = await this.supabase
        .from("variants")
        .update({
          code: variantData.code,
          markdown_content: variantData.markdown_content,
          prompt: variantData.prompt,
        })
        .eq("id", existing.id);

      if (updateError) throw updateError;
      variantId = existing.id;
    } else {
      const { data, error: insertError } = await this.supabase
        .from("variants")
        .insert({
          feature_id: featureId,
          stack_id: stackId,
          display_name: variantData.display_name,
          code: variantData.code,
          markdown_content: variantData.markdown_content,
          prompt: variantData.prompt,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;
      if (!data) throw new Error("Failed to create variant");
      variantId = data.id;
    }

    return variantId;
  }

  async syncVariantDependencies(
    variantId: string,
    dependencyIds: string[],
  ): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from("variant_dependencies")
      .delete()
      .eq("variant_id", variantId);

    if (deleteError) throw deleteError;

    if (dependencyIds.length > 0) {
      const variantDeps = dependencyIds.map((depId) => ({
        variant_id: variantId,
        dependency_id: depId,
      }));

      const { error: insertError } = await this.supabase
        .from("variant_dependencies")
        .insert(variantDeps);

      if (insertError) throw insertError;
    }
  }

  private async syncFeatureTags(
    featureId: string,
    tagIds: string[],
  ): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from("feature_tags")
      .delete()
      .eq("feature_id", featureId);

    if (deleteError) throw deleteError;

    if (tagIds.length > 0) {
      const featureTags = tagIds.map((tagId) => ({
        feature_id: featureId,
        tag_id: tagId,
      }));

      const { error: insertError } = await this.supabase
        .from("feature_tags")
        .insert(featureTags);

      if (insertError) throw insertError;
    }
  }
}

class InteractiveCLI {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async question(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async selectEnvironment(): Promise<Environment> {
    const answer = await this.question(
      "Select environment (local/production) [local]: ",
    );
    return (answer.trim().toLowerCase() || "local") as Environment;
  }

  async selectFeature(features: string[]): Promise<string> {
    console.log("\nAvailable features:");
    features.forEach((feature, index) => {
      console.log(`${index + 1}. ${feature}`);
    });

    const answer = await this.question("\nSelect feature number: ");
    const index = parseInt(answer.trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= features.length) {
      throw new Error("Invalid feature selection");
    }

    return features[index];
  }

  async selectKit(kits: Kit[]): Promise<Kit> {
    console.log("\nAvailable kits:");
    kits.forEach((kit, index) => {
      console.log(`${index + 1}. ${kit.name} (${kit.slug})`);
    });

    const answer = await this.question(
      "\nSelect kit number (or enter new kit name): ",
    );
    const index = parseInt(answer.trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= kits.length) {
      const newKitName = answer.trim();
      if (!newKitName) {
        throw new Error("Invalid kit selection");
      }
      return {
        id: "",
        name: newKitName,
        slug: createSlug(newKitName),
      };
    }

    return kits[index];
  }

  async selectTags(tags: Tag[]): Promise<Tag[]> {
    console.log("\nAvailable tags:");
    tags.forEach((tag, index) => {
      console.log(`${index + 1}. ${tag.name} (${tag.slug})`);
    });

    const answer = await this.question(
      "\nSelect tags (comma-separated numbers, or enter new tag names): ",
    );

    const selectedTags: Tag[] = [];
    const parts = answer.split(",").map((p) => p.trim());

    for (const part of parts) {
      const index = parseInt(part, 10) - 1;
      if (!isNaN(index) && index >= 0 && index < tags.length) {
        selectedTags.push(tags[index]);
      } else if (part) {
        selectedTags.push({
          id: "",
          name: part,
          slug: createSlug(part),
        });
      }
    }

    return selectedTags;
  }

  async selectTier(): Promise<Tier> {
    const answer = await this.question("Select tier (free/plus) [free]: ");
    const tier = (answer.trim().toLowerCase() || "free") as Tier;
    if (tier !== "free" && tier !== "plus") {
      console.log("Invalid tier, defaulting to 'free'");
      return "free";
    }
    return tier;
  }

  async selectStack(stacks: Stack[]): Promise<Stack> {
    console.log("\nAvailable stacks:");
    stacks.forEach((stack, index) => {
      console.log(
        `${index + 1}. ${stack.name} (${stack.slug})${stack.description ? ` - ${stack.description}` : ""}`,
      );
    });

    const answer = await this.question(
      "\nSelect stack number (or enter new stack name): ",
    );
    const index = parseInt(answer.trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= stacks.length) {
      const newStackName = answer.trim();
      if (!newStackName) {
        throw new Error("Invalid stack selection");
      }
      return {
        id: "",
        name: newStackName,
        slug: createSlug(newStackName),
        description: null,
      };
    }

    return stacks[index];
  }

  async selectDependencies(dependencies: Dependency[]): Promise<Dependency[]> {
    console.log("\nAvailable dependencies:");
    dependencies.forEach((dep, index) => {
      console.log(
        `${index + 1}. ${dep.name} (${dep.slug}) - ${dep.category} v${dep.version}`,
      );
    });

    const answer = await this.question(
      "\nSelect dependencies (comma-separated numbers, or enter new dependency names): ",
    );

    const selectedDeps: Dependency[] = [];
    const parts = answer.split(",").map((p) => p.trim());

    for (const part of parts) {
      const index = parseInt(part, 10) - 1;
      if (!isNaN(index) && index >= 0 && index < dependencies.length) {
        selectedDeps.push(dependencies[index]);
      } else if (part) {
        selectedDeps.push({
          id: "",
          name: part,
          slug: createSlug(part),
          category: "library",
          version: "latest",
          mark_url: null,
        });
      }
    }

    return selectedDeps;
  }

  async selectDependencyCategory(): Promise<string> {
    const categories = [
      "language",
      "framework",
      "styling",
      "build-tool",
      "library",
      "other",
    ];
    console.log("\nDependency categories:");
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    const answer = await this.question("\nSelect category number [library]: ");
    const index = parseInt(answer.trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= categories.length) {
      return "library";
    }

    return categories[index];
  }

  async selectDependencyVersion(): Promise<string> {
    const answer = await this.question("Enter dependency version [latest]: ");
    return answer.trim() || "latest";
  }

  async selectDependencyMarkUrl(): Promise<string | null> {
    const answer = await this.question(
      "Enter mark_url (optional, press Enter to skip): ",
    );
    return answer.trim() || null;
  }

  async selectVariantDisplayName(defaultName: string): Promise<string> {
    const answer = await this.question(
      `Enter variant display name [${defaultName}]: `,
    );
    return answer.trim() || defaultName;
  }

  close(): void {
    this.rl.close();
  }
}

async function main() {
  const cli = new InteractiveCLI();

  try {
    console.log("Feature Seeding Script\n");

    const env = await cli.selectEnvironment();
    console.log(`\nLoading ${env} environment...`);

    const { url, key } = EnvironmentLoader.load(env);
    const supabase = createClient(url, key);
    const db = new DatabaseOperations(supabase);

    const basePath = resolve(process.cwd(), "../sandbox/variant-1/features");
    const featureDirs = FeatureDataParser.findFeatureDirectories(basePath);

    if (featureDirs.length === 0) {
      console.error(`No feature directories found at ${basePath}`);
      console.error(
        "Please ensure the features directory exists and contains feature folders",
      );
      process.exit(1);
    }

    const featureNames = featureDirs.map((dir) => {
      const parts = dir.split("/");
      return parts[parts.length - 1];
    });

    const selectedFeatureName = await cli.selectFeature(featureNames);
    const selectedFeaturePath = featureDirs.find((dir) =>
      dir.endsWith(selectedFeatureName),
    );

    if (!selectedFeaturePath) {
      throw new Error("Feature path not found");
    }

    const featureData =
      FeatureDataParser.parseFeatureDirectory(selectedFeaturePath);

    if (!featureData) {
      throw new Error("Failed to parse feature data");
    }

    const variantData = FeatureDataParser.getVariantData(selectedFeaturePath);

    if (!variantData) {
      throw new Error("Failed to parse variant data");
    }

    console.log(`\nParsed feature: ${featureData.name}`);

    const kits = await db.getAllKits();
    const selectedKit = await cli.selectKit(kits);

    if (!selectedKit.id) {
      const kitId = await db.getOrCreateKit(selectedKit.name, selectedKit.slug);
      selectedKit.id = kitId;
      console.log(`Created kit: ${selectedKit.name}`);
    }

    featureData.kitSlug = selectedKit.slug;

    const tags = await db.getAllTags();
    const selectedTags = await cli.selectTags(tags);

    const tagIds: string[] = [];
    for (const tag of selectedTags) {
      if (!tag.id) {
        const tagId = await db.getOrCreateTag(tag.name, tag.slug);
        tag.id = tagId;
        console.log(`Created tag: ${tag.name}`);
      }
      tagIds.push(tag.id);
    }

    featureData.tags = selectedTags.map((t) => t.slug);

    const tier = await cli.selectTier();
    featureData.tier = tier;

    console.log("\nSeeding feature to database...");
    const featureId = await db.createFeature(
      featureData,
      selectedKit.id,
      tagIds,
    );

    const stacks = await db.getAllStacks();
    const selectedStack = await cli.selectStack(stacks);

    if (!selectedStack.id) {
      const stackDescription = await cli.question(
        "Enter stack description (optional): ",
      );
      const stackId = await db.getOrCreateStack(
        selectedStack.name,
        selectedStack.slug,
        stackDescription.trim() || undefined,
      );
      selectedStack.id = stackId;
      console.log(`Created stack: ${selectedStack.name}`);
    }

    const displayName = await cli.selectVariantDisplayName(
      variantData.display_name,
    );
    variantData.display_name = displayName;

    console.log("\nSeeding variant to database...");
    const variantId = await db.createVariant(
      featureId,
      selectedStack.id,
      variantData,
    );

    const dependencies = await db.getAllDependencies();
    const selectedDeps = await cli.selectDependencies(dependencies);

    const depIds: string[] = [];
    for (const dep of selectedDeps) {
      if (!dep.id) {
        const category = await cli.selectDependencyCategory();
        const version = await cli.selectDependencyVersion();
        const mark_url = await cli.selectDependencyMarkUrl();
        const depId = await db.getOrCreateDependency(
          dep.name,
          dep.slug,
          category,
          version,
          mark_url,
        );
        dep.id = depId;
        console.log(`Created dependency: ${dep.name}`);

        await db.linkDependencyToStack(selectedStack.id, depId);
        console.log(
          `Linked dependency ${dep.name} to stack ${selectedStack.name}`,
        );
      } else {
        await db.linkDependencyToStack(selectedStack.id, dep.id);
      }
      depIds.push(dep.id);
    }

    if (depIds.length > 0) {
      await db.syncVariantDependencies(variantId, depIds);
      console.log(`Linked ${depIds.length} dependency(ies) to variant`);
    }

    console.log("\nFeature seeded successfully!");
    console.log(`- Name: ${featureData.name}`);
    console.log(`- Kit: ${selectedKit.name}`);
    console.log(
      `- Tags: ${selectedTags.map((t) => t.name).join(", ") || "None"}`,
    );
    console.log(`- Tier: ${tier}`);
    console.log(`- Stack: ${selectedStack.name}`);
    console.log(`- Variant: ${variantData.display_name}`);
    console.log(
      `- Dependencies: ${selectedDeps.map((d) => d.name).join(", ") || "None"}`,
    );
  } catch (error) {
    console.error("\nError:", error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    cli.close();
  }
}

main();
