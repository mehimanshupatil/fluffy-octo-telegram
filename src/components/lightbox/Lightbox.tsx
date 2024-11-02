import React, { useRef, useEffect } from 'react';
import { Move } from 'lucide-react';
import LightboxControls from './LightboxControls';
import useTouchGestures from './useTouchGestures';

interface LightboxProps {
    image: string;
    onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
    const [scale, setScale] = React.useState(1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    // const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

    const handleZoom = (delta: number) => {
        setScale(prev => {
            const newScale = Math.min(Math.max(0.5, prev + delta), 3);
            if (newScale <= 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newScale;
        });
    };

    const {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        isPinching,
        // startPinchDistance,
        // currentPinchDistance,
    } = useTouchGestures({
        onPinch: (scale) => {
            setScale(prev => {
                const newScale = Math.min(Math.max(0.5, scale), 3);
                if (newScale <= 1) {
                    setPosition({ x: 0, y: 0 });
                }
                return newScale;
            });
        },
        onPan: (deltaX, deltaY) => {
            if (!imageRef.current) return;
            const img = imageRef.current.getBoundingClientRect();
            const maxX = (img.width * (scale - 1)) / 2;
            const maxY = (img.height * (scale - 1)) / 2;

            setPosition(prev => ({
                x: Math.min(Math.max(prev.x + deltaX, -maxX), maxX),
                y: Math.min(Math.max(prev.y + deltaY, -maxY), maxY),
            }));
        },
    });

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0 || scale <= 1) return;
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current || !imageRef.current) return;

        const img = imageRef.current.getBoundingClientRect();
        const maxX = (img.width * (scale - 1)) / 2;
        const maxY = (img.height * (scale - 1)) / 2;

        setPosition(prev => {
            const deltaX = e.movementX;
            const deltaY = e.movementY;

            const newX = Math.min(Math.max(prev.x + deltaX, -maxX), maxX);
            const newY = Math.min(Math.max(prev.y + deltaY, -maxY), maxY);

            return { x: newX, y: newY };
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (scale > 1) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        } else {
            setScale(2);
            // Zoom towards click position
            const rect = imageRef.current?.getBoundingClientRect();
            if (rect) {
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                setPosition({
                    x: (rect.width * (1 - 2)) * x,
                    y: (rect.height * (1 - 2)) * y,
                });
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center touch-none">
            <LightboxControls onClose={onClose} onZoom={handleZoom} />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Move className="w-6 h-6 text-white inline-block mr-2" />
                <span className="text-white text-sm">
                    {scale > 1
                        ? 'Drag to pan • Pinch or double-tap to zoom'
                        : 'Pinch or double-tap to zoom'}
                </span>
            </div>

            <div
                ref={containerRef}
                className={`relative ${scale > 1 ? 'cursor-move' : 'cursor-zoom-in'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <img
                    ref={imageRef}
                    src={image}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging || isPinching ? 'none' : 'transform 0.2s ease-out',
                        touchAction: 'none',
                    }}
                    className="max-h-[90vh] max-w-[90vw] object-contain select-none"
                    draggable={false}
                />
            </div>
        </div>
    );
}