/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost'],
            allowedOrigins: ['http://localhost']
        },
    },
    
}

module.exports = nextConfig
