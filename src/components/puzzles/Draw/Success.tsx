import { Heart } from 'lucide-react';
import { Star } from 'lucide-react';
import { Infinity } from 'lucide-react';


export function SuccessOverlay({ pattern }: { pattern: "star" | "infinity" | "heart" }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
            <div className="text-center">
                {pattern === 'heart' && <Heart className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />}
                {pattern === 'star' && <Star className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />}
                {pattern === 'infinity' && <Infinity className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />}
                <p className="text-2xl font-bold text-gray-900 mt-4">Perfect! ❤️</p>
            </div>
        </div>
    );
}