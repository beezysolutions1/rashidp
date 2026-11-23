import SITE from "../site.config.js";
import { Eyebrow, SectionHead } from "../components/ui.jsx";

const body = "text-[17px] font-normal leading-[1.9] text-coal sm:text-[18px]";

export default function Story() {
  const s = SITE.story;
  const [lede, ...rest] = s.intro;
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-20">
      <div className="mx-auto max-w-[88rem] px-5 py-28 sm:px-10 lg:py-40">
        <SectionHead id="story-title" eyebrow={s.eyebrow} heading={s.heading} center className="max-w-4xl" />
        <p className="reveal mx-auto mt-16 max-w-3xl text-center font-serif text-[26px] font-light leading-[1.45] sm:text-[36px]">{lede}</p>

        <div className="mx-auto mt-24 max-w-2xl lg:mt-32">
          <div>
            <div className={`reveal space-y-7 ${body}`}>
              {rest.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <figure className="my-20 border-y border-line py-14">
              <div className="reveal-mask">
                <blockquote className="font-serif text-[42px] font-light italic leading-[1.1] tracking-[-0.01em] sm:text-[58px]">“{s.pullQuote}”</blockquote>
              </div>
            </figure>

            {s.chapters.map((c, i) => (
              <article key={c.title} className={`reveal ${i ? "mt-20" : ""}`}>
                <h3 className="font-serif text-[34px] leading-tight sm:text-[46px]">{c.title}</h3>
                <div className={`mt-7 space-y-6 ${body}`}>
                  {c.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </article>
            ))}
            <p className="reveal mt-16 font-serif text-[34px] italic sm:text-[42px]">— {SITE.name}</p>
          </div>
        </div>

        {/* Journey line: the places the story moves through */}
        <div className="reveal mt-28 lg:mt-40" style={{ transform: "none" }}>
          <Eyebrow>The journey</Eyebrow>
          <ol className="relative mt-12 grid gap-10 sm:grid-cols-5 sm:gap-6">
            <span aria-hidden="true" className="reveal-line absolute left-[3px] top-0 h-full w-px bg-ink sm:left-0 sm:top-[3px] sm:h-px sm:w-full" />
            {s.timeline.map((t, i) => (
              <li key={t.place} className="reveal relative pl-8 sm:pl-0 sm:pt-10" style={{ transitionDelay: `${0.25 + i * 0.12}s` }}>
                <span aria-hidden="true" className={`absolute left-0 top-1.5 h-[7px] w-[7px] rounded-full border border-ink sm:top-0 ${i === s.timeline.length - 1 ? "bg-paper" : "bg-ink"}`} />
                <p className="font-serif text-[28px] leading-tight">{t.place}</p>
                <p className="mt-3 text-[15px] font-normal leading-relaxed text-coal">{t.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
