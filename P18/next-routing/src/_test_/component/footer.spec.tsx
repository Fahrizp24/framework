import { render } from "@testing-library/react";
import Footer from "@/components/layouts/footer/index";

describe("Footer Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
