import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useWindowScroll } from "@uidotdev/usehooks";
import { ScrollToTopButton } from "../components/scroll-to-top-button";
jest.mock("@uidotdev/usehooks", () => ({
  useWindowScroll: jest.fn(),
}));

jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.length > 0 ? <div>{children}</div> : null;
  },
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

const mockUseWindowScroll = useWindowScroll as jest.MockedFunction<
  typeof useWindowScroll
>;
const mockScrollTo = jest.fn();

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 0 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
  });

  it("does not render when scroll position is below threshold", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 100 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton threshold={300} />);
    expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
  });

  it("renders when scroll position exceeds threshold", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 400 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton threshold={300} />);
    expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
  });

  it("renders with default text when no children provided", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 400 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton />);
    expect(screen.getByText("Top")).toBeInTheDocument();
  });

  it("renders custom children", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 400 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(
      <ScrollToTopButton>
        <span>Custom</span>
      </ScrollToTopButton>,
    );
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("calls scrollTo when button is clicked", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 400 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton />);
    const button = screen.getByLabelText("Scroll to top");
    fireEvent.click(button);
    expect(mockScrollTo).toHaveBeenCalledWith({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  });

  it("uses custom threshold", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 500 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton threshold={600} />);
    expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
  });

  it("applies correct position classes", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: 400 },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);

    const { rerender } = render(<ScrollToTopButton position="left" />);
    let button = screen.getByLabelText("Scroll to top");
    expect(button.closest("div")).toHaveClass("left-6");

    rerender(<ScrollToTopButton position="center" />);
    button = screen.getByLabelText("Scroll to top");
    expect(button.closest("div")).toHaveClass("left-1/2", "-translate-x-1/2");

    rerender(<ScrollToTopButton position="right" />);
    button = screen.getByLabelText("Scroll to top");
    expect(button.closest("div")).toHaveClass("right-6");
  });

  it("handles null y value from useWindowScroll", () => {
    mockUseWindowScroll.mockReturnValue([
      { x: 0, y: null },
      mockScrollTo,
    ] as ReturnType<typeof useWindowScroll>);
    render(<ScrollToTopButton />);
    expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
  });
});
