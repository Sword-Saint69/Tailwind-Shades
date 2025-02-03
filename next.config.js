/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/bear.js",
        destination: "https://cdn.panelbear.com/analytics.js",
      },
    ];
  },
};

module.exports = nextConfig;
