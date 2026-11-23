import Header from "./sections/Header.jsx";
import Hero from "./sections/Hero.jsx";
import Stats from "./sections/Stats.jsx";
import Story from "./sections/Story.jsx";
import Beliefs from "./sections/Beliefs.jsx";
import Ventures from "./sections/Ventures.jsx";
import ComingSoon from "./sections/ComingSoon.jsx";
import Contact from "./sections/Contact.jsx";
import ConnectBar from "./sections/ConnectBar.jsx";
import Footer from "./sections/Footer.jsx";
import { useReveal } from "./lib/hooks.js";
import { Cursor, Intro } from "./components/Motion.jsx";

export default function App() {
  useReveal();
  return (
    <div id="top" className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Intro />
      <Cursor />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Stats />
        <Story />
        <Beliefs />
        <Ventures />
        <ComingSoon />
        <Contact />
        <ConnectBar />
      </main>
      <Footer />
    </div>
  );
}
