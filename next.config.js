/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost'],
			allowedOrigins: ['http://5.35.93.157','http://127.0.0.1',"website.com", "localhost"]
		},
	}
}

module.exports = nextConfig
