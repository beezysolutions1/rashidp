import SITE from "../site.config.js";
import { useCountUp } from "../lib/hooks.js";

function Stat({ s, i }) {
  const [ref, n] = useCountUp(s.value);
  return (
    <div className={`reveal flex flex-col gap-4 py-10 sm:px-10 sm:py-4 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
      <dt className="order-2 max-w-[16rem] text-[12px] font-medium uppercase leading-[1.9] tracking-[0.28em] text-coal">{s.label}</dt>
      <dd ref={ref} className="order-1 font-serif text-[84px] font-light leading-none tracking-[-0.02em] tabular-nums lg:text-[112px]">{n}{s.suffix}</dd>
    </div>
  );
}

export default function Stats() {
  return (
    <section aria-label="At a glance" className="border-y border-line">
      <dl className="mx-auto grid max-w-[88rem] px-5 py-6 sm:grid-cols-3 sm:px-10 sm:py-20">
        {SITE.stats.map((s, i) => <Stat key={i} s={s} i={i} />)}
      </dl>
    </section>
  );
}
