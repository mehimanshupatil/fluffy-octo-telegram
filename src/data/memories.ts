import { HeartHandshake, MessageSquare, Instagram, Heart, Camera, Video, MessageCircle, PhoneCall, Coffee, CheckCircle } from 'lucide-react';

export type PuzzleType = (typeof memories)[number]['puzzle']['type'];

export const memories = [
  {
    "title": "The Proposal That Started It All",
    "description": "On this day, your name came to me as a marriage proposal. Your smile caught my attention, but I held back—afraid of falling in love, not knowing what the future held.",
    "icon": HeartHandshake,
    "image": "/images/proposal.png",
    "sound": "/sounds/Lag Ja Gale.mp3",
    "date": "2024-09-24",
    "puzzle": {
      "type": "draw",
      "question": "Draw a Star to unlock the next memory",
      "pattern": "star"
    }
  },
  {
    "title": "Should I Reach Out?",
    "description": "Before things moved forward, I wanted to talk to you but lacked the courage. I even went to ChatGPT for help on how to break the ice. The thought of reaching out consumed me. It took me 2 days to send you a follow request on Instagram.",
    "icon": MessageSquare,
    "image": "/images/ss-sleep.jpeg",
    "sound": "/sounds/Tujhse Naraz Nahi Zindagi.mp3",
    "date": "2024-09-28",
    "puzzle": {
      "type": "draw",
      "question": "Draw an Infinity to unlock the next memory",
      "pattern": "infinity"
    }
  },
  {
    "title": "The Insta Dilemma & Our First Steps Together",
    "description": "After you accepted my Insta request, I spent the entire day wondering whether to message you. It wasn’t until 11:40 pm that I gathered the courage to send the first message and then quickly closed the app and went to bed. At first, I was not aware that you knew about the proposal, so I was scared of how you would feel—whether it would be overwhelming. So, it was a professional reachout. But once you confirmed that you knew about it, we started exchanging messages, and with each reply, my excitement grew. It was my first time opening up like this, but you made it easy. I found myself eagerly waiting for your next message.",
    "icon": MessageCircle,
    "image": "/images/insta.png",
    "sound": "/sounds/Pehla Nasha.mp3",
    "date": "2024-09-30",
    "puzzle": {
      "type": "draw",
      "question": "Draw a heart to unlock the next memory",
      "pattern": "heart"
    }
  },
  {
    "title": "The First Call",
    "description": "Our first phone call happened at exactly 9 PM and lasted around 1 hour, 40 minutes, and 38 seconds. I was nervous at first, but you handled it so well. I have a recording of it, and I know you won't like it, so I will not share it. But in the near future, we will laugh about it.",
    "icon": PhoneCall,
    "image": "/images/call-ss.jpeg",
    "sound": "/sounds/Kora-Kagaz.mp3",
    "date": "2024-10-07",
    "puzzle": {
      "type": "color",
      "variant": "mix"
    }
  },
  {
    "title": "The First Date",
    "description": "Our first date at The Nines. You seemed a bit tense, but I was excited. Though we didn’t capture it in pictures, the memory of that moment is etched in my heart forever.",
    "icon": Coffee,
    "image": "/images/banner-forever-together.jpeg",
    "sound": "/sounds/Abhi Na Jao Chhod Kar.mp3",
    "date": "2024-10-09",
    "puzzle": {
      "type": "color",
      "variant": "memory"
    }
  },
  {
    "title": "It's Official: My Heart Said Yes",
    "description": "I said yes to you! It wasn’t a grand romantic gesture, but I wanted to be honest and not wait any longer. I knew you were the one and didn’t want to lose you.",
    "icon": CheckCircle,
    "image": "/images/i-said.jpeg",
    "sound": "/sounds/Tera Hone Laga Hoon.mp3",
    "date": "2024-10-16",
    "puzzle": {
      "type": "arrange",
      "url": "/images/banner-forever-together.jpeg"
    }
  },
  {
    "title": "Our First Selfie Together",
    "description": "You were at an interview, and we planned to go to BKC, but the process took longer than expected. You made me wait for 3-4 hours, but it was worth it. So we went to the nearest place, and we captured a moment that I’ll never forget.",
    "icon": Camera,
    "image": "/images/together.jpeg",
    "sound": "/sounds/Hothon Se Chhu Lo Tum.mp3",
    "date": "2024-10-22",
    "puzzle": {
      "type": "arrange",
      "url": "/images/together.jpeg"
    }
  },
  {
    "title": "The Yes I Was Waiting For",
    "description": "You said yes! I knew you would, and I also knew it would be on my birthday, but the timing of it was unexpected—a midnight video call and a soft tone 'yes' that made my day unforgettable.",
    "icon": Video,
    "image": "/images/tin.jpeg",
    "sound": "/sounds/Raabta.mp3",
    "date": "2024-10-23",
    "puzzle": {
      "type": "arrange",
      "url": "/images/tin.jpeg"
    }
  },
  {
    "title": "To My One and Only",
    "description": "Vivi,\nWe’ve shared so much over these few months. You’ve shown me love, care, and understanding in ways I never imagined. I didn’t expect to fall in love with anyone, but I did—with you. I want to face life’s ups and downs with you, always by my side.\n\nI LOVE YOU.\n Yours, \nPumpkin.",
    "icon": Heart,
    "image": "/images/forever.jpeg",
    "sound": "/sounds/TUM HI HO.mp3",
    "date": undefined,
    "puzzle": {
      "type": "final"
    }
  }
] as const;
