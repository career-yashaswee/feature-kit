import { render, screen } from "@testing-library/react";
import { HealthBar } from "../components/health-bar";

describe("HealthBar", () => {
  it("renders health bar", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 0,
        }}
      />,
    );

    const container = screen.getByRole("img").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("displays remaining count when showRemaining is true", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 0,
        }}
        showRemaining={true}
      />,
    );

    expect(screen.getByText("+50")).toBeInTheDocument();
  });

  it("hides remaining count when showRemaining is false", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 0,
        }}
        showRemaining={false}
      />,
    );

    expect(screen.queryByText("+50")).not.toBeInTheDocument();
  });

  it("displays timer when showTimer is true and secondsToNext > 0", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 125,
        }}
        showTimer={true}
      />,
    );

    expect(screen.getByText(/02:05/)).toBeInTheDocument();
  });

  it("applies correct color class for low health", () => {
    render(
      <HealthBar
        data={{
          current: 10,
          max: 100,
          secondsToNext: 0,
        }}
      />,
    );

    const bar = screen.getByRole("img").closest("div")?.querySelector("div[style*='width']");
    expect(bar).toHaveClass("bg-red-500");
  });

  it("applies correct color class for medium health", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 0,
        }}
      />,
    );

    const bar = screen.getByRole("img").closest("div")?.querySelector("div[style*='width']");
    expect(bar).toHaveClass("bg-amber-300");
  });

  it("applies correct color class for high health", () => {
    render(
      <HealthBar
        data={{
          current: 90,
          max: 100,
          secondsToNext: 0,
        }}
      />,
    );

    const bar = screen.getByRole("img").closest("div")?.querySelector("div[style*='width']");
    expect(bar).toHaveClass("bg-green-500");
  });

  it("shows loading state when isLoading is true", () => {
    render(
      <HealthBar
        data={{
          current: 50,
          max: 100,
          secondsToNext: 0,
        }}
        isLoading={true}
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calculates percentage correctly", () => {
    render(
      <HealthBar
        data={{
          current: 75,
          max: 100,
          secondsToNext: 0,
        }}
      />,
    );

    const bar = screen.getByRole("img").closest("div")?.querySelector("div[style*='width: 75%']");
    expect(bar).toBeInTheDocument();
  });
});



