"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseCard } from "@/components/base-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Microphone,
  PaperPlaneTilt,
  CursorClick,
  Sparkle,
  ChatCircle,
  Lightning,
  Code,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useSpeechRecognition } from "@/lib/providers/speech-recognition-provider";
import SpeechRecognition from "react-speech-recognition";
import { cn } from "@/lib/utils";
import { HowToTestCard } from "@/components/how-to-test-card";
import { FeaturesGlossary } from "@/components/features-glossary";
import { renderIcon } from "@/lib/icon-map";
import featuresData from "@/data/features.json";

const sampleTags = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Shadcn UI",
  "React Query",
  "Zustand",
  "Jest",
  "Testing Library",
  "ESLint",
  "Prettier",
];

export default function AskAgentPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Use transcript when available, otherwise use message
  const currentMessage = transcript || message;

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
    }
  };

  const handleSend = () => {
    const msgToSend = currentMessage.trim();
    if (msgToSend) {
      setMessages([...messages, msgToSend]);
      setMessage("");
      resetTranscript();
      if (listening) {
        SpeechRecognition.stopListening();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 p-8">
        {/* Hero Section */}

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/ask-agent");
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
                "Watch the tags scroll from right to left continuously",
                "Type a message in the input box",
                "Click the microphone icon to use voice input (if supported)",
                "Press Enter or click Send to submit your message",
                "View your sent messages in the conversation area",
              ]}
              conclusion="Interact with the Ask Agent interface. Try typing a message or using voice input. Notice the animated tags scrolling from right to left."
              icon={<CursorClick className="h-5 w-5 text-primary" />}
            />
          );
        })()}

        {/* Ask Agent Interface Card */}
        <BaseCard>
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <ChatCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Ask Agent Interface</CardTitle>
            </div>
            <CardDescription>
              Type your question or use voice input to interact with the agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Animated Scrolling Tags */}
            <div className="relative overflow-hidden w-full py-2">
              <div className="flex gap-2">
                <motion.div
                  className="flex gap-2"
                  animate={{
                    x: [0, -50 * sampleTags.length],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {[...sampleTags, ...sampleTags, ...sampleTags].map(
                    (tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant="outline"
                        className="shrink-0 px-3 py-1 whitespace-nowrap"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </motion.div>
              </div>
            </div>

            {/* Input Box with Microphone and Send */}
            <div className="flex items-center gap-2">
              {browserSupportsSpeechRecognition && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleMicClick}
                  className={listening ? "bg-primary/10 text-primary" : ""}
                >
                  <Microphone
                    className={cn("h-4 w-4", listening && "animate-pulse")}
                  />
                </Button>
              )}
              <Input
                type="text"
                value={currentMessage}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (transcript) resetTranscript();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                size="icon"
              >
                <PaperPlaneTilt className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages Display */}
            {messages.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Your Messages:</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-muted/50 p-3 text-sm"
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </BaseCard>

        {(() => {
          const featureData = featuresData.find((f) => f.path === "/ask-agent");
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
              icon: <Microphone className="h-5 w-5 text-primary" />,
              title: "Voice Input",
              description:
                "Speech recognition support using react-speech-recognition and Web Speech API",
            },
            {
              icon: <ChatCircle className="h-5 w-5 text-primary" />,
              title: "Chat Interface",
              description:
                "Clean and intuitive chat interface with message history",
            },
            {
              icon: <Sparkle className="h-5 w-5 text-primary" />,
              title: "Animated Tags",
              description:
                "Smooth scrolling tags animation using Framer Motion",
            },
            {
              icon: <Lightning className="h-5 w-5 text-primary" />,
              title: "Real-time",
              description:
                "Instant message submission with keyboard shortcuts support",
            },
            {
              icon: <Code className="h-5 w-5 text-primary" />,
              title: "TypeScript",
              description:
                "Fully typed with TypeScript for better developer experience",
            },
            {
              icon: <Sparkle className="h-5 w-5 text-primary" />,
              title: "Accessible",
              description:
                "Keyboard navigation and ARIA labels for better accessibility",
            },
          ];
          return <FeaturesGlossary features={defaultFeatures} />;
        })()}
      </main>
    </div>
  );
}
