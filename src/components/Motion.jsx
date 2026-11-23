import { useRef } from "react";
import SITE from "../site.config.js";
import { useCursor } from "../lib/hooks.js";

/** Opening curtain. Server-rendered so it covers the page from the first paint; CSS lifts it. */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <span className="line-mask font-serif text-3xl font-normal uppercase tracking-[0.4em] sm:text-5xl">
        <span className="hero-line">{SITE.name}</span>
      </span>
    </div>
  );
}

/** Inverting dot that follows the mouse and grows over interactive elements. */
export function Cursor() {
  const ref = useRef(null);
  useCursor(ref);
  return <div ref={ref} className="cursor is-hidden" aria-hidden="true" />;
}
