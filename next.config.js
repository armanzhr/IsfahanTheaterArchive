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
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
};
module.exports = nextConfig;
