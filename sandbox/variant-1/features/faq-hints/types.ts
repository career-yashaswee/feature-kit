export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  shortAnswer?: string;
}

export interface FaqHintsProps {
  heading?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
  variant?: "default" | "compact";
  showShortAnswers?: boolean;
}
