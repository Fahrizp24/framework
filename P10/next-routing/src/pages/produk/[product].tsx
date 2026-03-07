import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "@/views/DetailProduk";

const HalamanProduk = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR(
    query.product ? `/api/produk/${query.product}` : null,
    fetcher
  );

  return (
    <div>
      <DetailProduk product={isLoading ? {} : data?.data} />
    </div>
  );
};

export default HalamanProduk;