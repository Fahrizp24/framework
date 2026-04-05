import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
