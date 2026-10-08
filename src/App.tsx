import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { CVSection } from "./components/CVSection";
import { Expertise } from "./components/Expertise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { MovementExperience } from "./components/MovementExperience";
import { MovementLine } from "./components/MovementLine";
import { Navbar } from "./components/Navbar";
import { Pathway } from "./components/Pathway";
import { ProfessionalJourney } from "./components/ProfessionalJourney";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-mist-50"
      >
        Skip to content
      </a>
      <Navbar />
      <MovementLine />
      <main id="main">
        <Hero />
        <About />
        <Pathway />
        <Expertise />
        <MovementExperience />
        <ProfessionalJourney />
        <CVSection />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
