// Renders the React app to static HTML and injects SEO/social tags,
// so crawlers and link previews see the full page without running JavaScript.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const { render, SITE, IMAGE_WIDTHS, HERO_SIZES } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const { seo } = SITE;
const site = (seo.url || "").replace(/\/$/, "");
const abs = (p) => (site ? site + p : p);
const portrait = SITE.hero.portrait.name;
// Profile pages only — chat links (WhatsApp) and mailto aren't profiles.
const sameAs = SITE.connect.socials
  .filter((s) => !["whatsapp", "email"].includes(s.icon))
  .map((s) => s.href)
  .filter((h) => /^https?:\/\//.test(h));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.hero.eyebrow.split("·").map((s) => s.trim()).join(", "),
  description: seo.description,
  image: abs("/images/og.jpg"),
  ...(site && { url: site }),
  ...(sameAs.length && { sameAs }),
  address: { "@type": "PostalAddress", addressLocality: "Kochi", addressRegion: "Kerala", addressCountry: "IN" },
  worksFor: SITE.ventures.items.filter((v) => !v.role || /consult|market/i.test(v.role)).slice(0, 1)
    .map((v) => ({ "@type": "Organization", name: v.name, ...( /^https?:/.test(v.cta.href) && { url: v.cta.href }) }))[0],
};

const head = [
  `<title>${esc(seo.title)}</title>`,
  `<meta name="description" content="${esc(seo.description)}" />`,
  site && `<link rel="canonical" href="${esc(site)}/" />`,
  `<meta property="og:type" content="profile" />`,
  `<meta property="og:title" content="${esc(seo.title)}" />`,
  `<meta property="og:description" content="${esc(seo.description)}" />`,
  `<meta property="og:image" content="${esc(abs("/images/og.jpg"))}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  site && `<meta property="og:url" content="${esc(site)}/" />`,
  `<meta property="og:locale" content="${esc(seo.locale)}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  seo.twitterHandle && `<meta name="twitter:site" content="${esc(seo.twitterHandle)}" />`,
  `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesizes="${esc(HERO_SIZES)}" imagesrcset="${IMAGE_WIDTHS.map((w) => `/images/${portrait}-${w}.avif ${w}w`).join(", ")}" />`,
  `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
].filter(Boolean).join("\n    ");

const file = "dist/index.html";
const html = readFileSync(file, "utf8").replace("<!--head-->", head).replace("<!--app-->", render());
writeFileSync(file, html);

// Sitemap + robots pointer, once the live address is known.
if (site) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync("dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
  writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
}
rmSync("dist-ssr", { recursive: true, force: true });
console.log(`[prerender] wrote ${file} (${(html.length / 1024).toFixed(1)} KB)`);
