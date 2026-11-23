# Rashid — personal website

A monochrome, editorial one-page site built with **React 18 + Vite + Tailwind CSS**,
pre-rendered to static HTML at build time.

## Quick start

```bash
npm install
npm run dev       # local dev server with hot reload → http://localhost:5173
npm run build     # optimise images, build, pre-render → dist/
npm run preview   # serve the production build locally
npm run lint
```

## Editing content

All copy, links and images live in **`src/site.config.js`**. Components only read from it.
While `npm run dev` is running, the browser console lists every config value that is
still empty or `"#"`.

| What | Where |
| --- | --- |
| Portrait / source photos | `assets/` — `npm run build` makes grayscale AVIF/WebP/JPEG sizes in `public/images/` |
| Venture logos, coming-soon thumbnails | `public/images/` — reference as `/images/<file>` in the config |
| Social-share image | generated from `assets/portrait.jpg` → `public/images/og.jpg` |
| Page title, description, domain | `seo` in the config |

To change the portrait crop, edit `hero.portrait.position` (e.g. `"50% 5%"` moves it up).

## Forms

Both forms POST JSON to any Formspree-compatible endpoint:

1. Create two free forms at formspree.io (one for contact, one for the newsletter).
2. Paste their URLs into `forms.contactEndpoint` and `forms.newsletterEndpoint`.

Until then, the contact form tells visitors it isn't connected yet and shows the email /
WhatsApp from `connect.email` / `connect.whatsapp`. Both forms include a honeypot field to
filter spam bots, and show sending / success / error states.

## Deploying

Any static host works. Build command `npm run build`, output directory `dist`.
(Netlify, Vercel, Cloudflare Pages and GitHub Pages all detect this automatically.)
Set `seo.url` to the final domain so link previews use absolute image URLs.

## Project structure

```
assets/              source photos (not served directly)
public/              static files copied as-is (favicon, robots.txt, generated images)
scripts/images.mjs   responsive image + share-image generation (sharp)
scripts/prerender.mjs  renders the app to HTML, injects SEO / Open Graph / JSON-LD
src/site.config.js   ← all content
src/sections/        one component per page section
src/components/      shared UI (buttons, labels, images, icons)
src/lib/             hooks (scroll reveal, count-up, scroll state) and form handling
legacy/              the original single-file version, kept for reference
```

## Quality baseline (Lighthouse, mobile)

Performance 99 · Accessibility 100 · Best Practices 96 · SEO 100 · CLS 0 (re-measured after the luxury redesign and motion work).
(Best Practices loses points only when Google Fonts can't load in the test environment.)

## Motion

- Intro: a black curtain with the name rises in, then lifts (about 2s). Plays once per browser session.
- Hero: headline lines rise in after the intro, the portrait opens like a curtain and slowly settles; slight parallax on desktop.
- Scroll: section headings rise out of a mask, label lines and dividers draw themselves, the journey line draws across, stats count up.
- Hover: buttons fill with a sliding sweep and lean toward the cursor (magnetic); venture rows get a sweeping underline; "What's next" panels fill with black from the bottom; link underlines retract.
- What's next: grid hairlines draw themselves, panel text rises in a stagger, a small dot breathes beside "Coming soon".
- Cursor: an inverting dot that grows over links (mouse/trackpad only; the normal cursor stays).
- Mobile menu: full-screen, wipes open with links rising in; Escape closes it.

Only `transform`, `clip-path` and `opacity` are animated (compositor-friendly), scroll work is batched with
`requestAnimationFrame`, and the cursor loop sleeps when the mouse stops.
All motion lives in `src/index.css`, `src/components/Motion.jsx` and the hooks in `src/lib/hooks.js`.
It switches off for visitors who set "reduce motion" on their device, and text is moved or
masked, never faded, so it keeps full contrast.
