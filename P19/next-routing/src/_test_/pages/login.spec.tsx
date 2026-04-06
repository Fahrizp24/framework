import { render } from "@testing-library/react";
import HalamanLogin from "@/pages/auth/login";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      query: {},
    };
  },
}));

describe("Login Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanLogin />);
    expect(container).toMatchSnapshot();
  });
});
