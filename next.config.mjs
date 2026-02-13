/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// Allow local Next.js usage even when Cloudflare/OpenNext tooling is not installed.
void import("@opennextjs/cloudflare")
  .then(({ initOpenNextCloudflareForDev }) => initOpenNextCloudflareForDev())
  .catch(() => {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Optional package '@opennextjs/cloudflare' is not installed; skipping OpenNext Cloudflare dev init.",
      );
    }
  });

export default nextConfig;
