# Feature Kit MCP Server - Usage Examples

## Natural Language Commands

Once the MCP server is configured in Cursor, you can use these natural language commands:

### Listing Features

- "List all available features from Feature Kit"
- "What features are available in Feature Kit?"
- "Show me all components in the library"

### Getting Component Code

- "Show me the code for the auto-save-form component"
- "Get the active-devices component code"
- "I need the export-button component implementation"

### Getting Documentation

- "Get the documentation for active-devices feature"
- "Show me the installation guide for auto-save-form"
- "What are the dependencies for the export-button component?"

### Getting Integration Instructions

- "How do I integrate the auto-save-form component?"
- "Get integration instructions for active-devices"
- "Show me step-by-step setup for export-button"

### Getting Types

- "Show me the TypeScript types for language-switcher"
- "Get the type definitions for active-devices"
- "What are the props for the export-button component?"

### Getting Hooks and Adapters

- "Show me the hooks for search-input"
- "Get the adapters for language-switcher"
- "What custom hooks does the table-of-contents feature have?"

### Creating New Components

- "Help me create a new component called user-profile"
- "I want to create a data-table component, can you guide me?"
- "Create a new Feature Kit component for displaying user avatars"

### Searching Features

- "Search for features related to form"
- "Find components that handle user input"
- "What features are related to buttons?"

### Getting Standards

- "What are the Feature Kit standards?"
- "Show me the Feature Constitution"
- "How should I structure a new component?"

## Example Conversation Flow

**User:** "List all features in Feature Kit"

**Cursor (via MCP):** Returns a formatted list of all features with their capabilities.

**User:** "Show me the code for auto-save-form"

**Cursor (via MCP):** Returns the complete component code with syntax highlighting.

**User:** "Get the documentation for it"

**Cursor (via MCP):** Returns the full config.md with installation, usage, and API documentation.

**User:** "Help me integrate this into my project"

**Cursor (via MCP):** Returns the prompt.txt with step-by-step integration instructions.

## Tips

1. **Be specific**: Use exact feature names (kebab-case) when possible
2. **Ask follow-ups**: The MCP server maintains context, so you can ask follow-up questions
3. **Combine requests**: You can ask for code, docs, and types in one conversation
4. **Use search**: If you're not sure of the exact name, use search_features first

## What the MCP Server Provides

The server gives Cursor access to:

- ✅ All component source code
- ✅ Complete documentation (config.md)
- ✅ Integration instructions (prompt.txt)
- ✅ TypeScript type definitions
- ✅ Custom hooks and adapters
- ✅ Feature Kit standards and guidelines
- ✅ Demo page creation guide
- ✅ Component creation guidance

This enables Cursor to:
- Generate code using Feature Kit patterns
- Provide accurate documentation
- Suggest proper component structure
- Follow Feature Kit conventions
- Create new components following standards


