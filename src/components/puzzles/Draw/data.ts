export type Point = { x: number; y: number };

export const HEART_POINTS: Point[] = [
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

export const INFINITY_POINTS: Point[] = [
    { x: 150, y: 100 }, // Starting point (body center)

    // Left wing
    { x: 100, y: 60 },
    { x: 50, y: 80 },
    { x: 50, y: 140 },
    { x: 100, y: 160 },

    // Back to center (body)
    { x: 150, y: 100 },

    // Right wing
    { x: 200, y: 60 },
    { x: 250, y: 80 },
    { x: 250, y: 140 },
    { x: 200, y: 160 },

    // Back to center
    { x: 150, y: 100 },
]

export const STAR_POINTS: Point[] = [
    { x: 150, y: 50 },
    { x: 170, y: 100 },
    { x: 220, y: 100 },
    { x: 180, y: 130 },
    { x: 200, y: 180 },
    { x: 150, y: 150 },
    { x: 100, y: 180 },
    { x: 120, y: 130 },
    { x: 80, y: 100 },
    { x: 130, y: 100 },
    { x: 150, y: 50 },
]