/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  transpilePackages: [
    '@cloudscape-design/components',
    '@bitmovin/api-sdk'
  ],
  experimental: {
    appDir: true,
    typedRoutes: true,
  }
}

module.exports = nextConfig
