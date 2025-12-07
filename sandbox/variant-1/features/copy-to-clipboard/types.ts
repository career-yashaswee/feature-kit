import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

export interface CopyToClipboardProps extends VariantProps<
  typeof buttonVariants
> {
  text: string;
  html?: string;
  label?: string;
  successMessage?: string;
  errorMessage?: string;
  showIcon?: boolean;
  className?: string;
  onCopy?: (text: string) => void;
  onError?: (error: Error) => void;
}
