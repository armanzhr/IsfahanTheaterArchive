/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
    remotePatterns: [
      {
        hostname: "*",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
  output: "export"
};
module.exports = nextConfig;
