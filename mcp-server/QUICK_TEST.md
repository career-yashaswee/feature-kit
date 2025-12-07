# Quick Testing Guide - Feature Kit MCP Server

## 🚀 Quick Setup (3 Steps)

### 1. Create Cursor MCP Config

Run this command to create the config file:

```bash
mkdir -p ~/.cursor
cat > ~/.cursor/mcp.json << 'EOF'
{
  "mcpServers": {
    "feature-kit": {
      "command": "node",
      "args": ["/Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js"]
    }
  }
}
EOF
```

### 2. Restart Cursor

**Completely quit Cursor** (Cmd+Q on Mac) and reopen it.

### 3. Test It!

Open Cursor's chat and try:

```
List all available features from Feature Kit
```

If you see a list of features, it's working! 🎉

## ✅ Quick Test Commands

Copy and paste these into Cursor chat:

1. **List features:**
   ```
   List all available features from Feature Kit
   ```

2. **Get component code:**
   ```
   Show me the code for the auto-save-form component
   ```

3. **Get documentation:**
   ```
   Get the documentation for active-devices feature
   ```

4. **Search features:**
   ```
   Search for features related to button
   ```

5. **Get standards:**
   ```
   What are the Feature Kit standards?
   ```

## 🔍 Verify It's Working

**Signs it's working:**
- ✅ Cursor responds with actual Feature Kit data
- ✅ You see formatted lists of features
- ✅ Component code is returned
- ✅ Documentation is retrieved

**Signs it's NOT working:**
- ❌ Cursor says "I don't know about Feature Kit"
- ❌ No response or error messages
- ❌ Generic responses without Feature Kit data

## 🐛 Quick Fixes

**If it's not working:**

1. **Check the path:**
   ```bash
   ls -la /Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js
   ```
   Should show the file exists.

2. **Rebuild if needed:**
   ```bash
   cd /Users/yashaswee/code/feature-kit/feature-kit/mcp-server
   npm run build
   ```

3. **Check Node.js:**
   ```bash
   node --version
   ```
   Should be v18 or higher.

4. **Restart Cursor again** - MCP servers only load on startup.

## 📝 Full Testing Guide

See `TESTING.md` for comprehensive testing instructions and troubleshooting.


