import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adds `.in` to every `.reveal` element as it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) return;
    const root = document.documentElement;
    const els = [...document.querySelectorAll(".reveal, .reveal-stay, .reveal-mask, .reveal-img")];
    // Anything already on screen at load is shown immediately — no flash.
    els.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in"); });
    root.classList.add("anim");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => !el.classList.contains("in") && io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Scroll progress (0–1), the section currently in view, and whether the page has scrolled. */
export function useScrollState(ids) {
  const [state, setState] = useState({ progress: 0, active: "", scrolled: false });
  const key = ids.join(",");
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      let active = "";
      key.split(",").forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) active = id;
      });
      setState({ progress: max > 0 ? h.scrollTop / max : 0, active, scrolled: h.scrollTop > 40 });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);
  return state;
}

/** Counts up to `value` the first time the element scrolls into view.
 *  Server render shows the final number, so crawlers and no-JS visitors see real figures. */
export function useCountUp(value) {
  const ref = useRef(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: don't reset
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1400);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return [ref, n];
}

/** Moves an element at a fraction of the scroll speed while it's on screen (desktop only). */
export function useParallax(ref, speed = 0.12) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(min-width: 1024px)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [ref, speed]);
}

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Pulls an element a little toward the cursor while hovered (desktop only). */
export function useMagnetic(ref, strength = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReducedMotion()) return;
    let frame = 0;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transition = "transform .2s ease-out";
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.transition = "transform .7s cubic-bezier(.2,.7,.2,1)";
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); };
  }, [ref, strength]);
}

/** Tracks the pointer with easing for the custom cursor. Returns null on touch / reduced motion. */
export function useCursor(ref) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => { setEnabled(finePointer() && !prefersReducedMotion()); }, []);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      // Sleep once settled; wake again on the next pointer move.
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      target.x = e.clientX; target.y = e.clientY;
      // Over text fields the dot steps aside so the typing caret stays visible; it grows over links/buttons.
      const typing = !!e.target.closest?.("input, textarea, select, [contenteditable]");
      el.classList.toggle("is-hidden", typing);
      el.classList.toggle("is-link", !typing && !!e.target.closest?.("a, button"));
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const hide = () => el.classList.add("is-hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", hide); cancelAnimationFrame(frame); };
  }, [enabled, ref]);
  return enabled;
}

/** Drifts an element vertically (±range px) as its container passes through the viewport (desktop only). */
export function useDrift(ref, range = 32) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(min-width: 1024px)").matches) return;
    const box = el.parentElement;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the box enters at the bottom, +1 when it leaves at the top
      const t = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      el.style.transform = `translate3d(0, ${(t * range).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    io.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [ref, range]);
}
