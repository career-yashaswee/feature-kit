import { type ComponentType } from "react";

export interface Language {
  code: string;
  label: string;
  flag: ComponentType<{ className?: string; title?: string }>;
}

export interface LanguageSwitcherAdapter {
  currentLanguage: string;
  languages: Language[];
  onChange: (languageCode: string) => void | Promise<void>;
  persist?: (languageCode: string) => void;
}

export interface LanguageSwitcherProps {
  languages: Language[];
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void | Promise<void>;
  persistLanguage?: (languageCode: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  adapter?: LanguageSwitcherAdapter;
}

