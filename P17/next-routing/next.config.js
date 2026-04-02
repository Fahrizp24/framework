/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com", // Untuk gambar sepatu adidas dari API
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com", // Untuk gambar Celana Chinos
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com", // Untuk gambar Sandal Cardinal
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1yutv2xslo29o.cloudfront.net", // Untuk gambar Sandal Gunung Eiger
        port: "",
        pathname: "/**",
      }
    ],
  },
}

module.exports = nextConfig
