import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Supabase Storage images (derive exact hostname from env)
    remotePatterns: (() => {
      const patterns: { protocol: "https"; hostname: string; pathname: string }[] = [];
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        try {
          const { hostname } = new URL(supabaseUrl);
          patterns.push({
            protocol: "https",
            hostname,
            pathname: "/storage/v1/object/public/**",
          });
        } catch {}
      }
      return patterns;
    })(),
  },
};

export default nextConfig;
