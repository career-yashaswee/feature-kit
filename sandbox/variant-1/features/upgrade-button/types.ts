export type UpgradeActionType = "start_trial" | "upgrade" | "manage";

export interface UpgradeAction {
  type: UpgradeActionType;
  buttonText: string;
  message?: string;
}

export interface UpgradeButtonProps {
  isSubscribed: boolean;
  isLoading?: boolean;
  upgradeAction?: UpgradeAction;
  onUpgrade: () => void | Promise<void>;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showMessage?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  loadingText?: string;
  subscribedText?: string;
  subscribedIcon?: React.ComponentType<{ className?: string }>;
  upgradeIcon?: React.ComponentType<{ className?: string }>;
}
