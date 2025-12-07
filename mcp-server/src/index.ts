#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readdir, readFile, stat } from "fs/promises";
import { join, resolve, dirname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve paths - support both local development and npm package
function getRootDir() {
  // When installed via npm, try to find the feature-kit repo
  // First, check if we're in a local development setup
  const localDevPath = resolve(__dirname, "../..");
  if (existsSync(join(localDevPath, "sandbox/variant-1/features"))) {
    return localDevPath;
  }
  
  // For npm distribution, try to find feature-kit in common locations
  // Users can set FEATURE_KIT_PATH env variable
  const envPath = process.env.FEATURE_KIT_PATH;
  if (envPath && existsSync(envPath)) {
    return resolve(envPath);
  }
  
  // Try to find in parent directories (for monorepo setups)
  let current = __dirname;
  for (let i = 0; i < 5; i++) {
    const testPath = resolve(current, "..", "..", "..");
    if (existsSync(join(testPath, "sandbox/variant-1/features"))) {
      return testPath;
    }
    current = resolve(current, "..");
  }
  
  // Default fallback
  return localDevPath;
}

const ROOT_DIR = getRootDir();
const FEATURES_PATH = resolve(ROOT_DIR, "sandbox/variant-1/features");
const CONSTITUTION_PATH = resolve(ROOT_DIR, "instructions/feature-constitution.md");
const DEMO_GUIDE_PATH = resolve(ROOT_DIR, "instructions/demo.md");

interface FeatureInfo {
  name: string;
  slug: string;
  path: string;
  hasConfig: boolean;
  hasPrompt: boolean;
  hasTypes: boolean;
  hasHooks: boolean;
  hasAdapters: boolean;
  componentFiles: string[];
  hookFiles: string[];
  adapterFiles: string[];
}

class FeatureKitMCPServer {
  private server: Server;
  private features: Map<string, FeatureInfo> = new Map();
  private featuresLoaded = false;

  constructor() {
    this.server = new Server(
      {
        name: "feature-kit",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "list_features",
          description:
            "List all available features in the Feature Kit component library. Returns feature names, slugs, and available documentation.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_feature_code",
          description:
            "Get the complete component code for a specific feature. Returns all component files (TSX/TS) in the feature's components directory.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description:
                  "The name/slug of the feature (e.g., 'auto-save-form', 'active-devices', 'export-button')",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_documentation",
          description:
            "Get the installation guide and documentation (config.md) for a feature. Includes dependencies, usage examples, props API, and troubleshooting.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "The name/slug of the feature",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_integration_instructions",
          description:
            "Get the integration instructions (prompt.txt) for a feature. Contains step-by-step instructions for integrating the component into a Next.js project.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "The name/slug of the feature",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_types",
          description:
            "Get the TypeScript type definitions for a feature. Returns interfaces, types, and adapters used by the component.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "The name/slug of the feature",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_hooks",
          description:
            "Get custom React hooks for a feature if they exist. Returns hook implementations from the hooks directory.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "The name/slug of the feature",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_adapters",
          description:
            "Get adapter implementations for a feature if they exist. Returns adapter code from the adapters directory.",
          inputSchema: {
            type: "object",
            properties: {
              featureName: {
                type: "string",
                description: "The name/slug of the feature",
              },
            },
            required: ["featureName"],
          },
        },
        {
          name: "get_feature_constitution",
          description:
            "Get the Feature Constitution document that defines standards, guidelines, patterns, and best practices for Feature Kit components.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "get_demo_guide",
          description:
            "Get the demo page standards guide that defines how to create demo pages for features.",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "create_component",
          description:
            "Get guidance on creating a new component following Feature Kit standards. Provides structure, patterns, and best practices based on the Feature Constitution.",
          inputSchema: {
            type: "object",
            properties: {
              componentName: {
                type: "string",
                description:
                  "The name of the component to create (kebab-case, e.g., 'user-profile', 'data-table')",
              },
              description: {
                type: "string",
                description: "Description of what the component does and its purpose",
              },
              requirements: {
                type: "string",
                description:
                  "Specific requirements, features, or functionality needed (optional)",
              },
            },
            required: ["componentName", "description"],
          },
        },
        {
          name: "search_features",
          description:
            "Search for features by name or description. Returns matching features that contain the search term.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description:
                  "Search query to match against feature names, slugs, or descriptions",
              },
            },
            required: ["query"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: Record<string, unknown> } }) => {
      const { name, arguments: args } = request.params;

      try {
        await this.ensureFeaturesLoaded();

        switch (name) {
          case "list_features":
            return await this.listFeatures();

          case "get_feature_code":
            return await this.getFeatureCode(args?.featureName as string);

          case "get_feature_documentation":
            return await this.getFeatureDocumentation(
              args?.featureName as string
            );

          case "get_feature_integration_instructions":
            return await this.getFeatureIntegrationInstructions(
              args?.featureName as string
            );

          case "get_feature_types":
            return await this.getFeatureTypes(args?.featureName as string);

          case "get_feature_hooks":
            return await this.getFeatureHooks(args?.featureName as string);

          case "get_feature_adapters":
            return await this.getFeatureAdapters(args?.featureName as string);

          case "get_feature_constitution":
            return await this.getFeatureConstitution();

          case "get_demo_guide":
            return await this.getDemoGuide();

          case "create_component":
            return await this.createComponent(
              args?.componentName as string,
              args?.description as string,
              args?.requirements as string | undefined
            );

          case "search_features":
            return await this.searchFeatures(args?.query as string);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });

    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      async () => {
        await this.ensureFeaturesLoaded();

        return {
          resources: [
            {
              uri: "feature-kit://constitution",
              name: "Feature Constitution",
              description:
                "Standards and guidelines for Feature Kit components",
              mimeType: "text/markdown",
            },
            {
              uri: "feature-kit://demo-guide",
              name: "Demo Guide",
              description: "Standards for creating demo pages",
              mimeType: "text/markdown",
            },
            ...Array.from(this.features.values()).map((feature) => ({
              uri: `feature-kit://feature/${feature.slug}`,
              name: feature.name,
              description: `Feature: ${feature.name}`,
              mimeType: "text/markdown",
            })),
          ],
        };
      }
    );

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request: { params: { uri: string } }) => {
        await this.ensureFeaturesLoaded();

        const uri = request.params.uri;

        if (uri === "feature-kit://constitution") {
          const content = await readFile(CONSTITUTION_PATH, "utf-8");
          return {
            contents: [
              {
                uri,
                mimeType: "text/markdown",
                text: content,
              },
            ],
          };
        }

        if (uri === "feature-kit://demo-guide") {
          const content = await readFile(DEMO_GUIDE_PATH, "utf-8");
          return {
            contents: [
              {
                uri,
                mimeType: "text/markdown",
                text: content,
              },
            ],
          };
        }

        const match = uri.match(/^feature-kit:\/\/feature\/(.+)$/);
        if (match) {
          const featureName = match[1];
          const doc = await this.getFeatureDocumentation(featureName);
          return {
            contents: [
              {
                uri,
                mimeType: "text/markdown",
                text: doc.content[0].text,
              },
            ],
          };
        }

        throw new Error(`Unknown resource: ${uri}`);
      }
    );
  }

  private async ensureFeaturesLoaded() {
    if (this.featuresLoaded) {
      return;
    }
    await this.loadFeatures();
    this.featuresLoaded = true;
  }

  private async loadFeatures() {
    if (!existsSync(FEATURES_PATH)) {
      console.error(
        `Warning: Features directory not found at ${FEATURES_PATH}. ` +
        `Set FEATURE_KIT_PATH environment variable to point to your feature-kit repository root.`
      );
      return;
    }

    const entries = await readdir(FEATURES_PATH, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const featurePath = join(FEATURES_PATH, entry.name);
        const configPath = join(featurePath, "config.md");
        const promptPath = join(featurePath, "prompt.txt");
        const typesPath = join(featurePath, "types.ts");
        const hooksPath = join(featurePath, "hooks");
        const adaptersPath = join(featurePath, "adapters");
        const componentsPath = join(featurePath, "components");

        const componentFiles: string[] = [];
        const hookFiles: string[] = [];
        const adapterFiles: string[] = [];

        if (existsSync(componentsPath)) {
          try {
            const files = await readdir(componentsPath);
            componentFiles.push(
              ...files.filter((f: string) => f.endsWith(".tsx") || f.endsWith(".ts"))
            );
          } catch {
            // Ignore errors
          }
        }

        if (existsSync(hooksPath)) {
          try {
            const files = await readdir(hooksPath);
            hookFiles.push(
              ...files.filter((f: string) => f.endsWith(".tsx") || f.endsWith(".ts"))
            );
          } catch {
            // Ignore errors
          }
        }

        if (existsSync(adaptersPath)) {
          try {
            const files = await readdir(adaptersPath);
            adapterFiles.push(
              ...files.filter((f: string) => f.endsWith(".tsx") || f.endsWith(".ts"))
            );
          } catch {
            // Ignore errors
          }
        }

        const feature: FeatureInfo = {
          name: this.slugToName(entry.name),
          slug: entry.name,
          path: featurePath,
          hasConfig: existsSync(configPath),
          hasPrompt: existsSync(promptPath),
          hasTypes: existsSync(typesPath),
          hasHooks: hookFiles.length > 0,
          hasAdapters: adapterFiles.length > 0,
          componentFiles,
          hookFiles,
          adapterFiles,
        };

        this.features.set(entry.name, feature);
      }
    }
  }

  private slugToName(slug: string): string {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private async listFeatures() {
    const featureList = Array.from(this.features.values()).map((feature) => ({
      name: feature.name,
      slug: feature.slug,
      hasDocumentation: feature.hasConfig,
      hasIntegrationInstructions: feature.hasPrompt,
      hasTypes: feature.hasTypes,
      hasHooks: feature.hasHooks,
      hasAdapters: feature.hasAdapters,
      componentCount: feature.componentFiles.length,
      hookCount: feature.hookFiles.length,
      adapterCount: feature.adapterFiles.length,
    }));

    return {
      content: [
        {
          type: "text",
          text: `# Feature Kit - Available Features\n\nTotal: ${featureList.length} features\n\n${featureList
            .map(
              (f) =>
                `## ${f.name} (${f.slug})\n` +
                `- Documentation: ${f.hasDocumentation ? "✅" : "❌"}\n` +
                `- Integration Guide: ${f.hasIntegrationInstructions ? "✅" : "❌"}\n` +
                `- TypeScript Types: ${f.hasTypes ? "✅" : "❌"}\n` +
                `- Custom Hooks: ${f.hasHooks ? `✅ (${f.hookCount})` : "❌"}\n` +
                `- Adapters: ${f.hasAdapters ? `✅ (${f.adapterCount})` : "❌"}\n` +
                `- Components: ${f.componentCount}\n`
            )
            .join("\n")}`,
        },
      ],
    };
  }

  private async getFeatureCode(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    const componentsPath = join(feature.path, "components");
    const codeFiles: Record<string, string> = {};

    for (const file of feature.componentFiles) {
      const filePath = join(componentsPath, file);
      try {
        codeFiles[file] = await readFile(filePath, "utf-8");
      } catch (error) {
        codeFiles[file] = `Error reading file: ${error instanceof Error ? error.message : String(error)}`;
      }
    }

    if (Object.keys(codeFiles).length === 0) {
      throw new Error(
        `No component files found for feature '${featureName}' in ${componentsPath}`
      );
    }

    const codeSummary = Object.entries(codeFiles)
      .map(([file, content]) => `\n### ${file}\n\n\`\`\`tsx\n${content}\n\`\`\``)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - Component Code\n\n## Feature: ${feature.slug}\n\n${codeSummary}`,
        },
      ],
    };
  }

  private async getFeatureDocumentation(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    if (!feature.hasConfig) {
      throw new Error(
        `Feature '${featureName}' does not have documentation (config.md)`
      );
    }

    const configPath = join(feature.path, "config.md");
    const content = await readFile(configPath, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - Documentation\n\n${content}`,
        },
      ],
    };
  }

  private async getFeatureIntegrationInstructions(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    if (!feature.hasPrompt) {
      throw new Error(
        `Feature '${featureName}' does not have integration instructions (prompt.txt)`
      );
    }

    const promptPath = join(feature.path, "prompt.txt");
    const content = await readFile(promptPath, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - Integration Instructions\n\n${content}`,
        },
      ],
    };
  }

  private async getFeatureTypes(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    if (!feature.hasTypes) {
      return {
        content: [
          {
            type: "text",
            text: `Feature '${featureName}' does not have a types.ts file. This feature may use inline types or types from external libraries.`,
          },
        ],
      };
    }

    const typesPath = join(feature.path, "types.ts");
    const content = await readFile(typesPath, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - TypeScript Types\n\n\`\`\`typescript\n${content}\n\`\`\``,
        },
      ],
    };
  }

  private async getFeatureHooks(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    if (!feature.hasHooks || feature.hookFiles.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `Feature '${featureName}' does not have custom hooks.`,
          },
        ],
      };
    }

    const hooksPath = join(feature.path, "hooks");
    const hookFiles: Record<string, string> = {};

    for (const file of feature.hookFiles) {
      const filePath = join(hooksPath, file);
      try {
        hookFiles[file] = await readFile(filePath, "utf-8");
      } catch (error) {
        hookFiles[file] = `Error reading file: ${error instanceof Error ? error.message : String(error)}`;
      }
    }

    const hooksSummary = Object.entries(hookFiles)
      .map(
        ([file, content]) => `\n### ${file}\n\n\`\`\`typescript\n${content}\n\`\`\``
      )
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - Custom Hooks\n\n${hooksSummary}`,
        },
      ],
    };
  }

  private async getFeatureAdapters(featureName: string) {
    const feature = this.features.get(featureName);

    if (!feature) {
      throw new Error(
        `Feature '${featureName}' not found. Use list_features to see available features.`
      );
    }

    if (!feature.hasAdapters || feature.adapterFiles.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `Feature '${featureName}' does not have adapters.`,
          },
        ],
      };
    }

    const adaptersPath = join(feature.path, "adapters");
    const adapterFiles: Record<string, string> = {};

    for (const file of feature.adapterFiles) {
      const filePath = join(adaptersPath, file);
      try {
        adapterFiles[file] = await readFile(filePath, "utf-8");
      } catch (error) {
        adapterFiles[file] = `Error reading file: ${error instanceof Error ? error.message : String(error)}`;
      }
    }

    const adaptersSummary = Object.entries(adapterFiles)
      .map(
        ([file, content]) => `\n### ${file}\n\n\`\`\`typescript\n${content}\n\`\`\``
      )
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `# ${feature.name} - Adapters\n\n${adaptersSummary}`,
        },
      ],
    };
  }

  private async getFeatureConstitution() {
    if (!existsSync(CONSTITUTION_PATH)) {
      throw new Error("Feature Constitution file not found");
    }

    const content = await readFile(CONSTITUTION_PATH, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
    };
  }

  private async getDemoGuide() {
    if (!existsSync(DEMO_GUIDE_PATH)) {
      throw new Error("Demo guide file not found");
    }

    const content = await readFile(DEMO_GUIDE_PATH, "utf-8");

    return {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
    };
  }

  private async createComponent(
    componentName: string,
    description: string,
    requirements?: string
  ) {
    const constitution = await readFile(CONSTITUTION_PATH, "utf-8");

    const guidance = `# Creating Component: ${componentName}

## Description
${description}

${requirements ? `## Requirements\n${requirements}\n` : ""}

## Feature Kit Standards

Please follow these guidelines from the Feature Constitution:

${constitution}

## Key Implementation Points

1. **Standalone & Extensible**: Component must work independently with no hard dependencies on application-specific code
2. **TypeScript First**: Fully typed with proper interfaces, no \`any\` types
3. **Standard Libraries Only**: Use established npm packages:
   - TanStack Query for server state
   - Zustand or TanStack Store for client state
   - TanStack Pacer for debouncing/throttling
   - Shadcn/ui for base components
   - Phosphor Icons React for icons
   - Sonner for toast notifications
   - Framer Motion for animations (when needed)
   - @uidotdev/usehooks for common hooks

4. **Adapter Pattern**: Use adapters for external dependencies (i18n, state management, etc.)
5. **Props Over Hooks**: Accept external data as props rather than calling hooks directly
6. **Headless Hooks**: Provide headless hooks for custom implementations
7. **Naming Conventions**:
   - Boolean props: \`is*\`, \`has*\`, \`show*\`
   - Callback props: \`on*\` (onChange, onSubmit, etc.)
   - Configuration props: \`config\`, \`options\`, \`settings\`
   - Types: \`*Props\`, \`*Config\`, \`*Adapter\`

## Component Structure

\`\`\`
features/${componentName}/
  components/
    ${componentName}.tsx
  hooks/
    use-${componentName}.ts (if needed)
  adapters/
    (if needed)
  types.ts (if complex types)
  config.md (installation guide)
  prompt.txt (integration instructions)
\`\`\`

## File Templates

### components/${componentName}.tsx
\`\`\`tsx
"use client";

import { /* imports */ } from "/* ... */";

export interface ${this.slugToName(componentName)}Props {
  // Props definition
}

export function ${this.slugToName(componentName)}({
  // Props destructuring
}: ${this.slugToName(componentName)}Props) {
  // Implementation
}
\`\`\`

### config.md
- Installation guide
- Dependencies list
- Quick start
- Usage examples
- Props API
- Customization options
- Troubleshooting

### prompt.txt
- Integration instructions
- Step-by-step setup
- Code examples
- Important notes

## Next Steps

1. Create the component following the structure above
2. Implement using Feature Kit patterns
3. Add TypeScript types
4. Create config.md with documentation
5. Create prompt.txt with integration instructions
6. Test the component
7. Follow demo.md for creating a demo page

Would you like me to help implement this component step by step?`;

    return {
      content: [
        {
          type: "text",
          text: guidance,
        },
      ],
    };
  }

  private async searchFeatures(query: string) {
    const lowerQuery = query.toLowerCase();
    const matches = Array.from(this.features.values()).filter(
      (feature) =>
        feature.name.toLowerCase().includes(lowerQuery) ||
        feature.slug.toLowerCase().includes(lowerQuery)
    );

    if (matches.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No features found matching "${query}". Use list_features to see all available features.`,
          },
        ],
      };
    }

    const results = matches
      .map(
        (f: FeatureInfo) =>
          `## ${f.name} (${f.slug})\n` +
          `- Documentation: ${f.hasConfig ? "✅" : "❌"}\n` +
          `- Integration Guide: ${f.hasPrompt ? "✅" : "❌"}\n` +
          `- Components: ${f.componentFiles.length}\n`
      )
      .join("\n\n");

    return {
      content: [
        {
          type: "text",
          text: `# Search Results for "${query}"\n\nFound ${matches.length} feature(s):\n\n${results}`,
        },
      ],
    };
  }

  async run() {
    await this.loadFeatures();
    this.featuresLoaded = true;

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error("Feature Kit MCP server running on stdio");
  }
}

const server = new FeatureKitMCPServer();
server.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
