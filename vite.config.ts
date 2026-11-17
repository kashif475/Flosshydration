import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The public site URL lives in one place. Staging is the default until Flos picks
// the final domain; set SITE_URL (Netlify env var or .env) to change it.
// It feeds the canonical and social tags in index.html, robots.txt and sitemap.xml.
const DEFAULT_SITE_URL = "https://soft-cassata-578454.netlify.app";

function siteFiles(siteUrl: string): Plugin {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  // Legal pages stay out of the sitemap while they are noindex placeholders.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n  </url>\n</urlset>\n`;
  const files: Record<string, { body: string; type: string }> = {
    "/robots.txt": { body: robots, type: "text/plain" },
    "/sitemap.xml": { body: sitemap, type: "application/xml" },
  };
  return {
    name: "flos-site-files",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replaceAll("%SITE_URL%", siteUrl),
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = req.url ? files[req.url] : undefined;
        if (!file) return next();
        res.setHeader("Content-Type", file.type);
        res.end(file.body);
      });
    },
    generateBundle() {
      for (const [name, file] of Object.entries(files)) {
        this.emitFile({ type: "asset", fileName: name.slice(1), source: file.body });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  // .env lives in the repo root. Only VITE_ variables reach browser code;
  // GHL_TOKEN and other server values are never bundled.
  const env = loadEnv(mode, __dirname, "");
  const siteUrl = (env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), siteFiles(siteUrl)],
    root: path.resolve(__dirname, "client"),
    envDir: __dirname,
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      host: true,
    },
  };
});
