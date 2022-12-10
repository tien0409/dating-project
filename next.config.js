// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss/design-system/_breakpoints")],
    prependData: '@import "./src/assets/scss/design-system/_breakpoints.scss";',
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
