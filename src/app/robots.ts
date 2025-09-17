import type { MetadataRoute } from "next";
import { Josephine } from "@/lib/josephine";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${Josephine.website}/sitemap.xml`,
  };
}
