import { render, screen } from "@testing-library/react";
import { SubscriptionIdentifier } from "../components/subscription-identifier";

describe("SubscriptionIdentifier", () => {
  it("renders label", () => {
    render(<SubscriptionIdentifier isUserSubscribed={false} label="Premium" />);

    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    render(
      <SubscriptionIdentifier isUserSubscribed={false} isLoading={true} />,
    );

    const element = screen.getByText("Plus").closest("span");
    expect(element).toHaveClass("animate-pulse");
  });

  it("applies correct styles for subscribed user", () => {
    render(
      <SubscriptionIdentifier isUserSubscribed={true} variant="outline" />,
    );

    const element = screen.getByText("Plus").closest("span");
    expect(element).toHaveClass("bg-gradient-to-b", "from-black");
  });

  it("applies correct styles for non-subscribed user", () => {
    render(
      <SubscriptionIdentifier isUserSubscribed={false} variant="outline" />,
    );

    const element = screen.getByText("Plus").closest("span");
    expect(element).toHaveClass("bg-gradient-to-b", "from-yellow-50");
  });

  it("hides icon when showIcon is false", () => {
    render(
      <SubscriptionIdentifier isUserSubscribed={false} showIcon={false} />,
    );

    // Icon should not be present
    const element = screen.getByText("Plus").closest("span");
    expect(element?.querySelector("svg")).not.toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <SubscriptionIdentifier isUserSubscribed={false} size="sm" />,
    );

    let element = screen.getByText("Plus").closest("span");
    expect(element).toHaveClass("text-[10px]");

    rerender(<SubscriptionIdentifier isUserSubscribed={false} size="lg" />);

    element = screen.getByText("Plus").closest("span");
    expect(element).toHaveClass("text-sm");
  });
});
