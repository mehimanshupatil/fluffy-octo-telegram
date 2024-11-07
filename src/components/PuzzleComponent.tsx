import { useState } from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';
import { PuzzleType } from '../data/memories';
import Draw from './puzzles/Draw/Draw';
import { Color } from './puzzles/Color/Color';

interface PuzzleComponentProps {
  type: PuzzleType;
  question?: string;
  pattern?: string | number[];
  pieces?: number;
  onComplete: () => void;
  isLast: boolean;
  playSound?: () => void;
}

export function PuzzleComponent({
  type,
  question,
  pattern,
  pieces = 4,
  onComplete,
  isLast,
  playSound
}: PuzzleComponentProps) {

  const [rhythmPattern, setRhythmPattern] = useState<number[]>([]);
  const [puzzlePieces, setPuzzlePieces] = useState(() => {
    const initialPieces = Array.from({ length: pieces }, (_, i) => ({
      id: i,
      position: i,
      image: `url(https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80&w=200&h=200)`
    }));

    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialPieces[i], initialPieces[j]] = [initialPieces[j], initialPieces[i]];
    }

    return initialPieces;
  });

  const handleSuccess = () => {
    if (playSound) playSound();
    setTimeout(onComplete, 1000);
  };

  const swapPieces = (index1: number, index2: number) => {
    setPuzzlePieces(currentPieces => {
      const newPieces = [...currentPieces];
      [newPieces[index1], newPieces[index2]] = [newPieces[index2], newPieces[index1]];

      if (newPieces.every(piece => piece.id === piece.position)) {
        setTimeout(handleSuccess, 500);
      }

      return newPieces;
    });
  };

  const renderPuzzle = () => {
    switch (type) {
      case 'draw':
        return <Draw question={question!} onComplete={onComplete} />;

      case 'color':
        return (
          <Color onComplete={onComplete} />
        );

      case 'arrange':
        return (
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <p className="text-indigo-600 font-medium mb-4">{question}</p>
            <div className="grid grid-cols-2 gap-4">
              {puzzlePieces.map((piece, index) => (
                <motion.div
                  key={piece.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="aspect-square rounded-lg shadow-md cursor-pointer overflow-hidden relative"
                  onClick={() => {
                    const nextIndex = (index + 1) % puzzlePieces.length;
                    swapPieces(index, nextIndex);
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: piece.image,
                      backgroundPosition: `${-(piece.id % 2) * 100}% ${-Math.floor(piece.id / 2) * 100}%`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-2">
                      <Move className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'rhythm':
        return (
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <p className="text-indigo-600 font-medium mb-4">{question}</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-indigo-100 rounded-lg"
              onClick={() => {
                const newPattern = [...rhythmPattern, 1];
                setRhythmPattern(newPattern);
                if (pattern && newPattern.length === pattern.length) {
                  if (newPattern.join('') === pattern.join('')) {
                    handleSuccess();
                  }
                  setTimeout(() => setRhythmPattern([]), 1000);
                }
              }}
            >
              Tap Here
            </motion.button>
            <div className="flex justify-center gap-2 mt-4">
              {rhythmPattern.map((beat, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 bg-indigo-600 rounded-full"
                />
              ))}
            </div>
          </div>
        );

      case 'final':
        return (
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
              onClick={handleSuccess}
            >
              Yes! 💍
            </motion.button>
            <motion.button
              whileHover={{ x: [0, 10, -10, 0] }}
              className="w-full px-6 py-4 bg-gray-100 text-gray-400 rounded-xl font-semibold"
            >
              Maybe later...
            </motion.button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      {renderPuzzle()}
    </div>
  );
}