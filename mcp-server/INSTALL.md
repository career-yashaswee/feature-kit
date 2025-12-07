# Installation Guide - Feature Kit MCP Server

## Quick Install (Recommended)

Add this to your `~/.cursor/mcp.json`:

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

**Restart Cursor** and you're done! 🎉

## Prerequisites

The MCP server needs access to the Feature Kit repository. It will automatically find it if:

1. You have Feature Kit cloned locally (it searches common locations)
2. You set the `FEATURE_KIT_PATH` environment variable

## Installation Methods

### Method 1: npm/npx (Easiest)

**Best for:** Most users

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

### Method 2: With Custom Path

**Best for:** Users with Feature Kit in a specific location

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@latest"],
      "env": {
        "FEATURE_KIT_PATH": "/Users/yourname/code/feature-kit"
      }
    }
  }
}
```

### Method 3: Local Development

**Best for:** Developers working on Feature Kit itself

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

## Verification

After restarting Cursor, test it:

```
List all available features from Feature Kit
```

If you see a list of features, it's working! ✅

## Troubleshooting

### "Features directory not found"

The server can't find your Feature Kit repository. Solutions:

1. **Set environment variable**:
   ```json
   {
     "mcpServers": {
       "feature-kit": {
         "command": "npx",
         "args": ["-y", "@feature-kit/mcp@latest"],
         "env": {
           "FEATURE_KIT_PATH": "/absolute/path/to/feature-kit"
         }
       }
     }
   }
   ```

2. **Clone Feature Kit**:
   ```bash
   git clone https://github.com/yourusername/feature-kit.git
   ```

3. **Check path**: Verify `sandbox/variant-1/features` exists in your Feature Kit repo

### "Command not found"

- Ensure Node.js is installed: `node --version` (needs v18+)
- Try: `npx --version` to verify npx works

### "Server not responding"

- Restart Cursor completely (not just reload)
- Check Cursor's MCP settings for errors
- Verify the package exists: `npx -y @feature-kit/mcp@latest --help`

## Next Steps

Once installed, you can:

- List features: `"List all features from Feature Kit"`
- Get code: `"Show me the auto-save-form component code"`
- Get docs: `"Get documentation for active-devices"`
- Create components: `"Help me create a user-profile component"`

See [USAGE.md](./USAGE.md) for more examples.

