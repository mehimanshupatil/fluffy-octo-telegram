import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { SuccessOverlay } from './Success';
import { Canvas } from './Canvas';

export type Point = { x: number; y: number };

const HEART_POINTS2: Point[] = [
    { x: 150, y: 100 },
    { x: 120, y: 70 },
    { x: 80, y: 70 },
    { x: 50, y: 100 },
    { x: 50, y: 140 },
    { x: 150, y: 220 },
    { x: 250, y: 140 },
    { x: 250, y: 100 },
    { x: 220, y: 70 },
    { x: 180, y: 70 },
    { x: 150, y: 100 },
];

const HEART_POINTS: Point[] = [
    { x: 150, y: 100 },
    { x: 120, y: 70 },
    { x: 80, y: 70 },
    { x: 50, y: 100 },
    { x: 50, y: 140 },
    { x: 150, y: 220 },
    { x: 250, y: 140 },
    { x: 250, y: 100 },
    { x: 220, y: 70 },
    { x: 180, y: 70 },
    { x: 150, y: 100 },
];

function Draw({ question, onComplete }: { question: string, onComplete: () => void }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const [completed, setCompleted] = useState(false);

    const handleStart = (x: number, y: number) => {
        if (completed) return;

        // Check if starting point is close to first heart point
        const distance = Math.hypot(x - HEART_POINTS[0].x, y - HEART_POINTS[0].y);
        if (distance < 20) {
            setIsDrawing(true);
            setPoints([{ x: HEART_POINTS[0].x, y: HEART_POINTS[0].y }]);
        }
    };

    const handleMove = (x: number, y: number) => {
        if (!isDrawing || completed) return;
        setPoints([...points, { x, y }]);
    };

    const handleEnd = () => {
        if (!isDrawing || completed) return;
        setIsDrawing(false);

        // Check if ending point is close to last heart point
        const lastPoint = points[points.length - 1];
        const distance = Math.hypot(
            lastPoint.x - HEART_POINTS[0].x,
            lastPoint.y - HEART_POINTS[0].y
        );

        if (distance < 20) {
            checkShape();
        } else {
            setPoints([]);
        }
    };

    const checkShape = () => {
        let correct = true;
        HEART_POINTS.forEach((point) => {
            let foundClose = false;
            points.forEach((userPoint) => {
                const distance = Math.hypot(userPoint.x - point.x, userPoint.y - point.y);
                if (distance < 25) foundClose = true;
            });
            if (!foundClose) correct = false;
        });

        if (correct) {
            setCompleted(true);
            onComplete()
        } else {
            setPoints([]);
        }
    };

    const resetPuzzle = () => {
        setPoints([]);
        setCompleted(false);
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-inner">
            <div className="mb-8">
                <h1 className="text-indigo-600 font-medium mb-4">Heart Drawing Puzzle</h1>
                <p className="text-indigo-600">
                    {question}
                </p>
            </div>

            <div className="relative">
                <Canvas
                    points={points}
                    shapePoints={HEART_POINTS}
                    onStart={handleStart}
                    onMove={handleMove}
                    onEnd={handleEnd}
                />
                {completed && <SuccessOverlay />}
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={resetPuzzle}
                    className="flex items-center gap-2 p-2  bg-indigo-600 text-xs font-medium text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                </button>

            </div>

        </div>
    );
}

export default Draw;