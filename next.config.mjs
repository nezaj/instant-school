/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config, options) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};

export default nextConfig;
