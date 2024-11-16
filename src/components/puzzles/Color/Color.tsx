import { useState } from 'react';
import { COLOR_MEMORY, COLOR_PAIRS, type RGB } from './colors';
import { SuccessOverlay } from './Success';
import { Heart, Sparkles } from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

export function Color({ onComplete, variant }: { onComplete: () => void; variant: 'mix' | 'memory' }) {
    const [level, setLevel] = useState(0);
    const [mix, setMix] = useState(0.5);
    const [completed, setCompleted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [memorySequence, setMemorySequence] = useState<string[]>([]);
    const [userSequence, setUserSequence] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const currentPuzzle = variant === 'mix' ? COLOR_PAIRS[level] : COLOR_MEMORY[level];


    const getMixedColor = (ratio: number): RGB => {
        const [color1, color2] = currentPuzzle.colors || [];

        if (color1 === 'red' && color2 === 'white') {
            return {
                r: 255,
                g: Math.round(182 + (255 - 182) * ratio),
                b: Math.round(193 + (255 - 193) * ratio)
            };
        }

        if (color1 === 'red' && color2 === 'orange') {
            return {
                r: 255,
                g: Math.round(127 * ratio),
                b: Math.round(80 * ratio)
            };
        }

        if (color1 === 'purple' && color2 === 'white') {
            return {
                r: Math.round(230 * ratio),
                g: Math.round(190 * ratio),
                b: 255
            };
        }

        return {
            r: 255,
            g: Math.round(127 * ratio),
            b: Math.round(80 * ratio)
        };
    };

    const handleColorClick = (color: string) => {
        if (!isPlaying) return;

        const newSequence = [...userSequence, color];
        setUserSequence(newSequence);
        setCurrentStep(newSequence.length);

        if (newSequence.length === memorySequence.length) {
            if (newSequence.every((c, i) => c === memorySequence[i])) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    nextLevel();
                }, 2000);
            } else {
                setUserSequence([]);
                setMemorySequence([]);
                setIsPlaying(false);
                setCurrentStep(0);
            }
        }
    };

    const startMemoryGame = () => {
        const sequence = shuffleArray([...currentPuzzle.colors!]);
        setMemorySequence(sequence);
        setUserSequence([]);
        setIsPlaying(true);
        setCurrentStep(0);

        sequence.forEach((color, i) => {
            setTimeout(() => {
                const btn = document.querySelector(`[data-color="${color}"]`);
                if (btn) btn.classList.add('scale-110', 'ring-4');
                setTimeout(() => {
                    if (btn) btn.classList.remove('scale-110', 'ring-4');
                }, 500);
            }, i * 1000);
        });
    };

    const checkColor = () => {
        if (currentPuzzle.type === 'mix') {
            const mixed = getMixedColor(mix);
            const target = currentPuzzle.target!;
            const tolerance = 30;

            const isClose = (
                Math.abs(mixed.r - target.r) <= tolerance &&
                Math.abs(mixed.g - target.g) <= tolerance &&
                Math.abs(mixed.b - target.b) <= tolerance
            );

            if (isClose) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    nextLevel();
                }, 2000);
            }
        }
    };

    const nextLevel = () => {

        if (variant === 'mix' && level === COLOR_PAIRS.length - 1 || variant === 'memory' && level === COLOR_MEMORY.length - 1) {
            setCompleted(true);
            onComplete();
        } else {
            setLevel(level + 1);
            setMix(0.5);
            setMemorySequence([]);
            setUserSequence([]);
            setIsPlaying(false);
            setCurrentStep(0);
        }
    };

    const renderPuzzle = () => {
        switch (currentPuzzle.type) {
            case 'mix':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center">
                            <div className="w-full sm:w-auto">
                                <p className="text-sm text-gray-500 mb-2">Your Mix</p>
                                <div
                                    className="w-full sm:w-24 h-24 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                                    style={{
                                        backgroundColor: `rgb(${getMixedColor(mix).r}, ${getMixedColor(mix).g}, ${getMixedColor(mix).b})`
                                    }}
                                />
                            </div>
                            <div className="w-full sm:w-auto">
                                <p className="text-sm text-gray-500 mb-2">Target</p>
                                <div
                                    className="w-full sm:w-24 h-24 rounded-lg shadow-lg"
                                    style={{
                                        backgroundColor: `rgb(${currentPuzzle.target!.r}, ${currentPuzzle.target!.g}, ${currentPuzzle.target!.b})`
                                    }}
                                />
                            </div>
                        </div>
                        <div className="px-4 sm:px-0">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={mix}
                                onChange={(e) => setMix(parseFloat(e.target.value))}
                                className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-pan-x"
                                style={{
                                    background: `linear-gradient(to right, ${currentPuzzle.colors![0]}, ${currentPuzzle.colors![1]})`
                                }}
                            />
                        </div>
                        <button
                            onClick={checkColor}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-700 transform hover:scale-105 transition-all touch-none"
                        >
                            Mix Colors
                        </button>
                    </div>
                );

            case 'memory':
                return (
                    <div className="space-y-6">

                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
                            {currentPuzzle.colors!.map((color, index) => (
                                <button
                                    key={index}
                                    data-color={color}
                                    onClick={() => handleColorClick(color)}
                                    className={`w-14 sm:w-16 h-14 sm:h-16 rounded-lg shadow-lg transform transition-all ring-pink-400 touch-none ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
                                        } ${index === currentStep && isPlaying ? 'ring-2 ring-pink-500' : ''}`}
                                    style={{ backgroundColor: color }}
                                    disabled={!isPlaying}
                                />
                            ))}
                        </div>
                        {!isPlaying && (
                            <button
                                onClick={startMemoryGame}
                                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-700 transform hover:scale-105 transition-all touch-none"
                            >
                                Start the Game
                            </button>
                        )}
                        {isPlaying && (
                            <p className="text-sm text-gray-600">
                                Step {currentStep + 1} of {memorySequence.length}
                            </p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="text-center p-4 sm:p-0">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-pink-500" />
                    <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">{currentPuzzle.name}</h1>
                </div>

            </div>

            <p className="text-indigo-600 mb-8 text-sm sm:text-base">{currentPuzzle.description}</p>

            <div className="relative">
                {renderPuzzle()}
                {showMessage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
                        <div className="text-center p-4">
                            <Sparkles className="w-12 h-12 text-pink-500 mx-auto animate-bounce" />
                            <p className="text-lg sm:text-xl font-bold text-gray-900 mt-4">{currentPuzzle.message}</p>
                        </div>
                    </div>
                )}
                {completed && (
                    <SuccessOverlay variant={variant} />
                )}
            </div>
        </div>
    );
}