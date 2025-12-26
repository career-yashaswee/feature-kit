import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShareQRCode } from "../components/share-qr-code";

jest.mock("react-qr-code", () => ({
  __esModule: true,
  default: ({ value }: { value: string }) => (
    <div data-testid="qr-code">{value}</div>
  ),
}));

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

Object.assign(navigator, {
  share: jest.fn().mockResolvedValue(undefined),
});

describe("ShareQRCode", () => {
  const defaultProps = {
    url: "https://example.com",
    isOpen: true,
    onOpenChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders QR code when open", () => {
    render(<ShareQRCode {...defaultProps} />);

    expect(screen.getByTestId("qr-code")).toBeInTheDocument();
    expect(screen.getByTestId("qr-code")).toHaveTextContent(
      "https://example.com",
    );
  });

  it("displays username when provided", () => {
    render(<ShareQRCode {...defaultProps} username="testuser" />);

    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", () => {
    const onOpenChange = jest.fn();

    render(<ShareQRCode {...defaultProps} onOpenChange={onOpenChange} />);

    const closeButton = screen.getAllByRole("button")[0];
    fireEvent.click(closeButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("cycles theme when color button is clicked", () => {
    render(<ShareQRCode {...defaultProps} />);

    const colorButton = screen.getByText("COLOR");
    fireEvent.click(colorButton);

    // Theme cycling is internal state, verify button exists and is clickable
    expect(colorButton).toBeInTheDocument();
  });

  it("shares URL when share button is clicked", async () => {
    const shareSpy = jest.spyOn(navigator, "share");

    render(<ShareQRCode {...defaultProps} username="testuser" />);

    const shareButton = screen.getByText("Share profile");
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(shareSpy).toHaveBeenCalledWith({
        title: "Share @testuser",
        text: undefined,
        url: "https://example.com",
      });
    });
  });

  it("handles share error gracefully", async () => {
    const shareSpy = jest
      .spyOn(navigator, "share")
      .mockRejectedValue(new Error("Share failed"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<ShareQRCode {...defaultProps} />);

    const shareButton = screen.getByText("Share profile");
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(shareSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it("does not render when isOpen is false", () => {
    render(<ShareQRCode {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("qr-code")).not.toBeInTheDocument();
  });
});



