/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["space-facilitoy.sfo3.cdn.digitaloceanspaces.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*.primeblog.online",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
