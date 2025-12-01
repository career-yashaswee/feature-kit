"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "react-i18next";
import { useKits } from "@/features/kits/hooks/use-kits";
import { useFeatures } from "@/features/features/hooks/use-features";
import { useProjects } from "@/features/showcases/hooks/use-projects";
import { useFavoritesStore } from "@/features/favorites/store/use-favorites-store";
import { Github, Twitter } from "lucide-react";

export function Header() {
  const { t } = useTranslation();
  const { data: kits = [] } = useKits();
  const { data: features = [] } = useFeatures();
  const { data: projects = [] } = useProjects();
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
            >
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">
                  FK
                </span>
              </div>
              <span>{t("header.title")}</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <nav
              className="flex items-center gap-4"
              aria-label="Main navigation"
            >
              <Button variant="ghost" asChild className="h-9">
                <Link
                  href="/kits"
                  className="flex items-center gap-2"
                  aria-label={t("header.kitsAria")}
                >
                  {t("header.kits")}
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 px-1.5 text-xs"
                  >
                    {kits.length}
                  </Badge>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="h-9">
                <Link
                  href="/features"
                  className="flex items-center gap-2"
                  aria-label={t("header.featuresAria")}
                >
                  {t("header.features")}
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 px-1.5 text-xs"
                  >
                    {features.length}
                  </Badge>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="h-9">
                <Link
                  href="/showcases"
                  className="flex items-center gap-2"
                  aria-label="Showcases"
                >
                  Showcases
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 px-1.5 text-xs"
                  >
                    {projects.length}
                  </Badge>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="h-9">
                <Link
                  href="/favorites"
                  className="flex items-center gap-2"
                  aria-label="Favorites"
                >
                  Favorites
                  <Badge
                    variant="secondary"
                    className="h-5 min-w-5 px-1.5 text-xs"
                  >
                    {favorites.length}
                  </Badge>
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="h-9 gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" asChild className="h-9 gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <div className="h-6 w-px bg-border" />
            <AnimatedThemeToggler className="h-9 w-9" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
