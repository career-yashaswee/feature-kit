"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  ListChecks,
  Clock,
  Diamond,
  CaretLeft,
  CaretRight,
  Question as QuestionIcon,
} from "@phosphor-icons/react";
import type { QuizQuestionStatisticsProps, QuestionType } from "../types";
import { cn } from "@/lib/utils";

/**
 * Get icon for question type
 */
function getQuestionTypeIcon(type: QuestionType, className?: string) {
  switch (type) {
    case "multiple_choice":
      return (
        <ListChecks
          className={cn("h-4 w-4 text-muted-foreground", className)}
          weight="regular"
        />
      );
    case "fill_blank":
      return (
        <QuestionIcon
          className={cn("h-4 w-4 text-muted-foreground", className)}
          weight="regular"
        />
      );
    case "true_false":
      return (
        <CheckCircle
          className={cn("h-4 w-4 text-muted-foreground", className)}
          weight="regular"
        />
      );
    case "essay":
      return (
        <QuestionIcon
          className={cn("h-4 w-4 text-muted-foreground", className)}
          weight="regular"
        />
      );
  }
}

/**
 * Format time in seconds to readable format
 */
function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function QuizQuestionStatistics({
  question,
  statistics,
  onPrevious,
  onNext,
  className,
}: QuizQuestionStatisticsProps) {
  const {
    number,
    totalQuestions,
    text,
    type,
    averageTime,
    points,
    answerOptions,
  } = question;
  const { correct, incorrect, accuracy } = statistics;

  // Calculate total responses
  const totalResponses = answerOptions.reduce(
    (sum, option) => sum + option.responseCount,
    0,
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QuestionIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Question {number} of {totalQuestions}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {getQuestionTypeIcon(type)}
                <span className="capitalize">{type.replace("_", " ")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span>Avg. time {formatTime(averageTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Diamond
                  className="h-4 w-4 text-yellow-600 dark:text-yellow-500"
                  weight="fill"
                />
                <span>
                  {points} point{points !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div>
            <h2 className="text-2xl font-bold leading-tight">{text}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {answerOptions.map((option) => {
              const isCorrect = option.isCorrect;
              const responseText =
                option.responseCount === 1 ? "resp." : "resp.";

              return (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <p
                      className={cn(
                        "text-base flex-1",
                        isCorrect && "font-semibold",
                      )}
                    >
                      {option.text}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Progress
                      value={option.percentage}
                      className={cn(
                        "h-2",
                        isCorrect
                          ? "bg-green-100 dark:bg-green-950/30 [&>div]:bg-green-600 dark:[&>div]:bg-green-500"
                          : "bg-red-100 dark:bg-red-950/30 [&>div]:bg-red-600 dark:[&>div]:bg-red-500",
                      )}
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {option.responseCount} {responseText}{" "}
                        {option.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 pt-4">
            {onPrevious && (
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={number === 1}
                className="gap-2"
              >
                <CaretLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
            {onNext && (
              <Button
                variant="outline"
                onClick={onNext}
                disabled={number === totalQuestions}
                className="gap-2 ml-auto"
              >
                Next
                <CaretRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Statistics Sidebar */}
        <div className="lg:sticky lg:top-6 h-fit">
          <Card className="border-2">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-6">Statistics</h3>
              <div className="space-y-4">
                {/* Correct Count */}
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded bg-green-600 dark:bg-green-500 shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Correct</span>
                    <p className="text-2xl font-bold">{correct}</p>
                  </div>
                </div>

                {/* Incorrect Count */}
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded bg-red-600 dark:bg-red-500 shrink-0" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">Incorrect</span>
                    <p className="text-2xl font-bold">{incorrect}</p>
                  </div>
                </div>

                {/* Accuracy */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative h-10 w-10 shrink-0">
                    <svg
                      className="h-10 w-10 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 16}`}
                        strokeDashoffset={`${2 * Math.PI * 16 * (1 - accuracy / 100)}`}
                        className="text-green-600 dark:text-green-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-green-600 dark:text-green-500">
                        {accuracy}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">Accuracy</span>
                    <p className="text-2xl font-bold">{accuracy}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
