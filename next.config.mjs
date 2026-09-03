/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local photography lives in /public/images. Add remote patterns here only
    // if the firm later serves images from a CMS or CDN.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    return [
      // Convenience aliases so printed/emailed short links resolve correctly.
      { source: '/practice-areas', destination: '/practices', permanent: true },
      { source: '/our-team', destination: '/attorneys', permanent: true },
      { source: '/news', destination: '/insights', permanent: true },
    ];
  },
};

export default nextConfig;
