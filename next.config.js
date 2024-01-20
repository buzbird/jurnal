/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedForwardedHosts: ['127.0.0.1'],
			allowedOrigins: ['http://5.35.93.157','http://127.0.0.1:3000',"website.com", "localhost:3000"]
		},
	}
}

module.exports = nextConfig
