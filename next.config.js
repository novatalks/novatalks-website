module.exports = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  basePath: '',
  env: {
    eventsOnIndex: 2,
    localeStrings: [
      ['pt', 'pt-pt'],
      ['en', 'en-us'],
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'pt'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    //localeDetection: false,
  },
  images: {
    domains: ['prismic.io', 'images.prismic.io'],
  },
  async redirects() {
    return [
      {
        source: '/company',
        destination: '/companies',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/',
        permanent: true,
      },
      {
        source: '/speaker',
        destination: '/speakers',
        permanent: true,
      },
    ];
  },
};
