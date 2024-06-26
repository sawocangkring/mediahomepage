import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import nextSafe from "next-safe";
const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
        port: "",
      },
      {
        protocol: "http",
        hostname: "sawocangkring-wonoayu.desa.id",
        port: "",
      },
    ],
  },
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: nextSafe({
          contentSecurityPolicy: {
            "script-src":
              "'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com cdn.jsdelivr.net *.youtube.com *.tableau.com",
            "frame-src":
              "'self' *.googletagmanager.com *.youtube.com *.google.com *.tableau.com *.openstreetmap.org",
            "style-src":
              "'self' 'unsafe-inline' fonts.googleapis.com cdn.jsdelivr.net",
            "connect-src":
              "'self' *.googletagmanager.com *.google-analytics.com sid.kemendesa.go.id",
            "img-src":
              "'self' data: http://sawocangkring-wonoayu.desa.id *.ytimg.com *.tableau.com is3.cloudhost.id *.tile.openstreetmap.org *.bmkg.go.id",
            "frame-ancestors": "'self' *.kemendesa.go.id",
          },
          frameoptions: false,
        }),
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
