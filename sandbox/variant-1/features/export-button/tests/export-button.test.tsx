import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { ExportButton } from "../components/export-button";

jest.mock("sonner", () => ({
  toast: {
    promise: jest.fn(),
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

const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();
const mockClick = jest.fn();

global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

describe("ExportButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue("blob:url");
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders with default label", () => {
    const fetchData = jest.fn().mockResolvedValue([]);
    render(<ExportButton fetchData={fetchData} />);
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    const fetchData = jest.fn().mockResolvedValue([]);
    render(<ExportButton fetchData={fetchData} label="Download" />);
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("exports data as CSV", async () => {
    const fetchData = jest.fn().mockResolvedValue([
      { id: 1, name: "Test" },
      { id: 2, name: "Test2" },
    ]);
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(<ExportButton fetchData={fetchData} format="csv" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalled();
    });
  });

  it("exports data as JSON", async () => {
    const fetchData = jest.fn().mockResolvedValue([
      { id: 1, name: "Test" },
    ]);
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(<ExportButton fetchData={fetchData} format="json" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalled();
    });
  });

  it("shows toast with custom resource", async () => {
    const fetchData = jest.fn().mockResolvedValue([{ id: 1 }]);
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(
      <ExportButton fetchData={fetchData} resource="users" />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalledWith(
        expect.any(Promise),
        expect.objectContaining({
          loading: "Preparing users export...",
          success: "users exported successfully!",
          error: "Failed to export users.",
        })
      );
    });
  });

  it("calls onSuccess callback", async () => {
    const fetchData = jest.fn().mockResolvedValue([{ id: 1 }]);
    const onSuccess = jest.fn();
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(
      <ExportButton fetchData={fetchData} onSuccess={onSuccess} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("calls onError callback on failure", async () => {
    const fetchData = jest.fn().mockRejectedValue(new Error("Export failed"));
    const onError = jest.fn();

    render(
      <ExportButton fetchData={fetchData} onError={onError} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it("throws error when data is empty", async () => {
    const fetchData = jest.fn().mockResolvedValue([]);
    const onError = jest.fn();

    render(
      <ExportButton fetchData={fetchData} onError={onError} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it("disables button when exporting", async () => {
    const fetchData = jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([{ id: 1 }]), 100))
    );
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(<ExportButton fetchData={fetchData} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("generates filename with timestamp", async () => {
    const fetchData = jest.fn().mockResolvedValue([{ id: 1 }]);
    const mockLink = {
      href: "",
      download: "",
      style: { display: "" },
      click: mockClick,
    };
    document.createElement = jest.fn().mockReturnValue(mockLink as any);

    render(
      <ExportButton fetchData={fetchData} filename="test-data" />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLink.download).toMatch(/^test-data-.*\.csv$/);
    });
  });
});

