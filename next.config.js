/** @type {import('next').NextConfig} */
const nextConfig = {

  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, 
    
  },
    env: { 
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_API_KEY2: process.env.REACT_APP_API_KEY2,
    REACT_APP_SECRET_URL: process.env.REACT_APP_SECRET_URL,

  },
}

module.exports = nextConfig
