# Testing Feature Kit MCP Server in Cursor

## Step 1: Configure Cursor

### Option A: Global Configuration (Recommended)

1. Open your home directory and create/edit the MCP config file:
   ```bash
   mkdir -p ~/.cursor
   nano ~/.cursor/mcp.json
   # or use your preferred editor
   ```

2. Add the following configuration:
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

3. **Important:** Verify the path is correct:
   ```bash
   # Check if the file exists
   ls -la /Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js
   ```

### Option B: Project-Specific Configuration

1. Create `.cursor/mcp.json` in your project root:
   ```bash
   mkdir -p .cursor
   nano .cursor/mcp.json
   ```

2. Add the same configuration as above.

## Step 2: Restart Cursor

**Completely quit and restart Cursor** (not just reload the window). This is required for MCP servers to load.

- On macOS: `Cmd + Q` to quit, then reopen Cursor
- On Windows/Linux: Close all Cursor windows and reopen

## Step 3: Verify MCP Server is Connected

### Method 1: Check Cursor Settings

1. Open Cursor Settings (Cmd/Ctrl + ,)
2. Search for "MCP" or "Model Context Protocol"
3. You should see "feature-kit" listed as an available MCP server
4. Check if it shows as "connected" or has any error messages

### Method 2: Check Cursor Logs

1. Open Cursor's Developer Tools:
   - macOS: `Cmd + Option + I`
   - Windows/Linux: `Ctrl + Shift + I`
2. Look for MCP-related messages in the console
3. Check for any error messages related to "feature-kit"

### Method 3: Test with a Simple Command

Try asking Cursor:
```
"List all available features from Feature Kit"
```

If the MCP server is working, Cursor should respond with a list of features.

## Step 4: Basic Testing Commands

Try these commands one by one to test different MCP tools:

### Test 1: List Features
```
List all available features from Feature Kit
```
**Expected:** A formatted list of all features with their capabilities (documentation, hooks, adapters, etc.)

### Test 2: Get Component Code
```
Show me the code for the auto-save-form component
```
**Expected:** The complete TypeScript/React component code

### Test 3: Get Documentation
```
Get the documentation for active-devices feature
```
**Expected:** The full config.md content with installation guide, dependencies, usage examples

### Test 4: Get Integration Instructions
```
How do I integrate the export-button component?
```
**Expected:** Step-by-step integration instructions from prompt.txt

### Test 5: Get TypeScript Types
```
Show me the TypeScript types for language-switcher
```
**Expected:** Type definitions and interfaces

### Test 6: Search Features
```
Search for features related to form
```
**Expected:** Matching features that contain "form" in their name

### Test 7: Get Standards
```
What are the Feature Kit standards?
```
**Expected:** The Feature Constitution document with guidelines

### Test 8: Create Component Guidance
```
Help me create a new component called user-profile that displays user information
```
**Expected:** Guidance on creating a component following Feature Kit patterns

## Step 5: Advanced Testing

### Test Multiple Tools in One Conversation

1. Start a conversation:
   ```
   I want to use the auto-save-form component. Show me the code, documentation, and integration instructions.
   ```

2. Follow up with:
   ```
   What are the TypeScript types for this component?
   ```

3. Then ask:
   ```
   Does this component have any custom hooks?
   ```

### Test Error Handling

Try asking for a non-existent feature:
```
Get the code for non-existent-feature
```
**Expected:** A helpful error message suggesting to use `list_features`

## Step 6: Verify Server is Running

If commands aren't working, verify the server can start manually:

```bash
cd /Users/yashaswee/code/feature-kit/feature-kit/mcp-server
node dist/index.js
```

The server should start and wait for input on stdin. Press `Ctrl+C` to stop it.

**Note:** The server communicates via stdio, so you won't see normal output. Errors will go to stderr.

## Troubleshooting

### Issue: "MCP server not found" or "Command failed"

**Solutions:**
1. Verify the path in `mcp.json` is absolute and correct
2. Check file permissions: `chmod +x /Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js`
3. Ensure Node.js is in your PATH: `which node`
4. Test the server manually: `node /Users/yashaswee/code/feature-kit/feature-kit/mcp-server/dist/index.js`

### Issue: "Features not loading"

**Solutions:**
1. Verify features directory exists: `ls -la /Users/yashaswee/code/feature-kit/feature-kit/sandbox/variant-1/features`
2. Check the server can read the directory
3. Look for errors in Cursor's developer console

### Issue: "No response from MCP server"

**Solutions:**
1. Restart Cursor completely (not just reload)
2. Check Cursor's MCP settings for error messages
3. Verify the server file exists and is executable
4. Check Node.js version: `node --version` (should be v18+)

### Issue: "TypeScript errors in server"

**Solutions:**
1. Rebuild the server: `cd mcp-server && npm run build`
2. Check for TypeScript errors: `npm run build`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

## Debug Mode

For development, you can run the server in debug mode:

1. Update `mcp.json` to use `tsx`:
   ```json
   {
     "mcpServers": {
       "feature-kit": {
         "command": "npx",
         "args": ["tsx", "/Users/yashaswee/code/feature-kit/feature-kit/mcp-server/src/index.ts"]
       }
     }
   }
   ```

2. This allows you to see TypeScript errors directly and make changes without rebuilding

## Success Indicators

You'll know it's working when:

✅ Cursor responds to Feature Kit commands with actual component information
✅ You see formatted lists of features
✅ Component code is returned with proper syntax
✅ Documentation is retrieved accurately
✅ Cursor can help create new components following Feature Kit patterns

## Next Steps

Once testing is successful:

1. Use Feature Kit components in your projects by asking Cursor
2. Create new components following Feature Kit standards
3. Get instant documentation and integration help
4. Search for relevant features when building new functionality

Enjoy using Feature Kit with Cursor! 🚀


