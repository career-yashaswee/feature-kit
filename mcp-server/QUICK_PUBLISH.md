# Quick Publish Guide - Feature Kit MCP Server

## 🚀 Ready to Publish!

Your MCP server is ready for npm distribution. Here's what to do:

## Step 1: Update Package Info

Edit `package.json` and update:

1. **Package name** (if needed):
   ```json
   "name": "@your-username/mcp"  // or "feature-kit-mcp"
   ```

2. **Repository URL**:
   ```json
   "repository": {
     "type": "git",
     "url": "https://github.com/yourusername/feature-kit.git",
     "directory": "mcp-server"
   }
   ```

3. **Author**:
   ```json
   "author": "Your Name <your.email@example.com>"
   ```

## Step 2: Publish to npm

```bash
cd mcp-server

# Login to npm (first time only)
npm login

# Build and publish
npm run build
npm publish --access public
```

**Note:** Use `--access public` for scoped packages (`@your-username/mcp`)

## Step 3: Users Install It

Once published, users add this to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "feature-kit": {
      "command": "npx",
      "args": ["-y", "@your-username/mcp@latest"]
    }
  }
}
```

Replace `@your-username/mcp` with your actual package name.

## That's It! 🎉

Users can now install your MCP server with one line, just like:
- `npx -y @eslint/mcp@latest`
- `npx -y @playwright/mcp@latest`
- `npx -y @your-username/mcp@latest` ← Your package!

## Important Notes

### Current Limitation

The server currently requires users to have Feature Kit cloned locally. It will:
1. Search for Feature Kit automatically
2. Use `FEATURE_KIT_PATH` env variable if set
3. Search parent directories

### Future Enhancements

For full distribution without local repo, consider:

1. **GitHub Integration**: Fetch features from GitHub API
2. **Bundle Features**: Include features in npm package (larger size)
3. **Hosted API**: Create web API like shadcn does

See `PUBLISHING.md` for detailed instructions and `DISTRIBUTION.md` for distribution strategies.

## Testing Before Publishing

```bash
# Create a test package
npm pack

# Test it
cd /tmp
npm install /path/to/feature-kit/mcp-server/feature-kit-mcp-1.0.0.tgz
```

## Updating Versions

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm run build
npm publish --access public
```

## Files Included in Package

The `.npmignore` file ensures only necessary files are published:
- ✅ `dist/` - Compiled JavaScript
- ✅ `README.md` - Documentation
- ❌ `src/` - Source files (excluded)
- ❌ `node_modules/` - Dependencies (excluded)

## Need Help?

- See `PUBLISHING.md` for detailed publishing guide
- See `DISTRIBUTION.md` for distribution strategies
- See `INSTALL.md` for user installation instructions

