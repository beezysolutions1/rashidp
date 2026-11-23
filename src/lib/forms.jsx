import { useState } from "react";

/**
 * Submits a form as JSON to a Formspree-compatible endpoint.
 * status: idle | sending | success | error | unconfigured
 */
export function useFormSubmit(endpoint) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // honeypot filled → bot; silently drop
    if (!endpoint) { setStatus("unconfigured"); return; }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.errors?.[0]?.message || `The server answered ${res.status}.`);
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      console.warn("[form] submission failed:", err); // detail for developers; visitors see a plain message
      setError(err.message || "Network error.");
      setStatus("error");
    }
  }

  return { status, error, onSubmit };
}

/** Hidden field bots fill in and humans never see. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="_gotcha">Leave this field empty</label>
      <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
