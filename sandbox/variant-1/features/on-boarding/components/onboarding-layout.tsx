"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Spinner,
  ArrowLeft,
  ArrowRight,
  SkipForward,
  List,
  X,
  MagicWand,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { OnboardingLayoutProps } from "../types";

const defaultTranslations = {
  previous: "Previous",
  next: "Next",
  skip: "Skip",
  complete: "Complete",
  doItLater: "Do it later",
  havingTroubles: "Having troubles?",
  getHelp: "Get help",
  onboardingSteps: "Onboarding Steps",
};

export function OnboardingLayout({
  children,
  steps,
  currentStep,
  onNext,
  onPrevious,
  onSkip,
  onSkipEntire,
  isLoading = false,
  canGoNext = true,
  canGoPrevious = true,
  canSkip = false,
  translations = {},
  branding,
  className,
}: OnboardingLayoutProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const t = { ...defaultTranslations, ...translations };
  const brandName = branding?.name || "App";
  const brandIcon = branding?.icon || (
    <MagicWand className="w-5 h-5 text-white" />
  );
  const helpUrl = branding?.helpUrl;

  const currentStepData = steps.find((step) => step.order === currentStep);
  const isLastStep = currentStep === steps.length;
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div
      className={cn(
        "min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        className,
      )}
    >
      <div className="flex h-screen flex-col lg:flex-row">
        {/* Left Sidebar - Stepper */}
        <div className="w-full lg:w-2/6 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col lg:h-full">
          {/* Branding */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  {brandIcon}
                </div>
                <span className="text-[32px] font-bold leading-none text-slate-900 dark:text-white">
                  {brandName}
                </span>
              </div>

              {/* Mobile: Help Link and Menu Button */}
              {helpUrl && (
                <div className="lg:hidden flex items-center gap-2">
                  <a
                    href={helpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                  >
                    {t.havingTroubles}{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {t.getHelp}
                    </span>
                  </a>

                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <List className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            {brandIcon}
                          </div>
                          <span className="text-[32px] font-bold leading-none">
                            {brandName}
                          </span>
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4 px-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground px-2">
                            {t.onboardingSteps}
                          </h3>
                          <div className="px-2 space-y-4">
                            {sortedSteps.map((step, index) => {
                              const isCompleted = step.order < currentStep;
                              const isActive = step.order === currentStep;
                              const isUpcoming = step.order > currentStep;

                              return (
                                <div key={step.id} className="relative">
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors",
                                        isCompleted &&
                                          "bg-green-500 text-white",
                                        isActive && "bg-blue-600 text-white",
                                        isUpcoming &&
                                          "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                                      )}
                                    >
                                      {isCompleted ? (
                                        <Check className="h-4 w-4" />
                                      ) : (
                                        step.order
                                      )}
                                    </div>
                                    <div className="flex-1 pt-1">
                                      <div
                                        className={cn(
                                          "text-sm font-medium",
                                          isCompleted &&
                                            "text-green-700 dark:text-green-400",
                                          isActive &&
                                            "text-blue-600 dark:text-blue-400",
                                          isUpcoming &&
                                            "text-slate-500 dark:text-slate-400",
                                        )}
                                      >
                                        {step.title}
                                      </div>
                                    </div>
                                  </div>
                                  {index < sortedSteps.length - 1 && (
                                    <div
                                      className={cn(
                                        "absolute left-4 top-10 w-0.5 h-8",
                                        isCompleted
                                          ? "bg-green-500"
                                          : "bg-slate-200 dark:bg-slate-700",
                                      )}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
            </div>
          </div>

          {/* Stepper */}
          <div className="lg:flex-1 p-6 flex flex-col">
            {/* Desktop: Show all steps */}
            <div className="hidden lg:block">
              <div className="space-y-4">
                {sortedSteps.map((step, index) => {
                  const isCompleted = step.order < currentStep;
                  const isActive = step.order === currentStep;
                  const isUpcoming = step.order > currentStep;

                  return (
                    <div key={step.id} className="relative">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors",
                            isCompleted && "bg-green-500 text-white",
                            isActive && "bg-blue-600 text-white",
                            isUpcoming &&
                              "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
                          )}
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            step.order
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <div
                            className={cn(
                              "text-sm font-medium",
                              isCompleted &&
                                "text-green-700 dark:text-green-400",
                              isActive && "text-blue-600 dark:text-blue-400",
                              isUpcoming &&
                                "text-slate-500 dark:text-slate-400",
                            )}
                          >
                            {step.title}
                          </div>
                        </div>
                      </div>
                      {index < sortedSteps.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-4 top-10 w-0.5 h-12",
                            isCompleted
                              ? "bg-green-500"
                              : "bg-slate-200 dark:bg-slate-700",
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Show only current step */}
            <div className="lg:hidden">
              {currentStepData && (
                <div className="flex items-center justify-between gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium shrink-0">
                    {currentStep}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {currentStepData.title}
                    </div>
                  </div>
                  {onSkipEntire && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onSkipEntire}
                      disabled={isLoading}
                      className="text-sm whitespace-nowrap shrink-0"
                    >
                      <X className="w-4 h-4 mr-1.5" />
                      {t.doItLater}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Help Link - Desktop only */}
          {helpUrl && (
            <div className="hidden lg:block p-6 border-t border-slate-200 dark:border-slate-700">
              <a
                href={helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t.havingTroubles}{" "}
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {t.getHelp}
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="w-full lg:w-4/6 flex flex-col flex-1 lg:h-screen">
          {/* Sticky Header - Page Name and Description (Desktop only) */}
          <div className="hidden lg:block sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-3.5">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1 text-left">
                  {currentStepData?.title || "Onboarding"}
                </h1>
                {currentStepData?.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-left">
                    {currentStepData.description}
                  </p>
                )}
              </div>
              {onSkipEntire && (
                <Button
                  variant="outline"
                  onClick={onSkipEntire}
                  disabled={isLoading}
                  className="text-sm whitespace-nowrap"
                >
                  <X className="w-4 h-4 mr-1.5" />
                  {t.doItLater}
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto">{children}</div>
          </div>

          {/* Bottom Navigation */}
          <div className="sticky bottom-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 z-10">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="default"
                onClick={onPrevious}
                disabled={!canGoPrevious || isLoading}
                className="h-10 min-w-[80px] lg:min-w-[100px] text-sm lg:text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.previous}
              </Button>

              {/* Skip Button (if applicable) */}
              {canSkip && onSkip && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={onSkip}
                  disabled={isLoading}
                  className="h-10 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm lg:text-base"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  {t.skip}
                </Button>
              )}

              {/* Next/Complete Button */}
              <Button
                size="default"
                onClick={onNext}
                disabled={!canGoNext || isLoading}
                className="h-10 min-w-[140px] lg:min-w-[160px] bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : isLastStep ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {t.complete}
                  </>
                ) : (
                  <>
                    {t.next}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
