"use client";

import { useCallback, useState } from "react";
import { Download, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { stringify } from "csv-stringify/sync";
import { type VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExportButtonProps extends VariantProps<typeof buttonVariants> {
  fetchData: () => Promise<unknown[]>;
  filename?: string;
  resource?: string;
  label?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  showIcon?: boolean;
  format?: "csv" | "json";
}

function convertToCSV(data: unknown[]): string {
  if (!data.length) return "";

  try {
    return stringify(data, {
      header: true,
      cast: {
        boolean: (value) => String(value),
        date: (value) => value.toISOString(),
        number: (value) => String(value),
      },
    });
  } catch (error) {
    throw new Error("Failed to convert data to CSV");
  }
}

function convertToJSON(data: unknown[]): string {
  return JSON.stringify(data, null, 2);
}

function generateFilename(prefix: string, format: "csv" | "json"): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .slice(0, -5);

  return `${prefix}-${timestamp}.${format}`;
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export function ExportButton({
  fetchData,
  filename = "export",
  resource = "data",
  label,
  onSuccess,
  onError,
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
  format = "csv",
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const handleClick = useCallback(() => {
    if (isExporting) return;

    const exportPromise = (async () => {
      setIsExporting(true);
      setHasExported(false);

      try {
        const data = await fetchData();

        if (!Array.isArray(data) || !data.length) {
          throw new Error("No data available to export");
        }

        const content =
          format === "csv" ? convertToCSV(data) : convertToJSON(data);
        const mimeType =
          format === "csv"
            ? "text/csv;charset=utf-8;"
            : "application/json;charset=utf-8;";

        const blob = new Blob([content], { type: mimeType });
        const downloadFilename = generateFilename(filename, format);

        downloadFile(blob, downloadFilename);

        setHasExported(true);
        onSuccess?.();
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Export failed");
        onError?.(err);
        throw err;
      } finally {
        setIsExporting(false);
      }
    })();

    toast.promise(exportPromise, {
      loading: `Preparing ${resource} export...`,
      success: `${resource} exported successfully!`,
      error: `Failed to export ${resource}.`,
    });
  }, [fetchData, filename, resource, format, isExporting, onSuccess, onError]);

  const displayLabel = label ?? `Export ${format.toUpperCase()}`;

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isExporting}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <AnimatePresence mode="wait">
        {hasExported && !isExporting ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="h-4 w-4 shrink-0" />
          </motion.div>
        ) : showIcon ? (
          <motion.div
            key="download"
            animate={{ y: isExporting ? [0, -2, 0] : 0 }}
            transition={{ duration: 0.6, repeat: isExporting ? Infinity : 0 }}
          >
            <Download className="h-4 w-4 shrink-0" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      {displayLabel && <span className="hidden sm:inline">{displayLabel}</span>}
    </Button>
  );
}
