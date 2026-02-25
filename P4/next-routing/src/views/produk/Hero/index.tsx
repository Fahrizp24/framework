const Hero = () => {
  return (
    <section className="bg-blue-600 p-12 text-center rounded-2xl shadow-lg m-6">
      {/* Utility: 1.bg-blue-600, 2.p-12, 3.text-center, 4.rounded-2xl, 5.shadow-lg */}
      <h1 className="text-white text-5xl font-extrabold uppercase tracking-tight">
        Produk Unggulan
      </h1>
      <p className="text-blue-100 mt-4 text-lg">
        Temukan kualitas terbaik hanya di toko kami.
      </p>
    </section>
  );
};

export default Hero;