/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app"
      },
      {
        protocol: "https",
        hostname: "streak-stats.demolab.com"
      },
      {
        protocol: "https",
        hostname: "github-readme-activity-graph.vercel.app"
      },
      {
        protocol: "https",
        hostname: "github.com"
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
};

export default nextConfig;
