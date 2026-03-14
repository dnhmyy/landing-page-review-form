/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Security & Cache Headers
    async headers() {
        return [
            // Static asset caching
            {
                source: '/:all*(svg|jpg|png|webp|avif|otf|ttf|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Security headers on all routes
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed by Next.js dev
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob:",
                            "connect-src 'self'",
                            "frame-ancestors 'none'",
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;

