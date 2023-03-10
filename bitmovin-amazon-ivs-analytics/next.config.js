/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cloudscape-design/components'
  ],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
