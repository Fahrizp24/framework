import { render } from "@testing-library/react";
import Navbar from "@/components/layouts/navbar";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("Navbar Component", () => {
  it("renders Sign In button when not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });

  it("renders Sign Out button when authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "John Doe", image: "/avatar.png" } },
    });
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
