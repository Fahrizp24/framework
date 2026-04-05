import { render } from "@testing-library/react";
import HalamanUser from "@/pages/user/index";

describe("User Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanUser />);
    expect(container).toMatchSnapshot();
  });
});
