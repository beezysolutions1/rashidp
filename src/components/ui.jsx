import { useRef } from "react";
import { useMagnetic } from "../lib/hooks.js";

export const Label = ({ children, className = "", as: Tag = "p", style }) => (
  <Tag style={style} className={`text-[12px] font-medium uppercase tracking-[0.32em] ${className}`}>{children}</Tag>
);

/** Small uppercase label with a hairline before it. */
export const Eyebrow = ({ children, light, draw = true, className = "" }) => (
  <Label className={`flex items-center gap-4 ${className}`}>
    <span aria-hidden="true" className={`h-px w-8 shrink-0 ${draw ? "reveal-line" : ""} ${light ? "bg-paper" : "bg-ink"}`} />
    {children}
  </Label>
);

export const focusRing = "focus:outline-none focus-visible:ring-1 focus-visible:ring-current focus-visible:ring-offset-4";

export const btnBase =
  `group inline-flex items-center justify-center gap-4 border px-9 py-[18px] text-[12px] font-medium uppercase tracking-[0.3em] transition-colors duration-500 disabled:cursor-wait disabled:opacity-60 ${focusRing}`;
export const btnStyles = {
  primary: "btn-sweep btn-fill-paper border-ink bg-ink text-paper hover:text-ink focus-visible:text-ink",
  outline: "btn-sweep btn-fill-ink border-ink bg-transparent text-ink hover:text-paper focus-visible:text-paper",
};

export const Arrow = ({ up }) => (
  <span aria-hidden="true" className={`inline-block transition-transform duration-500 ${up ? "group-hover:-translate-y-1" : "group-hover:translate-x-1.5"}`}>
    {up ? "↑" : "→"}
  </span>
);

export function Button({ href, children, variant = "primary", className = "" }) {
  const ref = useRef(null);
  useMagnetic(ref);
  return (
    <a ref={ref} href={href} className={`${btnBase} ${btnStyles[variant]} ${className}`}>
      {children}
      <Arrow />
    </a>
  );
}

const isExternal = (href) => /^https?:\/\//.test(href);
export const externalProps = (href) => (isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {});

/** Understated underlined link with a sliding arrow. */
export const TextLink = ({ href, children, className = "" }) => (
  <a href={href} {...externalProps(href)}
    className={`group inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] ${focusRing} ${className}`}>
    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1.5 transition-[background-size] duration-500 group-hover:bg-[length:0%_1px]">{children}</span>
    <Arrow />
  </a>
);

/** Section opener: eyebrow + large light serif heading. */
export function SectionHead({ eyebrow, heading, id, light, center, className = "" }) {
  return (
    <header className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <Eyebrow light={light} className={`reveal ${center ? "justify-center" : ""}`}>{eyebrow}</Eyebrow>
      <div className="reveal-mask mt-8">
        <h2 id={id} className="font-serif text-[44px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[64px] lg:text-[60px] xl:text-[76px]">{heading}</h2>
      </div>
    </header>
  );
}
