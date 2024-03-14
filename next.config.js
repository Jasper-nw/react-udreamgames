/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig = withPWA({
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    origin: "udreamgames",
    cdnUrl: "https://asserts.gameseeks.com/",
  },
});

module.exports = nextConfig;
