/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'img.clerk.com',
      'vimeo.com',
      'i.vimeocdn.com',
    ],
  },
  serverExternalPackages: ['@prisma/client'],
}

module.exports = nextConfig
