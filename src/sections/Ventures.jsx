import { useEffect, useRef, useState } from "react";
import SITE from "../site.config.js";
import { Label, SectionHead, TextLink, focusRing } from "../components/ui.jsx";
import Picture from "../components/Picture.jsx";
import { useDrift } from "../lib/hooks.js";

/** Shows the logo only when the file exists — no placeholder clutter. */
function Logo({ v }) {
  const [ok, setOk] = useState(true);
  const ref = useRef(null);
  // The prerendered <img> may fail before React attaches onError, so check once on mount too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);
  if (!v.logo || !ok) return null;
  return <img ref={ref} src={v.logo} alt="" height={40} decoding="async" onError={() => setOk(false)} className="mono-img mb-6 h-10 w-auto object-contain" />;
}

/** Framed photo: wipes in on scroll, drifts slightly inside its frame while scrolling past. */
function AtWork({ img }) {
  const drift = useRef(null);
  useDrift(drift, 28);
  return (
    <figure className="w-full max-w-[520px]">
      <div className="reveal-img">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <div ref={drift} className="absolute inset-x-0 -top-[6%] h-[112%] will-change-transform">
            <Picture {...img} sizes="(min-width: 1024px) 520px, 92vw" className="h-full w-full" />
          </div>
          {/* Inverts against the photo so the frame stays visible on bright curtains and dark suit alike */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-paper mix-blend-difference sm:inset-4" />
        </div>
      </div>
      <figcaption className="reveal mt-4 flex justify-between text-[12px] font-medium uppercase tracking-[0.3em] text-coal">
        <span>{img.caption[0]}</span><span>{img.caption[1]}</span>
      </figcaption>
    </figure>
  );
}

/** Compact table of contents for the rows below (desktop only; on phones the rows follow immediately). */
function VentureIndex({ items }) {
  return (
    <nav aria-label="Ventures" className="reveal hidden lg:block">
      <ol className="border-b border-line">
        {items.map((item, i) => (
          <li key={item.name} className="group relative border-t border-line">
            <span aria-hidden="true" className="row-line absolute inset-x-0 -top-px h-px bg-ink" />
            <a href={`#venture-${i}`} className={`flex items-baseline gap-6 py-4 ${focusRing}`}>
              <span aria-hidden="true" className="w-6 shrink-0 text-[12px] font-medium tracking-[0.2em] text-coal">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-[28px] leading-tight transition-transform duration-700 ease-out group-hover:translate-x-2">{item.name}</span>
              <span aria-hidden="true" className="ml-auto text-[15px] transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Ventures() {
  const v = SITE.ventures;
  return (
    <section id="ventures" aria-labelledby="ventures-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[88rem] px-5 py-28 sm:px-10 lg:py-40">
        {/* Intro row: text column spans the photo's full height — heading at the top edge,
            venture index on the bottom edge (pb offsets the photo caption). */}
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-between gap-14 lg:pb-[34px]">
            <div>
              <SectionHead id="ventures-title" eyebrow={v.eyebrow} heading={v.heading} />
              {v.intro && <p className="reveal mt-8 max-w-md text-balance font-serif text-[28px] italic leading-snug text-coal">{v.intro}</p>}
            </div>
            <VentureIndex items={v.items} />
          </div>
          {v.image && <div className="flex lg:justify-end"><AtWork img={v.image} /></div>}
        </div>
        <ul className="mt-20 border-b border-line lg:mt-28">
          {v.items.map((item, i) => (
            <li key={item.name} className="reveal group relative border-t border-line">
              <span aria-hidden="true" className="row-line absolute inset-x-0 -top-px h-px bg-ink" />
              <article aria-labelledby={`venture-${i}`} className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <div className="lg:col-span-5">
                  <Logo v={item} />
                  <h3 id={`venture-${i}`} className="scroll-mt-32 font-serif text-[46px] font-light leading-[1.02] tracking-[-0.01em] transition-transform duration-700 ease-out sm:text-[68px] lg:group-hover:translate-x-3">{item.name}</h3>
                  {item.role && <Label className="mt-5 leading-[1.9] text-coal">{item.role}</Label>}
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-[17px] font-normal leading-[1.85] text-coal sm:text-[18px]">{item.description}</p>
                  {item.services && (
                    <ul aria-label="Services" className="mt-8 grid grid-cols-2 gap-x-8 border-t border-line pt-6 text-[15px] sm:grid-cols-3">
                      {item.services.map((s) => <li key={s} className="py-1.5">{s}</li>)}
                    </ul>
                  )}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                    {item.proof ? <p className="font-serif text-[28px] italic">{item.proof}</p> : <span />}
                    <TextLink href={item.cta.href}>{item.cta.label}</TextLink>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
