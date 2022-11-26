// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/scss/design-system/_breakpoints")],
    prependData: '@import "./assets/scss/design-system/_breakpoints.scss";',
  },
};

module.exports = nextConfig;
