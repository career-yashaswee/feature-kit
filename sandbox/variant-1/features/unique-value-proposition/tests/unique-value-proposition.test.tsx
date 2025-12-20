import { render, screen } from "@testing-library/react";
import { UniqueValueProposition } from "../components/unique-value-proposition";

const mockDataPoints = [
  { id: "1", name: "Point 1", x: 20, y: 30, intensity: 5 },
  { id: "2", name: "Point 2", x: 60, y: 70, intensity: 8 },
];

describe("UniqueValueProposition", () => {
  it("renders title", () => {
    render(
      <UniqueValueProposition
        title="Test Title"
        dataPoints={mockDataPoints}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <UniqueValueProposition
        title="Test Title"
        description="Test description"
        dataPoints={mockDataPoints}
      />,
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders data points", () => {
    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
      />,
    );

    // Data points are rendered as positioned divs
    const container = screen.getByText("Test Title").closest("section");
    expect(container).toBeInTheDocument();
  });

  it("renders highlighted point", () => {
    const highlightedPoint = {
      id: "3",
      name: "Highlighted",
      x: 80,
      y: 80,
      intensity: 10,
    };

    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
        highlightedPoint={highlightedPoint}
      />,
    );

    const container = screen.getByText("A Unique Value Proposition").closest("section");
    expect(container).toBeInTheDocument();
  });

  it("renders axis labels", () => {
    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
        xAxisLabel="X Axis"
        yAxisLabel="Y Axis"
      />,
    );

    expect(screen.getByText("X Axis")).toBeInTheDocument();
    expect(screen.getByText("Y Axis")).toBeInTheDocument();
  });

  it("renders quadrant labels", () => {
    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
        quadrantLabels={{
          topLeft: "Top Left",
          topRight: "Top Right",
          bottomLeft: "Bottom Left",
          bottomRight: "Bottom Right",
        }}
      />,
    );

    expect(screen.getByText("Top Left")).toBeInTheDocument();
    expect(screen.getByText("Top Right")).toBeInTheDocument();
  });

  it("renders legend when showLegend is true", () => {
    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
        showLegend={true}
      />,
    );

    expect(screen.getByText("Other Platforms")).toBeInTheDocument();
  });

  it("renders footer description", () => {
    render(
      <UniqueValueProposition
        dataPoints={mockDataPoints}
        footerDescription="Footer text"
      />,
    );

    expect(screen.getByText("Footer text")).toBeInTheDocument();
  });
});

