# Scroll To Top Button - Installation Guide

A smooth, animated scroll-to-top button that appears after scrolling down and smoothly takes users back to the top of the page.

## Dependencies

Required packages:

- `@uidotdev/usehooks` - Window scroll state detection
- `framer-motion` - Smooth animations for button visibility
- `lucide-react` (optional) - For icon usage

## Quick Start

### Step 1: Copy the Component

Copy `scroll-to-top-button.tsx` to your components directory:

```
components/scroll-to-top-button.tsx
```

### Step 2: Add to Your Page or Layout

Import and use the component in any page or layout:

```tsx
// app/page.tsx or app/layout.tsx
import { ScrollToTopButton } from "@/components/scroll-to-top-button";

export default function HomePage() {
  return (
    <div>
      {/* Your page content */}
      <ScrollToTopButton />
    </div>
  );
}
```

**Note:** The component is client-side only (`"use client"`), so ensure it's used in a client component or page.

### Step 3: Done

The button automatically appears after scrolling down and smoothly scrolls back to top when clicked.

## Customization

### Basic Usage

```tsx
<ScrollToTopButton />
```

### Custom Threshold

Control when the button appears (default: 300px):

```tsx
<ScrollToTopButton threshold={500} />
```

### Custom Position

Position the button on the left, center, or right:

```tsx
<ScrollToTopButton position="left" />
<ScrollToTopButton position="center" />
<ScrollToTopButton position="right" />
```

### Custom Content

Replace the default "Top" text with an icon or custom content:

```tsx
import { ArrowUp } from "lucide-react";

<ScrollToTopButton>
  <ArrowUp className="w-4 h-4" />
</ScrollToTopButton>
```

Or with emoji:

```tsx
<ScrollToTopButton>↑</ScrollToTopButton>
```

### Custom Styling

Apply custom className to the button:

```tsx
<ScrollToTopButton className="bg-blue-500 hover:bg-blue-600" />
```

### Complete Example

```tsx
<ScrollToTopButton
  threshold={400}
  position="center"
  className="bg-linear-to-r from-purple-500 to-pink-500"
>
  <ArrowUp className="w-5 h-5" />
</ScrollToTopButton>
```

## File Structure

```
your-project/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── scroll-to-top-button.tsx
│   └── ui/
│       └── button.tsx
└── lib/
    └── utils.ts
```

## Testing

1. Navigate to a page with long content
2. Scroll down at least 300px (or your custom threshold)
3. Button should appear with smooth animation
4. Click the button to smoothly scroll back to top
5. Button should disappear when scrolled back to top

## Configuration

### TypeScript

The component is fully typed. No additional type definitions needed.

## Troubleshooting

### Button not appearing

- Ensure you've scrolled past the threshold (default: 300px)
- Check that the page has enough content to scroll
- Verify `@uidotdev/usehooks` is installed: `npm list @uidotdev/usehooks`

### Animation not working

- Ensure `framer-motion` is installed: `npm list framer-motion`
- Check browser console for errors

### Scroll not smooth

- Uses native browser smooth scrolling via `useWindowScroll`
- Some browsers may not support smooth scrolling
- Ensure you're using a modern browser

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `300` | Scroll distance (in pixels) after which button becomes visible |
| `children` | `ReactNode` | `"Top"` | Custom content for the button (icon, text, or component) |
| `position` | `"left" \| "center" \| "right"` | `"right"` | Horizontal alignment of the button |
| `className` | `string` | - | Additional CSS classes applied to the button |

## Features

- Smooth scroll animation using native browser behavior
- Framer Motion animations for button visibility
- Fully customizable positioning and styling
- TypeScript support
- Zero configuration required
- Accessible with proper ARIA labels

## Use Cases

- Long blog posts: Help users quickly return to top
- Documentation sites: Navigate back to table of contents
- E-commerce product pages: Return to top after browsing
- Portfolio websites: Smooth navigation experience
- Landing pages: Improve user experience on long pages
- Single-page applications: Essential for content-heavy pages

