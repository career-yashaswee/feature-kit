import { render, screen } from "@testing-library/react";
import { TestCaseBadge } from "../components/test-case-badge";

describe("TestCaseBadge", () => {
  it("renders passed and failed counts", () => {
    render(
      <TestCaseBadge
        testResults={{
          passed: 10,
          failed: 2,
        }}
        status="COMPLETE"
      />,
    );

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows loading skeleton when status is ANALYSING", () => {
    render(
      <TestCaseBadge
        testResults={{
          passed: 0,
          failed: 0,
        }}
        status="ANALYSING"
      />,
    );

    const container = screen.getByText("").closest("div");
    expect(container).toHaveClass("animate-pulse");
  });

  it("shows empty message when no test results", () => {
    render(
      <TestCaseBadge
        testResults={{
          passed: 0,
          failed: 0,
        }}
        status="COMPLETE"
        emptyMessage="No tests run"
      />,
    );

    expect(screen.getByText("No tests run")).toBeInTheDocument();
  });

  it("shows progress indicator when showProgress is true", () => {
    render(
      <TestCaseBadge
        testResults={{
          passed: 8,
          failed: 2,
        }}
        status="COMPLETE"
        showProgress={true}
      />,
    );

    // Progress indicator should be present (ScoreProgress component)
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("hides progress indicator when showProgress is false", () => {
    render(
      <TestCaseBadge
        testResults={{
          passed: 8,
          failed: 2,
        }}
        status="COMPLETE"
        showProgress={false}
      />,
    );

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <TestCaseBadge
        testResults={{
          passed: 5,
          failed: 1,
        }}
        status="COMPLETE"
        size="sm"
      />,
    );

    let container = screen.getByText("5").closest("div");
    expect(container).toHaveClass("px-3", "py-2");

    rerender(
      <TestCaseBadge
        testResults={{
          passed: 5,
          failed: 1,
        }}
        status="COMPLETE"
        size="lg"
      />,
    );

    container = screen.getByText("5").closest("div");
    expect(container).toHaveClass("px-5", "py-3");
  });
});
