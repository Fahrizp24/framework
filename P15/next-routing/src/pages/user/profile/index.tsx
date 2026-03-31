// src/pages/profile/index.tsx
import { useSession } from "next-auth/react";

const HalamanProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Halaman Profile</h1>
      {session ? (
        <div>
          <p><strong>Nama:</strong> {session.user?.fullname}</p>
          <p><strong>Email:</strong> {session.user?.email}</p>
          <p><strong>Role:</strong> {session.user?.role}</p>
        </div>
      ) : (
        <p>Silakan login terlebih dahulu.</p>
      )}
    </div>
  );
};

export default HalamanProfile;