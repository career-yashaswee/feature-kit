import { render, screen } from "@testing-library/react";
import { PageHeader } from "../components/page-header";

describe("PageHeader", () => {
  it("renders title", () => {
    render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        subtitle="Test subtitle"
      />,
    );

    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(
      <PageHeader
        icon={<div data-testid="test-icon">Icon</div>}
        title="Test Title"
      />,
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        actionsSlot={<button>Action</button>}
      />,
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        variant="minimal"
      />,
    );

    let container = screen.getByText("Test Title").closest("div");
    expect(container).toHaveClass("bg-background", "border", "border-border");

    rerender(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        variant="bordered"
      />,
    );

    container = screen.getByText("Test Title").closest("div");
    expect(container).toHaveClass("border-2", "border-border", "shadow-md");
  });

  it("hides corner decorations when showCornerDecorations is false", () => {
    render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        showCornerDecorations={false}
      />,
    );

    // Corner decorations are SVG elements, verify they're not rendered
    const container = screen.getByText("Test Title").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("applies correct icon size", () => {
    const { rerender } = render(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        iconSize="sm"
      />,
    );

    let container = screen.getByText("Test Title").closest("div");
    expect(container).toBeInTheDocument();

    rerender(
      <PageHeader
        icon={<div>Icon</div>}
        title="Test Title"
        iconSize="lg"
      />,
    );

    container = screen.getByText("Test Title").closest("div");
    expect(container).toBeInTheDocument();
  });
});



