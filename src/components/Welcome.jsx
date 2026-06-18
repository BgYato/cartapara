import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { asset } from '../utils/asset';

export default function Welcome() {
  const navigate = useNavigate();
  const { greeting, name, message, buttonText } = content.welcome;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Animated Cutout: Growing Flower */}
      <motion.img 
        src={asset('growing_flower.png')} 
        alt="Flower" 
        animate={{ scale: [1, 1.04, 1], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-4 right-4 w-72 opacity-95 magazine-cutout z-0 origin-bottom"
      />

      <div className="max-w-lg text-center z-10 bg-paper-light/80 backdrop-blur-sm p-12 rounded-sm border border-sepia/30 shadow-2xl">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-5xl md:text-6xl text-ink-dark mb-4"
        >
          {greeting}
        </motion.h1>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-handwriting text-4xl md:text-5xl text-rose-faded mb-8"
        >
          {name}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="font-serif italic text-lg text-ink-light mb-12 leading-relaxed"
        >
          {message}
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/challenge')}
          className="bg-ink-dark text-paper-light px-10 py-3 font-sans uppercase tracking-[0.2em] text-sm hover:bg-olive transition-colors duration-500"
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.section>
  );
}
