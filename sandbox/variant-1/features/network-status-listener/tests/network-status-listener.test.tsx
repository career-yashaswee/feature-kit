import { render, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { useNetworkState } from "@uidotdev/usehooks";
import { NetworkStatusListener } from "../components/network-status-listener";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("@uidotdev/usehooks", () => ({
  useNetworkState: jest.fn(),
}));

const mockUseNetworkState = useNetworkState as jest.MockedFunction<
  typeof useNetworkState
>;

describe("NetworkStatusListener", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing", () => {
    mockUseNetworkState.mockReturnValue({ online: true } as any);
    const { container } = render(<NetworkStatusListener />);
    expect(container.firstChild).toBeNull();
  });

  it("does not show toast on initial render when online", () => {
    mockUseNetworkState.mockReturnValue({ online: true } as any);
    render(<NetworkStatusListener />);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("does not show toast on initial render when offline", () => {
    mockUseNetworkState.mockReturnValue({ online: false } as any);
    render(<NetworkStatusListener />);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("shows error toast when going offline", async () => {
    mockUseNetworkState.mockReturnValue({ online: true } as any);
    const { rerender } = render(<NetworkStatusListener />);

    mockUseNetworkState.mockReturnValue({ online: false } as any);
    rerender(<NetworkStatusListener />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "You are offline. Please check your connection.",
        { duration: 5000 }
      );
    });
  });

  it("shows success toast when coming back online", async () => {
    mockUseNetworkState.mockReturnValue({ online: false } as any);
    const { rerender } = render(<NetworkStatusListener />);

    mockUseNetworkState.mockReturnValue({ online: true } as any);
    rerender(<NetworkStatusListener />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Connection restored. You are back online.",
        { duration: 3000 }
      );
    });
  });

  it("uses custom offline message", async () => {
    mockUseNetworkState.mockReturnValue({ online: true } as any);
    const { rerender } = render(
      <NetworkStatusListener offlineMessage="Custom offline message" />
    );

    mockUseNetworkState.mockReturnValue({ online: false } as any);
    rerender(<NetworkStatusListener offlineMessage="Custom offline message" />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Custom offline message", {
        duration: 5000,
      });
    });
  });

  it("uses custom online message", async () => {
    mockUseNetworkState.mockReturnValue({ online: false } as any);
    const { rerender } = render(
      <NetworkStatusListener onlineMessage="Custom online message" />
    );

    mockUseNetworkState.mockReturnValue({ online: true } as any);
    rerender(<NetworkStatusListener onlineMessage="Custom online message" />);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Custom online message", {
        duration: 3000,
      });
    });
  });

  it("does not show toast when showToast is false", async () => {
    mockUseNetworkState.mockReturnValue({ online: true } as any);
    const { rerender } = render(<NetworkStatusListener showToast={false} />);

    mockUseNetworkState.mockReturnValue({ online: false } as any);
    rerender(<NetworkStatusListener showToast={false} />);

    await waitFor(() => {
      expect(toast.error).not.toHaveBeenCalled();
    });
  });
});

