import type { ReactNode } from "react";

export interface OnboardingStep {
  id: string;
  order: number;
  title: string;
  description?: string;
}

export interface OnboardingTranslations {
  previous?: string;
  next?: string;
  skip?: string;
  complete?: string;
  doItLater?: string;
  havingTroubles?: string;
  getHelp?: string;
  onboardingSteps?: string;
}

export interface OnboardingBranding {
  name?: string;
  icon?: ReactNode;
  helpUrl?: string;
}

export interface OnboardingLayoutProps {
  children: ReactNode;
  steps: OnboardingStep[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip?: () => void;
  onSkipEntire?: () => void;
  isLoading?: boolean;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  canSkip?: boolean;
  translations?: OnboardingTranslations;
  branding?: OnboardingBranding;
  className?: string;
}

