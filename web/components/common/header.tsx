"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { useTranslation } from "react-i18next";
import { useKits } from "@/features/kits/hooks/use-kits";
import { useFeatures } from "@/features/features/hooks/use-features";
import { useProjects } from "@/features/showcases/hooks/use-projects";
import { Github, Twitter, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: kits = [] } = useKits();
  const { data: features = [] } = useFeatures();
  const { data: projects = [] } = useProjects();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src="https://res.cloudinary.com/dmkku8emk/image/upload/v1766850935/8_v0srfh.svg"
                  alt="FeatureKit Logo"
                />
                <AvatarFallback>FK</AvatarFallback>
              </Avatar>
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
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => router.push("/favorites")}
              aria-label="Favorites"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <AnimatedThemeToggler className="h-9 w-9" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
