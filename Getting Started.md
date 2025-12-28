# Getting Started

This guide will help you get started with FeatureKit, whether you want to use features in your application, explore the sandbox, or contribute to the project.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Basic knowledge of React and TypeScript
- Familiarity with Next.js (for sandbox and web applications)

## Quick Start

### Using Features in Your Application

1. **Choose a Feature**: Browse available features in the web application or sandbox
2. **Read Documentation**: Check the feature's `config.md` for installation instructions
3. **Install Dependencies**: Install required npm packages
4. **Copy Component**: Copy the feature files to your project
5. **Configure Providers**: Set up any required providers (i18n, state management, etc.)
6. **Import and Use**: Import the component and use it in your application

### Example: Using a Feature

```typescript
// 1. Install dependencies
npm install @tanstack/react-query sonner

// 2. Copy feature files to your project
// Copy from sandbox/variant-1/features/your-feature

// 3. Import and use
import { YourFeature } from "@/features/your-feature";

function MyPage() {
  return <YourFeature data={myData} onAction={handleAction} />;
}
```

## Development Setup

### Sandbox Environment

The sandbox provides an interactive environment for exploring and testing features:

1. **Navigate to Sandbox**:

   ```bash
   cd sandbox/variant-1
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

4. **Open Browser**: Navigate to `http://localhost:3000`

The sandbox includes:

- Interactive demo pages for each feature
- Live prop editors
- Example implementations
- Testing utilities

### Web Application

The web application serves as a production showcase:

1. **Navigate to Web**:

   ```bash
   cd web
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   ```bash
   cp .env.example .env.local
   # Configure Supabase or other services
   ```

4. **Start Development Server**:

   ```bash
   npm run dev
   ```

5. **Open Browser**: Navigate to `http://localhost:3000`

## Project Structure

```
feature-kit/
├── docs/                    # Documentation
├── instructions/            # Development guidelines
│   ├── feature-constitution.md
│   └── demo.md
├── sandbox/
│   └── variant-1/           # Sandbox environment
│       ├── features/        # Feature implementations
│       ├── app/             # Demo pages
│       └── components/      # Shared components
├── web/                     # Web application
│   ├── app/                 # Next.js app directory
│   ├── features/            # Web-specific features
│   └── components/          # Web components
└── mcp-server/              # MCP server for Cursor IDE
```

## Understanding Features

### Feature Structure

Each feature follows a consistent structure:

```
features/
  {feature-name}/
    components/
      {feature-name}.tsx     # Main component
    hooks/
      use-{feature-name}.ts   # Custom hooks (if needed)
    adapters/
      {adapter-name}.ts       # Adapters (if needed)
    types.ts                  # TypeScript types
    index.ts                  # Public API exports
    config.md                 # Installation guide
    prompt.txt                # Integration instructions
```

### Key Files

- **index.ts**: Public API - exports components, hooks, and types
- **types.ts**: All TypeScript type definitions
- **config.md**: Installation and setup instructions
- **prompt.txt**: Integration guide for AI assistants

## Common Patterns

### Using Providers

Many features require providers for external systems:

```typescript
// Example: Language Switcher with i18next
import { LanguageSwitcher } from "@/features/language-switcher";
import { createI18nextAdapter } from "@/features/language-switcher/adapters/i18next-adapter";

function App() {
  const adapter = createI18nextAdapter(i18n);

  return <LanguageSwitcher adapter={adapter} languages={SUPPORTED_LANGUAGES} />;
}
```

### State Management

Features use different state management solutions:

- **TanStack Query**: For server state and data fetching
- **Zustand**: For client state and persistence
- **nuqs**: For URL query parameter state

### Styling

Features use Tailwind CSS and support customization:

```typescript
<YourFeature
  className="custom-styles"
  // ... other props
/>
```

## Next Steps

### For Users

1. **Explore Features**: Browse features in the sandbox or web application
2. **Read Documentation**: Check each feature's `config.md` for details
3. **Try Examples**: Review demo pages for usage examples
4. **Integrate**: Copy features to your project and customize as needed

### For Contributors

1. **Read Feature Constitution**: Understand development standards
2. **Review Existing Features**: Study patterns and conventions
3. **Set Up Development**: Clone repository and install dependencies
4. **Create Feature**: Follow guidelines in `instructions/feature-constitution.md`
5. **Build Demo**: Create demo page following `instructions/demo.md`
6. **Submit**: Create pull request with your contribution

## Resources

- **Feature Constitution**: `instructions/feature-constitution.md`
- **Demo Guidelines**: `instructions/demo.md`
- **Hook Rules**: `instructions/hooks/rules-of-hook.md`
- **Naming Conventions**: `instructions/hooks/naming-react-hooks.md`

## Troubleshooting

### Common Issues

**TypeScript Errors**:

- Ensure all dependencies are installed
- Check that types are exported from `index.ts`
- Verify TypeScript configuration

**Provider Errors**:

- Check that required providers are configured
- Verify adapter implementations
- Review feature documentation

**Styling Issues**:

- Ensure Tailwind CSS is configured
- Check that required CSS variables are defined
- Verify component className usage

### Getting Help

- Review feature documentation in `config.md`
- Check demo pages for examples
- Review Feature Constitution for patterns
- Open an issue for specific problems

## Development Workflow

1. **Create Feature**: Follow feature structure
2. **Implement Component**: Write component and hooks
3. **Add Types**: Define types in `types.ts`
4. **Export API**: Export from `index.ts`
5. **Write Documentation**: Create `config.md` and `prompt.txt`
6. **Build Demo**: Create demo page
7. **Test**: Test in sandbox environment
8. **Submit**: Create pull request

## Best Practices

- Follow Feature Constitution standards
- Use standard libraries only
- Write comprehensive TypeScript types
- Include proper error handling
- Add loading and success states
- Test in isolation and in context
- Document thoroughly
- Create interactive demos
