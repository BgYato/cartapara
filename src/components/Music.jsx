import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { ArrowRight, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { asset } from '../utils/asset';

function VintagePlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Playback failed", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      setHasError(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-6 p-6 rounded-sm bg-paper-light border border-sepia shadow-inner relative overflow-hidden text-ink-dark">
      <style>{`
        @keyframes spin-vinyl {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .vinyl-spin-running {
          animation: spin-vinyl 12s linear infinite;
          animation-play-state: running;
        }
        .vinyl-spin-paused {
          animation: spin-vinyl 12s linear infinite;
          animation-play-state: paused;
        }
        /* Custom input range styling for premium look */
        .vintage-range {
          -webkit-appearance: none;
          appearance: none;
        }
        .vintage-range::-webkit-slider-runnable-track {
          background: transparent;
        }
        .vintage-range::-moz-range-track {
          background: transparent;
        }
        .vintage-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3a352d; /* ink-dark */
          cursor: pointer;
          border: 2px solid #e8e3d8; /* paper-dark */
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          transition: transform 0.1s ease;
        }
        .vintage-range::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .vintage-range::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3a352d; /* ink-dark */
          cursor: pointer;
          border: 2px solid #e8e3d8; /* paper-dark */
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          transition: transform 0.1s ease;
        }
        .vintage-range::-moz-range-thumb:hover {
          transform: scale(1.25);
        }
      `}</style>

      {/* Hidden HTML5 Audio Element playing song.mp3 */}
      <audio
        ref={audioRef}
        src={asset('song.mp3')}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
      />

      {/* Vintage Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url(${asset('vintage/vintage_paper.png')})`, backgroundSize: 'cover' }}
      />

      {/* Turn Table Vinyl Container */}
      <div className="w-24 h-24 flex-shrink-0 bg-ink-dark/5 rounded-full border border-sepia/40 flex items-center justify-center relative shadow-inner overflow-visible">
        {/* Platter outer edge */}
        <div className="absolute inset-1.5 rounded-full border border-sepia/25 pointer-events-none" />

        {/* Vinyl Disc */}
        <div
          className={`w-20 h-20 rounded-full bg-neutral-900 shadow-xl relative flex items-center justify-center ${
            isPlaying ? 'vinyl-spin-running' : 'vinyl-spin-paused'
          }`}
          style={{
            background: `radial-gradient(circle, #2a251f 8%, #171513 8.5%, #2a251f 12%, #171513 18%, #2a251f 22%, #171513 28%, #2a251f 32%, #171513 38%, #2a251f 42%, #171513 48%, #2a251f 52%, #171513 58%, #2a251f 62%, #171513 68%, #2a251f 72%, #171513 78%, #2a251f 82%, #171513 88%, #2a251f 92%, #171513 100%)`
          }}
        >
          {/* Label in center */}
          <div className="w-7 h-7 rounded-full bg-[#b8928f] border border-neutral-800 flex items-center justify-center overflow-hidden relative shadow-sm">
            <img
              src={asset('vintage/vintage_rose.png')}
              alt="Rose Center"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
            />
            {/* Spindle hole */}
            <div className="w-2 h-2 rounded-full bg-[#e8e3d8] border border-neutral-900 shadow-inner z-10" />
          </div>
        </div>

        {/* Moving Tonearm */}
        <motion.div
          animate={{ rotate: isPlaying ? 24 : 4 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ originX: "6px", originY: "6px" }}
          className="absolute top-2 right-4 w-3 h-14 z-20 pointer-events-none"
        >
          {/* Pivot base */}
          <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-sepia border border-ink-dark/30 shadow-sm" />
          {/* Metal arm wire */}
          <div className="absolute top-1.5 left-1 w-[2px] h-10 bg-ink-light/70 shadow-sm" />
          {/* Cartridge */}
          <div className="absolute top-10 left-0 w-2 h-2.5 bg-ink-dark rounded-sm shadow-sm" />
        </motion.div>
      </div>

      {/* Controls & Metadata */}
      <div className="flex-1 w-full flex flex-col justify-between text-left relative z-10">
        <div className="mb-2">
          <h4 className="font-serif font-bold text-ink-dark text-lg leading-snug">
            Nuestra Canción
          </h4>
          <p className="font-serif italic text-xs text-ink-light leading-none">
            Labios Rotos - Zoé
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-3.5 mb-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={hasError}
            className={`w-9 h-9 flex items-center justify-center bg-olive text-paper-light rounded-full transition-all duration-300 shadow-md ${
              hasError ? 'opacity-50 cursor-not-allowed' : 'hover:bg-ink-dark transform hover:scale-105 active:scale-95'
            }`}
            title={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? (
              <Pause size={15} fill="currentColor" />
            ) : (
              <Play size={15} className="ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            disabled={hasError}
            className={`text-ink-light hover:text-ink-dark transition-colors p-1 ${
              hasError ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            title="Reiniciar"
          >
            <RotateCcw size={16} />
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            disabled={hasError}
            className={`text-ink-light hover:text-ink-dark transition-colors p-1 ${
              hasError ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            title={isMuted ? "Activar Sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Status Message */}
          {isLoading && !hasError && (
            <span className="text-[10px] text-ink-light animate-pulse font-serif italic">
              Cargando melodía...
            </span>
          )}
          {hasError && (
            <span className="text-[10px] text-rose-faded font-serif font-bold italic">
              Falta el archivo song.mp3 en la carpeta public
            </span>
          )}
        </div>

        {/* Scrubber Range */}
        <div className="w-full flex items-center gap-2">
          <span className="font-mono text-[10px] text-ink-light w-8 text-right select-none">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={hasError}
            className="flex-1 h-1 bg-sepia/40 rounded-lg appearance-none cursor-pointer vintage-range focus:outline-none"
            style={{
              background: `linear-gradient(to right, var(--color-olive) 0%, var(--color-olive) ${progressPercentage}%, var(--color-sepia) ${progressPercentage}%, var(--color-sepia) 100%)`
            }}
          />
          <span className="font-mono text-[10px] text-ink-light w-8 select-none">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Music() {
  const navigate = useNavigate();
  const { title, description } = content.music;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated Cutout: Violin */}
      <motion.img 
        src={asset('vintage_violin.png')} 
        alt="Violin" 
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -bottom-6 left-4 w-84 opacity-90 magazine-cutout pointer-events-none origin-bottom"
      />

      <motion.img 
        src={asset('vintage_lip.png')} 
        alt="Lip" 
        animate={{ scale: [1, 1.04, 1], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute -bottom-4 right-4 w-72 opacity-95 magazine-cutout z-0 origin-bottom"
      />

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="max-w-xl w-full text-center bg-paper-dark/80 backdrop-blur-sm p-12 rounded-sm border border-sepia shadow-xl"
      >
        <h3 className="font-serif text-3xl text-ink-dark mb-6 tracking-wide">{title}</h3>
        <p className="font-serif italic text-ink-light mb-10 leading-relaxed text-lg">
          {description}
        </p>

        {/* Custom Vintage Music Player */}
        <div className="w-full rounded-sm overflow-hidden shadow-md">
          <VintagePlayer />
        </div>

        {/* Handwritten Note */}
        <p className="font-handwriting text-2xl text-rose-faded mt-6 transform -rotate-1 select-none">
          Escúchala con atención...
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/details')}
        className="mt-16 btn-continue"
      >
        Continuar <ArrowRight size={16} />
      </motion.button>
    </motion.section>
  );
}

