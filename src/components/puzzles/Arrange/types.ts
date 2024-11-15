export interface Piece {
    id: number;
    correctPosition: number;
    currentPosition: number;
    x: number;
    y: number;
}

export interface GameState {
    pieces: Piece[];
    selectedPiece: number | null;
    isComplete: boolean;
    imageUrl: string;
    loading: boolean;
}