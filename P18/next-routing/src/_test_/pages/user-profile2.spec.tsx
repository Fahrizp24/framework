import { render } from "@testing-library/react";
import HalamanProfile from "@/pages/user/profile/index";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    status: "authenticated",
    data: { user: { fullname: "John", email: "john@test.com", role: "admin" } }
  })),
}));

describe("User Profile Page", () => {
  it("renders authenticated state correctly", () => {
    const { container } = render(<HalamanProfile />);
    expect(container).toMatchSnapshot();
  });
  
  it("renders loading state correctly", () => {
    (useSession as jest.Mock).mockReturnValue({ status: "loading" });
    const { container } = render(<HalamanProfile />);
    expect(container).toMatchSnapshot();
  });
  
  it("renders unauthenticated state correctly", () => {
    (useSession as jest.Mock).mockReturnValue({ status: "unauthenticated", data: null });
    const { container } = render(<HalamanProfile />);
    expect(container).toMatchSnapshot();
  });
});
