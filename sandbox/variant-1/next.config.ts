import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses (SWC minification is enabled by default in Next.js 16+)
  compress: true,
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
  
  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === "production" && {
    // Reduce JavaScript bundle size
    output: "standalone",
  }),
};

export default nextConfig;
