import { render, screen } from "@testing-library/react";
import { CompareAlternatives } from "../components/compare-alternatives";

const mockFeatures = [
  {
    id: "feature1",
    label: "Feature 1",
    description: "Description 1",
    values: {
      alt1: true,
      alt2: false,
    },
  },
  {
    id: "feature2",
    label: "Feature 2",
    description: "Description 2",
    values: {
      alt1: "Yes",
      alt2: "No",
    },
  },
];

const mockAlternatives = [
  { id: "alt1", name: "Alternative 1" },
  { id: "alt2", name: "Alternative 2" },
];

describe("CompareAlternatives", () => {
  it("renders heading", () => {
    render(
      <CompareAlternatives
        features={mockFeatures}
        alternatives={mockAlternatives}
        heading="Compare Options"
      />,
    );

    expect(screen.getByText("Compare Options")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <CompareAlternatives
        features={mockFeatures}
        alternatives={mockAlternatives}
        description="Compare different options"
      />,
    );

    expect(screen.getByText("Compare different options")).toBeInTheDocument();
  });

  it("renders feature labels", () => {
    render(
      <CompareAlternatives
        features={mockFeatures}
        alternatives={mockAlternatives}
      />,
    );

    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
  });

  it("renders alternative names", () => {
    render(
      <CompareAlternatives
        features={mockFeatures}
        alternatives={mockAlternatives}
      />,
    );

    expect(screen.getByText("Alternative 1")).toBeInTheDocument();
    expect(screen.getByText("Alternative 2")).toBeInTheDocument();
  });

  it("shows crown icon when showCrownIcon is true", () => {
    render(
      <CompareAlternatives
        features={mockFeatures}
        alternatives={mockAlternatives}
        showCrownIcon={true}
      />,
    );

    const crown = screen.getByText("Compare Alternatives").querySelector("svg");
    expect(crown).toBeInTheDocument();
  });
});

