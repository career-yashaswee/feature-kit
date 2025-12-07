"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle2, Sparkles } from "lucide-react";
import { FaqHints, type FaqItem } from "@/features/faq-hints/components/faq-hints";

const sampleFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "I'm a complete beginner. Is this right for me?",
    shortAnswer: "Yes",
    answer:
      "Absolutely! This is designed for all skill levels. We provide step-by-step guidance and AI-powered feedback that adapts to your current skill level.",
  },
  {
    id: "faq-2",
    question: "Do I need special knowledge to use this?",
    shortAnswer: "No",
    answer:
      "Not at all! We'll guide you through the entire process. Everything is handled behind the scenes, so you can focus on what matters.",
  },
  {
    id: "faq-3",
    question: "What if I get stuck on a problem?",
    shortAnswer: "AI helps",
    answer:
      "Our AI assistant provides instant feedback, giving you hints and suggestions to help you progress. Plus, you can always check documentation or reach out to our community.",
  },
  {
    id: "faq-4",
    question: "How is this different from tutorials?",
    shortAnswer: "Hands-on",
    answer:
      "Unlike passive video learning, this gives you hands-on practice with real execution. You build actual projects and get instant feedback.",
  },
  {
    id: "faq-5",
    question: "Is my data safe and private?",
    shortAnswer: "Yes",
    answer:
      "Yes! Your data runs in isolated environments, ensuring complete security. We never store your actual data permanently - only the analysis results.",
  },
];

const features = [
  {
    title: "Short Answer Hints",
    description: "Quick visual hints next to each question for fast scanning",
    icon: Sparkles,
  },
  {
    title: "Expandable Details",
    description: "Click to expand and read full answers with rich formatting",
    icon: CheckCircle2,
  },
  {
    title: "Customizable",
    description: "Fully configurable items, styling, and behavior",
    icon: HelpCircle,
  },
];

export default function FaqHintsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">FAQ Hints</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            FAQ Hints
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            An elegant FAQ component with short answer hints and expandable
            details for better user experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <HelpCircle className="h-3 w-3" />
              Accordion
            </Badge>
            <Badge variant="default" className="gap-1.5 bg-secondary/80">
              <CheckCircle2 className="h-3 w-3" />
              Hints
            </Badge>
          </div>
        </section>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to test the FAQ Hints component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                "Scroll down to see the FAQ section with sample questions",
                "Click on any question to expand and see the full answer",
                "Notice the short answer hints next to each question",
                "Try the compact variant by checking the example below",
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
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Default Variant</CardTitle>
            </div>
            <CardDescription>
              Standard FAQ with heading, description, and short answer hints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FaqHints
              heading="Frequently Asked Questions"
              description="Find answers to common questions about our platform"
              items={sampleFaqItems}
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Compact Variant</CardTitle>
            </div>
            <CardDescription>
              Smaller text and spacing for tighter layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FaqHints
              items={sampleFaqItems.slice(0, 3)}
              variant="compact"
            />
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
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

