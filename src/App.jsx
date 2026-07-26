import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { asset } from "./utils/asset";

import Welcome from "./components/Welcome";
import Challenge from "./components/Challenge";
import Letter from "./components/Letter";
import Moments from "./components/Moments";
import Music from "./components/Music";
import Details from "./components/Details";
import Final from "./components/Final";
import Farewell from "./components/Farewell";
import Poem from "./components/Poem";

function AnimatedRoutes({ isUnlocked, setIsUnlocked }) {
  const location = useLocation();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Safe Background Overlay to blur and darken the body background */}
      <div className="fixed inset-0 bg-ink-dark/10 backdrop-blur-[2px] z-0 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="relative z-10 min-h-screen pt-0"
        >
          <Routes location={location}>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/challenge"
              element={<Challenge onUnlock={() => setIsUnlocked(true)} />}
            />
            <Route path="/poem" element={<Poem />} />

            {/* Protected Routes */}
            <Route
              path="/letter"
              element={
                isUnlocked ? <Letter /> : <Navigate to="/challenge" replace />
              }
            />
            <Route
              path="/moments"
              element={
                isUnlocked ? <Moments /> : <Navigate to="/challenge" replace />
              }
            />
            <Route
              path="/music"
              element={
                isUnlocked ? <Music /> : <Navigate to="/challenge" replace />
              }
            />
            <Route
              path="/details"
              element={
                isUnlocked ? <Details /> : <Navigate to="/challenge" replace />
              }
            />
            <Route
              path="/final"
              element={
                isUnlocked ? <Final /> : <Navigate to="/challenge" replace />
              }
            />
            <Route
              path="/farewell"
              element={
                isUnlocked ? <Farewell /> : <Navigate to="/challenge" replace />
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Curtain Slide In (When leaving route) */}
          <motion.div
            className="fixed inset-0 z-50 bg-sepia origin-left pointer-events-none flex items-center justify-center border-r-8 border-ink-dark/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0, transition: { duration: 0 } }}
            exit={{
              scaleX: 1,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <div
              className="absolute inset-0 opacity-60 mix-blend-multiply bg-cover bg-center"
              style={{
                backgroundImage: `url(${asset("bg-botanical-transition.png")})`,
              }}
            />
          </motion.div>

          {/* Curtain Slide Out */}
          <motion.div
            className="fixed inset-0 z-50 bg-sepia origin-right pointer-events-none flex items-center justify-center border-r-8 border-ink-dark/20"
            initial={{ scaleX: 1 }}
            animate={{
              scaleX: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{ scaleX: 0, transition: { duration: 0 } }}
          >
            <div
              className="absolute inset-0 opacity-60 mix-blend-multiply bg-cover bg-center"
              style={{
                backgroundImage: `url(${asset("bg-botanical-transition.png")})`,
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("cartapara_unlocked") === "true";
  });

  const handleUnlock = (value) => {
    if (value) sessionStorage.setItem("cartapara_unlocked", "true");
    setIsUnlocked(value);
  };

  return (
    <>
      {/* Mobile restriction message */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen bg-[#f4f1ea] p-8 text-center text-[#3a352d]">
        <h1 className="font-serif text-3xl mb-4">Usa un Computador</h1>
        <p className="font-sans text-lg text-[#5c554b]">
          Para disfrutar de todos los detalles e interacciones de esta carta,
          por favor ábrela en un computador o portátil. ¡Vale la pena!
        </p>
      </div>

      {/* Main App - Desktop only */}
      <div className="hidden md:block font-sans text-ink-dark antialiased min-h-screen">
        <Router>
          <AnimatedRoutes
            isUnlocked={isUnlocked}
            setIsUnlocked={handleUnlock}
          />
        </Router>
      </div>
    </>
  );
}

export default App;
