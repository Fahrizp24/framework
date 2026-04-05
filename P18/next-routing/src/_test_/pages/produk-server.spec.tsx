import { render } from "@testing-library/react";
import HalamanProdukServer from "@/pages/produk/server";

describe("Produk Server Page", () => {
  it("renders correctly", () => {
    const { container } = render(<HalamanProdukServer products={[]} />);
    expect(container).toMatchSnapshot();
  });
});
