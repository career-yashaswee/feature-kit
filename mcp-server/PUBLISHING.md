# Publishing Feature Kit MCP Server to npm

## Overview

This guide explains how to publish the Feature Kit MCP server to npm so users can install it via `npx` like other MCP servers.

## Prerequisites

1. **npm account**: Create one at https://www.npmjs.com/signup
2. **Login to npm**: `npm login`
3. **Verify package name**: The package name is `@feature-kit/mcp`

## Step 1: Update Package Information

### Update package.json

1. **Set your npm username/organization**:
   - If publishing as an organization: `@your-org/mcp`
   - If publishing as a user: `@your-username/mcp` or just `feature-kit-mcp`

2. **Update repository URL** in `package.json`:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/feature-kit.git",
     "directory": "mcp-server"
   }
   ```

3. **Add author information**:
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

## Step 2: Build the Package

```bash
cd mcp-server
npm run build
```

This creates the `dist/` directory with compiled JavaScript.

## Step 3: Test Locally

Before publishing, test the package locally:

```bash
# Create a tarball
npm pack

# Test it in another directory
cd /tmp
npm install /path/to/feature-kit/mcp-server/feature-kit-mcp-1.0.0.tgz
```

## Step 4: Publish to npm

### First Time Publishing

```bash
cd mcp-server
npm publish --access public
```

**Note**: If using a scoped package (`@feature-kit/mcp`), you need `--access public` unless you have a paid npm account.

### Updating the Package

1. **Update version** in `package.json`:
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Rebuild and publish**:
   ```bash
   npm run build
   npm publish --access public
   ```

## Step 5: User Installation

Once published, users can install it in two ways:

### Option 1: Direct npx (Recommended)

Users add this to their `~/.cursor/mcp.json`:

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

### Option 2: With Environment Variable

If users have Feature Kit locally, they can set the path:

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

## Important Notes

### How It Works

The MCP server looks for features in this order:

1. **Local development**: Checks if `sandbox/variant-1/features` exists relative to the package
2. **Environment variable**: Uses `FEATURE_KIT_PATH` if set
3. **Parent directories**: Searches up the directory tree (for monorepo setups)

### For Users Without Local Feature Kit

Currently, the server requires access to the Feature Kit repository. For full distribution, you have two options:

#### Option A: Bundle Features (Large Package)

Include features in the npm package. This makes the package larger but works offline.

#### Option B: GitHub Integration (Recommended)

Modify the server to fetch features from GitHub:

```typescript
// Fetch from GitHub API or clone repo
const GITHUB_REPO = "yourusername/feature-kit";
const FEATURES_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/sandbox/variant-1/features`;
```

#### Option C: Hosted API (Advanced)

Create a web API that serves feature data, similar to shadcn's approach.

## Distribution Examples

### Simple npx (Current Implementation)

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

### With GitHub Integration (Future)

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@feature-kit/mcp@latest"],
      "env": {
        "FEATURE_KIT_REPO": "yourusername/feature-kit",
        "FEATURE_KIT_BRANCH": "main"
      }
    }
  }
}
```

### With Hosted API (Future)

```json
{
  "mcpServers": {
    "feature-kit": {
      "url": "https://api.featurekit.dev/mcp"
    }
  }
}
```

## Versioning Strategy

- **Patch** (1.0.x): Bug fixes, small improvements
- **Minor** (1.x.0): New features, new tools
- **Major** (x.0.0): Breaking changes, major refactors

## Post-Publishing Checklist

- [ ] Test installation: `npx -y @feature-kit/mcp@latest`
- [ ] Update README with installation instructions
- [ ] Create GitHub release
- [ ] Announce on social media/community
- [ ] Add to MCP server lists/registries

## Troubleshooting

### "Package name already taken"

Choose a different name or scope:
- `@your-org/feature-kit-mcp`
- `feature-kit-mcp-server`
- `@your-username/feature-kit-mcp`

### "Access denied"

- Check you're logged in: `npm whoami`
- Verify package name matches your npm account/org
- Use `--access public` for scoped packages

### "Build fails"

- Ensure TypeScript compiles: `npm run build`
- Check `dist/` directory exists
- Verify all dependencies are in `dependencies`, not `devDependencies`

## Next Steps

After publishing:

1. **Documentation**: Update README with npm installation
2. **Examples**: Add usage examples
3. **CI/CD**: Set up automated publishing on version bumps
4. **Monitoring**: Track downloads and usage

