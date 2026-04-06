import { render } from "@testing-library/react";
import PasswordUserPage from "@/pages/user/password/index";

describe("Password User Page", () => {
  it("renders correctly", () => {
    const { container } = render(<PasswordUserPage />);
    expect(container).toMatchSnapshot();
  });
});
