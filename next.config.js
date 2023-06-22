/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_API_KEY2: process.env.REACT_APP_API_KEY2,
        REACT_APP_SECRET_URL: process.env.REACT_APP_SECRET_URL,

    },
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'portal-manole.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'manoleeducacao.com.br',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'manole-certificados.s3.amazonaws.com',
                port: '',
                pathname: '/**',

            }
        ],
    },
}

module.exports = nextConfig
