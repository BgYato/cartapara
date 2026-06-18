import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Farewell() {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/');
  };

  const scatteredImages = [
    // Top corners
    { src: '/vintage/vintage_rose.png', top: '2%', left: '2%', width: 'w-40 md:w-56', rotate: -15, delay: 0.2, blend: true },
    { src: '/vintage/vintage_butterfly.png', top: '5%', right: '10%', width: 'w-32 md:w-40', rotate: 12, delay: 0.5, blend: true },
    
    // Middle sides
    { src: '/vintage/vintage_paper.png', top: '35%', left: '2%', width: 'w-36 md:w-48', rotate: 5, delay: 1.4, blend: true },
    { src: '/vintage_doll.png', top: '30%', right: '4%', width: 'w-24 md:w-32', rotate: -10, delay: 1.7 },
    
    // Bottom corners
    { src: '/vintage/vintage_together.png', bottom: '5%', left: '10%', width: 'w-48 md:w-64', rotate: -8, delay: 0.8, blend: true },
    { src: '/vintage/vintage_bee.png', bottom: '8%', right: '15%', width: 'w-24 md:w-32', rotate: 20, delay: 1.1, blend: true },
    
    // Extra elements
    { src: '/antique_key.png', bottom: '25%', right: '5%', width: 'w-32 md:w-40', rotate: 15, delay: 2.0 },
    { src: '/vintage_violin.png', bottom: '40%', left: '5%', width: 'w-40 md:w-56', rotate: -25, delay: 2.3 },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden"
    >
      {scatteredImages.map((img, index) => (
        <motion.img
          key={index}
          src={img.src}
          alt="Vintage decor"
          initial={{ opacity: 0, scale: 0.8, rotate: img.rotate - 10 }}
          animate={{ 
            opacity: 0.85, 
            scale: 1, 
            rotate: [img.rotate, img.rotate + 3, img.rotate],
            y: [0, -8, 0]
          }}
          transition={{ 
            opacity: { delay: img.delay, duration: 1.5 },
            scale: { delay: img.delay, duration: 1.5 },
            rotate: { delay: img.delay, duration: 8, repeat: Infinity, ease: "easeInOut" },
            y: { delay: img.delay, duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`absolute ${img.width} magazine-cutout pointer-events-none ${img.blend ? 'mix-blend-multiply' : ''}`}
          style={{ top: img.top, left: img.left, right: img.right, bottom: img.bottom }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="text-center relative z-10 p-12 md:p-20 bg-paper-light/95 backdrop-blur-md shadow-2xl border border-sepia max-w-xl w-full"
      >
        <h1 className="font-handwriting text-5xl md:text-7xl text-ink-dark mb-4 rotate-[-3deg]">
          Con cariño, Andrés.
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1.5 }}
          className="mt-16 pt-10 border-t border-sepia/40 flex flex-col items-center gap-4"
        >
          <span className="font-sans text-xs uppercase tracking-widest text-ink-light">
            ¿Quieres volver a empezar?
          </span>
          <button
            onClick={handleRestart}
            className="flex items-center gap-3 text-ink-dark border border-sepia px-8 py-3 hover:bg-sepia/20 transition-colors font-sans uppercase tracking-[0.2em] text-xs bg-paper-light"
          >
            <Home size={14} />
            Volver al inicio
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
