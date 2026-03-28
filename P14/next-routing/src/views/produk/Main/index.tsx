const Main = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-gray-50">
      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
        <h3 className="font-bold text-xl mb-2">Produk A</h3>
        <p className="text-gray-600">Deskripsi singkat produk berkualitas tinggi.</p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
        <h3 className="font-bold text-xl mb-2">Produk B</h3>
        <p className="text-gray-600">Deskripsi singkat produk berkualitas tinggi.</p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition">
        <h3 className="font-bold text-xl mb-2">Produk C</h3>
        <p className="text-gray-600">Deskripsi singkat produk berkualitas tinggi.</p>
      </div>
    </div>
  );
};

export default Main;