import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { PuzzleComponent } from './PuzzleComponent';
import { memories } from '../data/memories';

interface MemoryPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  puzzle: {
    type: 'draw' | "color" | "arrange" | "rhythm" | "focus" | 'swipe' | 'tap' | 'drag' | 'final';
    question?: string;
    answer?: string;
  };
  isLast: boolean;
  onComplete: () => void;
  playSound: () => void;
  totalPages: number;
  currentPage: number;
}

export function MemoryPage({
  title,
  description,
  icon: Icon,
  image,
  puzzle,
  isLast,
  onComplete,
  totalPages,
  currentPage,
  playSound
}: MemoryPageProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    playSound()
  }, [])


  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
      layout
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="bg-indigo-600 p-2 rounded-full"
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        <span className="font-medium text-indigo-600">
          Memory {currentPage + 1} of {totalPages}
        </span>
      </div>

      {image && (
        <motion.div
          className="mb-6 overflow-hidden rounded-xl"
          layoutId={`image-${currentPage}`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </motion.div>
      )}

      <motion.h2
        className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        layoutId={`title-${currentPage}`}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6"
        layoutId={`desc-${currentPage}`}
      >
        {description}
      </motion.p>

      <PuzzleComponent
        type={puzzle.type}
        question={puzzle.question}
        answer={puzzle.answer}
        onComplete={onComplete}
        isLast={isLast}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
      />
    </motion.div>
  );
}