import type { MetadataRoute } from "next";
import { Josephine } from "@/lib/josephine";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: Josephine.website,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
