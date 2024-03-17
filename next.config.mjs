/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "razziwp.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "razziwp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
