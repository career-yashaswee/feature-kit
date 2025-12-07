# Feature Kit MCP Server

Model Context Protocol (MCP) server for the Feature Kit component library. This server enables Cursor IDE to access and use Feature Kit components, documentation, and patterns.

## Features

- List all available features in Feature Kit
- Get component code for any feature
- Get installation documentation (config.md)
- Get integration instructions (prompt.txt)
- Get TypeScript type definitions
- Get custom hooks and adapters
- Access Feature Constitution and demo guides
- Search features by name
- Get guidance for creating new components

## Installation

### Option 1: npm/npx (Recommended)

Install via npm for easy distribution:

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@latest"]
    }
  }
}
```

Add this to `~/.cursor/mcp.json` and restart Cursor.

### Option 2: Local Development

For local development or if you have Feature Kit cloned:

1. Install dependencies:
```bash
cd mcp-server
npm install
```

2. Build the server:
```bash
npm run build
```

3. Configure Cursor (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "node",
      "args": ["/absolute/path/to/feature-kit/mcp-server/dist/index.js"]
    }
  }
}
```

### Option 3: With Local Feature Kit Path

If you have Feature Kit cloned elsewhere:

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@latest"],
      "env": {
        "FEATURE_KIT_PATH": "/path/to/feature-kit"
      }
    }
  }
}
```

## Usage in Cursor

After configuring and restarting Cursor, you can use commands like:

- "List all available features from Feature Kit"
- "Show me the code for the auto-save-form component"
- "Get the documentation for active-devices feature"
- "Get integration instructions for export-button"
- "Show me the types for language-switcher"
- "Search for features related to form"
- "Help me create a new component called user-profile"

## Available Tools

1. **list_features** - List all available features with their capabilities
2. **get_feature_code** - Get complete component code for a feature
3. **get_feature_documentation** - Get installation guide and documentation
4. **get_feature_integration_instructions** - Get step-by-step integration guide
5. **get_feature_types** - Get TypeScript type definitions
6. **get_feature_hooks** - Get custom React hooks
7. **get_feature_adapters** - Get adapter implementations
8. **get_feature_constitution** - Get Feature Kit standards and guidelines
9. **get_demo_guide** - Get demo page creation guide
10. **create_component** - Get guidance for creating new components
11. **search_features** - Search features by name or description

## Development

```bash
# Build
npm run build

# Run in development mode
npm run dev

# Watch mode
npm run watch
```

## Troubleshooting

1. **Server not found**: Make sure the path in `mcp.json` is absolute and points to the built `dist/index.js` file
2. **Features not loading**: Ensure the `sandbox/variant-1/features` directory exists relative to the repository root
3. **Permission errors**: Make sure the server file is executable: `chmod +x dist/index.js`

## License

MIT


