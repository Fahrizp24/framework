import { useRouter } from "next/router";
import Link from "next/link";

const halamanLogin = () => {
  const { push } = useRouter();

  const handlerLogin = () => {
    // logic login disini 
    push('/produk'); 
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '350px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Login</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Username / Email" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Password" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          
          {/* Kode lama yang tidak dipakai: */}
          {/* <button onClick={handlerLogin}>Login </button> */}
          {/* <button onClick={() => handlerLogin()}>Login</button> */}
          
          <button 
            onClick={() => push('/produk')} 
            style={{ 
              padding: '10px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Masuk
          </button>
        </div>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Belum punya akun? <Link href="/auth/register" style={{ color: '#0070f3', textDecoration: 'none' }}>Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default halamanLogin;