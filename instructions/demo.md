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
  <CardDescription>
    Description text goes here
  </CardDescription>
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

### 3. Standard Card Sections

Every demo page should include:

1. **"How to Test" Card** - First card with testing instructions
2. **Example Cards** - Showcase different use cases
3. **Features Card** - Grid of feature highlights (2 columns on md+)

### 4. Testing Steps Format

```tsx
<ol className="space-y-3">
  {[
    "Step 1 description",
    "Step 2 description",
  ].map((step, index) => (
    <li
      key={index}
      className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {index + 1}
      </span>
      <span className="text-muted-foreground">{step}</span>
    </li>
  ))}
</ol>
```

### 5. Features Grid

```tsx
<div className="grid gap-4 md:grid-cols-2">
  {features.map((feature, index) => (
    <div
      key={index}
      className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
        <feature.icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="font-semibold">{feature.title}</h4>
        <p className="text-sm text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

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
```tsx
<Card className="border-2 shadow-lg">
  {/* Content */}
</Card>
```

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

## Checklist

When creating a demo page, ensure:
- [ ] Badges use `bg-secondary/80` for visibility
- [ ] All CardHeaders use the correct layout (icon + title horizontal, description below)
- [ ] "How to Test" card is the first card
- [ ] Testing steps use numbered list format
- [ ] Features grid uses 2 columns on md+ screens
- [ ] Consistent spacing (`gap-12` between sections, `gap-6` between cards)
- [ ] All icons are properly sized (h-4 w-4 for badges, h-5 w-5 for card headers)
- [ ] CardTitle uses `text-2xl mb-2` when followed by description
- [ ] **Only Phosphor Icons React is used** - no other icon libraries
- [ ] Icons are imported as named exports from `@phosphor-icons/react`
- [ ] Icon sizing follows demo page standards (h-3 w-3 for badges, h-5 w-5 for headers)

