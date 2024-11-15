import { useState } from 'react';
import { motion } from 'framer-motion';
import { PuzzleType } from '../data/memories';
import Draw from './puzzles/Draw/Draw';
import { Color } from './puzzles/Color/Color';
import { ImagePuzzle } from './puzzles/Arrange/Arrange';

interface PuzzleComponentProps {
  type: PuzzleType;
  question?: string;
  pattern?: string | number[];
  onComplete: () => void;
  isLast: boolean;
  playSound?: () => void;
}

export function PuzzleComponent({
  type,
  question,
  pattern,
  onComplete,
  isLast,
  playSound
}: PuzzleComponentProps) {

  const [rhythmPattern, setRhythmPattern] = useState<number[]>([]);


  const handleSuccess = () => {
    if (playSound) playSound();
    setTimeout(onComplete, 1000);
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
          <ImagePuzzle onComplete={onComplete} />
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