import { render } from "@testing-library/react";
import ProfileEditPage from "@/pages/user/profile/edit/index";

describe("Profile Edit Page", () => {
  it("renders correctly", () => {
    const { container } = render(<ProfileEditPage />);
    expect(container).toMatchSnapshot();
  });
});
