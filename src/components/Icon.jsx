const base = { width: 18, height: 18, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" };
const fill = { ...base, fill: "currentColor" };
const line = { ...base, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

const ICONS = {
  instagram: <svg {...line}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>,
  linkedin: <svg {...fill}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 3V21H9z" /></svg>,
  facebook: <svg {...fill}><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4v3.2h2.8V22z" /></svg>,
  youtube: <svg {...fill}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.8 3.1z" /></svg>,
  whatsapp: <svg {...line}><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" /><path d="M9 8.5c0 3.5 2.8 6.5 6.5 6.5l1-1.6-2-1-.9.9a4.7 4.7 0 0 1-2.4-2.4l.9-.9-1-2z" fill="currentColor" stroke="none" /></svg>,
  email: <svg {...line}><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></svg>,
};

export default function Icon({ name }) {
  return ICONS[name] ?? null;
}
