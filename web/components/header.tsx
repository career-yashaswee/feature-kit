'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          {t("header.title")}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4" aria-label="Main navigation">
            <Button variant="ghost" asChild>
              <Link href="/" aria-label={t("header.homeAria")}>
                {t("header.home")}
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/kits" aria-label={t("header.kitsAria")}>
                {t("header.kits")}
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/features" aria-label={t("header.featuresAria")}>
                {t("header.features")}
              </Link>
            </Button>
          </nav>
          <AnimatedThemeToggler className="h-9 w-9" />
        </div>
      </div>
    </header>
  );
}
