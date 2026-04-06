import { render } from "@testing-library/react";
import HalamanAdmin from "@/pages/admin/index";

describe("Admin Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanAdmin />);
    expect(container).toMatchSnapshot();
  });
});
