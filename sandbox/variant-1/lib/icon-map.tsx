import {
  ArrowUp,
  ArrowsClockwise,
  Download,
  FloppyDisk,
  WifiHigh,
  Lightning,
  Keyboard,
  Tray,
  FileText,
  Warning,
  Copy,
  Scroll,
  Share,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  LinkedinLogo,
  Target,
  Tag,
  Rocket,
  Compass,
  Bell,
  ChartBar,
  SlidersHorizontal,
  Stack,
  Monitor,
  CaretUp,
  ArrowCircleUp,
  CursorClick,
  Sparkle,
  Code,
  Gear,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export const iconMap: Record<string, Icon> = {
  ArrowUp,
  ArrowsClockwise,
  Download,
  FloppyDisk,
  WifiHigh,
  Lightning,
  Keyboard,
  Tray,
  FileText,
  Warning,
  Copy,
  Scroll,
  Share,
  SquaresFour,
  MagnifyingGlass,
  ChatCircle,
  LinkedinLogo,
  Target,
  Tag,
  Rocket,
  Compass,
  Bell,
  ChartBar,
  SlidersHorizontal,
  Stack,
  Monitor,
  CaretUp,
  ArrowCircleUp,
  CursorClick,
  Sparkle,
  Code,
  Gear,
};

export function getIconComponent(iconName: string): Icon {
  return iconMap[iconName] || ArrowUp;
}

export function renderIcon(iconName: string, className?: string): React.ReactNode {
  const IconComponent = getIconComponent(iconName);
  return <IconComponent className={className} />;
}

