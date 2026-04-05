import { render } from "@testing-library/react";
import HalamanProdukStatic from "@/pages/produk/static";

describe("Produk Static Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanProdukStatic products={[]} />);
    expect(container).toMatchSnapshot();
  });
});
