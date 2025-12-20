import { render, screen } from "@testing-library/react";
import { ResizablePanels } from "../components/resizable-panels";

jest.mock("react-resizable-panels", () => ({
  PanelGroup: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="panel-group" {...props}>
      {children}
    </div>
  ),
  Panel: ({ children, ...props }: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="panel" {...props}>
      {children}
    </div>
  ),
  PanelResizeHandle: (props: React.ComponentPropsWithoutRef<"div">) => (
    <div data-testid="panel-resize-handle" {...props} />
  ),
}));

const mockPanels = [
  {
    id: "panel1",
    content: <div>Panel 1 Content</div>,
    defaultSize: 50,
    minSize: 20,
    maxSize: 80,
  },
  {
    id: "panel2",
    content: <div>Panel 2 Content</div>,
    defaultSize: 50,
    minSize: 20,
    maxSize: 80,
  },
];

describe("ResizablePanels", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders panels", () => {
    render(<ResizablePanels panels={mockPanels} />);

    expect(screen.getByText("Panel 1 Content")).toBeInTheDocument();
    expect(screen.getByText("Panel 2 Content")).toBeInTheDocument();
  });

  it("renders panel labels when provided", () => {
    const panelsWithLabels = [
      {
        ...mockPanels[0],
        label: "Panel 1",
      },
      mockPanels[1],
    ];

    render(<ResizablePanels panels={panelsWithLabels} />);

    expect(screen.getByText("Panel 1")).toBeInTheDocument();
  });

  it("renders resize handles between panels", () => {
    render(<ResizablePanels panels={mockPanels} />);

    const handles = screen.getAllByTestId("panel-resize-handle");
    expect(handles.length).toBeGreaterThan(0);
  });

  it("applies horizontal direction by default", () => {
    render(<ResizablePanels panels={mockPanels} />);

    const panelGroup = screen.getByTestId("panel-group");
    expect(panelGroup).toHaveAttribute("data-direction", "horizontal");
  });

  it("applies vertical direction when specified", () => {
    render(<ResizablePanels panels={mockPanels} direction="vertical" />);

    const panelGroup = screen.getByTestId("panel-group");
    expect(panelGroup).toHaveAttribute("data-direction", "vertical");
  });

  it("renders panel icons when provided", () => {
    const panelsWithIcons = [
      {
        ...mockPanels[0],
        label: "Panel 1",
        icon: <div data-testid="icon">Icon</div>,
      },
      mockPanels[1],
    ];

    render(<ResizablePanels panels={panelsWithIcons} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});

