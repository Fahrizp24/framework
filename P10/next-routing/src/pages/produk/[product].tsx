import DetailProduk from "@/views/DetailProduk";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk product={product} />
    </div>
  );
};

export default HalamanProduk;

export async function getServerSideProps({ params }: { params: { product: string } }) {
  const res = await fetch(`http://localhost:3000/api/produk/${params.product}`);
  const response = await res.json();
  
  return {
    props: {
      product: response.data || null,
    },
  };
}