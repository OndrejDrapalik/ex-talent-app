require('dotenv').config();

module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['lh3.googleusercontent.com'],
    loader: 'imgix',
    path: 'https://lh3.googleusercontent.com/',
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};
