export type SubscriptionIdentifierSize = "sm" | "md" | "lg";
export type SubscriptionIdentifierVariant = "outline" | "solid";

export interface SubscriptionIdentifierProps {
  isUserSubscribed: boolean;
  isLoading?: boolean;
  size?: SubscriptionIdentifierSize;
  variant?: SubscriptionIdentifierVariant;
  className?: string;
  label?: string;
  showIcon?: boolean;
}
