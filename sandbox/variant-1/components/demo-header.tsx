"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { House, Lightning, Book, GithubLogo } from "@phosphor-icons/react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ScrollableBreadcrumb } from "@/features/scrollable-breadcrumbs";
import type { BreadcrumbItem } from "@/features/scrollable-breadcrumbs/types";
import { GB, US, FR, DE, ES } from "country-flag-icons/react/3x2";
import type { Language } from "@/features/language-switcher/types";

const languages: Language[] = [
  { code: "en", label: "English", flag: GB },
  { code: "fr", label: "Français", flag: FR },
  { code: "de", label: "Deutsch", flag: DE },
  { code: "es", label: "Español", flag: ES },
];

export function DemoHeader() {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return saved || "en";
    }
    return "en";
  });

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", code);
    }
  };

  const breadcrumbItems = useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      {
        href: "/",
        label: "Home",
        icon: House,
      },
    ];

    if (pathname && pathname !== "/") {
      const segments = pathname.split("/").filter(Boolean);
      segments.forEach((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label =
          segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") || segment;
        items.push({
          href,
          label,
          icon: index === segments.length - 1 ? Lightning : undefined,
        });
      });
    }

    return items;
  }, [pathname]);

  const renderBreadcrumbLink = (
    item: BreadcrumbItem,
    children: React.ReactNode
  ) => {
    return (
      <Link
        href={item.href}
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <div className="flex items-center gap-2 shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://res.cloudinary.com/dmkku8emk/image/upload/v1765140248/feature-kit_kry0dd.png"
              alt="FeatureKit Logo"
            />
            <AvatarFallback>FK</AvatarFallback>
          </Avatar>

          <Link
            href="/"
            className="text-lg font-semibold transition-colors hover:text-primary cursor-pointer whitespace-nowrap"
          >
            FeatureKit
          </Link>
        </div>
        <div className="flex-1 min-w-0">
          <ScrollableBreadcrumb
            items={breadcrumbItems}
            renderLink={renderBreadcrumbLink}
            className="h-9"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link
              href="https://docs.featurekit.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Documentation"
            >
              <Book className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link
              href="https://github.com/featurekit/featurekit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubLogo className="h-4 w-4" />
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <LanguageSwitcher
            languages={languages}
            currentLanguage={currentLang}
            onLanguageChange={handleLanguageChange}
            persistLanguage={(code) => {
              if (typeof window !== "undefined") {
                localStorage.setItem("language", code);
              }
            }}
            size="md"
          />
          <AnimatedThemeToggler className="h-9 w-9" />
        </div>
      </div>
    </header>
  );
}
