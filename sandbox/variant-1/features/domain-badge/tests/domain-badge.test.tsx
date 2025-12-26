import { render, screen } from "@testing-library/react";
import { DomainBadge } from "../components/domain-badge";

const mockDomainConfigs = [
  {
    id: "frontend",
    label: "Frontend",
    icon: () => <div>F</div>,
    color: { light: "text-blue-500", dark: "dark:text-blue-400" },
  },
  {
    id: "backend",
    label: "Backend",
    icon: () => <div>B</div>,
    color: { light: "text-green-500", dark: "dark:text-green-400" },
  },
  {
    id: "fullstack",
    label: "Full Stack",
    icon: () => <div>FS</div>,
    color: { light: "text-purple-500", dark: "dark:text-purple-400" },
  },
];

describe("DomainBadge", () => {
  it("renders domain icons", () => {
    render(
      <DomainBadge
        domains={["frontend", "backend"]}
        domainConfigs={mockDomainConfigs}
      />,
    );

    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("shows active domains with full opacity", () => {
    render(
      <DomainBadge
        domains={["frontend"]}
        domainConfigs={mockDomainConfigs}
      />,
    );

    const frontendIcon = screen.getByText("F").closest("div");
    expect(frontendIcon).not.toHaveClass("opacity-30");
  });

  it("shows inactive domains with reduced opacity", () => {
    render(
      <DomainBadge
        domains={["frontend"]}
        domainConfigs={mockDomainConfigs}
      />,
    );

    const backendIcon = screen.getByText("B").closest("div");
    expect(backendIcon).toHaveClass("opacity-30");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <DomainBadge
        domains={["frontend"]}
        domainConfigs={mockDomainConfigs}
        size="sm"
      />,
    );

    let container = screen.getByText("F").closest("div");
    expect(container).toHaveClass("px-2", "py-1.5");

    rerender(
      <DomainBadge
        domains={["frontend"]}
        domainConfigs={mockDomainConfigs}
        size="lg"
      />,
    );

    container = screen.getByText("F").closest("div");
    expect(container).toHaveClass("px-4", "py-2.5");
  });

  it("does not show tooltip when showTooltip is false", () => {
    render(
      <DomainBadge
        domains={["frontend"]}
        domainConfigs={mockDomainConfigs}
        showTooltip={false}
      />,
    );

    expect(screen.getByText("F")).toBeInTheDocument();
  });
});



