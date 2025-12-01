"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={`Switch to ${i18n.language === "en" ? "Spanish" : "English"}`}
      className="h-9 w-9"
    >
      <Globe className="h-4 w-4" />
      <span className="sr-only">
        {i18n.language === "en" ? "Switch to Spanish" : "Switch to English"}
      </span>
    </Button>
  );
}
