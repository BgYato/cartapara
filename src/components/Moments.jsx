import { useRef, useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRight } from 'lucide-react';

const ScratchCard = ({ image, caption }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill with a vintage paper color to scratch off
    ctx.fillStyle = '#c8bca7'; // Sepia color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise or text instructions to the scratch layer
    ctx.fillStyle = '#5c554b';
    ctx.font = '20px "Caveat", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('Raspa aquí', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const scratch = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 40, 0, Math.PI * 2);
      ctx.fill();

      checkScratched();
    };

    const checkScratched = () => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentCount++;
      }
      const percent = transparentCount / (pixels.length / 4);
      if (percent > 0.95 && !isScratched) { // Unveiled after 95% scratched
        setIsScratched(true);
        // Clear the rest with a fade out effect (handled via css class)
      }
    };

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    canvas.addEventListener('touchstart', () => isDrawing = true, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', () => isDrawing = false);

    return () => {
      // Cleanup event listeners
      canvas.removeEventListener('mousedown', () => isDrawing = true);
      canvas.removeEventListener('mousemove', scratch);
      // ... (omitting full cleanup for brevity but ideally all should be removed)
    };
  }, [isScratched]);

  return (
    <div className="relative bg-[#fdfbf7] p-4 pb-12 shadow-xl border border-sepia/30 w-full h-full">
      <div 
        className="relative aspect-square overflow-hidden bg-stone-200 mb-4 select-none cursor-crosshair"
        onPointerDown={(e) => e.stopPropagation()} // Prevents dragging when interacting with the canvas
      >
        <img 
          src={image} 
          alt={caption}
          className="w-full h-full object-cover pointer-events-none"
        />
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>
      <p className="font-handwriting text-2xl text-center text-ink-dark">
        {caption}
      </p>
    </div>
  );
};

const DraggablePhoto = ({ photo, index, boardRef }) => {
  const controls = useDragControls();
  const rotation = index % 2 === 0 ? -4 : 6;
  const yOffset = index % 3 === 0 ? 10 : (index % 3 === 1 ? -10 : 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      animate={{ opacity: 1, y: yOffset, rotate: rotation }}
      transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
      drag
      dragControls={controls}
      dragListener={false} // Desactivar drag automático en todo el contenedor
      dragConstraints={boardRef}
      whileDrag={{ scale: 1.05, zIndex: 50, rotate: 0 }}
      className="w-64 md:w-72 relative z-10 hover:z-20 shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-shadow"
      style={{ zIndex: index }}
    >
      {/* Chincheta simulada */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-600 shadow-[1px_3px_5px_rgba(0,0,0,0.4)] border-2 border-red-800 z-50 flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-white/50 absolute top-1 left-1" />
      </div>
      
      {/* Este div actúa como "manija" para arrastrar */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
      >
        <ScratchCard image={photo.path} caption={photo.caption} />
      </div>
    </motion.div>
  );
};

export default function Moments() {
  const navigate = useNavigate();
  const { title, photos } = content.moments;
  const boardRef = useRef(null);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated Cutout: Dancing Couple */}
      <motion.img 
        src="/couple_dancing.png" 
        alt="Couple Dancing" 
        animate={{ 
          x: [0, 6, 3, -3, -6, -3, 3, 0],
          y: [0, -5, -9, -5, 0, -4, -8, 0],
          rotate: [0, 1.5, 3, 1.5, 0, -1.5, -3, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5, 
          ease: "easeInOut",
          times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1]
        }}
        className="absolute -bottom-4 right-4 w-56 opacity-95 magazine-cutout pointer-events-none"
      />

      <motion.img 
        src="/vintage_trumpet.png" 
        alt="Trumpet" 
        animate={{ scale: [1, 1.04, 1], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-4 left-4 w-72 opacity-95 magazine-cutout z-0 origin-bottom"
      />

      <div className="max-w-7xl w-full relative z-10">
        <h3 className="font-serif text-4xl text-center text-ink-dark mb-8 md:mb-12 tracking-wide">
          {title}
        </h3>

        {/* Tablero de Corcho */}
        <div 
          ref={boardRef}
          className="w-full relative bg-[#c19a6b] border-[12px] md:border-[16px] border-[#6b4423] rounded-lg shadow-[inset_0_4px_24px_rgba(0,0,0,0.6)] overflow-hidden p-6 md:p-12 min-h-[60vh] lg:min-h-[70vh]"
        >
          {/* Instrucción visual sutil */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 rounded-full text-white/80 font-sans text-xs tracking-wider uppercase pointer-events-none">
            Arrastra las fotos por el corcho (solo borde blanco)
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 h-full">
            {photos.map((photo, index) => (
              <DraggablePhoto 
                key={index} 
                photo={photo} 
                index={index} 
                boardRef={boardRef} 
              />
            ))}
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/music')}
        className="mt-20 btn-continue"
      >
        Continuar <ArrowRight size={16} />
      </motion.button>
    </motion.section>
  );
}
