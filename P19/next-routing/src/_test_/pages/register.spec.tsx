import { render } from "@testing-library/react";
import HalamanRegister from "@/pages/auth/register";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      query: {},
    };
  },
}));

describe("Register Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanRegister />);
    expect(container).toMatchSnapshot();
  });
});
