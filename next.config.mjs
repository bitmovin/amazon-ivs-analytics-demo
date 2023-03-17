/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	devIndicators: {
		buildActivity: true,
		buildActivityPosition: 'top-right'
	},
	experimental: {
		appDir: true,
		typedRoutes: true
	},
	transpilePackages: ['@cloudscape-design/components']
};

export default nextConfig;
