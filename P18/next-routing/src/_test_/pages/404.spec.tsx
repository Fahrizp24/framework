import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";

describe("404 Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Custom404 />);
    expect(container).toMatchSnapshot();
  });
});
