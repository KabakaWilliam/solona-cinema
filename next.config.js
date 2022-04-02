/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "giphy.com",
      "media.giphy.com",
      "lh3.googleusercontent.com",
      "hoppip.tumblr.com",
      "media.giphy.com",
    ],
  },
};

module.exports = nextConfig;
