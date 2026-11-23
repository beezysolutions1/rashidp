import SITE from "../site.config.js";
import { Arrow, focusRing } from "../components/ui.jsx";

export default function Footer() {
  const f = SITE.footer;
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-10 lg:py-24">
        <div className="reveal flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.32em]">{f.line1}</p>
            <p className="mt-3 font-serif text-[28px] italic sm:text-[36px]">{f.line2}</p>
          </div>
          <a href="#top" className={`group inline-flex items-center gap-3 self-start text-[12px] font-medium uppercase tracking-[0.3em] sm:self-auto ${focusRing}`}>
            Back to top <Arrow up />
          </a>
        </div>
      </div>
      <div className="border-t border-coal">
        <p className="mx-auto max-w-[88rem] px-5 py-6 text-[12px] font-medium uppercase tracking-[0.3em] text-line sm:px-10">{f.copyright}</p>
      </div>
    </footer>
  );
}
