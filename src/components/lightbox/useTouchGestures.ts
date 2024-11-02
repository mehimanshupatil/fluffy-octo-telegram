import { useRef, useCallback } from 'react';

interface TouchGesturesProps {
    onPinch: (scale: number) => void;
    onPan: (deltaX: number, deltaY: number) => void;
}

interface TouchPoint {
    x: number;
    y: number;
}

export default function useTouchGestures({ onPinch, onPan }: TouchGesturesProps) {
    const initialTouchesRef = useRef<TouchPoint[]>([]);
    const lastTouchRef = useRef<TouchPoint | null>(null);
    const isPinchingRef = useRef(false);
    const initialPinchDistanceRef = useRef<number>(0);

    const getDistance = (touches: Touch[]): number => {
        const dx = touches[1].clientX - touches[0].clientX;
        const dy = touches[1].clientY - touches[0].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        const touches = Array.from(e.touches);
        initialTouchesRef.current = touches.map(t => ({ x: t.clientX, y: t.clientY }));

        if (touches.length === 2) {
            isPinchingRef.current = true;
            initialPinchDistanceRef.current = getDistance(e.touches);
        } else {
            isPinchingRef.current = false;
            lastTouchRef.current = { x: touches[0].clientX, y: touches[0].clientY };
        }
    }, []);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        const touches = Array.from(e.touches);

        if (touches.length === 2 && isPinchingRef.current) {
            const currentDistance = getDistance(e.touches);
            const scale = currentDistance / initialPinchDistanceRef.current;
            onPinch(scale);
        } else if (touches.length === 1 && lastTouchRef.current) {
            const deltaX = touches[0].clientX - lastTouchRef.current.x;
            const deltaY = touches[0].clientY - lastTouchRef.current.y;
            onPan(deltaX, deltaY);
            lastTouchRef.current = { x: touches[0].clientX, y: touches[0].clientY };
        }
    }, [onPinch, onPan]);

    const onTouchEnd = useCallback(() => {
        isPinchingRef.current = false;
        lastTouchRef.current = null;
    }, []);

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        isPinching: isPinchingRef.current,
        startPinchDistance: initialPinchDistanceRef.current,
        currentPinchDistance: 0,
    };
}