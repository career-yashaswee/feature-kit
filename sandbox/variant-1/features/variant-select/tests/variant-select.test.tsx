import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { VariantSelect } from "../components/variant-select";

jest.mock("react-image", () => ({
  Img: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const mockVariants = [
  {
    id: "variant1",
    display_name: "Variant 1",
    dependencies: [],
  },
  {
    id: "variant2",
    display_name: "Variant 2",
    dependencies: [],
  },
];

describe("VariantSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders display badge in display mode", () => {
    render(
      <VariantSelect
        featureId="test"
        variants={mockVariants}
        mode="display"
      />,
    );

    expect(screen.getByText("2 variants")).toBeInTheDocument();
  });

  it("renders selector button in selector mode", () => {
    render(
      <VariantSelect
        featureId="test"
        variants={mockVariants}
        mode="selector"
      />,
    );

    expect(screen.getByText("Variant 1")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    render(
      <VariantSelect
        featureId="test"
        variants={mockVariants}
        mode="selector"
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Variant 2")).toBeInTheDocument();
    });
  });

  it("calls onVariantSelect when variant is selected", async () => {
    const onVariantSelect = jest.fn();

    render(
      <VariantSelect
        featureId="test"
        variants={mockVariants}
        mode="selector"
        onVariantSelect={onVariantSelect}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      const variant2 = screen.getByText("Variant 2");
      fireEvent.click(variant2);
      expect(onVariantSelect).toHaveBeenCalledWith("variant2");
    });
  });

  it("does not render when variants array is empty", () => {
    const { container } = render(
      <VariantSelect featureId="test" variants={[]} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("shows loading state", () => {
    render(
      <VariantSelect
        featureId="test"
        variants={mockVariants}
        mode="selector"
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Loading skeletons should be present
    expect(screen.getByText("Variant 1")).toBeInTheDocument();
  });
});



