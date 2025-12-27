/**
 * User model representing the quiz taker
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's full name */
  name: string;
  /** User's role or title */
  role?: string;
  /** User's tag or category (e.g., "Design", "Engineering") */
  tag?: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
  /** Avatar initials (fallback if no image) */
  avatarInitials?: string;
}

/**
 * Question type in a quiz
 */
export type QuestionType = "multiple_choice" | "fill_blank" | "true_false" | "essay";

/**
 * Question status in quiz results
 */
export type QuestionStatus = "correct" | "incorrect" | "half_correct" | "need_review" | "skipped";

/**
 * Individual question in a quiz
 */
export interface Question {
  /** Unique identifier for the question */
  id: string;
  /** Question number (1-indexed) */
  number: number;
  /** Question text/content */
  text: string;
  /** Type of question */
  type: QuestionType;
  /** Points awarded for correct answer */
  points: number;
}

/**
 * Result for a single question
 */
export interface QuestionResult {
  /** Question ID this result belongs to */
  questionId: string;
  /** Status of the answer */
  status: QuestionStatus;
  /** Time taken to answer (in seconds) */
  timeTaken: number;
  /** Points earned for this question */
  pointsEarned: number;
}

/**
 * Quiz model
 */
export interface Quiz {
  /** Unique identifier for the quiz */
  id: string;
  /** Quiz title */
  title: string;
  /** Quiz description */
  description?: string;
  /** Total number of questions */
  totalQuestions: number;
  /** Questions in the quiz */
  questions: Question[];
}

/**
 * Statistics breakdown by status
 */
export interface StatusBreakdown {
  /** Number of correct answers */
  correct: number;
  /** Number of half-correct answers */
  halfCorrect: number;
  /** Number of questions needing review */
  needReview: number;
  /** Number of incorrect answers */
  incorrect: number;
  /** Number of skipped questions */
  skipped: number;
}

/**
 * Overall quiz statistics
 */
export interface QuizStatistics {
  /** User who took the quiz */
  user: User;
  /** Quiz that was taken */
  quiz: Quiz;
  /** Results for each question */
  questionResults: QuestionResult[];
  /** Overall accuracy percentage (0-100) */
  accuracy: number;
  /** Total points earned */
  totalPoints: number;
  /** Number of questions answered */
  answeredCount: number;
  /** Date and time when quiz was finished */
  finishedAt: Date;
  /** Status breakdown */
  statusBreakdown: StatusBreakdown;
}

/**
 * Props for the QuizStatistics component
 */
export interface QuizStatisticsProps {
  /** Quiz statistics data */
  statistics: QuizStatistics;
  /** Callback when a question is clicked in the grid */
  onQuestionClick?: (questionNumber: number, questionId: string) => void;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Optional className for styling */
  className?: string;
}

