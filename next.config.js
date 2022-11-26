// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss/design-system/_breakpoints")],
    prependData: '@import "./src/assets/scss/design-system/_breakpoints.scss";',
  },
};

module.exports = nextConfig;
