import { HeartHandshake, MessageSquare, Instagram, Heart, Camera, Video, MessageCircle, PhoneCall, Coffee, CheckCircle } from 'lucide-react';

export type PuzzleType = (typeof memories)[number]['puzzle']['type'];

export const memories = [
  {
    "title": "The Proposal That Started It All",
    "description": "On this day, your name came to me as a marriage proposal. Your smile caught my attention, but I held back—afraid of falling in love, not knowing what the future held.",
    "icon": HeartHandshake,
    "image": "/images/proposal.png",
    "sound": "/sounds/soft-piano.mp3",
    "date": "2024-09-24",
    "puzzle": {
      type: "draw" as const,
      question: "Draw a Star to unlock next memory",
      pattern: "star"
    }
  },
  {
    "title": "Should I Reach Out?",
    "description": "Before things moved forward i wanted to talk to you but lacked the courage. I even went to ChatGPT for help on how to break the ice. The thought of reaching out consumed me. took me 2 days to send you a follow request on Instagram.",
    "icon": MessageSquare,
    "image": "/images/ss-sleep.jpeg",
    "sound": "/sounds/heartbeat.mp3",
    "date": "2024-09-28",
    "puzzle": {
      type: "draw" as const,
      question: "Draw an Infinity to unlock next memory",
      pattern: "infinity"
    }
  },
  {
    "title": "The Insta Dilemma & Our First Steps Together",
    "description": "After you accepted my Insta request, I spent the entire day wondering whether to message you. It wasn’t until 11:40 pm that I gathered the courage to send the first message and then quickly close app and went to bed. Firstly i was not aware about you knowing the proposal so i was scared of how you will feel, will this overwhelming, so it was a professional reachout but once you confimed that you knew about it, We started exchanging messages, and with each reply, my excitement grew. It was my first time opening up like this, but you made it easy. I found myself eagerly waiting for your next message.",
    "icon": MessageCircle,
    "image": "/images/insta.png",
    "sound": "/sounds/notification-chime.mp3",
    "date": "2024-09-30",
    "puzzle": {
      type: "draw" as const,
      question: "Draw a heart to unlock next memory",
      pattern: "heart"
    }
  },
  {
    "title": "The First Call",
    "description": "Our first phone call happened at sharp 9 pm it lasted for around 1hr 40min 38secs. I was nervous at first, but your handled it so well. I have a recording of it and i know you dont like it so i will not share it. but in near future we will laugh on it.",
    "icon": PhoneCall,
    "image": "/images/call-ss.jpeg",
    "sound": "/sounds/phone-ring.mp3",
    "date": "2024-10-07",
    "puzzle": {
      "type": "color",
      "variant": 'mix'
    }
  },
  {
    "title": "The First Date",
    "description": "Our first date at The Nines. You seemed a bit tense, but I was excited. Though we didn’t capture it in pictures, the memory of that moment is etched in my heart forever.",
    "icon": Coffee,
    "image": "/images/banner-forever-together.jpeg",
    "sound": "/sounds/cafe-ambient.mp3",
    "date": "2024-10-09",
    "puzzle": {
      "type": "color",
      "variant": 'memory'
    }
  },
  {
    "title": "It's Official: My Heart Said Yes",
    "description": "I said yes to you! It wasn’t a grand romantic gesture, but I wanted to be honest and not wait any longer. I knew you were the one and did not want to lose you.",
    "icon": CheckCircle,
    "image": "/public/images/i-said.jpeg",
    "sound": "/sounds/heartbeat.mp3",
    "date": "2024-10-16",
    "puzzle": {
      "type": "arrange",
      "url": "/images/banner-forever-together.jpeg"
    }
  },
  {
    "title": "Our First Selfie Together",
    "description": "You were at interview, we planned to go to BKC but the processed took longer than expected. You made me wait for 3-4 hours, but it was worth it. So we went to the nearest place and we captured a moment that I’ll never forget—though.",
    "icon": Camera,
    "image": "/images/together.jpeg",
    "sound": "/sounds/camera-shutter.mp3",
    "date": "2024-10-22",
    "puzzle": {
      "type": "arrange",
      "url": "/images/together.jpeg"
    }
  },
  {
    "title": "The Yes I Was Waiting For",
    "description": "You said yes! I knew you would and also it will be on birthday, but the timming of it was unexpected, a midnight video call, and a soft tone 'yes from me' that made my day unforgettable.",
    "icon": Video,
    "image": "/images/tin.jpeg",
    "sound": "/sounds/video-call.mp3",
    "date": "2024-10-23",
    "puzzle": {
      "type": "arrange",
      "url": "/images/tin.jpeg"
    }
  },
  {
    "title": "To My One and Only",
    "description": "Vivi,\n we’ve shared so much over these few months. You’ve shown me love, care, and understanding in ways I never imagined. I didn’t expected to fall in love with anyone, but I did—with you. I want to face life’s ups and downs with you, always by my side.\n\n I LOVE YOU.\n yours,\n Pumpkin.",
    "icon": Heart,
    "image": "/images/forever.jpeg",
    "sound": "/sounds/soft-violin.mp3",
    "date": undefined,
    "puzzle": {
      type: "final" as const
    }
  }
] as const
