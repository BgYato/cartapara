import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { KeyRound, Unlock, HelpCircle, CheckCircle2 } from 'lucide-react';

// Splits the cipherText and answer by hyphens into word groups
// e.g. "VWDUW-PZMASE-AAQJMBQG" -> ["VWDUW", "PZMASE", "AAQJMBQG"]
function buildGroups(cipherText, answer) {
  const cipherWords = cipherText.split('-');
  const answerWords = answer.split('-');
  return cipherWords.map((cipher, i) => ({
    cipher,
    answer: answerWords[i] || '',
  }));
}

const TooltipHint = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-ink-light hover:text-olive transition-colors cursor-pointer p-1"
      >
        <HelpCircle size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-ink-dark text-paper-light text-xs font-serif leading-relaxed italic rounded shadow-xl z-50 pointer-events-none"
          >
            {text.split('\n').map((line, i) => (
              <span key={i} className={`block ${line === '' ? 'mt-2' : ''}`}>{line}</span>
            ))}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Challenge({ onUnlock }) {
  const navigate = useNavigate();
  const { title, description, part1, part2 } = content.challenge;

  // Build word groups from cipherText and answer
  const groups = buildGroups(part2.cipherText, part2.answer);
  // Total letter count across all groups
  const totalLetters = groups.reduce((sum, g) => sum + g.cipher.length, 0);

  // Flat index: group 0 occupies [0..g0.len-1], group 1 [g0.len..g0.len+g1.len-1], etc.
  const groupOffsets = groups.reduce((acc, g, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + groups[i - 1].cipher.length);
    return acc;
  }, []);

  // ── Part 1 state ──
  const [input1, setInput1] = useState('');
  const [isPart1Valid, setIsPart1Valid] = useState(false);
  const [error1, setError1] = useState(false);

  // ── Part 2 state ──
  const [cells, setCells] = useState(Array(totalLetters).fill(''));
  const cellRefs = useRef([]);
  const [isPart2Valid, setIsPart2Valid] = useState(false);
  const [error2, setError2] = useState(false);

  // ── Handlers Part 1 ──
  const validatePart1 = () => {
    if (input1.toLowerCase().trim() === part1.answer.toLowerCase()) {
      setIsPart1Valid(true); setError1(false);
    } else {
      setError1(true);
      setTimeout(() => setError1(false), 2000);
    }
  };

  // ── Handlers Part 2 (cells) ──
  const handleCellChange = (flatIdx, value) => {
    const letter = value.replace(/[^a-zA-Z]/g, '').slice(-1).toLowerCase();
    const newCells = [...cells];
    newCells[flatIdx] = letter;
    setCells(newCells);
    if (letter && flatIdx < totalLetters - 1) {
      cellRefs.current[flatIdx + 1]?.focus();
    }
  };

  const handleCellKeyDown = (flatIdx, e) => {
    if (e.key === 'Backspace' && !cells[flatIdx] && flatIdx > 0) {
      cellRefs.current[flatIdx - 1]?.focus();
    }
  };

  const validatePart2 = () => {
    // Reconstruct the answer by joining groups with hyphens
    let pos = 0;
    const reconstructed = groups.map((g) => {
      const slice = cells.slice(pos, pos + g.cipher.length).join('');
      pos += g.cipher.length;
      return slice;
    }).join('-');

    if (reconstructed === part2.answer.toLowerCase()) {
      setIsPart2Valid(true); setError2(false);
    } else {
      setError2(true);
      setTimeout(() => setError2(false), 2000);
    }
  };

  const handleContinue = () => {
    if (isPart1Valid && isPart2Valid) {
      onUnlock();
      setTimeout(() => navigate('/letter'), 50);
    }
  };

  const isFullyUnlocked = isPart1Valid && isPart2Valid;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
    >
      <div className="max-w-xl w-full bg-[#fdfbf7] p-8 md:p-12 rounded-sm shadow-2xl border border-sepia relative z-10">

        {/* Animated Cutout */}
        <motion.img
          src="/antique_key.png"
          alt="Key"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute -bottom-10 -right-10 w-52 opacity-90 magazine-cutout pointer-events-none"
        />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 rounded-full border border-olive flex items-center justify-center mb-5 text-olive bg-paper-light">
            {isFullyUnlocked ? <Unlock size={24} /> : <KeyRound size={24} />}
          </div>
          <h3 className="font-serif text-2xl text-ink-dark mb-3">{title}</h3>
          <p className="font-serif italic text-ink-light leading-relaxed text-sm">{description}</p>
        </div>

        <div className="flex flex-col gap-10">

          {/* ── Part 1: Free text ── */}
          <div>
            <div className="flex items-center justify-center mb-4">
              <span className="font-sans text-xs uppercase tracking-widest text-ink-light">Secreto 1</span>
              <TooltipHint text={part1.hint} />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isPart1Valid && validatePart1()}
                disabled={isPart1Valid}
                autoComplete="off"
                className={`flex-1 bg-transparent border-b px-3 py-1 text-center font-handwriting text-2xl transition-colors focus:outline-none ${
                  isPart1Valid ? 'border-olive text-olive'
                  : error1 ? 'border-red-400 text-red-400'
                  : 'border-sepia text-ink-dark focus:border-olive'
                }`}
                placeholder="..."
              />
              {!isPart1Valid ? (
                <button onClick={validatePart1} className="text-xs uppercase tracking-widest px-3 py-2 border border-sepia hover:bg-sepia/20 transition-colors">
                  Validar
                </button>
              ) : (
                <CheckCircle2 className="text-olive w-7 h-7 flex-shrink-0" />
              )}
            </div>
          </div>

          {/* ── Part 2: Vigenère crossword grid ── */}
          <div>
            <div className="flex items-center justify-center mb-5">
              <span className="font-sans text-xs uppercase tracking-widest text-ink-light">Secreto 2</span>
              <TooltipHint text={part2.hint} />
            </div>

            <div className="flex flex-col gap-4">
              {groups.map((group, groupIdx) => {
                const offset = groupOffsets[groupIdx];
                return (
                  <div key={groupIdx} className="flex flex-col items-center gap-1">
                    {/* Row of cipher+input pairs */}
                    <div className="flex gap-1.5 flex-wrap justify-center">
                      {group.cipher.split('').map((cipherLetter, letterIdx) => {
                        const flatIdx = offset + letterIdx;
                        const isError = error2;
                        const isValid = isPart2Valid;
                        return (
                          <div key={letterIdx} className="flex flex-col items-center gap-0.5">
                            {/* Cipher letter above */}
                            <span className="font-mono text-[10px] text-ink-light/70 tracking-widest leading-none">
                              {cipherLetter}
                            </span>
                            {/* Input cell */}
                            <input
                              ref={(el) => (cellRefs.current[flatIdx] = el)}
                              type="text"
                              maxLength={1}
                              value={cells[flatIdx].toUpperCase()}
                              disabled={isPart2Valid}
                              onChange={(e) => handleCellChange(flatIdx, e.target.value)}
                              onKeyDown={(e) => handleCellKeyDown(flatIdx, e)}
                              className={`w-8 h-9 md:w-9 md:h-10 border text-center font-serif text-base font-medium transition-all focus:outline-none ${
                                isValid ? 'border-olive text-olive bg-olive/5'
                                : isError ? 'border-red-300 text-red-400 bg-red-50'
                                : 'border-sepia text-ink-dark bg-paper-light focus:border-olive focus:bg-[#fdfbf7]'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    {/* Separator between groups (not after last) */}
                    {groupIdx < groups.length - 1 && (
                      <div className="w-16 h-px bg-sepia/40 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Validate button for Part 2 */}
            <div className="flex justify-center mt-5">
              {!isPart2Valid ? (
                <button
                  onClick={validatePart2}
                  className="text-xs uppercase tracking-widest px-4 py-2 border border-sepia hover:bg-sepia/20 transition-colors"
                >
                  Validar
                </button>
              ) : (
                <div className="flex items-center gap-2 text-olive">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-sans text-xs uppercase tracking-widest">Correcto</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Continue button ── */}
          <div className="h-10 flex items-center justify-center">
            <AnimatePresence>
              {isFullyUnlocked && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleContinue}
                  className="bg-ink-dark text-paper-light px-10 py-3 font-sans uppercase tracking-[0.2em] text-sm hover:bg-olive transition-colors duration-500 shadow-xl"
                >
                  Continuar
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
