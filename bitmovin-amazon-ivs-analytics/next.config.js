/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cloudscape-design/components'
  ],
  experimental: {
    appDir: true,
    typedRoutes: true
  },
}

module.exports = nextConfig
