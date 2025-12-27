# Features

FeatureKit provides a comprehensive collection of standalone, extensible React components and features. Each feature is designed to work independently and can be integrated into any React application.

## Available Features

### Navigation

- **Scroll to Top**: Smooth animated scroll-to-top button that appears after scrolling
- **Scrollable Breadcrumbs**: Breadcrumb navigation with horizontal scrolling support
- **Table of Contents**: Automatic table of contents generation from markdown headings

### Forms and Input

- **Auto Save Form**: Form component with automatic saving and debouncing
- **Search Input**: Search input with fuzzy search and debouncing
- **Filter Sheet**: Filter panel with URL state management
- **Variant Select**: Component variant selector with state management

### Buttons and Actions

- **Export Button**: Export data to CSV or JSON with toast notifications
- **Refresh Button**: Button that invalidates React Query cache with loading states
- **Optimistic Action Button**: Button with optimistic UI updates
- **Stateful Button**: Button with multiple states (idle, loading, success, error)
- **Report Button**: Button for reporting content with confirmation
- **Share Button**: Share functionality with Web Share API fallback
- **Upgrade Button**: Button for subscription upgrades

### Status and Feedback

- **Network Status Listener**: Monitor network connectivity with toast notifications
- **Notification Shade**: Notification system with toast integration
- **Page Loader**: Full-page loading component with refresh capability
- **Empty States**: Configurable empty state components

### User Interface

- **User Card**: User profile card component
- **Domain Badge**: Badge component for domain display
- **Test Case Badge**: Badge for test case status display
- **Subscription Identifier**: Component for displaying subscription status
- **Health Bar**: Health bar component with animations
- **Circular Progress Score**: Circular progress indicator for scores

### Content Display

- **Grid Card**: Card component with grid layout
- **Unique Value Proposition**: UVP grid component
- **USP Table**: Unique selling points table
- **FAQ with Hints**: FAQ component with expandable hints
- **Card with Markdown Points**: Card component with markdown content
- **Text Truncation**: Text truncation component with expand/collapse

### Data Management

- **Active Devices**: Display and manage active devices
- **Daily Completion Calendar**: Calendar component for tracking daily completions
- **GitHub Contributions**: GitHub-style contribution graph
- **Quiz Statistics**: Statistics display for quiz results
- **Quiz Question Statistics**: Per-question statistics display

### Editor and Content

- **Persistence TipTap Editor**: Rich text editor with local storage and database sync
- **Resizable Panels**: Resizable panel component
- **Restore Scroll Position**: Component for restoring scroll position on navigation

### Utilities

- **Copy to Clipboard**: Copy-to-clipboard functionality with feedback
- **Share QR Code**: QR code generation for sharing
- **Keyboard Shortcuts**: Keyboard shortcut handler and display
- **Onboarding**: Onboarding flow component
- **Language Switcher**: Language switcher with i18n adapter support
- **Page Header**: Page header component with breadcrumbs and actions
- **Compare Alternatives**: Component for comparing multiple alternatives
- **Consequence Confirmation Dialog**: Confirmation dialog with consequence display

## Feature Categories

Features are organized by category for easier discovery:

- **Navigation**: Components for navigation and wayfinding
- **Forms and Input**: Form controls and input components
- **Buttons and Actions**: Interactive buttons and action components
- **Status and Feedback**: Status indicators and feedback components
- **User Interface**: UI components and display elements
- **Content Display**: Components for displaying content
- **Data Management**: Components for managing and displaying data
- **Editor and Content**: Rich text editing and content components
- **Utilities**: Utility components and helpers

## Feature Characteristics

All FeatureKit features share these characteristics:

### Standalone

Each feature works independently without requiring other FeatureKit components or application-specific code. Features accept all external data through props or adapters.

### Extensible

Features are designed to adapt to different use cases through:

- Configurable props
- Adapter patterns for external systems
- Pluggable providers
- Customizable styling

### Type-Safe

All features are fully typed with TypeScript. Types are exported from each feature's `index.ts` file for use in consuming applications.

### Well-Documented

Each feature includes:

- Installation instructions (`config.md`)
- Integration guide (`prompt.txt`)
- Interactive demo page
- Type definitions
- Usage examples

### Production-Ready

Features are built with:

- Proper error handling
- Loading states
- Accessibility considerations
- Performance optimizations
- Responsive design

## Using Features

### Installation

Each feature includes installation instructions in its `config.md` file. Generally, features require:

1. Installing dependencies
2. Copying component files
3. Setting up providers (if needed)
4. Importing and using the component

### Integration

Features can be integrated in multiple ways:

- **Direct Import**: Import components directly into your application
- **Adapter Pattern**: Use adapters to integrate with existing systems
- **Provider Pattern**: Configure providers for i18n, state management, etc.

### Customization

Features support customization through:

- Props for behavior and appearance
- CSS classes for styling
- Adapters for external integrations
- Provider configuration

## Finding Features

Features can be discovered through:

- **Web Application**: Browse features in the web application
- **Sandbox Demos**: Interactive demos in the sandbox environment
- **Feature List**: Complete list in `sandbox/variant-1/data/features.json`
- **Search**: Search by name, category, or functionality

## Feature Status

Features are marked with status badges:

- **New**: Recently added features
- **Updated**: Recently updated features
- **Stable**: Production-ready features

## Requesting Features

To request a new feature:

1. Check if a similar feature already exists
2. Open an issue describing the feature
3. Provide use cases and requirements
4. Discuss implementation approach

## Contributing Features

See [Contributing](./Contributing.md) for guidelines on creating and submitting new features.

