import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { content } from "../data/content";
import { asset } from "../utils/asset";

const sectionCards = [
  {
    title: "Carta",
    description: "Accede a una carta pero antes debes completar un desafio.",
    route: "/challenge",
    gradient:
      "linear-gradient(135deg, rgba(189, 147, 165, 0.18), rgba(107, 112, 92, 0.14))",
  },
  {
    title: "Poema para ti",
    description: "Un pequeño poema dedicado para ti:D.",
    route: "/poem",
    gradient:
      "linear-gradient(135deg, rgba(57, 45, 35, 0.14), rgba(200, 188, 167, 0.16))",
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { greeting, name, message } = content.welcome;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(107,112,92,0.14),_transparent_28%)]" />

      <motion.img
        src={asset("growing_flower.png")}
        alt="Flower"
        animate={{ scale: [1, 1.02, 1], rotate: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-6 right-6 w-72 opacity-80 magazine-cutout z-0 origin-bottom"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-paper-light/95 backdrop-blur-sm border border-sepia/20 p-10 md:p-14 rounded-[40px] shadow-[0_30px_80px_rgba(57,53,45,0.12)]">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xs uppercase tracking-[0.35em] text-ink-light mb-4"
              >
                Menú principal
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-serif text-5xl md:text-6xl text-ink-dark mb-6 leading-tight"
              >
                {greeting} {name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-serif italic text-lg md:text-xl text-ink-light leading-relaxed"
              >
                {message} Elije la sección que deseas explorar y disfruta de la experiencia. Recuerda que te amo.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="rounded-[32px] border border-sepia/25 bg-white/90 p-6 shadow-[inset_0_0_0_1px_rgba(200,188,167,0.18)]"
            >
              <div className="text-xs uppercase tracking-[0.35em] text-ink-light mb-4">
                Secciones
              </div>
              <div className="space-y-4">
                {sectionCards.map((card, index) => (
                  <button
                    key={card.route}
                    type="button"
                    onClick={() => navigate(card.route)}
                    className="group w-full rounded-[28px] border border-sepia/20 p-0 transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-olive"
                    style={{ backgroundImage: card.gradient }}
                  >
                    <div className="rounded-[28px] p-6 bg-white/70 backdrop-blur-sm">
                      <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-ink-light opacity-90 mb-2">
                        Sección {index + 1}
                      </span>
                      <h3 className="font-serif text-2xl text-ink-dark mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-ink-light leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
