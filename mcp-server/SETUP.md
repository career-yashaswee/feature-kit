# Feature Kit MCP Server - Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   cd mcp-server
   npm install
   ```

2. **Build the server:**
   ```bash
   npm run build
   ```

3. **Configure Cursor:**

   Create or edit `~/.cursor/mcp.json` (for global configuration) or `.cursor/mcp.json` in your project root (for project-specific configuration):

   ```json
   {
     "mcpServers": {
       "feature-kit": {
         "command": "node",
         "args": ["/Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js"]
       }
     }
   }
   ```

   **Important:** Replace `/Users/yashaswee/code/feature-kit/feature-kit` with the absolute path to your feature-kit repository.

4. **Restart Cursor** to load the MCP server.

## Verification

After restarting Cursor, you can test the server by asking:

- "List all available features from Feature Kit"
- "Show me the code for the auto-save-form component"
- "Get the documentation for active-devices feature"

## Development Mode

For development with auto-reload, you can use `tsx`:

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/feature-kit/mcp-server/src/index.ts"]
    }
  }
}
```

## Troubleshooting

### Server not found
- Ensure the path in `mcp.json` is absolute
- Verify the path points to `dist/index.js` (or `src/index.ts` for dev mode)
- Check that `npm run build` completed successfully

### Features not loading
- Ensure `sandbox/variant-1/features` directory exists relative to the repository root
- Check file permissions

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Run `npm run build` to compile TypeScript

## Available Commands

The MCP server provides these tools:

1. **list_features** - List all available features
2. **get_feature_code** - Get component code
3. **get_feature_documentation** - Get installation guide
4. **get_feature_integration_instructions** - Get integration steps
5. **get_feature_types** - Get TypeScript types
6. **get_feature_hooks** - Get custom hooks
7. **get_feature_adapters** - Get adapters
8. **get_feature_constitution** - Get standards document
9. **get_demo_guide** - Get demo page guide
10. **create_component** - Get guidance for new components
11. **search_features** - Search features by name

## Example Usage in Cursor

Once configured, you can use natural language commands:

- "List all features in Feature Kit"
- "Show me the auto-save-form component code"
- "Get documentation for the export-button feature"
- "Help me create a user-profile component"
- "Search for features related to form"
- "What are the Feature Kit standards?"

The MCP server will automatically provide the relevant information from your Feature Kit library.


