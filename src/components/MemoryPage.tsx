import { motion } from 'framer-motion';
import { PuzzleComponent } from './PuzzleComponent';
import { memories } from '../data/memories';
import dayjs from 'dayjs';

type MemoryPageProps = (typeof memories)[number] & {
  onComplete: () => void;
  totalPages: number;
  currentPage: number;
  setSelectedImage: (image: string) => void;
}

export function MemoryPage({
  title,
  description,
  icon: Icon,
  image,
  puzzle,
  onComplete,
  totalPages,
  currentPage,
  date,
  setSelectedImage
}: MemoryPageProps) {

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
        <span className="font-medium text-indigo-600 ml-auto">
          {dayjs(date).format('DD MMM YY')}
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
            className="w-full h-48 object-contain rounded-sm bg-pink-300"
            onClick={() => setSelectedImage(image)}
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
        className="text-gray-600 mb-6 whitespace-pre-line  font-mono"
        layoutId={`desc-${currentPage}`}
      >
        {description}
      </motion.p>

      <PuzzleComponent
        puzzle={puzzle}
        onComplete={onComplete}
        isLast={currentPage === memories.length - 1}
      />
    </motion.div>
  );
}