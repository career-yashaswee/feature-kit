import type { ReactNode } from "react";
import type { PanelGroupProps } from "react-resizable-panels";

export interface ResizablePanelsProps extends Omit<
  PanelGroupProps,
  "children" | "direction"
> {
  panels: Array<{
    id: string;
    content: ReactNode;
    icon?: ReactNode;
    label?: string;
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    collapsible?: boolean;
    collapsedSize?: number;
  }>;
  direction?: "horizontal" | "vertical";
  persistLayout?: boolean;
  storageKey?: string;
  showIconsWhenCollapsed?: boolean;
  className?: string;
}
