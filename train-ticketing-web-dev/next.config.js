/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    reactStrictMode: true,
    images: {
        domains: ['dyez0ftqpcowi.cloudfront.net'],
    },
};

export default nextConfig;
