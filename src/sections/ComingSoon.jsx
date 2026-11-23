import SITE from "../site.config.js";
import { Label, SectionHead, TextLink } from "../components/ui.jsx";

// Each panel's lines start a little after the previous panel's (two columns → row and column offset).
const panelDelay = (i) => (i % 2) * 0.12 + Math.floor(i / 2) * 0.18;
const at = (s) => ({ transitionDelay: `${s.toFixed(2)}s` }); // lines: only transform animates
const rise = (s) => ({ "--d": `${s.toFixed(2)}s` }); // text: delays the entrance, not the hover colour

export default function ComingSoon() {
  const c = SITE.comingSoon;
  return (
    <section id="next" aria-labelledby="next-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[88rem] px-5 py-28 sm:px-10 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHead id="next-title" eyebrow={c.eyebrow} heading={c.heading} className="lg:col-span-6" />
          <p className="reveal max-w-md font-serif text-[28px] italic leading-snug lg:col-span-5 lg:col-start-8">{c.intro}</p>
        </div>

        {/* Grid frame: every hairline draws itself in; the right and bottom edges belong to the list. */}
        <ul className="reveal-stay relative mt-20 grid sm:grid-cols-2">
          <span aria-hidden="true" className="reveal-line absolute bottom-0 left-0 h-px w-full bg-line" style={at(0.5)} />
          <span aria-hidden="true" className="reveal-line absolute right-0 top-0 h-full w-px bg-line" style={at(0.3)} />
          {c.items.map((a, i) => {
            const d = panelDelay(i);
            return (
              <li key={a.name} className="reveal-stay group relative isolate flex flex-col overflow-hidden p-8 sm:p-12">
                <span aria-hidden="true" className="reveal-line absolute left-0 top-0 h-px w-full bg-line" style={at(d)} />
                <span aria-hidden="true" className="reveal-line absolute left-0 top-0 h-full w-px bg-line" style={at(d + 0.1)} />
                {/* Hover: black rises slowly from the bottom and the text inverts */}
                <span aria-hidden="true" className="panel-fill absolute inset-0 -z-10 bg-ink" />

                <Label className="rise flex items-center gap-3 text-coal transition-colors duration-700 group-hover:text-line" style={rise(d + 0.2)}>
                  <span aria-hidden="true" className="breathe h-[5px] w-[5px] rounded-full bg-current" />
                  Coming soon
                </Label>
                <span className="rise-mask mt-10 block">
                  <h3 className="font-serif text-[36px] leading-[1.06] transition-colors duration-700 group-hover:text-paper sm:text-[46px]" style={rise(d + 0.3)}>
                    {a.name}
                  </h3>
                </span>
                <p className="rise mt-3 font-serif text-[24px] italic text-coal transition-colors duration-700 group-hover:text-line" style={rise(d + 0.42)}>{a.tag}</p>
                <p className="rise mt-6 text-[17px] font-normal leading-[1.85] text-coal transition-colors duration-700 group-hover:text-line" style={rise(d + 0.52)}>{a.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-14 flex justify-center">
          <TextLink href={c.cta.href}>{c.cta.label}</TextLink>
        </div>
      </div>
    </section>
  );
}
