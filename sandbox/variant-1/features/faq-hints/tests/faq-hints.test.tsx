import { render, screen, fireEvent } from "@testing-library/react";
import { FaqHints } from "../components/faq-hints";

const mockItems = [
  {
    id: "1",
    question: "What is this?",
    answer: "This is a test answer",
    shortAnswer: "Test",
  },
  {
    id: "2",
    question: "How does it work?",
    answer: "It works by testing",
    shortAnswer: "Testing",
  },
];

describe("FaqHints", () => {
  it("renders heading", () => {
    render(<FaqHints heading="FAQ" items={mockItems} />);

    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <FaqHints
        heading="FAQ"
        description="Frequently asked questions"
        items={mockItems}
      />,
    );

    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
  });

  it("renders FAQ items", () => {
    render(<FaqHints items={mockItems} />);

    expect(screen.getByText("What is this?")).toBeInTheDocument();
    expect(screen.getByText("How does it work?")).toBeInTheDocument();
  });

  it("shows short answers when showShortAnswers is true", () => {
    render(<FaqHints items={mockItems} showShortAnswers={true} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });

  it("hides short answers when showShortAnswers is false", () => {
    render(<FaqHints items={mockItems} showShortAnswers={false} />);

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });

  it("expands accordion item when clicked", () => {
    render(<FaqHints items={mockItems} />);

    const trigger = screen.getByText("What is this?");
    fireEvent.click(trigger);

    expect(screen.getByText("This is a test answer")).toBeInTheDocument();
  });
});
