"use client";

import { useMemo } from "react";
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
  User,
} from "@phosphor-icons/react";
import { QuizStatistics } from "@/features/quiz-statistics/components/quiz-statistics";
import type {
  QuizStatisticsProps,
  QuizStatistics as QuizStatisticsData,
} from "@/features/quiz-statistics/types";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";
import { usePropsApi, type PropConfig } from "@/hooks/use-props-api";
import { PropsApiCard } from "@/components/props-api-card";
import { Badge } from "@/components/ui/badge";

// Generate sample quiz statistics data
function generateSampleQuizStatistics(): QuizStatisticsData {
  const finishedAt = new Date("2023-08-03T10:00:00");

  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: `q-${i + 1}`,
    number: i + 1,
    text:
      i === 0
        ? "What does UI stand for in the context of design?"
        : i === 1
          ? "Which aspect of UI design involves choosing colors, typography, and creating icons for a digital interface?"
          : `Question ${i + 1} text content goes here. This is a sample question to demonstrate the quiz statistics component.`,
    type:
      i % 3 === 0
        ? "multiple_choice"
        : i % 3 === 1
          ? "fill_blank"
          : "true_false",
    points: 1,
  }));

  const questionResults = questions.map((question, index) => {
    let status:
      | "correct"
      | "incorrect"
      | "half_correct"
      | "need_review"
      | "skipped";
    if (index < 11) {
      status = "correct";
    } else if (index === 11) {
      status = "need_review";
    } else if (index === 12) {
      status = "correct";
    } else if (index === 13) {
      status = "incorrect";
    } else if (index === 14) {
      status = "correct";
    } else if (index === 15) {
      status = "incorrect";
    } else if (index < 18) {
      status = "correct";
    } else if (index === 18) {
      status = "skipped";
    } else {
      status = "correct";
    }

    return {
      questionId: question.id,
      status,
      timeTaken: 32 + Math.floor(Math.random() * 20),
      pointsEarned:
        status === "correct"
          ? question.points
          : status === "half_correct"
            ? question.points / 2
            : 0,
    };
  });

  // Calculate statistics
  const correctCount = questionResults.filter(
    (r) => r.status === "correct"
  ).length;
  const halfCorrectCount = questionResults.filter(
    (r) => r.status === "half_correct"
  ).length;
  const needReviewCount = questionResults.filter(
    (r) => r.status === "need_review"
  ).length;
  const incorrectCount = questionResults.filter(
    (r) => r.status === "incorrect"
  ).length;
  const skippedCount = questionResults.filter(
    (r) => r.status === "skipped"
  ).length;

  const totalPoints = questionResults.reduce(
    (sum, r) => sum + r.pointsEarned,
    0
  );
  const answeredCount = questionResults.filter(
    (r) => r.status !== "skipped"
  ).length;
  const accuracy = Math.round((correctCount / questions.length) * 100);

  return {
    user: {
      id: "user-1",
      name: "Adit Irawan",
      role: "Jr UI/UX Designer",
      tag: "Design",
      avatarInitials: "AI",
    },
    quiz: {
      id: "quiz-1",
      title: "Figma skill - How to make great design",
      description: "Test your knowledge of Figma design principles",
      totalQuestions: questions.length,
      questions,
    },
    questionResults,
    accuracy,
    totalPoints,
    answeredCount,
    finishedAt,
    statusBreakdown: {
      correct: correctCount,
      halfCorrect: halfCorrectCount,
      needReview: needReviewCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
    },
  };
}

export default function QuizStatisticsPage() {
  const sampleStatistics = useMemo(() => generateSampleQuizStatistics(), []);

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

  const propMap: Record<string, keyof QuizStatisticsProps> = {
    className: "className",
  };

  const { props, handleValueChange, getComponentProps } =
    usePropsApi<QuizStatisticsProps>({
      initialConfig,
      propMap,
    });

  const handleQuestionClick = (questionNumber: number, questionId: string) => {
    console.log("Question clicked:", questionNumber, questionId);
  };

  const handleClose = () => {
    console.log("Close clicked");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
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
              See the quiz statistics component in action. Click on questions in
              the grid to see details. All data is passed as props for maximum
              flexibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuizStatistics
              {...getComponentProps}
              statistics={sampleStatistics}
              onQuestionClick={handleQuestionClick}
              onClose={handleClose}
            />
          </CardContent>
        </BaseCard>

        {/* Props API Card */}
        <PropsApiCard
          props={props}
          onValueChange={handleValueChange}
          description="Interact with the table below to customize the component in real-time. Note: Complex props like `statistics`, `onQuestionClick`, and `onClose` are not editable here."
        />

        {/* How to Test */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/quiz-statistics"
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
                "Review the overall performance metrics at the top (accuracy, points, answered count)",
                "Examine the question navigation grid to see status indicators for each question",
                "Check the status breakdown section to see counts and percentages",
                "Scroll through the question details section to see individual question results",
                "Click on any question in the grid to see it highlighted (check console for click events)",
                "Try clicking the close button in the top right corner",
              ]}
              conclusion="The quiz statistics component displays comprehensive results with visual indicators for correct (green checkmark), incorrect (red X), half-correct (yellow question mark), need review (gray question mark), and skipped (gray X) questions."
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
              Different ways to use the Quiz Statistics component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Basic Usage</h3>
              <p className="text-sm text-muted-foreground">
                Pass quiz statistics data as props
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`import { QuizStatistics } from "@/features/quiz-statistics";
import type { QuizStatistics as QuizStatisticsData } from "@/features/quiz-statistics/types";

const statistics: QuizStatisticsData = {
  user: {
    id: "user-1",
    name: "John Doe",
    role: "Student",
    tag: "Design",
    avatarInitials: "JD",
  },
  quiz: {
    id: "quiz-1",
    title: "Design Fundamentals",
    totalQuestions: 20,
    questions: [/* ... */],
  },
  questionResults: [/* ... */],
  accuracy: 85,
  totalPoints: 145,
  answeredCount: 19,
  finishedAt: new Date(),
  statusBreakdown: {
    correct: 17,
    halfCorrect: 1,
    needReview: 1,
    incorrect: 2,
    skipped: 1,
  },
};

<QuizStatistics
  statistics={statistics}
  onQuestionClick={(number, id) => {
    console.log("Question clicked:", number, id);
  }}
  onClose={() => {
    console.log("Close clicked");
  }}
/>`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Without Close Button</h3>
              <p className="text-sm text-muted-foreground">
                Omit the onClose prop to hide the close button
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <pre className="text-xs overflow-x-auto">
                  <code>{`<QuizStatistics
  statistics={statistics}
  onQuestionClick={(number, id) => {
    // Handle question click
  }}
/>`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </BaseCard>

        {/* Features Glossary */}
        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/quiz-statistics"
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
              title: "Comprehensive Statistics",
              description:
                "Display overall accuracy, points earned, and answered count with visual progress indicators",
            },
            {
              icon: <User className="h-5 w-5 text-primary" />,
              title: "User Profile Display",
              description:
                "Show user information with avatar, name, role, and tag in a clean header section",
            },
            {
              icon: <Sparkle className="h-5 w-5 text-primary" />,
              title: "Question Grid Navigation",
              description:
                "Interactive grid showing all questions with color-coded status indicators for quick navigation",
            },
            {
              icon: <Gear className="h-5 w-5 text-primary" />,
              title: "Status Breakdown",
              description:
                "Detailed breakdown of question statuses with counts and percentages for each category",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript Support",
              description:
                "Fully typed with comprehensive data models for User, Quiz, Question, and Statistics",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Scrollable Details",
              description:
                "Scrollable section showing individual question details with time taken and points earned",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
