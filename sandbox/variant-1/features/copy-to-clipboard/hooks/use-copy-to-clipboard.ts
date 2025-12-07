import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";

export interface UseCopyToClipboardOptions {
  text: string;
  html?: string;
  successMessage?: string;
  errorMessage?: string;
  onCopy?: (text: string) => void;
  onError?: (error: Error) => void;
  resetDelay?: number;
}

export function useCopyToClipboard({
  text,
  html,
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy",
  onCopy,
  onError,
  resetDelay = 2000,
}: UseCopyToClipboardOptions) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, resetDelay);
      return () => clearTimeout(timer);
    }
  }, [copied, resetDelay]);

  const handleCopy = useCallback(async () => {
    try {
      setCopied(true);

      if (
        html &&
        typeof navigator !== "undefined" &&
        navigator.clipboard?.write
      ) {
        const clipboardItem = new ClipboardItem({
          "text/plain": new Blob([text], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        });
        await navigator.clipboard.write([clipboardItem]);
        toast.success(successMessage);
        onCopy?.(text);
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard?.writeText
      ) {
        await navigator.clipboard.writeText(text);
        toast.success(successMessage);
        onCopy?.(text);
      } else {
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
        } catch {
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
  }, [text, html, successMessage, errorMessage, onCopy, onError]);

  return {
    copied,
    handleCopy,
  };
}

