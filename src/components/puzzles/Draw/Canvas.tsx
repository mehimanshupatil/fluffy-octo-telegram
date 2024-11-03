import React, { useRef, useEffect } from 'react';
import { Point } from './Draw';

interface CanvasProps {
    points: Point[];
    heartPoints: Point[];
    onStart: (x: number, y: number) => void;
    onMove: (x: number, y: number) => void;
    onEnd: () => void;
}

export function Canvas({
    points,
    heartPoints,
    onStart,
    onMove,
    onEnd,
}: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getCoordinates = (e: MouseEvent | Touch): { x: number; y: number } => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const event = 'touches' in e ? e.touches[0] : e;
        const { x, y } = getCoordinates(event);
        onStart(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const event = 'touches' in e ? e.touches[0] : e;
        const { x, y } = getCoordinates(event);
        onMove(x, y);
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw reference points
        heartPoints.forEach((point, index) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#4F46E5';
            ctx.fill();

            // Draw number labels
            ctx.fillStyle = '#1F2937';
            ctx.font = '14px Arial';
            ctx.fillText((index + 1).toString(), point.x + 10, point.y + 10);
        });

        // Draw user's line
        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.forEach((point) => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.strokeStyle = '#EC4899';
            ctx.lineWidth = 4;
            ctx.stroke();
        }


    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('mouseup', onEnd);
        canvas.addEventListener('mouseleave', onEnd);
        canvas.addEventListener('touchstart', handleStart);
        canvas.addEventListener('touchmove', handleMove);
        canvas.addEventListener('touchend', onEnd);
        canvas.addEventListener('touchcancel', onEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleStart);
            canvas.removeEventListener('mousemove', handleMove);
            canvas.removeEventListener('mouseup', onEnd);
            canvas.removeEventListener('mouseleave', onEnd);
            canvas.removeEventListener('touchstart', handleStart);
            canvas.removeEventListener('touchmove', handleMove);
            canvas.removeEventListener('touchend', onEnd);
            canvas.removeEventListener('touchcancel', onEnd);
        };
    }, [onStart, onMove, onEnd]);

    useEffect(() => {
        drawCanvas();
    }, [points]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border-2 border-gray-200 rounded-lg mx-auto bg-white touch-none  "
        />
    );
}