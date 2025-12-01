"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const fallbackTranslations: Record<string, string> = {
  "error.somethingWentWrong": "Something went wrong",
  "error.unexpectedError": "An unexpected error occurred",
  "common.tryAgain": "Try Again",
};

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const translation = useTranslation();

  const t = (key: string) => {
    if (translation?.t && typeof translation.t === "function") {
      try {
        const translated = translation.t(key);
        return translated !== key
          ? translated
          : fallbackTranslations[key] || key;
      } catch {
        return fallbackTranslations[key] || key;
      }
    }
    return fallbackTranslations[key] || key;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-destructive mb-2">
          {t("error.somethingWentWrong")}
        </h2>
        <p className="text-muted-foreground mb-4">
          {error.message || t("error.unexpectedError")}
        </p>
        <Button onClick={resetErrorBoundary} variant="outline">
          {t("common.tryAgain")}
        </Button>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
