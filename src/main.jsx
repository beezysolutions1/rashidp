import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import SITE from "./site.config.js";
import "./index.css";

const root = document.getElementById("root");
const app = <StrictMode><App /></StrictMode>;

// Production HTML is prerendered, so hydrate it; `npm run dev` renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

// Dev-only reminder of content that still needs real values.
if (import.meta.env.DEV) {
  const todos = [];
  const walk = (v, path) => {
    if (v && typeof v === "object") return Object.entries(v).forEach(([k, x]) => walk(x, `${path}.${k}`));
    if (v === "#" || v === "") todos.push(path);
  };
  walk(SITE, "SITE");
  if (todos.length) console.info(`[site] ${todos.length} config values still empty or "#":\n  ` + todos.join("\n  "));
}
