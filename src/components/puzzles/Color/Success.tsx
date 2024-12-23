import { Palette } from 'lucide-react';

export function SuccessOverlay({ variant }: { variant: 'mix' | 'memory' }) {

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
            <div className="text-center">
                <Palette className="w-16 h-16 text-pink-500 mx-auto animate-bounce" />
                <p className="text-2xl font-bold text-gray-900 mt-4">{
                    variant === 'mix' ?
                        'You\'ve painted our love story perfectly! 💝' :
                        'you\'ve have sorted my life! 💝'}</p>
            </div>
        </div>
    );
}