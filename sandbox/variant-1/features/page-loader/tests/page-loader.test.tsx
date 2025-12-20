import { render, screen, waitFor } from "@testing-library/react";
import { PageLoader } from "../components/page-loader";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("PageLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("does not render when isVisible is false", () => {
    const { container } = render(
      <PageLoader isVisible={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders when isVisible is true", async () => {
    render(
      <PageLoader
        isVisible={true}
        loadingState={{
          title: "Loading",
          messages: ["Please wait..."],
        }}
      />,
    );

    jest.advanceTimersByTime(20);

    await waitFor(() => {
      expect(screen.getByText("Loading")).toBeInTheDocument();
    });
  });

  it("renders loading messages", async () => {
    render(
      <PageLoader
        isVisible={true}
        loadingState={{
          title: "Loading",
          messages: ["Message 1", "Message 2"],
        }}
      />,
    );

    jest.advanceTimersByTime(20);

    await waitFor(() => {
      expect(screen.getByText("Message 1")).toBeInTheDocument();
      expect(screen.getByText("Message 2")).toBeInTheDocument();
    });
  });

  it("shows brand name when hideBranding is false", async () => {
    render(
      <PageLoader
        isVisible={true}
        brandName="MyApp"
        hideBranding={false}
      />,
    );

    jest.advanceTimersByTime(20);

    await waitFor(() => {
      expect(screen.getByText("MyApp")).toBeInTheDocument();
    });
  });

  it("hides brand when hideBranding is true", async () => {
    render(
      <PageLoader
        isVisible={true}
        brandName="MyApp"
        hideBranding={true}
      />,
    );

    jest.advanceTimersByTime(20);

    await waitFor(() => {
      expect(screen.queryByText("MyApp")).not.toBeInTheDocument();
    });
  });

  it("shows refresh button after delay", async () => {
    render(
      <PageLoader
        isVisible={true}
        refreshQueryKeys={["test"]}
        refreshDelay={100}
      />,
    );

    jest.advanceTimersByTime(120);

    await waitFor(() => {
      expect(screen.getByText("Taking longer than expected?")).toBeInTheDocument();
    });
  });
});

