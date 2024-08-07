/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "anirudh-marketplace.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "anirudh-marketplace-test.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
