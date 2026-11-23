import { useEffect, useState } from "react";
import SITE from "../site.config.js";
import { Label, focusRing } from "../components/ui.jsx";
import { useScrollState } from "../lib/hooks.js";

const ids = SITE.nav.map((n) => n.href.slice(1));

export default function Header() {
  const [open, setOpen] = useState(false);
  const { active, scrolled, progress } = useScrollState(ids);

  // Mobile menu: Escape closes it; the page behind doesn't scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [open]);

  return (
    <header style={{ top: "env(safe-area-inset-top, 0px)" }}
      className={`sticky z-40 bg-paper/95 backdrop-blur transition-[border-color] duration-500 ${scrolled || open ? "border-b border-line" : "border-b border-transparent"}`}>
      <div className={`mx-auto flex max-w-[88rem] items-center justify-between px-5 transition-[padding] duration-500 sm:px-10 ${scrolled ? "py-4" : "py-6"}`}>
        <a href="#top" className={`font-serif text-[19px] font-medium uppercase leading-none tracking-[0.34em] ${focusRing}`} aria-label={`${SITE.name}, back to top`}>
          {SITE.name}
        </a>
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-11">
            {SITE.nav.map((n) => {
              const on = active === n.href.slice(1);
              return (
                <li key={n.label}>
                  <a href={n.href} aria-current={on ? "location" : undefined}
                    className={`group relative py-2 text-[12px] font-medium uppercase tracking-[0.3em] ${focusRing}`}>
                    {n.label}
                    <span aria-hidden="true" className={`absolute bottom-0 left-0 h-px bg-ink transition-all duration-500 ${on ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </a>
                </li>
              );
            })}
            <li>
              <a href={SITE.navCta.href} className={`btn-sweep btn-fill-ink inline-block border border-ink px-6 py-3 text-[12px] font-medium uppercase tracking-[0.3em] transition-colors duration-500 hover:text-paper ${focusRing}`}>
                {SITE.navCta.label}
              </a>
            </li>
          </ul>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav"
          className={`flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] lg:hidden ${focusRing}`}>
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-2.5 w-6">
            <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
          </span>
        </button>
      </div>
      {/* Full-screen menu: wipes down, links rise in one after another. `inert` keeps it out of the tab order when closed. */}
      <nav id="mobile-nav" aria-label="Mobile" inert={open ? undefined : ""}
        className={`absolute inset-x-0 top-full h-[calc(100svh-100%)] overflow-y-auto border-t border-line bg-paper px-5 pb-10 pt-4 lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)] [transition:clip-path_.7s_var(--ease-io)]"
               : "invisible [clip-path:inset(0_0_100%_0)] [transition:clip-path_.6s_var(--ease-io),visibility_0s_.6s]"}`}>
        {SITE.nav.map((n, i) => (
          <span key={n.label} className="line-mask border-b border-line">
            <a href={n.href} onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${0.15 + i * 0.07}s` : "0s" }}
              className={`block py-5 font-serif text-[42px] font-light transition-transform duration-700 ease-out ${open ? "translate-y-0" : "translate-y-full"}`}>
              {n.label}
            </a>
          </span>
        ))}
        <a href={SITE.navCta.href} onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? "0.5s" : "0s" }}
          className={`mt-10 block border border-ink py-5 text-center transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
          <Label as="span">{SITE.navCta.label}</Label>
        </a>
      </nav>
      <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-ink" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
