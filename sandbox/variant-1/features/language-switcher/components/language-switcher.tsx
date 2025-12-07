"use client";

import { useCallback, useMemo, useTransition } from "react";
import { Check } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LanguageSwitcherProps } from "../types";

export function LanguageSwitcher({
  languages,
  currentLanguage,
  onLanguageChange,
  persistLanguage,
  className,
  size = "md",
  showLabel = false,
  adapter,
}: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();

  const adapterInstance = adapter || {
    currentLanguage,
    languages,
    onChange: onLanguageChange,
    persist: persistLanguage,
  };

  const current = adapterInstance.currentLanguage;
  const currentOption =
    adapterInstance.languages.find((lang) => lang.code === current) ||
    adapterInstance.languages[0];

  const handleChange = useCallback(
    (code: string) => {
      if (code === current) return;
      startTransition(() => {
        const result = adapterInstance.onChange(code);
        if (result instanceof Promise) {
          result.catch((error) => {
            console.error("Failed to change language:", error);
          });
        }
        adapterInstance.persist?.(code);
      });
    },
    [current, adapterInstance],
  );

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const flagSizeClasses = {
    sm: "h-3 w-5",
    md: "h-4 w-6",
    lg: "h-5 w-7",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(sizeClasses[size], "justify-center", className)}
          disabled={isPending}
        >
          <currentOption.flag
            title={currentOption.label}
            className={cn(flagSizeClasses[size], "rounded-sm shadow-sm")}
          />
          {showLabel && (
            <span className="ml-2 text-sm">{currentOption.label}</span>
          )}
          <span className="sr-only">{currentOption.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-fit">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        {adapterInstance.languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
          >
            <div className="flex items-center gap-2">
              {current === lang.code ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <div className="h-4 w-4" />
              )}
              <lang.flag
                title={lang.label}
                className={cn(flagSizeClasses[size], "rounded-sm shadow-sm")}
              />
              <span>{lang.label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
