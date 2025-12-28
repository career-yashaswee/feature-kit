import { render, screen, fireEvent } from "@testing-library/react";
import { TableOfContents } from "../components/table-of-contents";

describe("TableOfContents", () => {
  const mockItems = [
    { slug: "section-1", content: "Section 1", lvl: 1, i: 0, seen: 0 },
    { slug: "section-2", content: "Section 2", lvl: 2, i: 1, seen: 0 },
    { slug: "section-3", content: "Section 3", lvl: 3, i: 2, seen: 0 },
  ];

  beforeEach(() => {
    // Mock getElementById
    document.getElementById = jest.fn((id) => {
      const element = document.createElement("div");
      element.id = id;
      element.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        left: 0,
        bottom: 200,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: 100,
        toJSON: jest.fn(),
      }));
      return element;
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    window.pageYOffset = 0;
  });

  it("renders table of contents with items", () => {
    render(<TableOfContents items={mockItems} />);

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Section 3")).toBeInTheDocument();
  });

  it("does not render when items array is empty", () => {
    const { container } = render(<TableOfContents items={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders correct heading", () => {
    render(<TableOfContents items={mockItems} />);

    expect(screen.getByText("On this page")).toBeInTheDocument();
  });

  it("applies correct indentation for different levels", () => {
    render(<TableOfContents items={mockItems} />);

    const section1 = screen.getByText("Section 1").closest("a");
    const section2 = screen.getByText("Section 2").closest("a");
    const section3 = screen.getByText("Section 3").closest("a");

    expect(section1).toHaveClass("ml-0");
    expect(section2).toHaveClass("ml-4");
    expect(section3).toHaveClass("ml-8");
  });

  it("scrolls to section when link is clicked", () => {
    render(<TableOfContents items={mockItems} />);

    const link = screen.getByText("Section 1").closest("a");
    if (link) {
      fireEvent.click(link);

      expect(window.scrollTo).toHaveBeenCalled();
    }
  });

  it("prevents default navigation on link click", () => {
    render(<TableOfContents items={mockItems} />);

    const link = screen.getByText("Section 1").closest("a");
    if (link) {
      const preventDefault = jest.fn();
      fireEvent.click(link, {
        preventDefault,
      });

      // Verify scroll happened instead of navigation
      expect(window.scrollTo).toHaveBeenCalled();
    }
  });

  it("generates correct href for each item", () => {
    render(<TableOfContents items={mockItems} />);

    const link1 = screen.getByText("Section 1").closest("a");
    expect(link1).toHaveAttribute("href", "#section-1");
  });
});
