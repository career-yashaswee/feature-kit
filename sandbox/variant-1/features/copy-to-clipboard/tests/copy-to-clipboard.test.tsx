import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { CopyToClipboard } from "../components/copy-to-clipboard";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
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
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
    write: jest.fn().mockResolvedValue(undefined),
  },
});

describe("CopyToClipboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders button with label", () => {
    render(<CopyToClipboard text="test text" label="Copy" />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("copies text to clipboard when clicked", async () => {
    const writeTextSpy = jest.spyOn(navigator.clipboard, "writeText");

    render(<CopyToClipboard text="test text" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith("test text");
    });
  });

  it("shows success toast after copying", async () => {
    render(<CopyToClipboard text="test text" successMessage="Copied!" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Copied!");
    });
  });

  it("calls onCopy callback after successful copy", async () => {
    const onCopy = jest.fn();

    render(<CopyToClipboard text="test text" onCopy={onCopy} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onCopy).toHaveBeenCalledWith("test text");
    });
  });

  it("shows error toast when copy fails", async () => {
    jest
      .spyOn(navigator.clipboard, "writeText")
      .mockRejectedValue(new Error("Copy failed"));

    render(<CopyToClipboard text="test text" errorMessage="Failed to copy" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to copy");
    });
  });

  it("calls onError callback when copy fails", async () => {
    const onError = jest.fn();
    jest
      .spyOn(navigator.clipboard, "writeText")
      .mockRejectedValue(new Error("Copy failed"));

    render(<CopyToClipboard text="test text" onError={onError} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it("resets copied state after delay", async () => {
    render(<CopyToClipboard text="test text" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-label", "Copied!");
    });

    jest.advanceTimersByTime(150);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-label", "Copy to clipboard");
    });
  });

  it("hides icon when showIcon is false", () => {
    render(<CopyToClipboard text="test text" showIcon={false} />);

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).not.toBeInTheDocument();
  });
});
