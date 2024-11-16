import { motion } from 'framer-motion';
import { memories } from '../data/memories';
import Draw from './puzzles/Draw/Draw';
import { Color } from './puzzles/Color/Color';
import { ImagePuzzle } from './puzzles/Arrange/Arrange';

interface PuzzleComponentProps {
  puzzle: (typeof memories)[number]['puzzle']
  onComplete: () => void;
  isLast: boolean;
  playSound?: () => void;
}

export function PuzzleComponent({
  puzzle,
  onComplete,
  isLast,
  playSound
}: PuzzleComponentProps) {

  const handleSuccess = () => {
    if (playSound) playSound();
    window.open("https://wa.me/918237732718?text=I%20LOVE%20YOU%20TOO", "_blank")

  };


  const renderPuzzle = () => {
    switch (puzzle.type) {
      case 'draw':
        return <Draw question={puzzle.question} pattern={puzzle.pattern} onComplete={onComplete} />;
      case 'color':
        return <Color variant={puzzle.variant} onComplete={onComplete} />
      case 'arrange':
        return <ImagePuzzle onComplete={onComplete} imgUrl={puzzle.url} />
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
              whileHover={{ y: [0, 200, -200, 0] }}
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