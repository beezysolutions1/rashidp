import { useRef, useState } from "react";
import SITE from "../site.config.js";
import { Arrow, btnBase, btnStyles, externalProps } from "../components/ui.jsx";
import { SectionHead } from "../components/ui.jsx";
import { Honeypot, useFormSubmit } from "../lib/forms.jsx";
import { RULES, validate } from "../lib/validate.js";

// Underline fields. Browser autofill colours are neutralised in index.css.
const fieldBase =
  "peer block w-full scroll-mt-40 resize-none rounded-none border-0 border-b border-ink bg-transparent px-0 pb-3 pt-2 text-[18px] font-normal leading-relaxed text-ink focus:outline-none focus:ring-0 disabled:opacity-60";
const AUTOCOMPLETE = { name: "name", phone: "tel", email: "email" };
const WIDE = new Set(["name", "project"]); // full-width rows; the rest pair up

/** One labelled field with a focus line that draws in, and an inline error underneath. */
function Field({ f, error, disabled, onBlur, onChange }) {
  const errId = `${f.name}-error`;
  const grow = (e) => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = `${t.scrollHeight}px`; };
  const props = {
    id: f.name, name: f.name, required: f.required, disabled, onBlur, onChange,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errId : undefined,
    className: `${fieldBase} ${error ? "border-b-2" : ""}`,
  };
  return (
    <div className={WIDE.has(f.name) ? "sm:col-span-2" : ""}>
      <label htmlFor={f.name} className="block text-[12px] font-medium uppercase tracking-[0.28em]">{f.label}</label>
      <div className="relative mt-3">
        {f.type === "textarea"
          ? <textarea {...props} rows={3} onInput={grow} />
          : <input {...props} type={f.type} autoComplete={AUTOCOMPLETE[f.name]} inputMode={f.type === "tel" ? "tel" : undefined} />}
        <span aria-hidden="true" className="field-line pointer-events-none absolute inset-x-0 -bottom-px h-[2px] bg-ink" />
      </div>
      {error && (
        <p id={errId} className="mt-3 flex items-start gap-2.5 text-[15px] leading-snug">
          <span aria-hidden="true" className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink text-[10px] font-medium text-paper">!</span>
          {error}
        </p>
      )}
    </div>
  );
}

/** Direct contact details, shown when the form can't send. */
function DirectContact() {
  const { email, whatsapp, whatsappDisplay } = SITE.connect;
  if (!email && !whatsapp) return <p>You can reach me through any of the social links below.</p>;
  return (
    <ul className="mt-2 space-y-1">
      {email && <li>Email: <a className="select-all underline underline-offset-4" href={`mailto:${email}`}>{email}</a></li>}
      {whatsapp && <li>WhatsApp: <a className="select-all underline underline-offset-4" href={`https://wa.me/${whatsapp}`} {...externalProps("https://")}>{whatsappDisplay || `+${whatsapp}`}</a></li>}
    </ul>
  );
}

const MESSAGES = {
  success: () => <p>Thanks, your message is in. I'll get back to you soon.</p>,
  error: () => <><p>Your message couldn't be sent just now. Please try again in a moment, or reach me directly:</p><DirectContact /></>,
  unconfigured: () => <><p>The form isn't connected yet.</p><DirectContact /></>,
};

export default function Contact() {
  const c = SITE.contact;
  const { status, error, onSubmit } = useFormSubmit(SITE.forms.contactEndpoint);
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false); // only nag after the first send attempt
  const formRef = useRef(null);
  const sending = status === "sending";
  const names = c.fields.map((f) => f.name);

  const check = (name, value) => {
    if (!tried || !RULES[name]) return;
    setErrors((prev) => {
      const next = { ...prev };
      const msg = RULES[name](value);
      if (msg) next[name] = msg; else delete next[name];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const found = validate(values, names);
    setTried(true);
    setErrors(found);
    const first = names.find((n) => found[n]);
    if (first) { formRef.current?.elements[first]?.focus(); return; }
    onSubmit(e);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[88rem] px-5 py-28 sm:px-10 lg:py-40">
        <SectionHead id="contact-title" eyebrow={c.eyebrow} heading={c.heading} center className="max-w-4xl" />
        <p className="reveal mx-auto mt-10 max-w-xl text-center text-[17px] font-normal leading-[1.85] text-coal sm:text-[18px]">{c.text}</p>

        <div className="reveal mx-auto mt-14 max-w-4xl text-center">
          <h3 className="text-[12px] font-medium uppercase tracking-[0.32em]">{c.listTitle}</h3>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-x-12 gap-y-2 font-serif text-[22px] italic leading-snug sm:grid-cols-2 sm:text-[24px]">
            {c.reasons.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="contact-status"
          className="reveal relative mx-auto mt-20 max-w-3xl border-t border-line pt-14">
          <Honeypot />
          {/* Formspree uses _subject as the email subject line */}
          <input type="hidden" name="_subject" value={c.emailSubject} />
          <div className="grid gap-x-12 gap-y-11 sm:grid-cols-2">
            {c.fields.map((f) => (
              <Field key={f.name} f={f} error={errors[f.name]} disabled={sending}
                onBlur={(e) => check(f.name, e.target.value)}
                onChange={(e) => errors[f.name] && check(f.name, e.target.value)} />
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center gap-6">
            <button type="submit" disabled={sending} className={`${btnBase} ${btnStyles.primary} w-full sm:w-auto`}>
              {sending ? "Sending…" : c.button}<Arrow />
            </button>
            <div id="contact-status" role="status" aria-live="polite" className="text-center text-[15px] leading-relaxed">
              {Object.keys(errors).length > 0
                ? <p>Please check the {Object.keys(errors).length === 1 ? "highlighted field" : `${Object.keys(errors).length} highlighted fields`} above.</p>
                : MESSAGES[status]?.(error)}
            </div>
          </div>
        </form>
        <p className="mx-auto mt-10 max-w-xl text-center text-[14px] leading-relaxed text-coal">
          {c.careersNote} <a href={c.careersLink.href} className="underline underline-offset-4">{c.careersLink.label}</a>.
        </p>
      </div>
    </section>
  );
}
