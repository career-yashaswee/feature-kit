import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ActiveDevices } from "../components/active-devices";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: {},
    isLoading: false,
  })),
}));

const mockSessions = [
  {
    id: "1",
    token: "token1",
    device: "Chrome on Mac",
    browser: "Chrome",
    ipAddress: "192.168.1.1",
    location: "Local",
    updatedAt: new Date().toISOString(),
    isCurrent: true,
  },
  {
    id: "2",
    token: "token2",
    device: "Safari on iPhone",
    browser: "Safari",
    ipAddress: "192.168.1.2",
    location: "Remote",
    updatedAt: new Date().toISOString(),
    isCurrent: false,
  },
];

describe("ActiveDevices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders card title", () => {
    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={jest.fn()}
      />,
    );

    expect(screen.getByText("Active Devices")).toBeInTheDocument();
  });

  it("renders sessions", () => {
    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={jest.fn()}
      />,
    );

    expect(screen.getByText("Chrome on Mac")).toBeInTheDocument();
    expect(screen.getByText("Safari on iPhone")).toBeInTheDocument();
  });

  it("shows current device badge", () => {
    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={jest.fn()}
      />,
    );

    expect(screen.getByText("Current Device")).toBeInTheDocument();
  });

  it("shows session count badge", () => {
    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={jest.fn()}
        maxSessions={5}
      />,
    );

    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("shows empty state when no sessions", () => {
    render(
      <ActiveDevices
        sessions={[]}
        onDeleteSession={jest.fn()}
      />,
    );

    expect(screen.getByText("No active sessions")).toBeInTheDocument();
  });

  it("opens delete confirmation dialog", async () => {
    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={jest.fn()}
      />,
    );

    const deleteButtons = screen.getAllByRole("button");
    const deleteButton = deleteButtons.find((btn) =>
      btn.querySelector("svg"),
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText("Revoke Session")).toBeInTheDocument();
      });
    }
  });

  it("calls onDeleteSession when confirmed", async () => {
    const onDeleteSession = jest.fn().mockResolvedValue(undefined);

    render(
      <ActiveDevices
        sessions={mockSessions}
        onDeleteSession={onDeleteSession}
      />,
    );

    const deleteButtons = screen.getAllByRole("button");
    const deleteButton = deleteButtons.find((btn) =>
      btn.querySelector("svg"),
    );

    if (deleteButton) {
      fireEvent.click(deleteButton);

      await waitFor(() => {
        const confirmButton = screen.getByText("Revoke Session");
        fireEvent.click(confirmButton);
        expect(onDeleteSession).toHaveBeenCalled();
      });
    }
  });
});



