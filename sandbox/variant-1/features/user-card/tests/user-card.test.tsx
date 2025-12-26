import { render, screen, fireEvent } from "@testing-library/react";
import { UserCard } from "../components/user-card";

jest.mock("react-image", () => ({
  Img: ({ src, alt }: { src: string | string[]; alt: string }) => (
    <img src={Array.isArray(src) ? src[0] : src} alt={alt} />
  ),
}));

const mockUserData = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  avatarUrl: "https://example.com/avatar.jpg",
  description: "Test description",
};

describe("UserCard", () => {
  it("renders user name", () => {
    render(<UserCard {...mockUserData} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders username", () => {
    render(<UserCard {...mockUserData} />);

    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<UserCard {...mockUserData} />);

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders LinkedIn variant by default", () => {
    render(<UserCard {...mockUserData} />);

    expect(screen.getByText("John Doe...")).toBeInTheDocument();
  });

  it("renders Twitter variant when specified", () => {
    render(<UserCard {...mockUserData} variant="twitter" />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls onEditProfile when edit button is clicked", () => {
    const onEditProfile = jest.fn();

    render(
      <UserCard
        {...mockUserData}
        variant="twitter"
        onEditProfile={onEditProfile}
      />,
    );

    const editButton = screen.getByText("Edit profile");
    fireEvent.click(editButton);

    expect(onEditProfile).toHaveBeenCalled();
  });

  it("shows verified badge when verified is true", () => {
    render(<UserCard {...mockUserData} verified={true} />);

    const verifiedIcon = screen.getByText("John Doe...").parentElement?.querySelector("svg");
    expect(verifiedIcon).toBeInTheDocument();
  });

  it("renders location when provided", () => {
    render(<UserCard {...mockUserData} location="New York, NY" />);

    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });

  it("renders following and followers counts", () => {
    render(
      <UserCard
        {...mockUserData}
        variant="twitter"
        following={100}
        followers={200}
      />,
    );

    expect(screen.getByText("100 Following")).toBeInTheDocument();
    expect(screen.getByText("200 Followers")).toBeInTheDocument();
  });
});



