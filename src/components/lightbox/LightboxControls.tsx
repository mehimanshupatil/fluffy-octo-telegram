import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxControlsProps {
    onClose: () => void;
    onZoom: (delta: number) => void;
}

export default function LightboxControls({ onClose, onZoom }: LightboxControlsProps) {
    return (
        <div className="absolute top-4 right-4 z-50 flex gap-4">
            <button
                onClick={() => onZoom(-0.2)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <ZoomOut className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={() => onZoom(0.2)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <ZoomIn className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={onClose}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
                <X className="w-6 h-6 text-white" />
            </button>
        </div>
    );
}