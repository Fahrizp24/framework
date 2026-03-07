import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
// import DetailProduk from "@/views/DetailProduk/index";

const HalamanProduk = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR(
    query.produk ? `/api/produk/${query.produk}` : null,
    fetcher
  );

  return (
    <div>
      {/* <DetailProduk product={isLoading ? {} : data?.data} /> */}
      <h1>Detail Produk</h1>
      <p>{query.produk}</p>
    </div>
  );
};

export default HalamanProduk;