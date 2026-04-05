import { render, screen } from "@testing-library/react";
import HalamanProfile from "@/pages/profile/index";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { fullname: "John Doe" } }
  })),
}));

describe("Profile Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanProfile />);
    expect(container).toMatchSnapshot();
    expect(screen.getByText("Selamat Datang John Doe")).toBeTruthy();
  });
});
