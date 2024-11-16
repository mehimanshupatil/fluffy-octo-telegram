export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface ColorPuzzle {
    name: string;
    description: string;
    type: 'mix' | 'guess' | 'memory';
    colors?: string[];
    target?: RGB;
    message?: string;
}

const ROMANTIC_COLORS = [
    '#FF69B4', // Pink
    '#FF1493', // Deep Pink
    '#FF0000', // Red
    '#FF4500', // Orange Red
    '#FF8C00', // Dark Orange
    '#FFB6C1', // Light Pink
    '#FF69B4', // Hot Pink
    '#FF1493', // Deep Pink
    '#FF007F', // Rose
    '#FF77FF', // Bright Pink
];

function getRandomColors(count: number): string[] {
    const shuffled = [...ROMANTIC_COLORS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export const COLOR_PAIRS: ColorPuzzle[] = [
    {
        type: 'mix',
        name: 'Love',
        description: 'Mix the perfect shade of romantic pink',
        colors: ['red', 'white'],
        target: { r: 255, g: 182, b: 193 },
        message: '💖 Your love makes my heart flutter 💖'
    },
    {
        type: 'mix',
        name: 'Sunset Romance',
        description: 'Create the color of our perfect evening together',
        colors: ['red', 'orange'],
        target: { r: 255, g: 127, b: 80 },
        message: '🌅 Every sunset reminds me of you 🌅'
    },
    {
        type: 'mix',
        name: 'Sweet Dreams',
        description: 'Mix the perfect lavender of peaceful nights',
        colors: ['purple', 'white'],
        target: { r: 230, g: 190, b: 255 },
        message: '🌙 Dreaming of you always 🌙'
    }
];

export const COLOR_MEMORY: ColorPuzzle[] = [
    {
        type: 'memory',
        name: '143',
        description: 'Follow the colors and the tap in same order',
        colors: getRandomColors(5),
        message: '💑 Every moment with you is magical 💑'
    },
    {
        type: 'memory',
        name: '1432',
        description: 'Follow the colors and the tap in same order',
        colors: getRandomColors(5),
        message: '💑 Every moment with you is unique 💑'
    }
];