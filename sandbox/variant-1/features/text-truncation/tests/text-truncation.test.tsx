import { render, screen, fireEvent } from "@testing-library/react";
import { TextTruncation } from "../components/text-truncation";

describe("TextTruncation", () => {
  const longText =
    "This is a very long text that should be truncated when it exceeds the maximum number of lines specified. It contains multiple sentences and should demonstrate the truncation functionality properly.";

  beforeEach(() => {
    // Mock getBoundingClientRect for text measurement
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      height: 100,
      width: 200,
      top: 0,
      left: 0,
      bottom: 100,
      right: 200,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));

    // Mock scrollHeight
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 150,
    });
  });

  it("renders text", () => {
    render(<TextTruncation text="Short text" />);

    expect(screen.getByText("Short text")).toBeInTheDocument();
  });

  it("truncates text by maxLines", () => {
    render(<TextTruncation text={longText} maxLines={2} />);

    const textElement = screen.getByText(longText);
    expect(textElement).toHaveStyle({
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    });
  });

  it("shows expand button when text needs truncation", () => {
    render(<TextTruncation text={longText} maxLines={2} />);

    expect(screen.getByText("Show more")).toBeInTheDocument();
  });

  it("expands text when expand button is clicked", () => {
    render(<TextTruncation text={longText} maxLines={2} />);

    const expandButton = screen.getByText("Show more");
    fireEvent.click(expandButton);

    expect(screen.getByText("Show less")).toBeInTheDocument();
  });

  it("collapses text when collapse button is clicked", () => {
    render(<TextTruncation text={longText} maxLines={2} />);

    const expandButton = screen.getByText("Show more");
    fireEvent.click(expandButton);

    const collapseButton = screen.getByText("Show less");
    fireEvent.click(collapseButton);

    expect(screen.getByText("Show more")).toBeInTheDocument();
  });

  it("uses custom expand label", () => {
    render(
      <TextTruncation
        text={longText}
        maxLines={2}
        expandLabel="Read more"
      />,
    );

    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("uses custom collapse label", () => {
    render(
      <TextTruncation
        text={longText}
        maxLines={2}
        collapseLabel="Read less"
      />,
    );

    const expandButton = screen.getByText("Show more");
    fireEvent.click(expandButton);

    expect(screen.getByText("Read less")).toBeInTheDocument();
  });

  it("hides toggle button when showToggle is false", () => {
    render(
      <TextTruncation text={longText} maxLines={2} showToggle={false} />,
    );

    expect(screen.queryByText("Show more")).not.toBeInTheDocument();
  });

  it("truncates text by maxLength", () => {
    render(<TextTruncation text={longText} maxLength={50} />);

    const displayedText = screen.getByText(longText.substring(0, 50) + "...");
    expect(displayedText).toBeInTheDocument();
  });
});



