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

### 4. Delightful User Experience

- Prioritize micro-animations and smooth transitions for better UX
- Use Framer Motion for animations that enhance usability
- Provide visual feedback for user actions (loading states, success indicators)
- Ensure components feel responsive and polished
- Balance functionality with aesthetic appeal

### 5. Pluggable System of Providers

- Use provider pattern for configurable dependencies (i18n, theme, state management)
- Support multiple provider implementations via adapters
- Allow users to swap providers without modifying component code
- Provide default implementations while enabling customization
- Document all provider interfaces and adapter patterns

### 6. Robust State Management

- Use appropriate state management solution for each use case
- TanStack Query for server state (caching, synchronization, background updates)
- Zustand or TanStack Store for client state (UI state, persistence)
- Handle loading, error, and success states consistently
- Provide clear state transitions and error boundaries
- Support optimistic updates where appropriate

### 7. Hook-Based Architecture

- Prefer hooks for reusable logic and state management
- Provide headless hooks alongside components for flexibility
- Follow React hooks rules (see `instructions/hooks/rules-of-hook.md`)
- Use descriptive hook names following naming conventions (see `instructions/hooks/naming-react-hooks.md`)
- Check @uidotdev/usehooks before creating custom hooks
- Enable composition of hooks for complex features

## Required Libraries & Patterns

### Data Fetching & State Management

- **TanStack Query** (`@tanstack/react-query`) - For data fetching and server state
- **TanStack Store** (`@tanstack/store`) OR **Zustand** (`zustand`) - For client-side state management
- **TanStack Pacer** (`@tanstack/react-pacer`) - For debouncing, throttling, rate limiting, queuing, and batching utilities
- Both options should be configurable via adapters

### UI Components

- **Shadcn/ui** - For base UI components (Button, Card, Dialog, etc.)
- **Phosphor Icons React** (`@phosphor-icons/react`) - For icons (standard icon library)
- **country-flag-icons** (`country-flag-icons`) - For country flag icons

### Notifications

- **Sonner** (`sonner`) - For toast notifications

### Animation

- **Framer Motion** (`framer-motion`) - For animations (when needed)

### Utilities

- **@uidotdev/usehooks** - For common React hooks (check before creating custom hooks and never re-invent the wheel)
- **TanStack Pacer** (`@tanstack/react-pacer`) - For performance optimization utilities (debouncing, throttling, rate limiting, queuing, batching)

**Important:** Before creating custom hooks, refer to `instructions/hooks/` for React hooks rules and naming conventions.

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
    persist: (lang) => localStorage.setItem("language", lang),
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

### Headless Hooks Pattern

Features should provide headless hooks that users can implement themselves or use in conjunction with components. This enables:

- **Flexibility**: Users can build custom UI while using the same logic
- **Composability**: Hooks can be combined with other hooks or components
- **Reusability**: Logic can be shared across different UI implementations

#### Hook Structure

```typescript
// hooks/use-{feature-name}.ts
export interface UseFeatureNameOptions {
  // Configuration options
  enabled?: boolean;
  debounceMs?: number;

  // Callbacks
  onSuccess?: (data: DataType) => void;
  onError?: (error: Error) => void;
  onChange?: (value: ValueType) => void;
}

export interface UseFeatureNameReturn {
  // State
  data: DataType | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  execute: () => Promise<void>;
  reset: () => void;

  // Utilities
  canExecute: boolean;
}

export function useFeatureName(
  options: UseFeatureNameOptions = {}
): UseFeatureNameReturn {
  // Implementation using TanStack Pacer, Query, etc.
}
```

#### Example: Headless Search Hook

```typescript
// hooks/use-search-input.ts
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useState, useMemo } from "react";
import Fuse from "fuse.js";

export interface UseSearchInputOptions<T> {
  data: T[];
  searchKeys: string[];
  debounceMs?: number;
  fuzzyThreshold?: number;
  onSearch?: (query: string, results: T[]) => void;
}

export interface UseSearchInputReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  results: T[];
  isSearching: boolean;
  clearSearch: () => void;
}

export function useSearchInput<T>({
  data,
  searchKeys,
  debounceMs = 300,
  fuzzyThreshold = 0.4,
  onSearch,
}: UseSearchInputOptions<T>): UseSearchInputReturn<T> {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, { wait: debounceMs });

  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: searchKeys,
        threshold: fuzzyThreshold,
      }),
    [data, searchKeys, fuzzyThreshold]
  );

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return data;
    return fuse.search(debouncedQuery).map((result) => result.item);
  }, [debouncedQuery, fuse, data]);

  useEffect(() => {
    onSearch?.(debouncedQuery, results);
  }, [debouncedQuery, results, onSearch]);

  return {
    query,
    setQuery,
    results,
    isSearching: debouncedQuery !== query,
    clearSearch: () => setQuery(""),
  };
}
```

#### Using Hooks with Components

```typescript
// Component can use the hook internally
export function SearchInput<T>(props: SearchInputProps<T>) {
  const search = useSearchInput(props);

  return (
    <div>
      <input
        value={search.query}
        onChange={(e) => search.setQuery(e.target.value)}
      />
      {search.results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Or users can use the hook directly for custom UI
function CustomSearch() {
  const search = useSearchInput({
    data: myData,
    searchKeys: ["name", "description"],
  });

  return <MyCustomUI {...search} />;
}
```

### React Hooks Rules and Naming Conventions

**Before creating any custom hooks, always refer to the hook guidelines in `instructions/hooks/`:**

- **`rules-of-hook.md`** - Rules of Hooks (only call at top level, only from React functions)
- **`naming-react-hooks.md`** - Naming conventions and best practices

#### Key Rules

1. **Always call hooks at the top level** - Never inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Function components or custom hooks
3. **Use descriptive names starting with "use"** - Follow camelCase for multi-word hooks
4. **Check @uidotdev/usehooks first** - Never reinvent the wheel; use existing hooks when available

#### Naming Patterns

- `use + Noun`: `useCounter`, `useForm`, `useLocalStorage`
- `use + Verb`: `useFetchData`, `useSubmitForm`, `useAnimateElement`
- `use + Noun + "State"`: `useThemeState`, `useUserState`
- `use + Verb + "Effect"`: `useFetchDataEffect`, `useLocationEffect`

See `instructions/hooks/` for complete guidelines and examples.

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

## Naming Conventions & Patterns

### Consistent Naming Schema

All props, variables, functions, and types should follow industry-standard naming conventions for consistency and maintainability.

### Props Naming Patterns

#### Boolean Props

- Use `is*` or `has*` prefix for boolean props
- Examples: `isLoading`, `isDisabled`, `hasError`, `isOpen`, `isVisible`

```typescript
interface ComponentProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
  showToolbar?: boolean; // Alternative: show* for visibility
  enableAutoSave?: boolean; // Alternative: enable* for features
}
```

#### Callback Props

- Use `on*` prefix for event handlers and callbacks
- Use present tense verbs: `onChange`, `onSubmit`, `onClick`
- For async operations: `onSuccess`, `onError`, `onComplete`

```typescript
interface ComponentProps {
  onChange?: (value: string) => void;
  onSubmit?: (data: FormData) => void | Promise<void>;
  onClick?: (event: MouseEvent) => void;
  onSuccess?: (result: ResultType) => void;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  onSave?: (data: DataType) => Promise<void>;
}
```

#### Configuration Props

- Use descriptive nouns: `config`, `options`, `settings`
- For specific configs: `*Config`, `*Options`, `*Settings`

```typescript
interface ComponentProps {
  config?: FeatureConfig;
  options?: FeatureOptions;
  settings?: FeatureSettings;
  debounceConfig?: DebounceConfig;
  validationOptions?: ValidationOptions;
}
```

#### Data Props

- Use plural for arrays: `items`, `options`, `variants`
- Use singular for single objects: `item`, `option`, `variant`
- Be specific: `userData`, `formData`, `searchResults`

```typescript
interface ComponentProps {
  items: Item[];
  selectedItem?: Item;
  options: Option[];
  data: DataType;
  results: SearchResult[];
}
```

#### State/Value Props

- Use descriptive names: `value`, `defaultValue`, `initialValue`
- For controlled/uncontrolled: `value` (controlled), `defaultValue` (uncontrolled)

```typescript
interface ComponentProps {
  value?: string;
  defaultValue?: string;
  initialValue?: string;
  currentValue?: string;
  selectedValue?: string;
}
```

### Variable Naming Patterns

#### State Variables

- Use descriptive names with `useState` or store names
- Boolean state: `is*`, `has*`, `should*`
- Loading states: `isLoading`, `isPending`, `isFetching`

```typescript
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [data, setData] = useState<DataType | null>(null);
const [selectedItems, setSelectedItems] = useState<Item[]>([]);
```

#### Derived State

- Use `*Ref` for refs: `inputRef`, `containerRef`
- Use `*Memo` or descriptive names for memoized values: `filteredData`, `sortedItems`

```typescript
const inputRef = useRef<HTMLInputElement>(null);
const filteredData = useMemo(() => data.filter(...), [data]);
const sortedItems = useMemo(() => items.sort(...), [items]);
```

#### Function Names

- Use verb prefixes: `handle*`, `on*`, `get*`, `set*`, `is*`, `has*`
- Event handlers: `handleClick`, `handleSubmit`, `handleChange`
- Getters: `getValue`, `getData`, `getStatus`
- Validators: `isValid`, `hasPermission`, `canExecute`

```typescript
const handleSubmit = () => {
  /* ... */
};
const handleChange = (value: string) => {
  /* ... */
};
const getFilteredResults = () => {
  /* ... */
};
const isValid = (value: string) => boolean;
const canExecute = () => boolean;
```

### Type/Interface Naming Patterns

#### Component Props

- Use `*Props` suffix: `ButtonProps`, `SearchInputProps`, `ModalProps`

```typescript
interface ButtonProps {
  // ...
}

interface SearchInputProps<T> {
  // ...
}
```

#### Configuration Types

- Use `*Config`, `*Options`, `*Settings`: `DebounceConfig`, `SearchOptions`, `FeatureSettings`

```typescript
interface DebounceConfig {
  wait: number;
  leading?: boolean;
  trailing?: boolean;
}

interface SearchOptions {
  debounceMs?: number;
  fuzzyThreshold?: number;
}
```

#### Adapter Types

- Use `*Adapter`: `LanguageAdapter`, `StateAdapter`, `PersistenceAdapter`

```typescript
interface LanguageAdapter {
  currentLanguage: string;
  languages: Language[];
  onChange: (lang: string) => void;
}
```

#### Hook Return Types

- Use `Use*Return` or `Use*Result`: `UseSearchInputReturn`, `UseDebounceResult`

```typescript
interface UseSearchInputReturn<T> {
  query: string;
  results: T[];
  isSearching: boolean;
}
```

### File Naming Patterns

#### Components

- Use kebab-case: `search-input.tsx`, `auto-save-form.tsx`, `variant-select.tsx`
- Match feature name: `features/search-input/components/search-input.tsx`

#### Hooks

- Use kebab-case with `use-` prefix: `use-search-input.ts`, `use-debounce.ts`
- Location: `features/{feature}/hooks/use-{feature}.ts`

#### Types

- Use kebab-case: `types.ts` (within feature) or `{feature}-types.ts` (shared)

#### Adapters

- Use kebab-case with `-adapter` suffix: `i18next-adapter.ts`, `zustand-adapter.ts`

### Examples of Good Naming

```typescript
// ✅ Good: Clear, consistent naming
interface SearchInputProps<T> {
  data: T[];
  searchKeys: string[];
  debounceMs?: number;
  isLoading?: boolean;
  onSearch?: (query: string, results: T[]) => void;
  onResultClick?: (item: T) => void;
  className?: string;
}

function SearchInput<T>({
  data,
  searchKeys,
  debounceMs = 300,
  isLoading = false,
  onSearch,
  onResultClick,
  className,
}: SearchInputProps<T>) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, { wait: debounceMs });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    setQuery(value);
  };

  const handleResultClick = (item: T) => {
    onResultClick?.(item);
  };

  // ...
}

// ❌ Bad: Inconsistent, unclear naming
interface SearchProps<T> {
  items: T[]; // Should be 'data'
  keys: string[]; // Should be 'searchKeys'
  delay?: number; // Should be 'debounceMs'
  loading?: boolean; // Should be 'isLoading'
  search?: (q: string, r: T[]) => void; // Should be 'onSearch'
}
```

### Naming Checklist

- [ ] Boolean props use `is*`, `has*`, or `show*` prefix
- [ ] Callback props use `on*` prefix with present tense verbs
- [ ] Configuration props use descriptive nouns (`config`, `options`, `settings`)
- [ ] Arrays use plural nouns (`items`, `options`, `results`)
- [ ] State variables use descriptive names with appropriate prefixes
- [ ] Functions use verb prefixes (`handle*`, `get*`, `set*`, `is*`)
- [ ] Types use `*Props`, `*Config`, `*Options`, `*Adapter` suffixes
- [ ] Files use kebab-case consistently

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

### When to Use TanStack Pacer

- **Debouncing**: Delay function execution until after a wait period (e.g., search input, auto-save)
- **Throttling**: Limit function execution frequency (e.g., scroll handlers, resize handlers)
- **Rate Limiting**: Control API call frequency (e.g., preventing API abuse, managing quotas)
- **Queuing**: Process tasks sequentially (e.g., file uploads, batch operations)
- **Batching**: Group multiple operations together (e.g., database inserts, analytics events)

### TanStack Pacer Usage Examples

#### Debouncing (Search Input, Auto-Save)

```typescript
import { useDebouncedCallback, useDebouncedValue } from "@tanstack/react-pacer";

// Debounced callback for search
const debouncedSearch = useDebouncedCallback(
  async (query: string) => {
    const results = await fetchSearchResults(query);
    setSearchResults(results);
  },
  { wait: 500 }
);

// Debounced value for auto-save
const [instantValue, setInstantValue] = useState("");
const [debouncedValue] = useDebouncedValue(instantValue, { wait: 1000 });
useEffect(() => {
  if (debouncedValue) {
    saveToDatabase(debouncedValue);
  }
}, [debouncedValue]);
```

#### Throttling (Scroll, Resize Handlers)

```typescript
import { useThrottledCallback, useThrottledValue } from "@tanstack/react-pacer";

// Throttled scroll handler
const handleScroll = useThrottledCallback(
  () => {
    updateScrollPosition(window.scrollY);
  },
  { wait: 200 }
);

// Throttled value for scroll position
const [scrollY, setScrollY] = useState(0);
const throttledScrollY = useThrottledValue(scrollY, { wait: 200 });
```

#### Rate Limiting (API Calls)

```typescript
import { useRateLimiter } from "@tanstack/react-pacer";

const apiRateLimiter = useRateLimiter(
  async (endpoint: string) => {
    return fetch(endpoint);
  },
  {
    limit: 10, // Max 10 calls
    window: 60000, // Per 60 seconds
    windowType: "sliding",
  }
);

// Usage
apiRateLimiter.maybeExecute("/api/data");
```

#### Queuing (Sequential Task Processing)

```typescript
import { useQueuer } from "@tanstack/react-pacer";

const taskQueuer = useQueuer(
  async (task: string) => {
    await processTask(task);
  },
  {
    wait: 1000,
    concurrency: 1, // Process one at a time
    addItemsTo: "back",
  }
);

// Add tasks to queue
taskQueuer.add("Task 1");
taskQueuer.add("Task 2");
```

#### Batching (Group Operations)

```typescript
import { useBatcher } from "@tanstack/react-pacer";

const batchBatcher = useBatcher(
  async (items: DataItem[]) => {
    await db.insertMany(items);
  },
  {
    maxSize: 100, // Batch when 100 items
    wait: 5000, // Or after 5 seconds
  }
);

// Add items to batch
batchBatcher.add(item1);
batchBatcher.add(item2);
```

### Configuration Pattern

```typescript
// Allow both options
interface FeatureStateConfig {
  store?: "tanstack" | "zustand";
  storeInstance?: TanStackStore | ZustandStore;
  persistence?: "localStorage" | "sessionStorage" | "none";
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

### State Handling

- Error State
- Success State
- Loading State
- Default State

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
- [ ] Uses standard libraries (TanStack Query, Zustand/TanStack Store, TanStack Pacer, Phosphor Icons React)
- [ ] Reuses existing FeatureKit components where applicable
- [ ] Follows adapter pattern for external integrations
- [ ] Provides headless hook for custom implementations
- [ ] Custom hooks follow React hooks rules (`instructions/hooks/rules-of-hook.md`)
- [ ] Custom hooks follow naming conventions (`instructions/hooks/naming-react-hooks.md`)
- [ ] Checked @uidotdev/usehooks before creating custom hooks
- [ ] Naming conventions follow industry standards (is*, on*, \*Props, etc.)
- [ ] Uses TanStack Pacer for debouncing, throttling, rate limiting when needed
- [ ] Includes delightful UX (micro-animations, smooth transitions, visual feedback)
- [ ] Supports pluggable providers via adapters
- [ ] Implements robust state management (loading, error, success states)
- [ ] Follows hook-based architecture for reusable logic
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

## Icon Usage Guidelines

### Phosphor Icons React

- **Package**: `@phosphor-icons/react`
- **Installation**: `npm i @phosphor-icons/react`
- **Import Pattern**: Import only the icons you need as named exports
- **Usage**: Use icons as React components with props

#### Basic Import and Usage

```typescript
import { Smiley, Heart, Horse } from "@phosphor-icons/react";

const App = () => {
  return (
    <div>
      <Smiley />
      <Heart size={32} color="hotpink" weight="fill" />
      <Horse weight="duotone" />
    </div>
  );
};
```

#### Icon Component Props

- `size?: number | string` - Icon height & width (number or string with units)
- `color?: string` - Icon stroke/fill color (CSS color string or `currentColor`)
- `weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"` - Icon weight/style
- `mirrored?: boolean` - Flip icon horizontally (useful for RTL)
- `alt?: string` - Accessible alt text

#### Optimization for Next.js

For Next.js 13+ projects, add to `next.config.js`:

```javascript
module.exports = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};
```

#### Best Practices

- **Tree-shaking**: Import only needed icons to keep bundle size small
- **Naming**: Icon names follow PascalCase (e.g., `ArrowRight`, `CheckCircle`)
- **Default weight**: Icons default to `"regular"` weight if not specified
- **Size**: Use numbers for pixel values, strings for other units (e.g., `size={24}` or `size="1.5rem"`)
- **Color**: Use `currentColor` to inherit text color from parent
- **Accessibility**: Always provide `alt` text for icon-only buttons or interactive elements

#### Example: Icon in Button

```typescript
import { Save, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

<Button>
  <Save size={16} className="mr-2" />
  Save
</Button>;
```

## Examples

### Language Switcher

- Accept languages as prop or via adapter
- Support i18next, react-intl adapters
- Configurable persistence (localStorage, Zustand, TanStack Store)
- Use country-flag-icons for flags

### Subscription Identifier

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
