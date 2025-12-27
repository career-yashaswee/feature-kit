# Contributing to FeatureKit

Thank you for your interest in contributing to FeatureKit. This guide outlines the process for contributing features, improvements, and fixes.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies in both `sandbox/variant-1` and `web` directories
4. Read the Feature Constitution (`instructions/feature-constitution.md`)
5. Review existing features to understand patterns and conventions

## Contribution Types

### New Features

When adding a new feature:

1. **Follow the Feature Constitution**: All features must adhere to the standards defined in `instructions/feature-constitution.md`
2. **Create Feature Structure**: Use the standard directory structure with components, hooks, types, and adapters
3. **Write Documentation**: Include `config.md` for installation and `prompt.txt` for integration instructions
4. **Create Demo Page**: Build an interactive demo following `instructions/demo.md` guidelines
5. **Add to Features List**: Update `sandbox/variant-1/data/features.json` with feature metadata

### Bug Fixes

For bug fixes:

1. Identify the issue clearly
2. Create a minimal reproduction case
3. Fix the issue following existing code patterns
4. Add or update tests if applicable
5. Update documentation if behavior changes

### Improvements

For improvements to existing features:

1. Ensure backward compatibility
2. Follow existing patterns and conventions
3. Update documentation to reflect changes
4. Update demo pages if UI changes

## Feature Requirements

All new features must meet these requirements:

### Standalone and Extensible

- No hard dependencies on application-specific code
- All external data accepted as props or via adapters
- Configurable dependencies through provider patterns

### TypeScript

- Full TypeScript coverage with strict typing
- No `any` types
- Export all types and interfaces
- Types defined in `types.ts`, not in component files

### Standard Libraries

- Use established npm packages, not custom implementations
- Required libraries:
  - `fast-deep-equal` for object comparison
  - `slugify` for slug generation
  - `react-intersection-observer` for scroll-based visibility
  - `scroll-into-view-if-needed` for scroll-to-element
  - `@tanstack/react-pacer` for debouncing, throttling, rate limiting
  - `nuqs` for URL query parameter state management

### State Management

- TanStack Query for server state
- Zustand or TanStack Store for client state
- nuqs for filter and search state in URL
- Proper loading, error, and success states

### Component Structure

- Export public API through `index.ts`
- Types in `types.ts`
- Components in `components/`
- Hooks in `hooks/`
- Adapters in `adapters/` when needed

### Naming Conventions

- Boolean props: `is*`, `has*`, `show*`
- Callback props: `on*` with present tense verbs
- Configuration props: `config`, `options`, `settings`
- Arrays: plural nouns (`items`, `options`)
- Types: `*Props`, `*Config`, `*Options`, `*Adapter`

### User Experience

- Micro-animations and smooth transitions
- Visual feedback for user actions
- Loading states without ellipses ("Loading" not "Loading...")
- No emojis - use ASCII symbols only

## Demo Page Requirements

All features must include a demo page that follows `instructions/demo.md`:

1. **Hero Section**: Feature name, description, and badges
2. **Live Demo Card**: Interactive component with real-time prop updates
3. **Props API Card**: Editable props table using `PropsApiCard` component
4. **How to Test Card**: Testing instructions using `HowToTestCard` component
5. **Example Cards**: Different use cases and variants
6. **Features Glossary**: Grid of feature highlights using `FeaturesGlossary` component

## Code Quality

- Follow React hooks rules (`instructions/hooks/rules-of-hook.md`)
- Follow hook naming conventions (`instructions/hooks/naming-react-hooks.md`)
- Check `@uidotdev/usehooks` before creating custom hooks
- Use `BaseCard` instead of `Card` with custom styling
- Import icons from `@phosphor-icons/react` only
- Use `usePropsApi` hook for editable props in demos

## Testing

- Test components in isolation
- Test integration with different adapters
- Verify TypeScript types compile correctly
- Test responsive behavior
- Verify accessibility where applicable

## Documentation

Each feature must include:

- **config.md**: Installation instructions and dependencies
- **prompt.txt**: Integration instructions for AI assistants
- **Demo page**: Interactive demonstration
- **Type exports**: All types exported from `index.ts`

## Submission Process

1. Create a branch from `main` with a descriptive name
2. Make your changes following all guidelines
3. Test thoroughly in the sandbox environment
4. Update documentation as needed
5. Create a pull request with:
   - Clear description of changes
   - Reference to related issues if applicable
   - Screenshots or GIFs for UI changes
   - Checklist of completed requirements

## Review Process

Pull requests will be reviewed for:

- Adherence to Feature Constitution
- Code quality and patterns
- TypeScript correctness
- Documentation completeness
- Demo page quality
- Backward compatibility

## Questions

If you have questions about contributing:

1. Review existing features for examples
2. Read the Feature Constitution thoroughly
3. Check demo page guidelines
4. Open an issue for clarification

## Checklist

Before submitting, ensure:

- [ ] Feature follows Feature Constitution
- [ ] All types exported from `types.ts`
- [ ] Public API exported from `index.ts`
- [ ] Demo page follows demo.md guidelines
- [ ] Uses standard libraries only
- [ ] No application-specific dependencies
- [ ] Proper state management patterns
- [ ] Documentation complete
- [ ] TypeScript compiles without errors
- [ ] No emojis used
- [ ] No ellipses in loading text
- [ ] Follows naming conventions

