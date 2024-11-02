import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPermissionModalProps {
  isOpen: boolean;
  onClose: (allowAudio: boolean) => void;
}

export function AudioPermissionModal({ isOpen, onClose }: AudioPermissionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Enhancing Your Experience
            </h2>
            <p className="text-gray-600 mb-6">
              enable sound for 🎵
            </p>
            <div className="grid grid-cols-1 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClose(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium"
              >
                <Volume2 className="w-4 h-4" />
                Enable Sound
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClose(false)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium"
              >
                <VolumeX className="w-4 h-4" />
                No Sound
              </motion.button> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}