/**
 * Question type in a quiz
 */
export type QuestionType = "multiple_choice" | "fill_blank" | "true_false" | "essay";

/**
 * Answer option for a question
 */
export interface AnswerOption {
  /** Unique identifier for the answer option */
  id: string;
  /** Answer text/content */
  text: string;
  /** Whether this is the correct answer */
  isCorrect: boolean;
  /** Number of responses for this option */
  responseCount: number;
  /** Percentage of total responses */
  percentage: number;
}

/**
 * Question with statistics
 */
export interface QuestionWithStatistics {
  /** Unique identifier for the question */
  id: string;
  /** Question number (1-indexed) */
  number: number;
  /** Total number of questions in the quiz */
  totalQuestions: number;
  /** Question text/content */
  text: string;
  /** Type of question */
  type: QuestionType;
  /** Average time taken to answer (in seconds) */
  averageTime: number;
  /** Points awarded for correct answer */
  points: number;
  /** Answer options with statistics */
  answerOptions: AnswerOption[];
}

/**
 * Overall statistics for the question
 */
export interface QuestionStatistics {
  /** Number of correct responses */
  correct: number;
  /** Number of incorrect responses */
  incorrect: number;
  /** Overall accuracy percentage (0-100) */
  accuracy: number;
}

/**
 * Props for the QuizQuestionStatistics component
 */
export interface QuizQuestionStatisticsProps {
  /** Question with statistics data */
  question: QuestionWithStatistics;
  /** Overall statistics for the question */
  statistics: QuestionStatistics;
  /** Callback when navigating to previous question */
  onPrevious?: () => void;
  /** Callback when navigating to next question */
  onNext?: () => void;
  /** Optional className for styling */
  className?: string;
}

