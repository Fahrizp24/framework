import { render } from "@testing-library/react";
import HalamanKategori from "@/pages/shop/[[...slug]]";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { slug: ["category", "item"] },
    };
  },
}));

describe("Shop Slug Page", () => {
  it("renders correctly with array slug", () => {
    const { container } = render(<HalamanKategori />);
    expect(container).toMatchSnapshot();
  });
});
