import { render, screen, fireEvent } from "@testing-library/react";
import {
  GridCard,
  GridCardHeader,
  GridCardTitle,
  GridCardDescription,
  GridCardContent,
  GridCardFooter,
} from "../components/grid-card";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("GridCard", () => {
  it("renders children", () => {
    render(
      <GridCard>
        <div>Test Content</div>
      </GridCard>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();

    render(
      <GridCard onClick={onClick}>
        <div>Test Content</div>
      </GridCard>,
    );

    const card = screen.getByText("Test Content").closest("div");
    fireEvent.click(card!);

    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = jest.fn();

    render(
      <GridCard onClick={onClick} disabled={true}>
        <div>Test Content</div>
      </GridCard>,
    );

    const card = screen.getByText("Test Content").closest("div");
    fireEvent.click(card!);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders pinned badge when isPinned is true", () => {
    render(
      <GridCard isPinned={true}>
        <div>Test Content</div>
      </GridCard>,
    );

    const badge = screen.getByRole("img");
    expect(badge).toBeInTheDocument();
  });

  it("renders header content", () => {
    render(
      <GridCard headerContent={<div>Header</div>}>
        <div>Test Content</div>
      </GridCard>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <GridCard footerContent={<div>Footer</div>}>
        <div>Test Content</div>
      </GridCard>,
    );

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <GridCard variant="elevated">
        <div>Test</div>
      </GridCard>,
    );

    let card = screen.getByText("Test").closest("div");
    expect(card).toHaveClass("shadow-md");

    rerender(
      <GridCard variant="outlined">
        <div>Test</div>
      </GridCard>,
    );

    card = screen.getByText("Test").closest("div");
    expect(card).toHaveClass("bg-transparent");
  });
});

describe("GridCardHeader", () => {
  it("renders children", () => {
    render(
      <GridCardHeader>
        <div>Header Content</div>
      </GridCardHeader>,
    );

    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("renders action", () => {
    render(
      <GridCardHeader action={<button>Action</button>}>
        <div>Header</div>
      </GridCardHeader>,
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});

describe("GridCardTitle", () => {
  it("renders children", () => {
    render(<GridCardTitle>Test Title</GridCardTitle>);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});

describe("GridCardDescription", () => {
  it("renders children", () => {
    render(<GridCardDescription>Test Description</GridCardDescription>);

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});

describe("GridCardContent", () => {
  it("renders children", () => {
    render(
      <GridCardContent>
        <div>Content</div>
      </GridCardContent>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

describe("GridCardFooter", () => {
  it("renders children", () => {
    render(
      <GridCardFooter>
        <div>Footer</div>
      </GridCardFooter>,
    );

    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

