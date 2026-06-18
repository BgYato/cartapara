import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRight } from 'lucide-react';
import { asset } from '../utils/asset';

export default function Letter() {
  const navigate = useNavigate();
  const { title, paragraphs, sign } = content.letter;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center py-12 px-6 relative overflow-hidden"
    >
      {/* Animated Cutout: Vintage Doll */}
      <motion.img 
        src={asset('vintage_doll.png')} 
        alt="Doll" 
        animate={{ rotate: [-2, 2, -2], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute -bottom-4 left-4 w-60 opacity-90 magazine-cutout pointer-events-none"
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-2xl w-full bg-[#fdfbf7] p-10 md:p-16 shadow-2xl relative"
      >
        {/* Subtle folding line effect */}
        <div className="absolute inset-0 border-[1px] border-sepia/20 m-2 pointer-events-none"></div>

        <h3 className="font-serif text-4xl text-ink-dark mb-10 text-center tracking-wide">{title}</h3>
        
        <div className="space-y-6 text-ink-dark/80">
          {paragraphs.map((p, index) => (
            <p key={index} className="font-serif italic text-lg md:text-xl leading-loose">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-16 text-right">
          <span className="font-handwriting text-4xl text-ink-dark inline-block rotate-[-3deg]">
            {sign}
          </span>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/moments')}
        className="mt-12 btn-continue"
      >
        Continuar <ArrowRight size={16} />
      </motion.button>
      <motion.img 
        src={asset('growing_flower.png')} 
        alt="Flower" 
        animate={{ scale: [1, 1.04, 1], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-4 right-4 w-72 opacity-95 magazine-cutout z-0 origin-bottom"
      />      
    </motion.section>
  );
}
