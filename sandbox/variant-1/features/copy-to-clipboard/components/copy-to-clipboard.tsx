"use client";

import { Check, CopySimple as Copy } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CopyToClipboardProps } from "../types";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";

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
  const { copied, handleCopy } = useCopyToClipboard({
    text,
    html,
    successMessage,
    errorMessage,
    onCopy,
    onError,
  });

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
