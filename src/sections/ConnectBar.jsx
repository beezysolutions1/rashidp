import SITE from "../site.config.js";
import Icon from "../components/Icon.jsx";
import { Eyebrow, btnBase, btnStyles, externalProps, focusRing } from "../components/ui.jsx";
import { useState } from "react";
import { Honeypot, useFormSubmit } from "../lib/forms.jsx";
import { RULES } from "../lib/validate.js";

const MESSAGES = {
  success: "You're on the list. I'll email you when something launches.",
  error: "That didn't go through. Please try again in a moment.",
  unconfigured: "Sign-ups open soon. Follow along on social in the meantime.",
};

export default function ConnectBar() {
  const c = SITE.connect;
  const { status, onSubmit } = useFormSubmit(SITE.forms.newsletterEndpoint);
  const [emailError, setEmailError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = RULES.email(String(new FormData(e.currentTarget).get("email") || ""));
    setEmailError(msg);
    if (msg) { e.currentTarget.elements.email.focus(); return; }
    onSubmit(e);
  };
  return (
    <section id="connect" aria-labelledby="connect-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid max-w-[88rem] gap-20 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:py-32">
        <div className="reveal">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="connect-title" className="mt-8 font-serif text-[54px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[68px]">{c.heading}</h2>
          <p className="mt-6 max-w-md text-[17px] font-normal leading-[1.85] text-coal">{c.text}</p>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {c.socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} {...externalProps(s.href)}
                  className={`group flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] ${focusRing}`}>
                  <span className="transition-transform duration-500 group-hover:-translate-y-0.5"><Icon name={s.icon} /></span>
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="notify" className="reveal flex scroll-mt-20 flex-col justify-center">
          <Eyebrow>{c.subscribeLabel}</Eyebrow>
          <p className="mt-8 font-serif text-[42px] italic leading-tight">{SITE.comingSoon.cta.label}</p>
          <form onSubmit={handleSubmit} noValidate className="relative mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <Honeypot />
            <label htmlFor="sub-email" className="sr-only">Email address</label>
            <input id="sub-email" name="email" type="email" required autoComplete="email" placeholder={c.subscribePlaceholder} style={{ scrollMarginTop: "10rem" }}
              aria-invalid={emailError ? "true" : undefined} aria-describedby="sub-status"
              onChange={(e) => emailError && setEmailError(RULES.email(e.target.value))}
              className="min-w-0 flex-1 rounded-none border-0 border-b border-ink bg-transparent px-0 pb-3 text-lg font-normal placeholder:text-coal focus:border-ink focus:outline-none focus:ring-0" />
            <button type="submit" disabled={status === "sending"} className={`${btnBase} ${btnStyles.outline}`}>
              {status === "sending" ? "Sending…" : c.subscribeButton}
            </button>
          </form>
          <p id="sub-status" role="status" aria-live="polite" className="mt-5 min-h-[1.5rem] text-[15px] text-coal">{emailError || MESSAGES[status] || ""}</p>
        </div>
      </div>
    </section>
  );
}
