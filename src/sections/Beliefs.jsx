import SITE from "../site.config.js";
import { SectionHead } from "../components/ui.jsx";

export default function Beliefs() {
  const b = SITE.beliefs;
  return (
    <section id="beliefs" aria-labelledby="beliefs-title" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto grid max-w-[88rem] gap-16 px-5 py-28 sm:px-10 lg:grid-cols-12 lg:gap-20 lg:py-40">
        <div className="lg:col-span-5">
          <SectionHead id="beliefs-title" eyebrow={b.eyebrow} heading={b.heading} light className="lg:sticky lg:top-32" />
        </div>
        <ul className="lg:col-span-7">
          {b.items.map((it, i) => (
            <li key={it.title} style={{ transitionDelay: `${i * 0.08}s` }} className="reveal relative grid gap-3 py-10 first:pt-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-12">
              {i > 0 && <span aria-hidden="true" className="reveal-line absolute inset-x-0 top-0 h-px bg-coal" />}
              <h3 className="font-serif text-[34px] font-light italic leading-tight sm:text-[40px]">{it.title}</h3>
              <p className="text-[17px] font-normal leading-[1.85] text-line sm:pt-2">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
