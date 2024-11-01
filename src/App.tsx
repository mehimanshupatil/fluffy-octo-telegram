import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Howl } from 'howler';
import { MemoryPage } from './components/MemoryPage';
import { AudioPermissionModal } from './components/AudioPermissionModal';
import { memories } from './data/memories';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [unlockedPages, setUnlockedPages] = useState(new Set([0]));
  const [showAudioModal, setShowAudioModal] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [sounds, setSounds] = useState<{ [key: string]: Howl }>({});

  useEffect(() => {
    if (audioEnabled) {
      const soundEffects: { [key: string]: Howl } = {};
      memories.forEach((memory) => {
        if (memory.sound) {
          soundEffects[memory.sound] = new Howl({
            src: [memory.sound],
            volume: 0.5
          });
        }
      });
      setSounds(soundEffects);
    }
  }, [audioEnabled]);

  const playSound = (soundPath: string) => {
    if (audioEnabled && sounds[soundPath]) {
      sounds[soundPath].play();
    }
  };

  const handleAudioPermission = (allow: boolean) => {
    setAudioEnabled(allow);
    setShowAudioModal(false);
  };

  const unlockNextPage = () => {
    if (currentPage < memories.length - 1) {
      setUnlockedPages(prev => new Set([...prev, currentPage + 1]));
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <AudioPermissionModal isOpen={showAudioModal} onClose={handleAudioPermission} />
      
      <div className="max-w-lg mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Artistic Love Story
          </h1>
          <p className="text-gray-600 text-sm">
            Unlock each memory through creative challenges...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <MemoryPage
              {...memories[currentPage]}
              isLast={currentPage === memories.length - 1}
              onComplete={unlockNextPage}
              totalPages={memories.length}
              currentPage={currentPage}
              playSound={() => memories[currentPage].sound && playSound(memories[currentPage].sound)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 px-4">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 0}
            className="text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {memories.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  unlockedPages.has(index)
                    ? currentPage === index
                      ? "bg-indigo-600"
                      : "bg-indigo-400"
                    : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === memories.length - 1 || !unlockedPages.has(currentPage + 1)}
            className="text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;