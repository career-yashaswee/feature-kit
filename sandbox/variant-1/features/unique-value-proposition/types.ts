export interface DataPoint {
  id: string;
  name: string;
  x: number; // 0-100 for X-axis value
  y: number; // 0-100 for Y-axis value
  isHighlighted?: boolean;
  intensity?: number; // 1-10 for importance/competition intensity (affects dot size)
  tooltip?: string;
  color?: string; // Optional custom color
}

export interface UniqueValuePropositionProps {
  title?: string;
  description?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  dataPoints: DataPoint[];
  highlightedPoint?: DataPoint;
  quadrantLabels?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
  legend?: {
    highlightedLabel?: string;
    otherLabel?: string;
  };
  footerDescription?: string;
  className?: string;
  chartHeight?: "sm" | "md" | "lg";
  showLegend?: boolean;
}
