"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Question,
  X,
  Diamond,
  Clock,
  ListChecks,
  PencilSimpleLine,
  X as CloseIcon,
} from "@phosphor-icons/react";
import type { QuizStatisticsProps, QuestionStatus, QuestionType } from "../types";
import { cn } from "@/lib/utils";

/**
 * Get icon for question status
 */
function getStatusIcon(status: QuestionStatus, className?: string) {
  switch (status) {
    case "correct":
      return (
        <CheckCircle
          className={cn("h-4 w-4 text-green-600 dark:text-green-500", className)}
          weight="fill"
        />
      );
    case "incorrect":
      return (
        <XCircle
          className={cn("h-4 w-4 text-red-600 dark:text-red-500", className)}
          weight="fill"
        />
      );
    case "half_correct":
      return (
        <Question
          className={cn("h-4 w-4 text-yellow-600 dark:text-yellow-500", className)}
          weight="fill"
        />
      );
    case "need_review":
      return (
        <Question
          className={cn("h-4 w-4 text-gray-500", className)}
          weight="fill"
        />
      );
    case "skipped":
      return (
        <X
          className={cn("h-4 w-4 text-gray-400", className)}
          weight="fill"
        />
      );
  }
}

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
        <PencilSimpleLine
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
        <PencilSimpleLine
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

/**
 * Format date to readable format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format time to readable format
 */
function formatTimeOfDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function QuizStatistics({
  statistics,
  onQuestionClick,
  onClose,
  className,
}: QuizStatisticsProps) {
  const { user, quiz, questionResults, accuracy, totalPoints, answeredCount, finishedAt, statusBreakdown } = statistics;

  // Create a map of question results by question ID for quick lookup
  const resultsMap = useMemo(() => {
    const map = new Map<string, typeof questionResults[0]>();
    questionResults.forEach((result) => {
      map.set(result.questionId, result);
    });
    return map;
  }, [questionResults]);

  // Get result for a question
  const getQuestionResult = (questionId: string) => {
    return resultsMap.get(questionId);
  };

  // Calculate percentages for status breakdown
  const totalQuestions = quiz.totalQuestions;
  const correctPercentage = Math.round((statusBreakdown.correct / totalQuestions) * 100);
  const halfCorrectPercentage = Math.round((statusBreakdown.halfCorrect / totalQuestions) * 100);
  const needReviewPercentage = Math.round((statusBreakdown.needReview / totalQuestions) * 100);
  const incorrectPercentage = Math.round((statusBreakdown.incorrect / totalQuestions) * 100);
  const skippedPercentage = Math.round((statusBreakdown.skipped / totalQuestions) * 100);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Card className="border-2 shadow-lg">
        <CardHeader className="space-y-6 pb-6">
          {/* Top Section: User Profile and Close Button */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user.avatarInitials || user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  {user.tag && (
                    <Badge variant="secondary" className="text-xs">
                      {user.tag}
                    </Badge>
                  )}
                </div>
                {user.role && (
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                )}
              </div>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
                aria-label="Close"
              >
                <CloseIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Quiz Title and Metadata */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-sm text-muted-foreground">
              Finished {formatDate(finishedAt)} • {formatTimeOfDay(finishedAt)} • {totalQuestions} Questions
            </p>
          </div>

          {/* Overall Performance Summary */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Accuracy</span>
                <span className="text-sm font-semibold">{accuracy}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Diamond className="h-4 w-4 text-yellow-600 dark:text-yellow-500" weight="fill" />
                <span className="text-sm font-medium">Point</span>
              </div>
              <p className="text-2xl font-bold">{totalPoints}</p>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Answered</span>
              <p className="text-2xl font-bold">{answeredCount}/{totalQuestions}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question Navigation Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Questions</h2>
            <div className="grid grid-cols-10 gap-2">
              {quiz.questions.map((question) => {
                const result = getQuestionResult(question.id);
                const status = result?.status || "skipped";
                return (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-10 w-10 relative flex items-center justify-center",
                      status === "correct" && "border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/20",
                      status === "incorrect" && "border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-950/20",
                      status === "half_correct" && "border-yellow-600 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
                      status === "need_review" && "border-gray-500 bg-gray-50 dark:bg-gray-950/20",
                      status === "skipped" && "border-gray-400 bg-gray-50 dark:bg-gray-950/20"
                    )}
                    onClick={() => onQuestionClick?.(question.number, question.id)}
                  >
                    {getStatusIcon(status)}
                    <span className="sr-only">Question {question.number}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Status Breakdown</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon("correct")}
                <p className="text-sm font-medium">
                  Correct: {statusBreakdown.correct} • {correctPercentage}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon("half_correct")}
                <p className="text-sm font-medium">
                  Half Correct: {statusBreakdown.halfCorrect} • {halfCorrectPercentage}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon("need_review")}
                <p className="text-sm font-medium">
                  Need Review: {statusBreakdown.needReview} • {needReviewPercentage}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon("incorrect")}
                <p className="text-sm font-medium">
                  Incorrect: {statusBreakdown.incorrect} • {incorrectPercentage}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon("skipped")}
                <p className="text-sm font-medium">
                  Skipped: {statusBreakdown.skipped} • {skippedPercentage}%
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Individual Question Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Question Details</h2>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {quiz.questions.map((question) => {
                  const result = getQuestionResult(question.id);
                  const status = result?.status || "skipped";
                  const timeTaken = result?.timeTaken || 0;
                  const pointsEarned = result?.pointsEarned || 0;

                  return (
                    <Card key={question.id} className="border bg-card">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2 shrink-0">
                            {getStatusIcon(status, "h-5 w-5")}
                            {getQuestionTypeIcon(question.type, "h-5 w-5")}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-base">Question {question.number}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-4 w-4" />
                                  <span>Time {formatTime(timeTaken)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Diamond className="h-4 w-4 text-yellow-600 dark:text-yellow-500" weight="fill" />
                                  <span>{pointsEarned} point{pointsEarned !== 1 ? "s" : ""}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-foreground">{question.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

