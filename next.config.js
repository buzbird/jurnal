/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost'],
			allowedOrigins: ['http://5.35.93.157',"website.com", "localhost:3000"]
		},
	}
}

module.exports = nextConfig
