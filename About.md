# About FeatureKit

FeatureKit is a collection of standalone, extensible React components and features designed for modern web applications. Each feature is built to be independent, reusable, and adaptable to different use cases without modification.

## Philosophy

FeatureKit follows a strict set of principles to ensure components are production-ready, maintainable, and easy to integrate:

- **Standalone**: Features work independently without hard dependencies on application-specific code
- **Extensible**: Components adapt to larger use cases through props and adapter patterns
- **Type-Safe**: Full TypeScript support with strict typing
- **Standard Libraries**: Uses established, well-maintained npm packages
- **Pluggable**: Supports multiple provider implementations via adapters
- **Robust**: Comprehensive state management with proper error handling

## Architecture

FeatureKit consists of three main parts:

### Sandbox

The sandbox (`sandbox/variant-1`) serves as a development and demonstration environment. It contains:

- Interactive demo pages for each feature
- Live prop editors for testing component behavior
- Example implementations and use cases
- Testing utilities and documentation

### Web Application

The web application (`web`) is a production-ready showcase platform that:

- Displays all available features
- Provides search and filtering capabilities
- Manages feature metadata and categorization
- Serves as a reference implementation

### Features

Features are located in `sandbox/variant-1/features/`. Each feature follows a consistent structure:

```
features/
  {feature-name}/
    components/
      {feature-name}.tsx
    hooks/
      use-{feature-name}.ts
    adapters/
      {adapter-name}.ts
    types.ts
    index.ts
    config.md
    prompt.txt
```

## Technology Stack

FeatureKit is built with modern web technologies:

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript with strict configuration
- **State Management**: TanStack Query for server state, Zustand for client state
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Icons**: Phosphor Icons React
- **Animations**: Framer Motion
- **Notifications**: Sonner

## Standards and Guidelines

All features must adhere to the Feature Constitution, which defines:

- Component architecture patterns
- Naming conventions
- State management guidelines
- Integration patterns
- Code quality standards

The Feature Constitution is located in `instructions/feature-constitution.md` and serves as the definitive guide for creating and maintaining features.

## Use Cases

FeatureKit components are suitable for:

- Building new applications with pre-built, tested components
- Learning modern React patterns and best practices
- Prototyping features quickly
- Creating consistent UI patterns across projects
- Extending existing applications with new functionality

## Development Model

FeatureKit uses a development model that emphasizes:

- **Documentation First**: Each feature includes installation guides and integration instructions
- **Demo-Driven**: Interactive demos showcase functionality and usage
- **Type Safety**: Full TypeScript coverage ensures reliability
- **Testing**: Components are tested in isolation and in context
- **Extensibility**: Adapter patterns allow integration with different systems

## Community

FeatureKit is designed to be extended and improved by the community. Contributions follow established patterns and guidelines to maintain consistency and quality across all features.

