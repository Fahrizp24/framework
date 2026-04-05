import { render } from "@testing-library/react";
import AppSetting from "@/pages/setting/app";

describe("App Setting Page", () => {
  it("renders correctly", () => {
    const { container } = render(<AppSetting />);
    expect(container).toMatchSnapshot();
  });
});
