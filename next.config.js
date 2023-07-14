/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'picsum',
            port: '',
            pathname: '**',
          },
        ],
      },
}

module.exports = nextConfig