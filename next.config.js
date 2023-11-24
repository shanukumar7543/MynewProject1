/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    // domains: [
    //   'localhost',
    //   'res.cloudinary.com',
    //   'vidychat.s3.eu-north-1.amazonaws.com',
    // ],
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
});
