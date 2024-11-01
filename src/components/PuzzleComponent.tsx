import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, RefreshCw, Share2, Sliders, Palette, Move } from 'lucide-react';

interface PuzzleComponentProps {
  type: 'draw' | 'color' | 'arrange' | 'focus' | 'rhythm' | 'final';
  question?: string;
  pattern?: string | number[];
  colors?: string[];
  pieces?: number;
  onComplete: () => void;
  isLast: boolean;
  playSound?: () => void;
}

interface PaintArea {
  id: number;
  color: string;
  correctColor: string;
}

export function PuzzleComponent({
  type,
  question,
  pattern,
  colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  pieces = 4,
  onComplete,
  isLast,
  playSound
}: PuzzleComponentProps) {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [paintAreas, setPaintAreas] = useState<PaintArea[]>([
    { id: 1, color: '', correctColor: colors[0] },
    { id: 2, color: '', correctColor: colors[1] },
    { id: 3, color: '', correctColor: colors[2] }
  ]);
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

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#6366f1', '#a855f7', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSuccess = () => {
    if (playSound) playSound();
    triggerConfetti();
    setTimeout(onComplete, 1000);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPaths([]);
        setCurrentPath([]);
      }
    }
  };

  const checkHeartShape = () => {
    if (paths.length < 1) return false;

    const allPoints = paths.flat();
    if (allPoints.length < 20) return false;

    const canvas = canvasRef.current;
    if (!canvas) return false;

    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let points = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) points++;
    }

    return points > 500;
  };

  const handlePaintArea = (areaId: number) => {
    setPaintAreas(areas =>
      areas.map(area =>
        area.id === areaId ? { ...area, color: selectedColor } : area
      )
    );
  };

  const checkPaintingComplete = () => {
    const isComplete = paintAreas.every(area => area.color === area.correctColor);
    if (isComplete) {
      handleSuccess();
    }
  };

  useEffect(() => {
    if (type === 'color') {
      checkPaintingComplete();
    }
  }, [paintAreas]);

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
        return (
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <p className="text-indigo-600 font-medium mb-4">{question}</p>
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={300}
                height={200}
                className="border-2 border-indigo-200 rounded-lg cursor-crosshair bg-white"
                onMouseDown={(e) => {
                  setDrawing(true);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  setCurrentPath([{ x, y }]);

                  const ctx = canvasRef.current?.getContext('2d');
                  if (ctx) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = '#6366f1';
                  }
                }}
                onMouseMove={(e) => {
                  if (drawing) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    setCurrentPath(prev => [...prev, { x, y }]);

                    const ctx = canvasRef.current?.getContext('2d');
                    if (ctx) {
                      ctx.lineTo(x, y);
                      ctx.stroke();
                    }
                  }
                }}
                onMouseUp={() => {
                  setDrawing(false);
                  setPaths(prev => [...prev, currentPath]);
                  if (checkHeartShape()) {
                    handleSuccess();
                  }
                }}
                onMouseLeave={() => {
                  if (drawing) {
                    setDrawing(false);
                    setPaths(prev => [...prev, currentPath]);
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCanvas}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
              >
                <RefreshCw className="w-4 h-4 text-indigo-600" />
              </motion.button>
            </div>
          </div>
        );

      case 'color':
        return (
          <div className="bg-white rounded-xl p-4 shadow-inner">
            <p className="text-indigo-600 font-medium mb-4">{question}</p>
            <div className="flex justify-center gap-4 mb-6">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-offset-2 ring-indigo-600' : ''
                    }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <Palette className="w-6 h-6 text-white" />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {paintAreas.map((area) => (
                <motion.div
                  key={area.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePaintArea(area.id)}
                  className={`aspect-square rounded-lg shadow-md cursor-pointer ${!area.color ? 'bg-gray-100' : ''
                    }`}
                  style={{
                    backgroundColor: area.color || undefined,
                    border: area.color ? 'none' : '2px dashed #cbd5e1'
                  }}
                >
                  {!area.color && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
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