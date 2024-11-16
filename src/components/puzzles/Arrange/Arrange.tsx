import { useState, useEffect, useCallback } from 'react';
import { PuzzleBoard } from './PuzzleBoard';
import { Image as ImageIcon } from 'lucide-react';
import type { Piece, GameState } from './types';
import { SuccessOverlay } from './Success';

export function ImagePuzzle({ onComplete, imgUrl }: { onComplete: () => void; imgUrl: string }) {
    const [gameState, setGameState] = useState<GameState>({
        pieces: [],
        selectedPiece: null,
        isComplete: false,
        imageUrl: '',
        loading: true
    });

    const shufflePieces = useCallback((pieces: Piece[]): Piece[] => {
        const shuffled = [...pieces];
        let currentIndex = shuffled.length;

        // Fisher-Yates shuffle
        while (currentIndex > 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap current positions
            const tempCurrentPos = shuffled[currentIndex].currentPosition;
            shuffled[currentIndex].currentPosition = shuffled[randomIndex].currentPosition;
            shuffled[randomIndex].currentPosition = tempCurrentPos;
        }

        // Ensure the puzzle is not solved initially
        while (shuffled.every(piece => piece.currentPosition === piece.correctPosition)) {
            return shufflePieces(pieces);
        }

        return shuffled;
    }, []);

    const initializePuzzle = useCallback(async () => {
        setGameState(prev => ({ ...prev, loading: true }));

        const newImageUrl = imgUrl;

        try {
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = newImageUrl;
            });

            const gridSize = 3;
            const pieceSize = 300 / gridSize;

            // Create pieces with initial positions
            const newPieces: Piece[] = Array.from({ length: gridSize * gridSize }, (_, i) => ({
                id: i,
                correctPosition: i,
                currentPosition: i,
                x: (i % gridSize) * pieceSize,
                y: Math.floor(i / gridSize) * pieceSize
            }));

            // Shuffle the pieces
            const shuffledPieces = shufflePieces(newPieces);

            setGameState(prev => ({
                ...prev,
                pieces: shuffledPieces,
                selectedPiece: null,
                isComplete: false,
                moves: 0,
                imageUrl: newImageUrl,
                loading: false
            }));
        } catch (error) {
            console.error('Failed to load image:', error);
            setGameState(prev => ({ ...prev, loading: false }));
        }
    }, [shufflePieces]);

    useEffect(() => {
        initializePuzzle();
    }, [initializePuzzle]);

    const handlePieceClick = useCallback((clickedPosition: number) => {
        if (gameState.isComplete || gameState.loading) return;

        setGameState(prev => {
            // If no piece is selected, select the clicked piece
            if (prev.selectedPiece === null) {
                return { ...prev, selectedPiece: clickedPosition };
            }

            // If clicking the same piece, deselect it
            if (prev.selectedPiece === clickedPosition) {
                return { ...prev, selectedPiece: null };
            }

            // Find pieces to swap
            const piece1 = prev.pieces.find(p => p.currentPosition === prev.selectedPiece);
            const piece2 = prev.pieces.find(p => p.currentPosition === clickedPosition);

            if (!piece1 || !piece2) return prev;

            // Create new pieces array with swapped positions
            const newPieces = prev.pieces.map(piece => {
                if (piece.id === piece1.id) {
                    return { ...piece, currentPosition: clickedPosition };
                }
                if (piece.id === piece2.id) {
                    return { ...piece, currentPosition: prev.selectedPiece! };
                }
                return piece;
            });

            const isComplete = newPieces.every(piece => piece.currentPosition === piece.correctPosition);

            if (isComplete) {
                onComplete();
            }

            return {
                ...prev,
                pieces: newPieces,
                selectedPiece: null,
                isComplete,
            };
        });
    }, [gameState.isComplete, gameState.loading]);

    if (gameState.loading) {
        return (
            <div className="flex flex-col items-center max-w-md mx-auto p-4">
                <div className="animate-pulse space-y-4 w-full">
                    <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-[300px] bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center  max-w-md mx-auto p-4">

            <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-6 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">Picture Perfect</h1>
                </div>

            </div>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Click or tap two pieces to swap them and complete the picture.
            </p>

            <div className="flex flex-col items-center gap-6 relative">
                <PuzzleBoard
                    pieces={gameState.pieces}
                    selectedPiece={gameState.selectedPiece}
                    isComplete={gameState.isComplete}
                    imageUrl={gameState.imageUrl}
                    onPieceClick={handlePieceClick}
                />

                {gameState.isComplete ? (
                    <SuccessOverlay />
                ) : (
                    null
                )}
            </div>
        </div>
    );
}