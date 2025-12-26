import { render, screen, fireEvent } from "@testing-library/react";
import { FilterSheet } from "../components/filter-sheet";

const mockFilters = [
  {
    id: "filter1",
    type: "select" as const,
    label: "Category",
    value: "ALL",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
    onChange: jest.fn(),
  },
  {
    id: "filter2",
    type: "checkbox" as const,
    label: "Featured",
    checked: false,
    onChange: jest.fn(),
  },
];

describe("FilterSheet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders sheet when open", () => {
    render(
      <FilterSheet
        open={true}
        onOpenChange={jest.fn()}
        filters={mockFilters}
      />,
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders filter labels", () => {
    render(
      <FilterSheet
        open={true}
        onOpenChange={jest.fn()}
        filters={mockFilters}
      />,
    );

    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("calls onChange when select filter changes", () => {
    const onChange = jest.fn();
    const filters = [
      {
        ...mockFilters[0],
        onChange,
      },
    ];

    render(
      <FilterSheet
        open={true}
        onOpenChange={jest.fn()}
        filters={filters}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    const option = screen.getByText("Option 1");
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith("option1");
  });

  it("calls onChange when checkbox filter changes", () => {
    const onChange = jest.fn();
    const filters = [
      {
        ...mockFilters[1],
        onChange,
      },
    ];

    render(
      <FilterSheet
        open={true}
        onOpenChange={jest.fn()}
        filters={filters}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onClearAll when clear button is clicked", () => {
    const onClearAll = jest.fn();

    render(
      <FilterSheet
        open={true}
        onOpenChange={jest.fn()}
        filters={mockFilters}
        onClearAll={onClearAll}
      />,
    );

    const clearButton = screen.getByText("Clear All Filters");
    fireEvent.click(clearButton);

    expect(onClearAll).toHaveBeenCalled();
  });
});



