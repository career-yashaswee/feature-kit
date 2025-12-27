import { render, screen, waitFor, act } from "@testing-library/react";
import { useIsFirstRender, useLocalStorage } from "@uidotdev/usehooks";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { toast } from "sonner";
import { AutoSaveForm } from "../components/auto-save-form";

jest.mock("@uidotdev/usehooks", () => ({
  useIsFirstRender: jest.fn(),
  useLocalStorage: jest.fn(),
}));

jest.mock("@tanstack/react-pacer", () => ({
  useDebouncedValue: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    loading: jest.fn(() => "toast-id"),
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

const mockUseDebouncedValue = useDebouncedValue as jest.MockedFunction<
  typeof useDebouncedValue
>;
const mockUseIsFirstRender = useIsFirstRender as jest.MockedFunction<
  typeof useIsFirstRender
>;
const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
  typeof useLocalStorage
>;

describe("AutoSaveForm", () => {
  const mockSetSavedData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    jest.useFakeTimers();
    mockUseIsFirstRender.mockReturnValue(true);
    mockUseLocalStorage.mockReturnValue([null, mockSetSavedData]);

    // Mock localStorage methods
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  it("renders children", () => {
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);
    render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={jest.fn()}>
        <form>Test form</form>
      </AutoSaveForm>,
    );
    expect(screen.getByText("Test form")).toBeInTheDocument();
  });

  it("saves data when debounced value changes", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Saving...");
      expect(onSave).toHaveBeenCalledWith(
        { name: "Updated" },
        expect.any(AbortSignal),
      );
      expect(toast.dismiss).toHaveBeenCalledWith("toast-id");
      expect(toast.success).toHaveBeenCalledWith("Changes saved");
    });
  });

  it("saves to localStorage when storageKey is provided", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        storageKey="test-key"
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Test" }]);
    mockUseLocalStorage.mockReturnValue([null, mockSetSavedData]);
    rerender(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={onSave}
        storageKey="test-key"
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(mockSetSavedData).toHaveBeenCalledWith({ name: "Test" });
    });
  });

  it("restores from localStorage on mount", () => {
    const restoredData = { name: "Restored" };
    const onLoadFromStorage = jest.fn();
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(restoredData),
    );
    mockUseDebouncedValue.mockReturnValue([{ name: "Restored" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);
    mockUseLocalStorage.mockReturnValue([restoredData, mockSetSavedData]);

    render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={jest.fn()}
        storageKey="test-key"
        onLoadFromStorage={onLoadFromStorage}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    expect(mockUseLocalStorage).toHaveBeenCalledWith("test-key", null);
    expect(onLoadFromStorage).toHaveBeenCalledWith({
      name: "Initial",
      ...restoredData,
    });
  });

  it("shows loading toast when saving", async () => {
    let resolveSave: () => void;
    const onSave = jest.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        }),
    );
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Saving...");
    });

    // Resolve the save promise
    await act(async () => {
      resolveSave!();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it("shows success toast after successful save", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(
      () => {
        expect(toast.loading).toHaveBeenCalledWith("Saving...");
        expect(toast.dismiss).toHaveBeenCalledWith("toast-id");
        expect(toast.success).toHaveBeenCalledWith("Changes saved");
      },
      { timeout: 3000 },
    );
  });

  it("shows error toast on save failure", async () => {
    const onSave = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Save failed")));
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} debounceMs={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(
      () => {
        expect(toast.loading).toHaveBeenCalledWith("Saving...");
        expect(toast.dismiss).toHaveBeenCalledWith("toast-id");
        expect(toast.error).toHaveBeenCalledWith("Failed to save changes");
      },
      { timeout: 3000 },
    );
  });

  it("calls onSaveStart callback", async () => {
    const onSaveStart = jest.fn();
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveStart={onSaveStart}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveStart={onSaveStart}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(onSaveStart).toHaveBeenCalled();
    });
  });

  it("calls onSaveSuccess callback", async () => {
    const onSaveSuccess = jest.fn();
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebouncedValue.mockReturnValue([{ name: "Initial" }]);
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveSuccess={onSaveSuccess}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebouncedValue.mockReturnValue([{ name: "Updated" }]);
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveSuccess={onSaveSuccess}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(
      () => {
        expect(onSaveSuccess).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  it("calls onSaveError callback on failure", async () => {
    const onSaveError = jest.fn();
    const onSave = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Save failed")));
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        onSaveError={onSaveError}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        onSaveError={onSaveError}
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () => {
        expect(onSaveError).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
  });

  it("uses custom success message", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        successMessage="Custom saved message"
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm
        data={{ name: "Updated" }}
        onSave={onSave}
        successMessage="Custom saved message"
        debounceMs={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith("Custom saved message");
      },
      { timeout: 3000 },
    );
  });

  it("hides indicator when showIndicator is false", () => {
    mockUseDebounce.mockReturnValue({ name: "Test" });
    mockUseIsFirstRender.mockReturnValueOnce(true);
    render(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={jest.fn()}
        showIndicator={false}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );
    expect(screen.queryByText("Saving")).not.toBeInTheDocument();
  });
});
