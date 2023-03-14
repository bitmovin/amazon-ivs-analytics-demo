/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'top-right'
  },
  eslint: {
    dirs: ['app'],
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    swcMinify: false,
    optimizeCss: false,
    runtime: 'nodejs',
  },
  transpilePackages: ['@cloudscape-design/components', '@cloudscape-design/global-styles']
}

export default nextConfig
