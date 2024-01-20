/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedForwardedHosts: ['5.35.93.157'],
			allowedOrigins: ['http://5.35.93.157']
		},
	}
}

module.exports = nextConfig
