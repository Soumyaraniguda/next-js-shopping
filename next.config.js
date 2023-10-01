/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  // Import "base.scss" file in every scss file
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  images: {
    domains: [
      "cdn.ipregistry.co",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
      "ae01.alicdn.com",
      "img.ltwebstatic.com",
      "ae03.alicdn.com",
    ],
  },
};

module.exports = nextConfig;
