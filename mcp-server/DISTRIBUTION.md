# Feature Kit MCP Server - Distribution Guide

## Quick Start for Users

Once published to npm, users can install the Feature Kit MCP server with a single line in their Cursor configuration.

### Installation

Add this to `~/.cursor/mcp.json`:

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

Then restart Cursor. That's it! 🎉

## Distribution Methods

### Method 1: npm/npx (Recommended - Simple)

**Pros:**
- ✅ Simple installation
- ✅ Automatic updates with `@latest`
- ✅ No hosting required
- ✅ Works offline after first install

**Cons:**
- ❌ Requires users to have Feature Kit repo locally (or set FEATURE_KIT_PATH)
- ❌ Package size if bundling features

**User Configuration:**
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

### Method 2: npm with Environment Variable

For users who have Feature Kit cloned locally:

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

### Method 3: Hosted SSE Endpoint (Future)

Similar to shadcn and Better Auth, you can host the MCP server as a web service:

```json
{
  "mcpServers": {
    "feature-kit": {
      "url": "https://mcp.featurekit.dev/sse"
    }
  }
}
```

**Implementation:** Requires creating an HTTP server that implements the MCP SSE protocol.

## Publishing to npm

### Step 1: Prepare Package

1. **Update package.json**:
   - Set your npm username/org
   - Update repository URL
   - Add author information

2. **Build**:
   ```bash
   npm run build
   ```

3. **Test locally**:
   ```bash
   npm pack
   ```

### Step 2: Publish

```bash
npm login
npm publish --access public
```

### Step 3: Update Version

For updates:
```bash
npm version patch  # or minor/major
npm run build
npm publish --access public
```

## How It Works

The MCP server automatically finds Feature Kit in this order:

1. **Local Development**: Checks relative to package location
2. **Environment Variable**: Uses `FEATURE_KIT_PATH` if set
3. **Parent Directories**: Searches up the tree (for monorepos)

## For Users Without Local Repo

Currently, users need the Feature Kit repository. For full distribution without local repo, consider:

### Option A: GitHub Integration

Modify the server to fetch from GitHub:

```typescript
// Fetch features from GitHub API
async function fetchFromGitHub(repo: string, path: string) {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  // Implementation...
}
```

### Option B: Bundle Features

Include features in the npm package (larger package size).

### Option C: Hosted API

Create a web API that serves feature data (like shadcn's approach).

## Example Configurations

### Basic (npx)
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

### With Local Path
```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@latest"],
      "env": {
        "FEATURE_KIT_PATH": "/Users/username/code/feature-kit"
      }
    }
  }
}
```

### Specific Version
```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@1.0.0"]
    }
  }
}
```

## Comparison with Other MCPs

| MCP | Distribution | Method |
|-----|-------------|--------|
| ESLint | npm | `npx @eslint/mcp@latest` |
| Playwright | npm | `npx -y @playwright/mcp@latest` |
| Supabase | npm + auth | `npx -y @supabase/mcp-server-supabase@latest --access-token TOKEN` |
| shadcn | URL/SSE | `"url": "https://www.shadcn.io/api/mcp"` |
| Better Auth | URL/SSE | `"url": "https://mcp.chonkie.ai/better-auth/..."` |
| **Feature Kit** | npm | `npx -y @feature-kit/mcp@latest` |

## Next Steps

1. **Publish to npm** (see PUBLISHING.md)
2. **Update documentation** with npm installation
3. **Create GitHub releases** for each version
4. **Consider hosted option** for users without local repo

