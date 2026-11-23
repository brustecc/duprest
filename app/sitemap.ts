import type { MetadataRoute } from "next";
import { urlAbsoluta } from "@/lib/site-url";

// Sin lastModified: con una fecha del build, cada deploy diría que el informe cambió.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: urlAbsoluta("/") }];
}
