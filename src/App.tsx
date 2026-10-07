import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Care from "./components/Care";
import Physiotherapy from "./components/Physiotherapy";
import MovementLab from "./components/MovementLab";
import Expertise from "./components/Expertise";
import Journey from "./components/Journey";
import CVVault from "./components/CVVault";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProfileScanner from "./components/ProfileScanner";
import BodyScan from "./components/BodyScan";
import CustomCursor from "./components/CustomCursor";
import BackgroundField from "./components/BackgroundField";
import { profile } from "./data/profile";

const Intro = lazy(() => import("./components/Intro"));

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Show intro only on first visit in this session
    const seen = sessionStorage.getItem("gm_intro_seen");
    if (!seen) {
      setShowIntro(true);
    } else {
      setAppReady(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("gm_intro_seen", "1");
    setShowIntro(false);
    setAppReady(true);
  };

  return (
    <>
      <CustomCursor />
      <BackgroundField />
      <AnimatePresence>
        {showIntro && (
          <Suspense fallback={null}>
            <Intro onComplete={handleIntroComplete} />
          </Suspense>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: appReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Navigation />
        <main className="relative">
          <Hero />
          <About />
          <ProfileScanner />
          <Care />
          <BodyScan />
          <Physiotherapy />
          <MovementLab />
          <Expertise />
          <Journey />
          <CVVault />
          <Contact />
        </main>
        <Footer />
      </motion.div>

      {/* Hidden SEO metadata anchor */}
      <a
        href={profile.emailHref}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      >
        {profile.email}
      </a>
    </>
  );
}
