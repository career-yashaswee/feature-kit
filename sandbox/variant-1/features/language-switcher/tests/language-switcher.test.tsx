import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageSwitcher } from "../components/language-switcher";

const mockLanguages = [
  { code: "en", label: "English", flag: () => <div>🇺🇸</div> },
  { code: "es", label: "Spanish", flag: () => <div>🇪🇸</div> },
  { code: "fr", label: "French", flag: () => <div>🇫🇷</div> },
];

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders current language flag", () => {
    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
      />,
    );

    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });

  it("opens dropdown when clicked", async () => {
    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
      />,
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Select Language")).toBeInTheDocument();
    });
  });

  it("calls onLanguageChange when language is selected", async () => {
    const onLanguageChange = jest.fn();

    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={onLanguageChange}
      />,
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Spanish")).toBeInTheDocument();
    });

    const spanishOption = screen.getByText("Spanish");
    fireEvent.click(spanishOption);

    await waitFor(() => {
      expect(onLanguageChange).toHaveBeenCalledWith("es");
    });
  });

  it("does not call onLanguageChange when same language is selected", async () => {
    const onLanguageChange = jest.fn();

    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={onLanguageChange}
      />,
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("English")).toBeInTheDocument();
    });

    const englishOption = screen.getByText("English");
    fireEvent.click(englishOption);

    expect(onLanguageChange).not.toHaveBeenCalled();
  });

  it("shows checkmark for current language", async () => {
    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
      />,
    );

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    await waitFor(() => {
      const checkIcon = screen.getAllByRole("img")[0];
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it("shows label when showLabel is true", () => {
    render(
      <LanguageSwitcher
        languages={mockLanguages}
        currentLanguage="en"
        onLanguageChange={jest.fn()}
        showLabel={true}
      />,
    );

    expect(screen.getByText("English")).toBeInTheDocument();
  });
});



