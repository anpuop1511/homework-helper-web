import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // This catches ANY URL formatted like /u/username
        source: '/u/:username',
        // And redirects it to your app's custom deep link scheme!
        destination: 'homeworkhelper://profile/:username',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;