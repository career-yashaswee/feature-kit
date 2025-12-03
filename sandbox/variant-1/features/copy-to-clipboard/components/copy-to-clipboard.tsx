"use client";

import { useCallback, useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { type VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps extends VariantProps<typeof buttonVariants> {
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

export function CopyToClipboard({
  text,
  html,
  label,
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy",
  showIcon = true,
  variant = "outline",
  size = "sm",
  className,
  onCopy,
  onError,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      // Immediately set copied state for snappy animation
      setCopied(true);

      if (html && typeof navigator !== "undefined" && navigator.clipboard?.write) {
        const clipboardItem = new ClipboardItem({
          "text/plain": new Blob([text], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        });
        await navigator.clipboard.write([clipboardItem]);
        toast.success(successMessage);
        onCopy?.(text);
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        toast.success(successMessage);
        onCopy?.(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success(successMessage);
          onCopy?.(text);
        } catch (err) {
          throw new Error("Copy failed");
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      setCopied(false);
      const err = error instanceof Error ? error : new Error("Copy failed");
      toast.error(errorMessage);
      onError?.(err);
    }
  }, [
    text,
    html,
    successMessage,
    errorMessage,
    onCopy,
    onError,
  ]);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Check className="h-4 w-4 shrink-0" />
          </motion.div>
        ) : showIcon ? (
          <motion.div
            key="copy"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Copy className="h-4 w-4 shrink-0" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {label && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}

