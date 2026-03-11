import { useSession } from "next-auth/react";

const HalamanProfile = () => {
  const { data }: any = useSession();

  return (
    <div>
      <h1>Halaman Profile</h1>
      <br />
      <h2>Selamat Datang {data?.user?.fullname}</h2>
    </div>
  );
};

export default HalamanProfile;