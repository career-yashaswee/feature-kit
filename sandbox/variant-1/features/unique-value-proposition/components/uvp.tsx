"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AppPosition {
  name: string;
  x: number; // 0-100 for Relevance to Full Stack Web Development
  y: number; // 0-100 for Velocity and Accuracy of Feedback
  isHighlighted?: boolean;
  intensity?: number; // 1-10 for importance/competition intensity (affects dot size)
  tooltip?: string;
}

const apps: AppPosition[] = [
  // Top-Left Quadrant (Low Relevance to Full Stack, High Velocity but Low Accuracy)
  {
    name: "LeetCode",
    x: 15,
    y: 85,
    intensity: 10,
    tooltip:
      "Instant feedback, but focuses on algorithms only. Limited relevance to full-stack web development.",
  },
  {
    name: "HackerRank",
    x: 18,
    y: 82,
    intensity: 9,
    tooltip:
      "Fast auto-testing, primarily algorithm-focused with minimal web development coverage.",
  },
  {
    name: "CodeSignal",
    x: 12,
    y: 80,
    intensity: 8,
    tooltip:
      "Quick coding challenges with instant results, but algorithm-centric, not web development.",
  },
  {
    name: "TopCoder",
    x: 22,
    y: 78,
    intensity: 6,
    tooltip:
      "Competitive programming platform with fast judging, but no web development focus.",
  },
  {
    name: "CodeChef",
    x: 25,
    y: 75,
    intensity: 6,
    tooltip:
      "Algorithm-heavy competitive programming with efficient judging, but lacks web dev context.",
  },
  {
    name: "AtCoder",
    x: 45,
    y: 72,
    intensity: 5,
    tooltip:
      "Algorithm contests with fast feedback, minimal connection to real web development.",
  },

  // Top-Right Quadrant (High Relevance to Full Stack, High Velocity & Meaningful Insights)
  {
    name: "Recompose",
    x: 92,
    y: 95,
    isHighlighted: true,
    intensity: 10,
    tooltip:
      "Real web development practice with AI-powered instant feedback, GitHub integration, and meaningful code analysis. Highest in both axes.",
  },
  {
    name: "ChatGPT",
    x: 85,
    y: 88,
    intensity: 8,
    tooltip:
      "High velocity feedback and high relevance, but AI responses lack context-specific guidance for real projects.",
  },
  {
    name: "Frontend Mentor",
    x: 78,
    y: 70,
    intensity: 5,
    tooltip:
      "High relevance to frontend development, but relies on peer review leading to slow, inconsistent feedback.",
  },
  {
    name: "CodePen",
    x: 82,
    y: 75,
    intensity: 4,
    tooltip:
      "Great for frontend experimentation with instant visual feedback, limited to frontend only.",
  },

  // Bottom-Left Quadrant (Low Relevance, Low Velocity)
  {
    name: "Project Euler",
    x: 10,
    y: 30,
    intensity: 2,
    tooltip:
      "Mathematical problem-solving with minimal relevance to web development and no feedback system.",
  },
  {
    name: "SPOJ",
    x: 15,
    y: 35,
    intensity: 3,
    tooltip:
      "Competitive programming with slow judging and no web development focus.",
  },
  {
    name: "CodeWars",
    x: 28,
    y: 40,
    intensity: 4,
    tooltip:
      "Algorithm kata with peer review, slow feedback process, limited web dev relevance.",
  },
  {
    name: "CheckiO",
    x: 32,
    y: 38,
    intensity: 2,
    tooltip:
      "Coding games with fun elements but low web development relevance and inconsistent feedback.",
  },
  {
    name: "Codewars",
    x: 30,
    y: 35,
    intensity: 4,
    tooltip:
      "Algorithm-focused coding challenges with peer-reviewed solutions, limited to puzzles.",
  },

  // Bottom-Right Quadrant (High Relevance, Low Velocity/Accuracy)
  {
    name: "FreeCodeCamp",
    x: 76,
    y: 45,
    intensity: 6,
    tooltip:
      "Broad web development curriculum, but relies on community help and less accurate automated feedback.",
  },
  {
    name: "Scrimba",
    x: 84,
    y: 40,
    intensity: 4,
    tooltip:
      "Interactive coding with visual feedback, but primarily tutorial-based with limited practice depth.",
  },
  {
    name: "Codecademy",
    x: 72,
    y: 32,
    intensity: 5,
    tooltip:
      "Structured learning paths for web development, but feedback is educational rather than production-focused.",
  },
  {
    name: "SoloLearn",
    x: 78,
    y: 28,
    intensity: 3,
    tooltip:
      "Mobile-friendly learning for web technologies, but shallow feedback and no real project context.",
  },
  {
    name: "Grasshopper",
    x: 88,
    y: 22,
    intensity: 2,
    tooltip:
      "Beginner-friendly mobile app for coding basics, minimal relevance to full-stack web development.",
  },
  {
    name: "Mimo",
    x: 85,
    y: 15,
    intensity: 2,
    tooltip:
      "Gamified mobile learning for coding fundamentals, low depth and no real development practice.",
  },
  {
    name: "W3Schools",
    x: 70,
    y: 50,
    intensity: 3,
    tooltip:
      "Comprehensive web technology reference, but no interactive feedback system.",
  },
  {
    name: "Interview Cake",
    x: 65,
    y: 55,
    intensity: 4,
    tooltip:
      "Focused on interview preparation with hints, but algorithm-oriented, not web development.",
  },
  {
    name: "AlgoExpert",
    x: 55,
    y: 60,
    intensity: 5,
    tooltip:
      "Interview-focused with solutions and explanations, but algorithms only, no web dev.",
  },
  {
    name: "Pramp",
    x: 68,
    y: 52,
    intensity: 3,
    tooltip:
      "Peer interview practice platform, focuses on algorithms not web development practice.",
  },
  {
    name: "GeeksforGeeks",
    x: 42,
    y: 58,
    intensity: 4,
    tooltip:
      "Algorithm tutorials and contests, limited web development coverage, inconsistent feedback.",
  },
  {
    name: "Edabit",
    x: 48,
    y: 48,
    intensity: 3,
    tooltip:
      "Coding challenges with instant verification, but puzzle-oriented with no real development workflow.",
  },
  {
    name: "Coderbyte",
    x: 52,
    y: 52,
    intensity: 4,
    tooltip:
      "Interview prep with automated testing, primarily algorithm-focused, not web development.",
  },
  {
    name: "Exercism",
    x: 38,
    y: 43,
    intensity: 3,
    tooltip:
      "Mentor-guided learning with slow feedback cycles, minimal web development focus.",
  },
  {
    name: "InterviewBit",
    x: 25,
    y: 50,
    intensity: 4,
    tooltip:
      "Interview preparation platform with courses, but algorithm-heavy and slow feedback.",
  },
  {
    name: "Replit",
    x: 80,
    y: 38,
    intensity: 3,
    tooltip:
      "Online IDE for web development, has templates but lacks structured feedback and guided practice.",
  },
  {
    name: "BigFrontend.dev",
    x: 82,
    y: 72,
    intensity: 4,
    tooltip:
      "JavaScript frontend interview questions with instant results, but limited to JS trivia, not full development.",
  },
];

const USPAxis = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            A Unique Value Proposition
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how Recompose compares to other coding platforms in terms of
            relevance to full-stack web development and feedback quality
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-4xl pt-8 pb-8">
          {/* Chart Container */}
          <div className="relative h-[300px] w-full border border-border md:h-[400px] lg:h-[500px] rounded-lg bg-muted/20">
            {/* X-axis label */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-sm font-medium text-muted-foreground">
              Relevance to Full Stack Web Development
              <span className="ml-1 inline-block h-2 w-2 border-b-2 border-r-2 border-muted-foreground rotate-315"></span>
            </div>

            {/* Y-axis label */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-44 -rotate-90 text-sm font-medium text-muted-foreground">
              Velocity & Accuracy of Feedback
              <span className="ml-1 inline-block h-2 w-2 border-t-2 border-l-2 border-muted-foreground -rotate-225"></span>
            </div>

            {/* Quadrant Dividers - darker and dashed */}
            <div className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-foreground/40"></div>
            <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-foreground/40"></div>

            {/* Applications */}
            <TooltipProvider>
              {apps.map((app) => {
                // Calculate dot size based on intensity (default to 3 if not specified)
                // Intensity 1-10 maps to size 4px-16px
                const intensity = app.intensity ?? 3;
                const baseSize = 4;
                const sizeMultiplier = 1.2;
                const dotSize = baseSize + (intensity - 1) * sizeMultiplier;

                // For highlighted (Recompose), use larger size
                const finalSize = app.isHighlighted
                  ? Math.max(dotSize, 12)
                  : dotSize;

                // Show name label only for high-intensity competitors (>= 7) or if it's Recompose
                const showName = app.isHighlighted || intensity >= 7;

                return (
                  <Tooltip key={app.name}>
                    <TooltipTrigger asChild>
                      <div
                        className="absolute group cursor-pointer flex items-center"
                        style={{
                          left: `${app.x}%`,
                          bottom: `${app.y}%`,
                          transform: "translate(-50%, 50%)",
                        }}
                      >
                        <span
                          className={cn(
                            "rounded-full bg-gray-400 dark:bg-gray-500 transition-all duration-200 group-hover:scale-125",
                            app.isHighlighted &&
                              "bg-blue-600 dark:bg-blue-400 shadow-lg",
                          )}
                          style={{
                            width: `${finalSize}px`,
                            height: `${finalSize}px`,
                            display: "inline-block",
                          }}
                        ></span>
                        {showName && (
                          <span
                            className={cn(
                              "ml-2 text-xs md:text-sm text-muted-foreground transition-all duration-200 whitespace-nowrap",
                              app.isHighlighted &&
                                "font-bold text-blue-600 dark:text-blue-400 text-sm md:text-base",
                            )}
                          >
                            {app.name}
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    {app.tooltip && (
                      <TooltipContent
                        side="top"
                        className="max-w-xs bg-foreground text-background dark:bg-background dark:text-foreground"
                      >
                        <p className="font-semibold mb-1">{app.name}</p>
                        <p className="text-sm">{app.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </TooltipProvider>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span className="text-foreground font-medium">Recompose</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                <span className="text-muted-foreground">Other Platforms</span>
              </div>
            </div>
          </div>

          {/* Quadrant Labels - Outside chart with consistent padding */}
          <div className="absolute top-0 left-4 text-xs text-muted-foreground font-medium whitespace-nowrap">
            Fast but Algorithm-Focused
          </div>
          <div className="absolute top-0 right-4 text-xs text-muted-foreground font-medium text-right whitespace-nowrap">
            Fast & Web Dev Focused
          </div>
          <div className="absolute bottom-0 left-4 text-xs text-muted-foreground font-medium whitespace-nowrap">
            Slow & Limited Relevance
          </div>
          <div className="absolute bottom-0 right-4 text-xs text-muted-foreground font-medium text-right whitespace-nowrap">
            Web Dev Focused but Slow
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground text-sm md:text-base italic">
            Recompose stands out by combining high relevance to full-stack web
            development with fast, accurate, and meaningful feedback. Unlike
            platforms that focus only on algorithms or rely on slow peer review,
            Recompose provides real-world web development practice with actual
            repositories, instant AI-powered analysis, and professional
            workflows that mirror industry standards.
          </p>
        </div>
      </div>
    </section>
  );
};

export { USPAxis };
