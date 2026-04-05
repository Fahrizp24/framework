import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/views/produk"

describe("Tampilan Produk Component", () => {
  it("renders correctly with empty data", () => {
    // 1. Snapshot test
    const { container } = render(<TampilanProduk products={[]} />)
    expect(container).toMatchSnapshot()
  })

  it("renders title correctly", () => {
    render(<TampilanProduk products={[]} />)
    // 2 & 3. Kombinasi getByTestId dan toBe()
    expect(screen.getByTestId("title").textContent).toBe("Daftar Produk")
  })
})