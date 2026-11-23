// Field validation for the site's forms. Pure functions: each returns "" when valid,
// otherwise the message shown under the field. Kept free of React so it can be unit-tested.

const digits = (v) => (v.match(/\d/g) || []).length;

export const RULES = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  phone: (v) => {
    const s = v.trim();
    if (!s) return "Please enter a phone or WhatsApp number.";
    if (!/^\+?[\d\s().-]+$/.test(s) || digits(s) < 7 || digits(s) > 15)
      return "That number doesn't look right. Include the country code, e.g. +91 98765 43210.";
    return "";
  },
  email: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your email address.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? "" : "That email address doesn't look right.";
  },
  project: (v) => (v.trim().length >= 10 ? "" : "Tell me a little about your project, even a sentence helps."),
};

/** Validates a { field: value } object. Returns { field: message } for the invalid fields only. */
export function validate(values, fields = Object.keys(RULES)) {
  const errors = {};
  for (const f of fields) {
    const msg = RULES[f]?.(String(values[f] ?? ""));
    if (msg) errors[f] = msg;
  }
  return errors;
}
