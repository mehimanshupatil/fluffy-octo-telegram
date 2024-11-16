import { useEffect, useState } from 'react';
import { SuccessOverlay } from './Success';
import { Canvas } from './Canvas';
import { HEART_POINTS, INFINITY_POINTS, Point, STAR_POINTS } from './data';

function Draw({ question,
    onComplete,
    pattern
}: {
    question: string,
    pattern: "star" | "infinity" | "heart"
    onComplete: () => void
}) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const [completed, setCompleted] = useState(false);

    const [shapePoints, setShapePoints] = useState<Point[]>([]);

    useEffect(() => {

        if (pattern === 'heart') {
            setShapePoints(HEART_POINTS)
        } else if (pattern === 'infinity') {
            setShapePoints(INFINITY_POINTS)
        } else if (pattern === 'star') {
            setShapePoints(STAR_POINTS)
        }
    }, [pattern])

    const handleStart = (x: number, y: number) => {
        if (completed) return;

        // Check if starting point is close to first heart point
        const distance = Math.hypot(x - shapePoints[0].x, y - shapePoints[0].y);
        if (distance < 20) {
            setIsDrawing(true);
            setPoints([{ x: shapePoints[0].x, y: shapePoints[0].y }]);
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
            lastPoint.x - shapePoints[0].x,
            lastPoint.y - shapePoints[0].y
        );

        if (distance < 20) {
            checkShape();
        } else {
            setPoints([]);
        }
    };

    const checkShape = () => {
        let correct = true;
        shapePoints.forEach((point) => {
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

    return (
        <div className="bg-white rounded-xl p-4 shadow-inner">
            <div className="mb-8">
                <h1 className="text-indigo-600 font-medium mb-4">Drawing Puzzle</h1>
                <p className="text-indigo-600">
                    {question}
                </p>
            </div>

            <div className="relative">
                <Canvas
                    points={points}
                    shapePoints={shapePoints}
                    onStart={handleStart}
                    onMove={handleMove}
                    onEnd={handleEnd}
                />
                {completed && <SuccessOverlay pattern={pattern} />}
            </div>

        </div>
    );
}

export default Draw;