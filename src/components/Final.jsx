import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRight } from 'lucide-react';

export default function Final() {
  const navigate = useNavigate();
  const { title, content: messageContent, ps } = content.finalMessage;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {/* Animated Cutout: Growing Flower */}
      <motion.img 
        src="/growing_flower.png" 
        alt="Flower" 
        animate={{ scale: [1, 1.06, 1], rotate: [-3, 3, -3], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-52 opacity-80 magazine-cutout pointer-events-none origin-bottom"
      />
      {/* Animated Cutout: Moon ambiance */}
      <motion.img 
        src="/vintage_moon.png" 
        alt="Moon" 
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-16 left-14 w-36 magazine-cutout pointer-events-none"
      />

      <div className="max-w-2xl text-center bg-paper-light/95 p-12 md:p-20 shadow-2xl border border-sepia relative z-10">
        <div className="flex justify-center mb-10 opacity-60">
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10H45M75 10H120M50 10L55 5L60 10L55 15L50 10ZM60 10L65 5L70 10L65 15L60 10Z" stroke="#6b705c" strokeWidth="1"/>
          </svg>
        </div>
        
        <h3 className="font-serif text-4xl md:text-5xl text-ink-dark mb-10 tracking-wide">{title}</h3>
        
        <p className="font-serif text-xl md:text-2xl text-ink-light leading-relaxed mb-16 italic">
          {messageContent}
        </p>

        <p className="font-handwriting text-3xl text-ink-dark rotate-[-2deg] mb-16">
          {ps}
        </p>

        {/* Continue to Farewell button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="mt-8 pt-10 border-t border-sepia/50 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => navigate('/farewell')}
            className="btn-continue"
          >
            Continuar <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
