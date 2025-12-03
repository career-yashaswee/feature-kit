# Auto Save Form - Installation Guide

A form wrapper component that automatically saves form data with debouncing, localStorage backup, and visual status indicators.

## Dependencies

Required packages:

- `@uidotdev/usehooks` - Debouncing functionality
- `framer-motion` - Smooth animations for status indicators
- `sonner` - Toast notifications
- `lucide-react` - Icons for status indicators

## Quick Start

### Step 1: Copy the Component

Copy `auto-save-form.tsx` to your components directory:

```
components/auto-save-form.tsx
```

### Step 2: Use in Your Form

Wrap your form with the `AutoSaveForm` component:

```tsx
// app/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { AutoSaveForm } from "@/components/auto-save-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData extends Record<string, unknown> {
  title: string;
  description: string;
}

async function saveFormData(data: FormData, signal?: AbortSignal) {
  // Your save logic here
  await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(data),
    signal,
  });
}

export default function MyPage() {
  const { register, watch, reset } = useForm<FormData>({
    defaultValues: { title: "", description: "" },
  });

  const formData = watch();

  return (
    <AutoSaveForm
      data={formData}
      onSave={saveFormData}
      storageKey="my-form"
      debounceMs={1000}
      onLoadFromStorage={(loadedData) => {
        reset(loadedData);
      }}
    >
      <form>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        <Label htmlFor="description">Description</Label>
        <Input id="description" {...register("description")} />
      </form>
    </AutoSaveForm>
  );
}
```

**Important:** Include `Toaster` from `sonner` in your layout for toast notifications to work.

### Step 3: Done

The form automatically saves changes after the debounce period and shows status indicators.

## Customization

### Basic Usage

```tsx
<AutoSaveForm data={formData} onSave={saveFormData}>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### With localStorage Backup

```tsx
<AutoSaveForm
  data={formData}
  onSave={saveFormData}
  storageKey="my-form-data"
  onLoadFromStorage={(data) => {
    // Restore form data
    reset(data);
  }}
>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### Custom Debounce Time

```tsx
<AutoSaveForm data={formData} onSave={saveFormData} debounceMs={2000}>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### Custom Status Indicator Position

```tsx
<AutoSaveForm
  data={formData}
  onSave={saveFormData}
  indicatorPosition="bottom-left"
>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### Hide Status Indicator

```tsx
<AutoSaveForm data={formData} onSave={saveFormData} showIndicator={false}>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### Custom Messages

```tsx
<AutoSaveForm
  data={formData}
  onSave={saveFormData}
  successMessage="Your changes have been saved!"
  errorMessage="Oops! Something went wrong."
>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

### With Callbacks

```tsx
<AutoSaveForm
  data={formData}
  onSave={saveFormData}
  onSaveStart={() => console.log("Saving...")}
  onSaveSuccess={() => console.log("Saved!")}
  onSaveError={(error) => console.error("Error:", error)}
>
  <form>{/* Your form fields */}</form>
</AutoSaveForm>
```

## File Structure

```
your-project/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── auto-save-form.tsx
└── lib/
    └── utils.ts
```

## Testing

1. Type in the form fields
2. Wait for the debounce period (default: 1 second)
3. Status indicator should show "Saving..."
4. After save completes, indicator shows "Saved" or "Error"
5. Check localStorage for backup data (if storageKey is provided)

## Configuration

### TypeScript

The component is fully typed with generics. Your form data type must extend `Record<string, unknown>`:

```tsx
interface MyFormData extends Record<string, unknown> {
  field1: string;
  field2: number;
}
```

## Troubleshooting

### Status indicator not showing

- Ensure `showIndicator` is `true` (default)
- Check that `framer-motion` is installed: `npm list framer-motion`

### Toasts not showing

- Ensure `Toaster` from `sonner` is in your layout
- Verify `sonner` is installed: `npm list sonner`

### localStorage not working

- Check browser console for errors
- Ensure `storageKey` prop is provided
- Verify browser allows localStorage

### AbortSignal not working

- Ensure your `onSave` function accepts and handles the `signal` parameter
- Check that you're using the signal in fetch requests or other cancellable operations

## Props API

| Prop                | Type                                                           | Default                    | Description                             |
| ------------------- | -------------------------------------------------------------- | -------------------------- | --------------------------------------- |
| `children`          | `ReactNode`                                                    | -                          | Form content to wrap                    |
| `data`              | `T extends Record<string, unknown>`                            | -                          | Form data object to save                |
| `onSave`            | `(data: T, signal?: AbortSignal) => Promise<void> \| void`     | -                          | Function to save the data               |
| `debounceMs`        | `number`                                                       | `1000`                     | Debounce delay in milliseconds          |
| `storageKey`        | `string`                                                       | -                          | localStorage key for backup             |
| `onSaveStart`       | `() => void`                                                   | -                          | Callback when save starts               |
| `onSaveSuccess`     | `() => void`                                                   | -                          | Callback when save succeeds             |
| `onSaveError`       | `(error: Error) => void`                                       | -                          | Callback when save fails                |
| `onLoadFromStorage` | `(data: T) => void`                                            | -                          | Callback when loading from localStorage |
| `showIndicator`     | `boolean`                                                      | `true`                     | Show status indicator                   |
| `indicatorPosition` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"`              | Position of status indicator            |
| `successMessage`    | `string`                                                       | `"Changes saved"`          | Toast message on success                |
| `errorMessage`      | `string`                                                       | `"Failed to save changes"` | Toast message on error                  |

## Features

- Automatic debounced saving
- localStorage backup and restore
- Visual status indicators (saving, saved, error)
- Toast notifications
- AbortSignal support for cancellable requests
- Fully customizable messages and callbacks
- TypeScript support with generics
- Zero configuration required

## Use Cases

- User profile forms: Auto-save user information
- Content editors: Save drafts automatically
- Settings pages: Persist user preferences
- Long forms: Prevent data loss
- Multi-step forms: Save progress between steps
- Comment forms: Auto-save drafts
