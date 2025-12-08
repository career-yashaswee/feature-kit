"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

        {/* How to Test Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <CursorClick className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">How to Test</CardTitle>
            </div>
            <CardDescription>
              Interact with the Ask Agent interface. Try typing a message or
              using voice input. Notice the animated tags scrolling from right
              to left.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              {[
                "Watch the tags scroll from right to left continuously",
                "Type a message in the input box",
                "Click the microphone icon to use voice input (if supported)",
                "Press Enter or click Send to submit your message",
                "View your sent messages in the conversation area",
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

        {/* Ask Agent Interface Card */}
        <Card className="border-2 shadow-lg">
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
                    )
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
        </Card>

        {/* Features Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Sparkle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Features</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Microphone,
                  title: "Voice Input",
                  description:
                    "Speech recognition support using react-speech-recognition and Web Speech API",
                },
                {
                  icon: ChatCircle,
                  title: "Chat Interface",
                  description:
                    "Clean and intuitive chat interface with message history",
                },
                {
                  icon: Sparkle,
                  title: "Animated Tags",
                  description:
                    "Smooth scrolling tags animation using Framer Motion",
                },
                {
                  icon: Lightning,
                  title: "Real-time",
                  description:
                    "Instant message submission with keyboard shortcuts support",
                },
                {
                  icon: Code,
                  title: "TypeScript",
                  description:
                    "Fully typed with TypeScript for better developer experience",
                },
                {
                  icon: Sparkle,
                  title: "Accessible",
                  description:
                    "Keyboard navigation and ARIA labels for better accessibility",
                },
              ].map((feature, index) => (
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
