import { render, screen, waitFor, act } from "@testing-library/react";
import {
  useDebounce,
  useIsFirstRender,
  useLocalStorage,
} from "@uidotdev/usehooks";
import { toast } from "sonner";
import { AutoSaveForm } from "../components/auto-save-form";

jest.mock("@uidotdev/usehooks", () => ({
  useDebounce: jest.fn(),
  useIsFirstRender: jest.fn(),
  useLocalStorage: jest.fn(),
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
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

const mockUseDebounce = useDebounce as jest.MockedFunction<typeof useDebounce>;
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
    mockUseDebounce.mockReturnValue({ name: "Initial" });
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
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({ name: "Updated" });
    });
  });

  it("saves to localStorage when storageKey is provided", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        storageKey="test-key"
        interval={100}
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Test" });
    mockUseLocalStorage.mockReturnValue([null, mockSetSavedData]);
    rerender(
      <AutoSaveForm
        data={{ name: "Test" }}
        onSave={onSave}
        storageKey="test-key"
        interval={100}
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
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(restoredData),
    );
    mockUseDebounce.mockReturnValue({ name: "Restored" });
    mockUseIsFirstRender.mockReturnValueOnce(true);
    mockUseLocalStorage.mockReturnValue([restoredData, mockSetSavedData]);

    render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={jest.fn()}
        storageKey="test-key"
      >
        <form>Form</form>
      </AutoSaveForm>,
    );

    expect(mockUseLocalStorage).toHaveBeenCalledWith("test-key", null);
  });

  it("shows saving indicator", async () => {
    let resolveSave: () => void;
    const onSave = jest.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        }),
    );
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(() => {
      expect(screen.getByText("Saving")).toBeInTheDocument();
    });

    // Resolve the save promise
    await act(async () => {
      resolveSave!();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });

  it("shows saved indicator after successful save", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(
      () => {
        expect(screen.getByText("Saved")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("shows error indicator on save failure", async () => {
    const onSave = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Save failed")));
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm data={{ name: "Initial" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    mockUseIsFirstRender.mockReturnValue(false);
    mockUseDebounce.mockReturnValue({ name: "Updated" });
    rerender(
      <AutoSaveForm data={{ name: "Updated" }} onSave={onSave} interval={100}>
        <form>Form</form>
      </AutoSaveForm>,
    );

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    await waitFor(
      () => {
        expect(screen.getByText("Error")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  // Tests for onSaveStart, onSaveSuccess, onSaveError are skipped
  // as these props are not supported by the current implementation

  it("uses custom success message", async () => {
    const onSave = jest.fn().mockResolvedValue(undefined);
    mockUseDebounce.mockReturnValue({ name: "Initial" });
    mockUseIsFirstRender.mockReturnValueOnce(true);

    const { rerender } = render(
      <AutoSaveForm
        data={{ name: "Initial" }}
        onSave={onSave}
        successMessage="Custom saved message"
        interval={100}
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
        interval={100}
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

  // Test for showIndicator is skipped as this prop is not supported
  // by the current implementation
});
