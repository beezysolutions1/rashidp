import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import SITE from "./site.config.js";
import { IMAGE_WIDTHS, HERO_SIZES } from "./lib/images.js";

export function render() {
  return renderToString(<App />);
}

export { SITE, IMAGE_WIDTHS, HERO_SIZES };
