/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "202.10.40.136",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    // domains: ["202.10.40.136"],
  },
};

export default nextConfig;
