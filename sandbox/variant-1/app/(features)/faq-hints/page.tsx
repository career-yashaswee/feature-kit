"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, CheckCircle, Sparkle, Code, CursorClick } from "@phosphor-icons/react";
import { FaqHints, type FaqItem } from "@/features/faq-hints";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

interface PropConfig {
  property: string;
  type: string;
  description: string;
  defaultValue: string | number | boolean;
  value: string | number | boolean;
  inputType: "number" | "select" | "text" | "boolean";
  options?: string[];
}

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
    icon: Sparkle,
  },
  {
    title: "Expandable Details",
    description: "Click to expand and read full answers with rich formatting",
    icon: CheckCircle,
  },
  {
    title: "Customizable",
    description: "Fully configurable items, styling, and behavior",
    icon: Question,
  },
];

export default function FaqHintsPage() {
  const [props, setProps] = useState<PropConfig[]>([
    {
      property: "heading",
      type: "string",
      description: "Heading text for the FAQ section",
      defaultValue: "Frequently Asked Questions",
      value: "Frequently Asked Questions",
      inputType: "text",
    },
    {
      property: "description",
      type: "string",
      description: "Description text below the heading",
      defaultValue: "Find answers to common questions about our platform",
      value: "Find answers to common questions about our platform",
      inputType: "text",
    },
    {
      property: "variant",
      type: '"default" | "compact"',
      description: "Visual variant of the FAQ component",
      defaultValue: "default",
      value: "default",
      inputType: "select",
      options: ["default", "compact"],
    },
    {
      property: "showShortAnswers",
      type: "boolean",
      description: "Whether to show short answer hints",
      defaultValue: true,
      value: true,
      inputType: "boolean",
    },
    {
      property: "className",
      type: "string",
      description: "Additional CSS classes for custom styling",
      defaultValue: "",
      value: "",
      inputType: "text",
    },
  ]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean,
  ) => {
    setProps((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        value: newValue,
      };
      return updated;
    });
  };

  const getComponentProps = () => {
    const componentProps: {
      heading?: string;
      description?: string;
      variant?: "default" | "compact";
      showShortAnswers?: boolean;
      className?: string;
    } = {};

    props.forEach((prop) => {
      if (prop.property === "heading" && prop.value) {
        componentProps.heading = String(prop.value);
      } else if (prop.property === "description" && prop.value) {
        componentProps.description = String(prop.value);
      } else if (prop.property === "variant") {
        componentProps.variant = prop.value as "default" | "compact";
      } else if (prop.property === "showShortAnswers") {
        componentProps.showShortAnswers = Boolean(prop.value);
      } else if (prop.property === "className" && prop.value) {
        componentProps.className = String(prop.value);
      }
    });

    return componentProps;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Live Demo */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Live Demo</CardTitle>
            </div>
            <CardDescription>
              See the component update in real-time as you change props below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FaqHints items={sampleFaqItems} {...getComponentProps()} />
          </CardContent>
        </Card>

        {/* Props API Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Props API</CardTitle>
            </div>
            <CardDescription>
              Interact with the table below to customize the component in
              real-time. Note: The `items` prop (FaqItem[]) is complex and not
              editable here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Property</TableHead>
                  <TableHead className="w-[200px]">Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[200px]">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop, index) => (
                  <TableRow key={prop.property}>
                    <TableCell className="font-medium font-mono text-sm">
                      {prop.property}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {prop.description}
                    </TableCell>
                    <TableCell>
                      {prop.inputType === "select" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value)
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {prop.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : prop.inputType === "boolean" ? (
                        <Select
                          value={String(prop.value)}
                          onValueChange={(value) =>
                            handleValueChange(index, value === "true")
                          }
                        >
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">true</SelectItem>
                            <SelectItem value="false">false</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : prop.inputType === "number" ? (
                        <Input
                          type="number"
                          value={
                            typeof prop.value === "number"
                              ? prop.value
                              : Number(prop.value) || 0
                          }
                          onChange={(e) =>
                            handleValueChange(
                              index,
                              e.target.value === ""
                                ? prop.defaultValue
                                : Number(e.target.value),
                            )
                          }
                          className="h-8"
                        />
                      ) : (
                        <Input
                          type="text"
                          value={String(prop.value)}
                          onChange={(e) =>
                            handleValueChange(index, e.target.value)
                          }
                          placeholder={`Enter ${prop.property}`}
                          className="h-8"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/faq-hints"
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
                "Scroll down to see the FAQ section with sample questions",
                "Click on any question to expand and see the full answer",
                "Notice the short answer hints next to each question",
                "Try the compact variant by checking the example below",
              ]}
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Question className="h-5 w-5 text-primary" />
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
                <Question className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Compact Variant</CardTitle>
            </div>
            <CardDescription>
              Smaller text and spacing for tighter layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FaqHints items={sampleFaqItems.slice(0, 3)} variant="compact" />
          </CardContent>
        </Card>

        {(() => {
          const featureData = featuresData.find(
            (f) => f.path === "/faq-hints"
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
