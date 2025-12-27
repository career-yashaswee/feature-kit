export type CompletionStatus = "completed" | "failed" | "none";

export interface DayCompletion {
  date: Date;
  status: CompletionStatus;
}

export interface DailyCompletionCalendarProps {
  /** Map of dates to their completion status */
  completions: Map<string, CompletionStatus> | DayCompletion[];
  /** Callback when a day is clicked */
  onDayClick?: (date: Date, status: CompletionStatus) => void;
  /** Optional className for styling */
  className?: string;
  /** Month to display (defaults to current month) */
  month?: Date;
  /** Callback when month changes */
  onMonthChange?: (month: Date) => void;
}

