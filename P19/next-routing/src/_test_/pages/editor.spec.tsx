import { render } from "@testing-library/react";
import HalamanEditor from "@/pages/editor/index";

describe("Editor Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanEditor />);
    expect(container).toMatchSnapshot();
  });
});
