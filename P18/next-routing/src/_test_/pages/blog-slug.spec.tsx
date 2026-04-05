import { render } from "@testing-library/react";
import HalamanSlug from "@/pages/blog/[slug]";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { slug: "test-slug" },
    };
  },
}));

describe("Blog Slug Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanSlug />);
    expect(container).toMatchSnapshot();
  });
});
