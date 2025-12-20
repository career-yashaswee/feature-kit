import { render } from "@testing-library/react";
import { RestoreScrollPosition } from "../components/restore-scroll-position";

// Mock the hook
jest.mock("../hooks/use-scroll-position", () => ({
  useScrollPosition: jest.fn(),
}));

describe("RestoreScrollPosition", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    const { getByText } = render(
      <RestoreScrollPosition storageKey="test-key">
        <div>Test Content</div>
      </RestoreScrollPosition>,
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("renders children when container is provided", () => {
    const container = document.createElement("div");

    const { getByText } = render(
      <RestoreScrollPosition storageKey="test-key" container={container}>
        <div>Test Content</div>
      </RestoreScrollPosition>,
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("wraps children in div when container is not provided", () => {
    const { container } = render(
      <RestoreScrollPosition storageKey="test-key">
        <div>Test Content</div>
      </RestoreScrollPosition>,
    );

    expect(container.firstChild).toHaveClass("h-full", "w-full");
  });

  it("does not wrap children when container is provided", () => {
    const container = document.createElement("div");

    const { container: renderedContainer } = render(
      <RestoreScrollPosition storageKey="test-key" container={container}>
        <div>Test Content</div>
      </RestoreScrollPosition>,
    );

    // Should render fragment, not wrapper div
    expect(renderedContainer.firstChild).not.toHaveClass("h-full");
  });
});

