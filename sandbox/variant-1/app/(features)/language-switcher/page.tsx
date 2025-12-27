"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Translate, Globe, Lightning, CursorClick } from "@phosphor-icons/react";
import { LanguageSwitcher } from "@/features/language-switcher/components/language-switcher";
import type { Language } from "@/features/language-switcher/types";
import { GB, US, IN, FR, DE, ES } from "country-flag-icons/react/3x2";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

const sampleTranslate: Language[] = [
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
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/language-switcher"
          );
          if (featureData?.howToTest) {
            return (
              <HowToTestCard
                steps={featureData.howToTest.steps}
                conclusion={featureData.howToTest.conclusion}
                icon={<CursorClick className="h-5 w-5 text-primary" />}
              />
            );
          }
          return (
            <HowToTestCard
              steps={[
                "Click the language switcher button to open the dropdown",
                "Select a different language from the list",
                "Notice the flag icon changes to match the selected language",
                "Check that the language persists after page refresh",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Translate className="h-5 w-5 text-primary" />
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
                languages={sampleTranslate}
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
                <Translate className="h-5 w-5 text-primary" />
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
                languages={sampleTranslate.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="sm"
              />
              <LanguageSwitcher
                languages={sampleTranslate.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="md"
              />
              <LanguageSwitcher
                languages={sampleTranslate.slice(0, 3)}
                currentLanguage={currentLang}
                onLanguageChange={handleLanguageChange}
                size="lg"
              />
            </div>
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/language-switcher"
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = features.map((feature) => ({
            icon: <feature.icon className="h-5 w-5 text-primary" />,
            title: feature.title,
            description: feature.description,
          }));
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
