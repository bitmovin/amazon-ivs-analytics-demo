import NextBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "top-right",
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
    swcMinify: true,
  },
  transpilePackages: [
    "@cloudscape-design/components",
    "@cloudscape-design/board-components",
    "@cloudscape-design/component-toolkit",
    "@cloudscape-design/design-tokens",
  ],
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
