export interface HealthBarData {
  current: number;
  max: number;
  secondsToNext?: number;
}

export interface HealthBarProps {
  data: HealthBarData;
  className?: string;
  showTimer?: boolean;
  showRemaining?: boolean;
  isLoading?: boolean;
}
