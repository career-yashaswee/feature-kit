# Demo Page Creation Guidelines

## Overview

When creating demo pages for features, follow these consistent patterns to ensure a cohesive user experience across all demos.

## Structure

### 1. Hero Section

```tsx
<section className="space-y-6 text-center">
  <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
    <Icon className="h-4 w-4 text-primary" />
    <span className="text-sm font-medium">Feature Name</span>
  </div>
  <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
    Feature Name
  </h1>
  <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
    Feature description
  </p>
  <div className="flex flex-wrap items-center justify-center gap-2">
    <Badge variant="default" className="gap-1.5 bg-secondary/80">
      <Icon className="h-3 w-3" />
      Feature Tag
    </Badge>
  </div>
</section>
```

**Key Points:**

- Badges MUST use `bg-secondary/80 dark:bg-secondary/60` for better visibility in both light and dark modes
- Use appropriate icons for each badge
- Keep badge text concise (2-3 words)
- Example: `<Badge variant="default" className="gap-1.5 text-secondary bg-foreground dark:bg-secondary/60 dark:text-secondary-foreground">`

### 2. Card Headers Layout

**CRITICAL:** CardHeader layout must follow this exact structure:

**With Description:**

```tsx
<CardHeader className="space-y-3">
  <div className="flex items-start gap-3">
    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <CardTitle className="text-2xl">Title</CardTitle>
  </div>
  <CardDescription>Description text goes here</CardDescription>
</CardHeader>
```

**Without Description:**

```tsx
<CardHeader>
  <div className="flex items-start gap-3">
    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <CardTitle className="text-2xl">Title</CardTitle>
  </div>
</CardHeader>
```

**Layout Rules:**

- Apply `space-y-3` directly to CardHeader when description is present
- First row: Icon (with bounding box) + Title in a flex container
- Second row: Description as a direct child of CardHeader (NOT nested in wrapper div)
- Icon and title: `flex items-start gap-3` (NOT `items-center`)
- Icon container: `rounded-lg bg-primary/10 p-2 shrink-0`
- Title: `text-2xl` (NO `mb-2`)
- Description: Direct child of CardHeader, starts from left edge (after card padding)
- Description appears below both icon and title, aligned to card's left padding edge
- When no description, use simple flex layout without space-y on CardHeader

### 3. Standard Page Structure

Every demo page should follow this structure (in order):

1. **Live Demo Card** - Interactive component demonstration with real-time prop updates
2. **Props API Card** - Editable props table (use `PropsApiCard` component)
3. **How to Test Card** - Testing instructions (use `HowToTestCard` component)
4. **Example Cards** - Showcase different use cases and variants
5. **Features Glossary** - Grid of feature highlights (use `FeaturesGlossary` component)

**CRITICAL:** Always use the reusable components `PropsApiCard`, `HowToTestCard`, and `FeaturesGlossary` instead of manually implementing these sections. This ensures consistency and reduces code duplication.

### 4. Props API System (NEW)

**All demo pages with editable props must use the `usePropsApi` hook and `PropsApiCard` component.** This system provides a unified, type-safe way to manage and display component props.

#### Required Imports

```tsx
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import type { YourComponentProps } from "@/features/your-feature/types";
```

#### Setting Up Props Configuration

Define your props configuration using `initialConfig`:

```tsx
const initialConfig: PropConfig[] = [
  {
    property: "variant",
    type: '"default" | "outline" | "secondary"',
    description: "Visual variant of the component",
    defaultValue: "default",
    value: "default",
    inputType: "select",
    options: ["default", "outline", "secondary"],
    transform: (value) => value as YourComponentProps["variant"],
  },
  {
    property: "size",
    type: '"sm" | "md" | "lg"',
    description: "Size of the component",
    defaultValue: "md",
    value: "md",
    inputType: "select",
    options: ["sm", "md", "lg"],
    transform: (value) => value as YourComponentProps["size"],
  },
  {
    property: "disabled",
    type: "boolean",
    description: "Whether the component is disabled",
    defaultValue: false,
    value: false,
    inputType: "boolean",
  },
  {
    property: "label",
    type: "string",
    description: "Label text for the component",
    defaultValue: "Click me",
    value: "Click me",
    inputType: "text",
  },
  {
    property: "className",
    type: "string",
    description: "Additional CSS classes for custom styling",
    defaultValue: "",
    value: "",
    inputType: "text",
    skipIfEmpty: true, // Don't pass prop if empty
  },
];
```

#### PropConfig Interface

```tsx
interface PropConfig {
  property: string; // Property name (e.g., "variant", "size")
  type: string; // TypeScript type string (e.g., '"sm" | "md" | "lg"')
  description: string; // Description shown in props table
  defaultValue: string | number | boolean; // Default value
  value: string | number | boolean; // Current value
  inputType: "number" | "select" | "text" | "boolean"; // Input control type
  options?: string[]; // Required for "select" inputType
  skipIfEmpty?: boolean; // Skip prop if value is empty/null
  transform?: (value: string | number | boolean) => unknown; // Type transformation
}
```

#### Creating the Prop Map

Map property names to component prop keys:

```tsx
const propMap: Record<string, keyof YourComponentProps> = {
  variant: "variant",
  size: "size",
  disabled: "disabled",
  label: "label",
  className: "className",
};
```

#### Using the Hook

```tsx
const { props, handleValueChange, getComponentProps } =
  usePropsApi<YourComponentProps>({
    initialConfig,
    propMap,
  });
```

**Return Values:**

- `props`: Array of `PropConfig` objects (for `PropsApiCard`)
- `handleValueChange`: Function to update prop values
- `getComponentProps`: Memoized object with transformed props ready to spread

#### Live Demo Section

```tsx
{
  /* Live Demo */
}
<BaseCard>
  <CardHeader>
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-primary/10 p-2">
        <Lightning className="h-5 w-5 text-primary" />
      </div>
      <CardTitle className="text-2xl">Live Demo</CardTitle>
    </div>
    <CardDescription>
      See the component update in real-time as you change props below. Note:
      Complex props like `onClick`, `data`, and `renderItem` are not editable
      here.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <YourComponent
      {...getComponentProps}
      // Complex props that aren't editable
      onClick={() => console.log("Clicked")}
      data={sampleData}
    />
  </CardContent>
</BaseCard>;
```

#### Props API Card Section

```tsx
{
  /* Props API Card */
}
<PropsApiCard
  props={props}
  onValueChange={handleValueChange}
  description="Interact with the table below to customize the component in real-time. Note: Complex props like `onClick`, `data`, and `renderItem` are not editable here."
/>;
```

#### Best Practices

1. **Type Safety**: Always use `transform` functions for enum/union types:

   ```tsx
   transform: (value) => value as YourComponentProps["variant"];
   ```

2. **Optional Props**: Use `skipIfEmpty: true` for optional string props:

   ```tsx
   {
     property: "className",
     skipIfEmpty: true, // Won't pass prop if empty
   }
   ```

3. **Complex Props**: Don't include complex props (functions, objects, arrays, ReactNode) in `initialConfig`. Document them in the description instead.

4. **Default Values**: Always provide sensible defaults that match the component's actual defaults.

5. **Spreading Props**: Always spread `getComponentProps` last to allow overrides:
   ```tsx
   <YourComponent
     customProp="value"
     {...getComponentProps} // Spread last
   />
   ```

### 5. How to Test Card (Using Reusable Component)

**Always use the `HowToTestCard` component** instead of manually creating the testing steps section. The component automatically handles styling, numbering, and layout.

#### Required Imports

```tsx
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { CursorClick } from "@phosphor-icons/react";
```

#### Using Data from features.json (Recommended)

First, add your feature data to `sandbox/variant-1/data/features.json`:

```json
{
  "name": "Your Feature Name",
  "path": "/your-feature-path",
  "icon": "YourIcon",
  "howToTest": {
    "steps": ["Step 1 description", "Step 2 description", "Step 3 description"],
    "conclusion": "Optional conclusion text explaining what users should expect"
  },
  "features": [
    {
      "icon": "IconName",
      "title": "Feature Title",
      "description": "Feature description"
    }
  ]
}
```

Then use it in your component:

```tsx
{
  (() => {
    const featureData = featuresData.find(
      (f) => f.path === "/your-feature-path"
    );
    if (featureData?.howToTest) {
      return (
        <HowToTestCard
          steps={featureData.howToTest.steps}
          conclusion={featureData.howToTest.conclusion}
          icon={<CursorClick className="h-5 w-5 text-primary" />}
        />
      );
    }
    return null;
  })();
}
```

#### Fallback to Local Data

If data is not available in `features.json`, provide local fallback:

```tsx
{
  (() => {
    const featureData = featuresData.find(
      (f) => f.path === "/your-feature-path"
    );
    if (featureData?.howToTest) {
      return (
        <HowToTestCard
          steps={featureData.howToTest.steps}
          conclusion={featureData.howToTest.conclusion}
          icon={<CursorClick className="h-5 w-5 text-primary" />}
        />
      );
    }
    return (
      <HowToTestCard
        steps={["Step 1 description", "Step 2 description"]}
        conclusion="Optional conclusion text"
        icon={<CursorClick className="h-5 w-5 text-primary" />}
      />
    );
  })();
}
```

### 6. Features Glossary (Using Reusable Component)

**Always use the `FeaturesGlossary` component** instead of manually creating the features grid. The component automatically handles the 2-column grid layout and styling.

#### Using Data from features.json (Recommended)

```tsx
{
  (() => {
    const featureData = featuresData.find(
      (f) => f.path === "/your-feature-path"
    );
    if (featureData?.features) {
      const featuresWithIcons = featureData.features.map((feature) => ({
        icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
        title: feature.title,
        description: feature.description,
      }));
      return <FeaturesGlossary features={featuresWithIcons} />;
    }
    return null;
  })();
}
```

#### Fallback to Local Data

If you have local feature definitions with icon components:

```tsx
const features = [
  {
    title: "Feature Title",
    description: "Feature description",
    icon: Lightning, // Direct icon component
  },
];

// In your JSX:
{
  (() => {
    const featureData = featuresData.find(
      (f) => f.path === "/your-feature-path"
    );
    if (featureData?.features) {
      const featuresWithIcons = featureData.features.map((feature) => ({
        icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
        title: feature.title,
        description: feature.description,
      }));
      return <FeaturesGlossary features={featuresWithIcons} />;
    }
    const defaultFeatures = features.map((feature) => ({
      icon: <feature.icon className="h-5 w-5 text-primary" />,
      title: feature.title,
      description: feature.description,
    }));
    return <FeaturesGlossary features={defaultFeatures} />;
  })();
}
```

#### Icon Rendering

- **From features.json**: Use `renderIcon(feature.icon, "h-5 w-5 text-primary")` where `feature.icon` is a string (e.g., "Lightning", "Gear")
- **From local components**: Use `<feature.icon className="h-5 w-5 text-primary" />` where `feature.icon` is a Phosphor icon component

## Common Patterns

### Main Container

```tsx
<div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
  <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
    {/* Content */}
  </main>
</div>
```

### Card Styling

**CRITICAL:** Always use `BaseCard` instead of `Card` with className. The `BaseCard` component provides consistent styling and hover animations.

```tsx
import { BaseCard } from "@/components/base-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<BaseCard>
  <CardHeader>{/* Header content */}</CardHeader>
  <CardContent>{/* Content */}</CardContent>
</BaseCard>;
```

**Key Points:**

- Import `BaseCard` from `@/components/base-card`
- Import card sub-components (`CardHeader`, `CardContent`, etc.) from `@/components/ui/card`
- Do NOT use `Card` with `className="border-2 shadow-lg"` - use `BaseCard` instead
- `BaseCard` automatically handles hover animations and consistent styling

## Icon Usage Guidelines

### Phosphor Icons React Only

**All demo pages must use Phosphor Icons React exclusively.** No other icon libraries should be used in demo pages.

- **Package**: `@phosphor-icons/react`
- **Installation**: `npm i @phosphor-icons/react`
- **Import Pattern**: Import only the icons you need as named exports
- **Usage**: Use icons as React components with props

#### Basic Import and Usage

```typescript
import { Smiley, Heart, Horse, Lightning, Gear } from "@phosphor-icons/react";

const DemoPage = () => {
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

#### Demo Page Icon Sizing Standards

- **Hero Section Badge Icons**: `h-4 w-4` (16px)
- **Card Header Icons**: `h-5 w-5` (20px)
- **Feature Grid Icons**: `h-5 w-5` (20px)
- **Badge Icons**: `h-3 w-3` (12px)

#### Best Practices for Demo Pages

- **Tree-shaking**: Import only needed icons to keep bundle size small
- **Naming**: Icon names follow PascalCase (e.g., `ArrowRight`, `CheckCircle`, `Lightning`)
- **Default weight**: Icons default to `"regular"` weight if not specified
- **Size**: Use numbers for pixel values (e.g., `size={24}` or `className="h-5 w-5"`)
- **Color**: Use `currentColor` or `text-primary` to inherit text color from parent
- **Accessibility**: Always provide `alt` text for icon-only buttons or interactive elements

#### Example: Icons in Demo Page

```typescript
import { Lightning, Gear, Sparkle, CheckCircle } from "@phosphor-icons/react";

// Hero section badge
<Badge variant="default" className="gap-1.5 bg-secondary/80">
  <Lightning className="h-3 w-3" />
  Fast
</Badge>

// Card header icon
<div className="rounded-lg bg-primary/10 p-2 shrink-0">
  <Gear className="h-5 w-5 text-primary" />
</div>

// Feature grid icon
<div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
  <Sparkle className="h-5 w-5 text-primary" />
</div>
```

#### Optimization for Next.js

For Next.js 13+ projects, add to `next.config.js`:

```javascript
module.exports = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};
```

## Data Management with features.json

### Adding Feature Data

When creating a new demo page, add the feature metadata to `sandbox/variant-1/data/features.json`:

```json
{
  "name": "Feature Name",
  "path": "/feature-path",
  "icon": "IconName",
  "summary": "Brief summary",
  "description": "Full description",
  "category": "Category",
  "statusBadge": "New",
  "lastUpdatedAt": "2024-01-15T10:30:00Z",
  "howToTest": {
    "steps": ["Step 1", "Step 2", "Step 3"],
    "conclusion": "Optional conclusion text"
  },
  "features": [
    {
      "icon": "IconName",
      "title": "Feature Title",
      "description": "Feature description"
    }
  ]
}
```

### Icon Names in features.json

- Use string names matching Phosphor icon component names (e.g., "Lightning", "Gear", "Sparkle")
- These will be converted to icon components using the `renderIcon` utility
- Icon names are case-sensitive and must match exactly

## Complete Example

Here's a complete example of a demo page using the new structure:

```tsx
"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Lightning, CursorClick } from "@phosphor-icons/react";
import { YourComponent } from "@/features/your-feature/components/your-component";
import type { YourComponentProps } from "@/features/your-feature/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";

export default function YourFeaturePage() {
  // Optional: Keep demo-specific state separate from props
  const [demoState, setDemoState] = useState(false);

  // Define props configuration
  const initialConfig: PropConfig[] = [
    {
      property: "variant",
      type: '"default" | "outline"',
      description: "Visual variant",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "outline"],
      transform: (value) => value as YourComponentProps["variant"],
    },
    {
      property: "disabled",
      type: "boolean",
      description: "Whether disabled",
      defaultValue: false,
      value: false,
      inputType: "boolean",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  // Map properties to component props
  const propMap: Record<string, keyof YourComponentProps> = {
    variant: "variant",
    disabled: "disabled",
    className: "className",
  };

  // Use the hook
  const { props, handleValueChange, getComponentProps } =
    usePropsApi<YourComponentProps>({
      initialConfig,
      propMap,
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Live Demo */}
        <BaseCard>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the component update in real-time as you change props below.
              Note: Complex props are not editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YourComponent
              {...getComponentProps}
              onAction={() => console.log("Action")}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time."
        />

        {/* How to Test */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/your-feature"
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return null;
        })()}

        {/* Example Cards */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Example Usage</CardTitle>
            </div>
            <CardDescription>
              Different examples of the component
            </CardDescription>
          </CardHeader>
          <CardContent>{/* Your examples */}</CardContent>
        </BaseCard>

        {/* Features Glossary */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/your-feature"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          return null;
        })()}
      </main>
    </div>
  );
}
```

## Checklist

When creating a demo page, ensure:

- [ ] **Use `BaseCard` instead of `Card`** - Import from `@/components/base-card`
- [ ] **Live Demo section is first** - Shows interactive component with real-time updates
- [ ] **Props API Card follows Live Demo** - Uses `PropsApiCard` component
- [ ] **`usePropsApi` hook is used** - For all editable props
- [ ] **`initialConfig` is properly defined** - With all editable props
- [ ] **`propMap` maps properties correctly** - Links config to component props
- [ ] **Type transforms are used** - For enum/union types with `transform` function
- [ ] **`skipIfEmpty` is used** - For optional string props
- [ ] Badges use `bg-secondary/80` for visibility
- [ ] All CardHeaders use the correct layout (icon + title horizontal, description below)
- [ ] **"How to Test" card uses `HowToTestCard` component** (not manual implementation)
- [ ] **Features section uses `FeaturesGlossary` component** (not manual implementation)
- [ ] Feature data is added to `features.json` when available
- [ ] Components check `features.json` first, then fallback to local data
- [ ] `renderIcon` utility is used for string-based icons from `features.json`
- [ ] Consistent spacing (`gap-12` between sections, `gap-6` between cards)
- [ ] All icons are properly sized (h-4 w-4 for badges, h-5 w-5 for card headers)
- [ ] **Only Phosphor Icons React is used** - no other icon libraries
- [ ] Icons are imported as named exports from `@phosphor-icons/react`
- [ ] Icon sizing follows demo page standards (h-3 w-3 for badges, h-5 w-5 for headers)
- [ ] Required imports are added: `usePropsApi`, `PropsApiCard`, `BaseCard`, `HowToTestCard`, `FeaturesGlossary`, `renderIcon`, `featuresData`
