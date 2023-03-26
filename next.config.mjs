
import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	devIndicators: {
		buildActivity: true,
		buildActivityPosition: "top-right",
	},
	experimental: {
		appDir: true,
		typedRoutes: true
	},
	transpilePackages: [
		"@cloudscape-design/components",
		"@cloudscape-design/board-components",
		"@cloudscape-design/component-toolkit"
	],

};


const withBundleAnalyzer = NextBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
