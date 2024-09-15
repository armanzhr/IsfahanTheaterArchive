/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};
module.exports = nextConfig;
