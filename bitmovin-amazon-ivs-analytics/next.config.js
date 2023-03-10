/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cloudscape-design/components',
    '@bitmovin/api-sdk'
  ],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
