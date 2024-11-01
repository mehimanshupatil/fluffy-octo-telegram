import { Heart, Coffee, Plane, Camera, Music, Gem, Palette } from 'lucide-react';

export const memories = [
  {
    title: "When Our Eyes First Met",
    description: "That magical moment when destiny brought us together. Your artistic soul captured my heart instantly.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80",
    sound: "/sounds/Kora-Kagaz.mp3",
    puzzle: {
      type: "draw" as const,
      question: "Draw a heart to unlock this memory",
      pattern: "heart"
    }
  },
  {
    title: "Our Creative Coffee Date",
    description: "Remember that artsy café where you sketched our portraits on napkins? Your talent left me speechless.",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1511225070737-5af5ac9a690b?auto=format&fit=crop&q=80",
    sound: "/sounds/cafe-ambience.mp3",
    puzzle: {
      type: "color" as const,
      question: "Complete the painting by selecting the right colors",
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"]
    }
  },
  {
    title: "Art Gallery Adventure",
    description: "Exploring exhibitions together, your eyes lighting up at every masterpiece we discovered.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80",
    sound: "/sounds/gallery-echo.mp3",
    puzzle: {
      type: "arrange" as const,
      question: "Arrange the painting pieces in the correct order",
      pieces: 4
    }
  },
  {
    title: "Capturing Our Story",
    description: "Your artistic photographs telling our tale better than words ever could.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80",
    sound: "/sounds/camera-click.mp3",
    puzzle: {
      type: "focus" as const,
      question: "Adjust the focus to reveal our special moment",
    }
  },
  {
    title: "Our Song",
    description: "Dancing while you hummed our melody, creating art with every movement.",
    icon: Music,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
    sound: "/sounds/our-song.mp3",
    puzzle: {
      type: "rhythm" as const,
      question: "Tap the rhythm of our song",
      pattern: [1, 0, 1, 1, 0]
    }
  },
  {
    title: "Will You Paint Life's Canvas With Me?",
    description: "Every moment with you has been a masterpiece. Let's create our greatest work of art together.",
    icon: Gem,
    sound: "/sounds/proposal.mp3",
    puzzle: {
      type: "final" as const
    }
  }
];