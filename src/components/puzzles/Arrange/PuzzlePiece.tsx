import React, { memo } from 'react';
import type { Piece } from './types';

interface PuzzlePieceProps {
    piece: Piece;
    isSelected: boolean;
    isComplete: boolean;
    imageUrl: string;
    onClick: () => void;
}

export const PuzzlePiece = memo(function PuzzlePiece({
    piece,
    isSelected,
    isComplete,
    imageUrl,
    onClick
}: PuzzlePieceProps) {
    return (
        <button
            onClick={onClick}
            disabled={isComplete}
            className={`
        relative w-24 h-24 rounded-md overflow-hidden
        transform transition-all duration-200
        ${isSelected
                    ? 'ring-4 ring-indigo-500 scale-95 z-10'
                    : 'hover:ring-2 hover:ring-indigo-300 hover:scale-[0.98] active:scale-95'
                }
        ${isComplete ? 'cursor-default' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-indigo-500
      `}
        >
            <div
                className="w-full h-full bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `-${piece.x}px -${piece.y}px`,
                    backgroundSize: '300px 300px'
                }}
            />
        </button>
    );
});