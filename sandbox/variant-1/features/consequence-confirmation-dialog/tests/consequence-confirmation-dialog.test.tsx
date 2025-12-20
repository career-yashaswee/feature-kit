import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConsequenceConfirmationDialog } from "../components/consequence-confirmation-dialog";

jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("ConsequenceConfirmationDialog", () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    onConfirm: jest.fn().mockResolvedValue(undefined),
    title: "Confirm Action",
    message: "Are you sure?",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog when open", () => {
    render(<ConsequenceConfirmationDialog {...defaultProps} />);

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls onOpenChange when cancel is clicked", () => {
    const onOpenChange = jest.fn();

    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        onOpenChange={onOpenChange}
      />,
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onConfirm when confirm is clicked", async () => {
    const onConfirm = jest.fn().mockResolvedValue(undefined);

    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        onConfirm={onConfirm}
      />,
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it("requires confirmation text for consequence variant", () => {
    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        variant="consequence"
        confirmationText="DELETE"
      />,
    );

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeDisabled();
  });

  it("enables confirm button when confirmation text matches", () => {
    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        variant="consequence"
        confirmationText="DELETE"
      />,
    );

    const input = screen.getByPlaceholderText("DELETE");
    fireEvent.change(input, { target: { value: "DELETE" } });

    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).not.toBeDisabled();
  });

  it("shows items list in consequence variant", () => {
    const items = [
      { label: "Item 1", value: "Value 1", icon: jest.fn(() => <div />) },
      { label: "Item 2", value: "Value 2", icon: jest.fn(() => <div />) },
    ];

    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        variant="consequence"
        items={items}
      />,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Value 1")).toBeInTheDocument();
  });

  it("shows different icons for different variants", () => {
    const { rerender } = render(
      <ConsequenceConfirmationDialog {...defaultProps} variant="warning" />,
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();

    rerender(
      <ConsequenceConfirmationDialog {...defaultProps} variant="info" />,
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
  });

  it("disables buttons when isLoading is true", () => {
    render(
      <ConsequenceConfirmationDialog
        {...defaultProps}
        isLoading={true}
      />,
    );

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeDisabled();
  });
});

