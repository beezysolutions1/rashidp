import { useRef } from "react";
import SITE from "../site.config.js";
import { Button, Eyebrow, TextLink } from "../components/ui.jsx";
import Picture from "../components/Picture.jsx";
import { HERO_SIZES } from "../lib/images.js";
import { useParallax } from "../lib/hooks.js";

// Aligns the text column with the centred 88rem container while the photo runs to the screen edge.
const alignLeft = "lg:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]";
// Load animations start once the intro curtain has lifted (--intro is 0s on repeat visits).
const delay = (s) => ({ animationDelay: `calc(var(--intro) + ${s}s)` });

export default function Hero() {
  const h = SITE.hero;
  const photo = useRef(null);
  useParallax(photo, 0.1);
  const n = h.headline.length;
  return (
    <section aria-labelledby="hero-title" className="grid lg:min-h-[calc(100svh-81px)] lg:grid-cols-2">
      <div className={`flex flex-col justify-center px-5 pb-16 pt-14 sm:px-10 lg:pb-20 lg:pr-16 lg:pt-10 ${alignLeft}`}>
        <div className="hero-lift" style={delay(0.1)}><Eyebrow draw={false}>{h.eyebrow}</Eyebrow></div>
        <h1 id="hero-title" className="mt-10 font-serif text-[46px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[68px] lg:text-[60px] xl:text-[76px] 2xl:text-[84px]">
          {h.headline.map((part, i) => (
            <span key={i} className="line-mask">
              <span className={`hero-line ${part.italic ? "italic" : ""}`} style={delay(0.25 + i * 0.14)}>
                {part.text}{i < n - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-lift mt-10 max-w-md text-[17px] font-normal leading-[1.8] text-coal sm:text-[18px]" style={delay(0.35 + n * 0.14)}>{h.subheadline}</p>
        <div className="hero-lift mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10" style={delay(0.5 + n * 0.14)}>
          <Button href={h.primaryCta.href}>{h.primaryCta.label}</Button>
          <TextLink href={h.secondaryCta.href}>{h.secondaryCta.label}</TextLink>
        </div>
      </div>

      <figure className="hero-curtain relative aspect-[4/5] overflow-hidden bg-ink lg:aspect-auto">
        <div ref={photo} className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform">
          <Picture {...h.portrait} sizes={HERO_SIZES} priority className="hero-zoom h-full w-full" />
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute inset-4 border border-paper sm:inset-6" />
        <figcaption className="absolute inset-x-4 bottom-4 flex justify-between gap-4 whitespace-nowrap px-4 py-5 text-[11px] font-medium uppercase tracking-[0.2em] text-paper sm:inset-x-6 sm:bottom-6 sm:px-6 sm:text-[12px] sm:tracking-[0.3em]">
          <span>{h.caption[0]}</span>
          {h.caption[1] && <span>{h.caption[1]}</span>}
        </figcaption>
      </figure>
    </section>
  );
}
