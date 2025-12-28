"use client";

import { useState, useMemo } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import {
  ChartBar,
  CursorClick,
  Sparkle,
  Code,
  Gear,
  Lightning,
  ListChecks,
} from "@phosphor-icons/react";
import { QuizQuestionStatistics } from "@/features/quiz-question-statistics/components/quiz-question-statistics";
import type {
  QuizQuestionStatisticsProps,
  QuestionWithStatistics,
  QuestionStatistics,
} from "@/features/quiz-question-statistics/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import { Badge } from "@/components/ui/badge";

// Generate sample question with statistics matching the image
function generateSampleQuestion(): {
  question: QuestionWithStatistics;
  statistics: QuestionStatistics;
} {
  const question: QuestionWithStatistics = {
    id: "q-3",
    number: 3,
    totalQuestions: 20,
    text: "How to export a picture instantly in figma?",
    type: "multiple_choice",
    averageTime: 32,
    points: 1,
    answerOptions: [
      {
        id: "opt-1",
        text: 'Go to "File" > "Export" and choose your image format.',
        isCorrect: false,
        responseCount: 5,
        percentage: 25,
      },
      {
        id: "opt-2",
        text: 'Click on your image in Figma, go to "Export" on the right, adjust settings, and click "Export."',
        isCorrect: true,
        responseCount: 11,
        percentage: 55,
      },
      {
        id: "opt-3",
        text: 'Right-click the image and select "Export Image."',
        isCorrect: false,
        responseCount: 1,
        percentage: 5,
      },
      {
        id: "opt-4",
        text: "Hover over the image, and press Ctrl + E (Windows) or Command + E (Mac) to instantly download.",
        isCorrect: false,
        responseCount: 3,
        percentage: 15,
      },
    ],
  };

  const statistics: QuestionStatistics = {
    correct: 11,
    incorrect: 9,
    accuracy: 55,
  };

  return { question, statistics };
}

export default function QuizQuestionStatisticsPage() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(3);
  const sampleData = useMemo(() => generateSampleQuestion(), []);

  const initialConfig: PropConfig[] = [
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
      skipIfEmpty: true,
    },
  ];

  const propMap: Record<string, keyof QuizQuestionStatisticsProps> = {
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<QuizQuestionStatisticsProps>({
      initialConfig,
      propMap,
    });

  const handlePrevious = () => {
    if (currentQuestionNumber > 1) {
      setCurrentQuestionNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionNumber < sampleData.question.totalQuestions) {
      setCurrentQuestionNumber((prev) => prev + 1);
    }
  };

  // Update question number in the question object
  const questionWithCurrentNumber = useMemo(
    () => ({
      ...sampleData.question,
      number: currentQuestionNumber,
    }),
    [sampleData.question, currentQuestionNumber],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <ChartBar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Quiz Question Statistics
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Quiz Question Statistics
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Display detailed statistics for individual quiz questions with
            answer distribution, response counts, and accuracy metrics. Perfect
            for analyzing question performance and understanding user responses.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <ChartBar className="h-3 w-3" />
              Analytics
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <ListChecks className="h-3 w-3" />
              Education
            </Badge>
          </div>
        </section>

        {/* Live Demo */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightning className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the quiz question statistics component in action. View answer
              distribution with progress bars, response counts, and accuracy
              metrics. Use Previous/Next buttons to navigate between questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuizQuestionStatistics
              {...getComponentProps}
              question={questionWithCurrentNumber}
              statistics={sampleData.statistics}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `question`, `statistics`, `onPrevious`, and `onNext` are not editable here."
        />

        {/* How to Test */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/quiz-question-statistics",
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
                "Review the question header showing question number, type, average time, and points",
                "Examine the answer options with progress bars showing response distribution",
                "Notice the color coding: green for correct answers, red for incorrect answers",
                "Check the statistics sidebar on the right showing correct/incorrect counts and accuracy",
                "Use the Previous and Next buttons to navigate between questions",
                "Observe how the statistics update as you navigate",
              ]}
              conclusion="The quiz question statistics component displays detailed analytics for individual questions, showing how users responded to each option with visual progress bars and comprehensive statistics."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        {/* Example Cards */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Example Usage</CardTitle>
            </div>
            <CardDescription>
              Different ways to use the Quiz Question Statistics component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Basic Usage</h3>
              <p className="text-sm text-muted-foreground">
                Pass question and statistics data as props
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`import { QuizQuestionStatistics } from "@/features/quiz-question-statistics";
import type { QuestionWithStatistics, QuestionStatistics } from "@/features/quiz-question-statistics/types";

const question: QuestionWithStatistics = {
  id: "q-1",
  number: 1,
  totalQuestions: 20,
  text: "What is the capital of France?",
  type: "multiple_choice",
  averageTime: 32,
  points: 1,
  answerOptions: [
    {
      id: "opt-1",
      text: "London",
      isCorrect: false,
      responseCount: 5,
      percentage: 25,
    },
    {
      id: "opt-2",
      text: "Paris",
      isCorrect: true,
      responseCount: 15,
      percentage: 75,
    },
  ],
};

const statistics: QuestionStatistics = {
  correct: 15,
  incorrect: 5,
  accuracy: 75,
};

<QuizQuestionStatistics
  question={question}
  statistics={statistics}
  onPrevious={() => {
    // Navigate to previous question
  }}
  onNext={() => {
    // Navigate to next question
  }}
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Without Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Omit the onPrevious and onNext props to hide navigation buttons
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`<QuizQuestionStatistics
  question={question}
  statistics={statistics}
/>`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </BaseCard>

        {/* Features Glossary */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/quiz-question-statistics",
          );
          if (featureData?.features) {
            const featuresWithIcons = featureData.features.map((feature) => ({
              icon: renderIcon(feature.icon, "h-5 w-5 text-primary"),
              title: feature.title,
              description: feature.description,
            }));
            return <FeaturesGlossary features={featuresWithIcons} />;
          }
          const defaultFeatures = [
            {
              icon: <ChartBar className="h-5 w-5 text-primary" />,
              title: "Answer Distribution",
              description:
                "Visual progress bars showing response distribution for each answer option with counts and percentages",
            },
            {
              icon: <ListChecks className="h-5 w-5 text-primary" />,
              title: "Color-Coded Options",
              description:
                "Green progress bars for correct answers, red for incorrect answers for quick visual identification",
            },
            {
              icon: <Gear className="h-5 w-5 text-primary" />,
              title: "Statistics Sidebar",
              description:
                "Dedicated sidebar showing correct/incorrect counts and accuracy percentage with visual indicators",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Question Navigation",
              description:
                "Previous and Next buttons for navigating between questions with automatic disable states",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript Support",
              description:
                "Fully typed with comprehensive data models for questions, answers, and statistics",
            },
            {
              icon: <Sparkle className="h-5 w-5 text-primary" />,
              title: "Responsive Layout",
              description:
                "Adaptive grid layout with main content area and sticky statistics sidebar on larger screens",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
