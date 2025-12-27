"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SpeechRecognitionContextValue {
  transcript: string;
  listening: boolean;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
}

const SpeechRecognitionContext =
  createContext<SpeechRecognitionContextValue | null>(null);

export function SpeechRecognitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  // Speech recognition is optional - return disabled state
  const browserSupportsSpeechRecognition = false;

  return (
    <SpeechRecognitionContext.Provider
      value={{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
      }}
    >
      {children}
    </SpeechRecognitionContext.Provider>
  );
}

export function useSpeechRecognition() {
  const context = useContext(SpeechRecognitionContext);
  if (!context) {
    return {
      transcript: "",
      listening: false,
      resetTranscript: () => {},
      browserSupportsSpeechRecognition: false,
    };
  }
  return context;
}
