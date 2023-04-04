/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    BaseUrl: process.env.M_HOSTNAME,
    OptionalUrl: process.env.G_HOSTNAME,
    Hostname: process.env.HOSTNAME,
  },
};

module.exports = nextConfig;
