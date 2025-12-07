export interface TestResults {
  passed: number;
  failed: number;
}

export type TestCaseStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ABANDONED"
  | "ANALYSING"
  | "ELAPSED"
  | "INACTIVE";

export type TestCaseBadgeSize = "sm" | "md" | "lg";

export interface TestCaseBadgeProps {
  testResults?: TestResults;
  status?: TestCaseStatus;
  className?: string;
  showProgress?: boolean;
  size?: TestCaseBadgeSize;
  emptyMessage?: string;
}

