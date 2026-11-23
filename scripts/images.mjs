// Generates responsive, grayscale AVIF/WebP/JPEG versions of the photos in /assets,
// plus a 1200×630 social-share image. Skips work when outputs are newer than the source.
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS } from "../src/lib/images.js";

const SRC = "assets";
const OUT = "public/images";
mkdirSync(OUT, { recursive: true });

// Extra crops made from a source photo: name → { from, left, top, width, height } (in source pixels)
const CROPS = {
  // e.g. "portrait-detail": { from: "portrait.jpg", left: 700, top: 480, width: 600, height: 528 },
};

const fresh = (src, out) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
let made = 0;

const jobsList = [
  ...readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((file) => ({ file, name: path.parse(file).name })),
  ...Object.entries(CROPS).map(([name, c]) => ({ file: c.from, name, crop: c })),
];

for (const { file, name, crop } of jobsList) {
  const src = path.join(SRC, file);
  const native = crop ? crop.width : (await sharp(src).metadata()).width;
  for (const [i, w] of IMAGE_WIDTHS.entries()) {
    // Never upscale: the first size at or above the source width holds the full-resolution image; skip the rest.
    if (i > 0 && IMAGE_WIDTHS[i - 1] >= native) continue;
    let base = sharp(src).rotate();
    if (crop) base = base.extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height });
    base = base.resize({ width: w, withoutEnlargement: true }).grayscale();
    const jobs = [
      [`${name}-${w}.avif`, (s) => s.avif({ quality: 50, effort: 5 })],
      [`${name}-${w}.webp`, (s) => s.webp({ quality: 72 })],
      [`${name}-${w}.jpg`, (s) => s.jpeg({ quality: 76, mozjpeg: true, progressive: true })],
    ];
    for (const [out, enc] of jobs) {
      const dest = path.join(OUT, out);
      if (fresh(src, dest)) continue;
      await enc(base.clone()).toFile(dest);
      made++;
    }
  }
  if (name === "portrait" && !crop) {
    const dest = path.join(OUT, "og.jpg");
    if (!fresh(src, dest)) {
      await sharp(src).rotate().grayscale().linear(1.25, -(128 * 0.25))
        .resize({ width: 1200, height: 630, fit: "cover", position: sharp.strategy.attention })
        .jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
      made++;
    }
  }
}
console.log(`[images] ${made ? `generated ${made} file(s)` : "up to date"}`);
