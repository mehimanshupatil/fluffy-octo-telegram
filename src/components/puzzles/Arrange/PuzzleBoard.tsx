import { memo } from 'react';
import { PuzzlePiece } from './PuzzlePiece';
import type { Piece } from './types';

interface PuzzleBoardProps {
    pieces: Piece[];
    selectedPiece: number | null;
    isComplete: boolean;
    imageUrl: string;
    onPieceClick: (position: number) => void;
}

export const PuzzleBoard = memo(function PuzzleBoard({
    pieces,
    selectedPiece,
    isComplete,
    imageUrl,
    onPieceClick
}: PuzzleBoardProps) {
    return (
        <div className="bg-gray-100 p-3 rounded-xl shadow-inner">
            <div className="grid grid-cols-3 gap-1.5 w-[300px] h-[300px]">
                {[...Array(9)].map((_, position) => {
                    const piece = pieces.find(p => p.currentPosition === position);
                    if (!piece) return null;

                    return (
                        <PuzzlePiece
                            key={piece.id}
                            piece={piece}
                            isSelected={selectedPiece === position}
                            isComplete={isComplete}
                            imageUrl={imageUrl}
                            onClick={() => onPieceClick(position)}
                        />
                    );
                })}
            </div>
        </div>
    );
});