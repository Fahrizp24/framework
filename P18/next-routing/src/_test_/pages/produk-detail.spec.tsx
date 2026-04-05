import { render } from "@testing-library/react";
import HalamanProduk from "@/pages/produk/[product]";

describe("Produk Detail Page", () => {
  it("renders correctly", () => {
    const mockProduct = {
      id: "1",
      name: "Test",
      price: 1000,
      image: "/test.png",
      category: "TestCategory",
    };
    const { container } = render(<HalamanProduk product={mockProduct} />);
    expect(container).toMatchSnapshot();
  });
});
