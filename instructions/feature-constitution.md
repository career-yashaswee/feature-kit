# Feature Constitution

This document defines the standards and guidelines for creating standalone, extensible features in FeatureKit.

## Core Principles

### 1. Standalone & Extensible
- Features must be completely standalone and work independently
- No hard dependencies on application-specific code
- All external dependencies must be configurable via props or adapters
- Features should adapt to larger use cases without modification

### 2. TypeScript First
- All features must be fully typed with TypeScript
- Avoid `any` types - use proper type definitions
- Export types and interfaces for extensibility
- Use strict TypeScript configuration

### 3. Standard Libraries Only
- Use established npm packages, not custom implementations
- Prefer well-maintained, popular libraries
- Document all dependencies clearly

## Required Libraries & Patterns

### Data Fetching & State Management
- **TanStack Query** (`@tanstack/react-query`) - For data fetching and server state
- **TanStack Store** (`@tanstack/store`) OR **Zustand** (`zustand`) - For client-side state management
- Both options should be configurable via adapters

### UI Components
- **Shadcn/ui** - For base UI components (Button, Card, Dialog, etc.)
- **Lucide React** (`lucide-react`) - For icons (standard icon library)
- **country-flag-icons** (`country-flag-icons`) - For country flag icons

### Notifications
- **TanStack Sonner** (`sonner`) - For toast notifications

### Animation
- **Framer Motion** (`framer-motion`) - For animations (when needed)

### Utilities
- **@uidotdev/usehooks** - For common React hooks (check before creating custom hooks)

## Component Architecture Patterns

### 1. Adapter Pattern for External Dependencies
When a component needs to integrate with external systems (i18n, state management, etc.), use adapter pattern:

```typescript
// Example: Language Switcher Adapter
interface LanguageSwitcherAdapter {
  currentLanguage: string;
  languages: Language[];
  onChange: (language: string) => void;
  persist?: (language: string) => void;
}

// i18next adapter
function createI18nextAdapter(i18n: i18n): LanguageSwitcherAdapter {
  return {
    currentLanguage: i18n.language,
    languages: SUPPORTED_LANGUAGES,
    onChange: (lang) => i18n.changeLanguage(lang),
    persist: (lang) => localStorage.setItem('language', lang),
  };
}
```

### 2. Props Over Hooks for External Data
When external data is needed, accept it as props rather than calling hooks directly:

```typescript
// ❌ Bad: Component calls hook directly
function PremiumIdentifier() {
  const { isPlusActive } = usePlusStatus(); // Application-specific
  // ...
}

// ✅ Good: Accept as prop or from configurable store
interface PremiumIdentifierProps {
  isUserSubscribed?: boolean; // Direct prop
  // OR
  subscriptionStore?: SubscriptionStore; // Configurable store
}
```

### 3. Standardized Data Sources
- **TanStack Query** for server state (queries, mutations)
- **TanStack Store** or **Zustand** for client state (with persistence options)
- Accept hook results as props when needed

### 4. Reuse Existing FeatureKit Components
- Use existing FeatureKit components when applicable
- Example: Use `RefreshButton` in `PageLoader` instead of custom implementation

## Component Structure

### File Organization
```
features/
  {feature-name}/
    components/
      {feature-name}.tsx
    hooks/
      use-{feature-name}.ts (if needed)
    adapters/
      {adapter-name}.ts (if needed)
    types.ts (if complex types)
    config.md (installation guide)
    prompt.txt (integration instructions)
```

### Component Props Pattern
```typescript
interface FeatureProps {
  // Required props
  requiredProp: string;
  
  // Optional configuration
  config?: FeatureConfig;
  
  // Callbacks
  onChange?: (value: string) => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  
  // Styling
  className?: string;
  
  // Adapters (when needed)
  adapter?: FeatureAdapter;
}
```

## State Management Guidelines

### When to Use TanStack Query
- Server data fetching
- API calls
- Caching and synchronization
- Background refetching

### When to Use TanStack Store or Zustand
- Client-side state
- UI state
- Persistence (localStorage, sessionStorage)
- Global application state

### Configuration Pattern
```typescript
// Allow both options
interface FeatureStateConfig {
  store?: 'tanstack' | 'zustand';
  storeInstance?: TanStackStore | ZustandStore;
  persistence?: 'localStorage' | 'sessionStorage' | 'none';
}
```

## Integration Patterns

### i18n Integration
- Create adapters for different i18n libraries (i18next, react-intl, etc.)
- Accept translations as props or via adapter
- Never hardcode translation keys

### Persistence Integration
- Support localStorage, sessionStorage, or custom persistence
- Make persistence configurable
- Provide default implementations

### Event Handling
- Use standard React patterns
- Provide callbacks for all user interactions
- Support controlled and uncontrolled modes

## Demo Page Standards

Follow `instructions/demo.md` for all demo pages:
- Hero section with badges
- "How to Test" card (first card)
- Example cards
- Features grid
- Consistent styling and layout

## Checklist for New Features

- [ ] Component is fully standalone (no app-specific dependencies)
- [ ] All external data accepted as props or via adapters
- [ ] TypeScript types are complete and exported
- [ ] Uses standard libraries (TanStack Query, Zustand/TanStack Store, Lucide React)
- [ ] Reuses existing FeatureKit components where applicable
- [ ] Follows adapter pattern for external integrations
- [ ] Demo page follows demo.md guidelines
- [ ] Documentation includes installation and usage examples
- [ ] All dependencies listed in config.md

## Common Patterns

### Removing Application-Specific Code
- Replace application hooks with props or adapters
- Remove hardcoded API endpoints
- Remove application-specific types
- Extract configuration to props

### Making Components Extensible
- Export types and interfaces
- Provide default implementations
- Support multiple adapter types
- Allow customization via props

### Error Handling
- Use TanStack Sonner for user-facing errors
- Provide error callbacks
- Handle loading and error states gracefully

## Examples

### Language Switcher
- Accept languages as prop or via adapter
- Support i18next, react-intl adapters
- Configurable persistence (localStorage, Zustand, TanStack Store)
- Use country-flag-icons for flags

### Premium Identifier
- Accept `isUserSubscribed` as prop
- OR accept subscription store (Zustand/TanStack Store)
- No direct API calls in component

### Report Button
- Remove share functionality (keep only report)
- Use TanStack Query for mutations
- Use TanStack Sonner for notifications
- Accept report options as props

### Page Loader
- Use RefreshButton from FeatureKit
- Accept loading states as props
- Configurable branding and styling
- Support custom loading messages

