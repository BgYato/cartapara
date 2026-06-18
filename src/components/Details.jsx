import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRight } from 'lucide-react';
import { asset } from '../utils/asset';

export default function Details() {
  const navigate = useNavigate();
  const { title, items } = content.details;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated Cutout: Moon */}
      <motion.img 
        src={asset('vintage_moon.png')} 
        alt="Moon" 
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-4 right-6 w-64 magazine-cutout pointer-events-none"
      />

      <div className="max-w-4xl w-full relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-4xl text-center text-ink-dark mb-16 tracking-wide"
        >
          {title}
        </motion.h3>

        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.4 + 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-paper-light/90 backdrop-blur-sm p-8 border border-sepia shadow-md"
            >
              <p className="font-serif italic text-ink-dark text-xl leading-relaxed text-center">
                "{item}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/final')}
        className="mt-20 btn-continue"
      >
        Continuar <ArrowRight size={16} />
      </motion.button>
    </motion.section>
  );
}
