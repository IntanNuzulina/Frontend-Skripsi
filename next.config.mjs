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
        hostname: "api.intannuzulina.online",
      },
      {
        protocol: "http",
        hostname: "intannuzulina.online",
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
