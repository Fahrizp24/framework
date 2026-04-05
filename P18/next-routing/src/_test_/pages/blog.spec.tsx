import { render } from "@testing-library/react";
import Blog from "@/pages/blog/index";

describe("Blog Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Blog />);
    expect(container).toMatchSnapshot();
  });
});
