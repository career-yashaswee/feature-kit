"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Translate, Globe, Lightning } from "@phosphor-icons/react";
import { LanguageSwitcher } from "@/features/language-switcher/components/language-switcher";
import type { Language } from "@/features/language-switcher/types";
import { GB, US, IN, FR, DE, ES } from "country-flag-icons/react/3x2";

const sampleLanguages: Language[] = [
  { code: "en", label: "English", flag: GB },
  { code: "en-US", label: "English (US)", flag: US },
  { code: "hi", label: "हिंदी", flag: IN },
  { code: "fr", label: "Français", flag: FR },
  { code: "de", label: "Deutsch", flag: DE },
  { code: "es", label: "Español", flag: ES },
];

const features = [
  {
    title: "Adapter Pattern",
    description: "Works with i18next, react-intl, or custom implementations",
    icon: Globe,
  },
  {
    title: "Country Flags",
    description: "Visual flag indicators using country-flag-icons",
    icon: Translate,
  },
  {
    title: "Configurable",
    description: "Customizable persistence, sizes, and behavior",
    icon: Lightning,
  },
];

export default function LanguageSwitcherPage() {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("demo-language");
      return saved || "en";
    }
    return "en";
  });
  const [persistedLang, setPersistedLang] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("demo-language");
    }
    return null;
  });

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("demo-language", code);
      setPersistedLang(code);
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <Translate className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Language Switcher</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Language Switcher
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A flexible language switcher with adapter pattern support for
            various i18n libraries and configurable persistence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Globe className="h-3 w-3" />
              i18n
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <Translate className="h-3 w-3" />
              Flags
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Languages className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the Language Switcher component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Click the language switcher button to open the dropdown",
                "Select a different language from the list",
                "Notice the flag icon changes to match the selected language",
                "Check that the language persists after page refresh",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Languages className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Basic Usage</CardTitle>
            </div>
            <CardDescription>
              Simple language switcher with manual state management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <LanguageSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                persistLanguage={(code) => {
                  localStorage.setItem("demo-language", code);
                }}
              />
              <div className="text-sm text-muted-foreground">
                Current: <span className="font-medium">{currentLang}</span>
              </div>
            </div>
            {persistedLang && (
              <p className="text-xs text-muted-foreground">
                Persisted language: {persistedLang} (stored in localStorage)
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Languages className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Different Sizes</CardTitle>
            </div>
            <CardDescription>
              Language switcher available in multiple sizes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <LanguageSwitcher
                languages={sampleLanguages.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="sm"
              />
              <LanguageSwitcher
                languages={sampleLanguages.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="md"
              />
              <LanguageSwitcher
                languages={sampleLanguages.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
