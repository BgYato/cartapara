import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { asset } from "../utils/asset";

export default function Poem() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden bg-[#0b1220] text-paper-light"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#0b1220]/70 via-[#0b1220]/80 to-[#090e19]/95" />

      <img
        src={asset("corpse_bride/moon.png")}
        alt="Luna"
        className="pointer-events-none absolute right-10 top-10 h-44 w-44 object-contain opacity-90"
      />
      <img
        src={asset("corpse_bride/blue_flowers.png")}
        alt="Ramo de flores azules"
        className="pointer-events-none absolute left-10 bottom-12 h-52 w-52 object-contain opacity-90"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="rounded-[36px] border border-[#64748b]/20 bg-[#0f172a]/90 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl text-paper-light">
                  La certeza.
                </h1>
              </div>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-full border border-[#64748b] bg-[#111827]/90 px-4 py-2 text-xs uppercase tracking-[0.25em] text-paper-light transition hover:border-[#fb7185] hover:text-[#fb7185]"
              >
                <ArrowLeft size={14} />
                Volver al inicio
              </button>
            </div>

            <div className="rounded-[28px] border border-[#475569]/30 bg-[#111827]/95 p-8 shadow-inner shadow-[#1e293b]/40 relative overflow-hidden">
              <img
                src={asset("corpse_bride/cadaver_de_la_novia.png")}
                alt="Novia en el poema"
                className="pointer-events-none absolute right-0 top-8 h-[calc(100%-2rem)] w-72 object-cover opacity-70 blur-sm"
              />

              <div className="relative z-10">
                <div className="mb-6 border-b border-[#475569]/50 pb-6">
                  <p className="font-serif text-lg text-[#cbd5e1] mb-3">
                    Donde termina la búsqueda.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_0.5fr]">
                  <div>
                    <p className="font-serif text-xl leading-relaxed text-[#e2e8f0] mb-6">
                      "Ya no quiero conocer a
                      <br />
                      alguien más.
                    </p>

                    <p className="font-serif text-xl leading-relaxed text-[#e2e8f0] mb-6">
                      Contigo he terminado la
                      <br />
                      busqueda, te elijo con la
                      <br />
                      tranquilidad de que también...
                    </p>

                    <p className="font-serif text-xl leading-relaxed text-[#e2e8f0] mb-6">
                      Te elegiré mañana"
                    </p>

                    <div className="mt-10 text-right mr-16">
                      <span className="font-serif italic text-xl text-[#d4d8e3]">
                        — Alejandra Pizarnik
                      </span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[28px] border border-[#475569]/30 bg-[#111827]/80 p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
                    <img
                      src={asset("corpse_bride/bg.png")}
                      alt="Fondo interno"
                      className="pointer-events-none absolute inset-0 m-auto h-full w-full object-cover opacity-20"
                    />
                  </div>
                </div>

                <p className="font-handwriting text-3xl text-[#f8fafc] text-right mt-6">
                  Mientras exista la luna,
                  <br />
                  Andrés:3
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
