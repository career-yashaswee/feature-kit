import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UpgradeButton } from "../components/upgrade-button";

describe("UpgradeButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders upgrade button when not subscribed", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        onUpgrade={jest.fn()}
      />,
    );

    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });

  it("renders manage subscription button when subscribed", () => {
    render(
      <UpgradeButton
        isSubscribed={true}
        onUpgrade={jest.fn()}
      />,
    );

    expect(screen.getByText("Manage Subscription")).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        isLoading={true}
        onUpgrade={jest.fn()}
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("calls onUpgrade when clicked", async () => {
    const onUpgrade = jest.fn().mockResolvedValue(undefined);

    render(
      <UpgradeButton
        isSubscribed={false}
        onUpgrade={onUpgrade}
      />,
    );

    const button = screen.getByText("Upgrade");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onUpgrade).toHaveBeenCalled();
    });
  });

  it("disables button when loading", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        isLoading={true}
        onUpgrade={jest.fn()}
      />,
    );

    const button = screen.getByText("Loading...");
    expect(button).toBeDisabled();
  });

  it("shows custom upgrade action text", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        onUpgrade={jest.fn()}
        upgradeAction={{
          type: "start_trial",
          buttonText: "Start Trial",
        }}
      />,
    );

    expect(screen.getByText("Start Trial")).toBeInTheDocument();
  });

  it("shows message when showMessage is true", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        onUpgrade={jest.fn()}
        showMessage={true}
        upgradeAction={{
          type: "upgrade",
          buttonText: "Upgrade",
          message: "Upgrade to unlock features",
        }}
      />,
    );

    expect(screen.getByText("Upgrade to unlock features")).toBeInTheDocument();
  });

  it("renders icon only when iconOnly is true", () => {
    render(
      <UpgradeButton
        isSubscribed={false}
        onUpgrade={jest.fn()}
        iconOnly={true}
      />,
    );

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(screen.queryByText("Upgrade")).not.toBeInTheDocument();
  });
});



