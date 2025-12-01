import { render, screen, waitFor, act } from "@testing-library/react";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { AutoSaveForm } from "../components/auto-save-form";

jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: jest.fn(),
}));

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
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockUseDebounce = useDebounce as jest.MockedFunction<
  typeof useDebounce
>;

describe("AutoSaveForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders children", () => {
    mockUseDebounce.mockReturnValue({ name: "Test" });
    render(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={jest.fn()}
      >
        <form>Test form</form>
      </AutoSaveForm>
    );
    expect(screen.getByText("Test form")).toBeInTheDocument();
  });

  it("saves data when debounced value changes", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Initial" });

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({ name: "Updated" });
    });
  });

  it("saves to localStorage when storageKey is provided", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Test" });

    render(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={onSave}
        storageKey="test-key"
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "test-key",
        JSON.stringify({ name: "Test" })
      );
    });
  });

  it("restores from localStorage on mount", () => {
    localStorage.setItem("test-key", JSON.stringify({ name: "Restored" }));
    mockUseDebounce.mockReturnValue({ name: "Restored" });

    render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={jest.fn()}
        storageKey="test-key"
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    expect(localStorage.getItem).toHaveBeenCalledWith("test-key");
  });

  it("shows saving indicator", async () => {
    const onSave = jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    await waitFor(() => {
      expect(screen.getByText("Saving...")).toBeInTheDocument();
    });
  });

  it("shows saved indicator after successful save", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByText("Saved")).toBeInTheDocument();
    });
  });

  it("shows error indicator on save failure", async () => {
    const onSave = jest.fn().mockRejectedValue(new Error("Save failed"));
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave}>
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("calls onSaveStart callback", async () => {
    const onSaveStart = jest.fn();
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveStart={onSaveStart}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveStart={onSaveStart}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(onSaveStart).toHaveBeenCalled();
    });
  });

  it("calls onSaveSuccess callback", async () => {
    const onSaveSuccess = jest.fn();
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveSuccess={onSaveSuccess}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveSuccess={onSaveSuccess}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(onSaveSuccess).toHaveBeenCalled();
    });
  });

  it("calls onSaveError callback on failure", async () => {
    const onSaveError = jest.fn();
    const onSave = jest.fn().mockRejectedValue(new Error("Save failed"));
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveError={onSaveError}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveError={onSaveError}
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(onSaveError).toHaveBeenCalled();
    });
  });

  it("uses custom success message", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Test" });

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        successMessage="Custom saved message"
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        successMessage="Custom saved message"
      >
        <form>Form</form>
      </AutoSaveForm>
    );

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Custom saved message");
    });
  });

  it("hides indicator when showIndicator is false", () => {
    mockUseDebounce.mockReturnValue({ name: "Test" });
    render(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={jest.fn()}
        showIndicator={false}
      >
        <form>Form</form>
      </AutoSaveForm>
    );
    expect(screen.queryByText("Saving...")).not.toBeInTheDocument();
  });
});

