import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Mail, Camera, Flower2, Gift, Cake, Settings, 
  Heart, Sparkles, Lock, Unlock, Play, Pause, Volume2, 
  VolumeX, ChevronRight, ChevronLeft, Trash2, Plus, X, 
  ExternalLink, Save, RefreshCw, Eye, Download, Upload
} from 'lucide-react';

// ==========================================
// DEFAULT SEEDED CONFIG DATA
// ==========================================

const DEFAULT_ANNIVERSARY = "2025-04-08"; // Anniversary: April 8th, 2025 (Saptak & Dipanjana)

const DEFAULT_COMPLIMENTS = [
  "Your smile makes my entire day brighter, Dipanjana.",
  "You have the most beautiful soul I have ever known.",
  "I love the sound of your laugh—it's my absolute favorite song.",
  "You make me want to be a better person every single day.",
  "No matter where I go, my heart always finds its way back to you.",
  "You are my peaceful harbor in a stormy world.",
  "I am so incredibly proud of you and everything you do.",
  "You look breathtakingly beautiful, even in your sleepiest moments.",
  "Holding your hand is my favorite place in the world.",
  "You are the best thing that has ever happened to me.",
  "Your kindness is a light that makes the world a warmer place.",
  "Every small moment with you feels like a beautiful dream come true."
];

const DEFAULT_LETTERS = [
  {
    id: 1,
    title: "A Digital Sanctuary for Us",
    date: "", // Empty means unlocked immediately
    content: "My dearest Dipanjana,\n\nWelcome to our very own digital universe! I didn't want the birthday site to just end after one day, so I built this special space for us. Here, you'll find memories of our journey, a little garden where you can build bouquets, and some coupons you can redeem anytime.\n\nMost importantly, this is a sanctuary where I will leave letters and love notes for you. Think of it as our digital love capsule. Every now and then, new secrets and letters will appear here.\n\nThank you for being my constant source of joy, my partner, and my love. I hope this little space brings a smile to your face today and serves as a gentle reminder of how much you are cherished.\n\nYours forever and always,\nSaptak",
    songName: "Lover - Taylor Swift",
    songUrl: "https://www.youtube.com/watch?v=-BjZmE2gtdo"
  },
  {
    id: 2,
    title: "The Magic in Our Mundane",
    date: "", // Start unlocked, manually schedulable
    content: "Hey beautiful,\n\nI was thinking about how much I cherish the simple, ordinary days we spend together. Talking about nonsense, laughing at silly jokes, or just sharing a quiet moment. You have this incredible ability to turn the most mundane moments into something magical.\n\nI look forward to a lifetime of quiet Sunday mornings and busy weekday evenings with you. No matter what we are doing, as long as it's with you, it's perfect.\n\nSending you the warmest hug,\nSaptak",
    songName: "POV - Ariana Grande",
    songUrl: "https://www.youtube.com/watch?v=frVcKPxhspA"
  },
  {
    id: 3,
    title: "A Promise of Tomorrow",
    date: "", // Start unlocked, manually schedulable
    content: "My love,\n\nAs we grow together, I want to make a few promises to you. I promise to listen, even when we don't agree. I promise to cheer for you in all your victories, big or small. And I promise to hold you tight whenever the world feels a little too heavy.\n\nWe have so many chapters yet to write, so many trips to take, and so many dreams to chase. I am so excited for all of them.\n\nAlways by your side,\nSaptak",
    songName: "Perfect - Ed Sheeran",
    songUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g"
  }
];

const DEFAULT_VOUCHERS = [
  { id: 1, title: "Coffee Date", description: "Good for one afternoon coffee date, fully paid by Saptak.", code: "COFFEE-LOVE", isRedeemed: false, redeemedAt: null },
  { id: 2, title: "Late Night Movie", description: "Saptak will stay up to watch any movie of your choice.", code: "MOVIE-NIGHT", isRedeemed: false, redeemedAt: null },
  { id: 3, title: "Warm Cuddles", description: "Redeemable for 1 hour of warm, uninterrupted hugs.", code: "CUDDLE-WARM", isRedeemed: false, redeemedAt: null },
  { id: 4, title: "Home-Cooked Meal", description: "Saptak will cook your favorite dish from scratch.", code: "CHEF-SAPTAK", isRedeemed: false, redeemedAt: null },
  { id: 5, title: "Apology Pass", description: "Good for winning one minor disagreement instantly.", code: "SORRY-LOVE", isRedeemed: false, redeemedAt: null }
];

// Helper to load old project's song and description lists
const ROMANTIC_SONGS = [
  { id: 1, song: "Lover - Taylor Swift", url: "https://www.youtube.com/watch?v=-BjZmE2gtdo", text: "Baby, I've loved you three summers now, honey, but I want them all. You are my forever." },
  { id: 2, song: "POV - Ariana Grande", url: "https://www.youtube.com/watch?v=frVcKPxhspA", text: "I wanna love me the way that you love me. You make me see the best in myself." },
  { id: 3, song: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g", text: "I found a love for me. Darling, just dive right in and follow my lead. You look perfect tonight." },
  { id: 4, song: "Adore You - Harry Styles", url: "https://www.youtube.com/watch?v=VF-r5TtlT9w", text: "I'd walk through fire for you. Just let me adore you, baby. You are my golden state of mind." },
  { id: 5, song: "Nonsense - Sabrina Carpenter", url: "https://www.youtube.com/watch?v=SV2Jns8dr_A", text: "I'm talking nonsense, but my heart knows exactly what it wants: You. It's always been you." },
  { id: 6, song: "Just The Way You Are - Bruno Mars", url: "https://www.youtube.com/watch?v=LjhCEhWiKXk", text: "When I see your face, there's not a thing that I would change. You're amazing, just the way you are." },
  { id: 7, song: "Die For You - The Weeknd", url: "https://www.youtube.com/watch?v=QLCpqdqeoII", text: "I would die for you, baby. I'm finding ways to stay concentrated on what I gotta do, but it's always you." },
  { id: 8, song: "Snooze - SZA", url: "https://www.youtube.com/watch?v=cc_QxichMZc", text: "I can't lose when I'm with you. How can I snooze and miss the moment? You're too important." },
  { id: 9, song: "Into You - Ariana Grande", url: "https://www.youtube.com/watch?v=kHLHSlExFis", text: "A little less conversation, and a little more touch my body. I'm so into you, I can barely breathe." },
  { id: 10, song: "Paper Rings - Taylor Swift", url: "https://www.youtube.com/watch?v=8zdg-pDF10g", text: "I like shiny things, but I'd marry you with paper rings. Darling, you're the one I want." },
  { id: 11, song: "Until I Found You - Stephen Sanchez", url: "https://www.youtube.com/watch?v=GxldQ9eX2wo", text: "I was never falling in love again until I found you. You lit up my world like nobody else." },
  { id: 12, song: "Dandelions - Ruth B.", url: "https://www.youtube.com/watch?v=W8a4sUabCUo", text: "I see forever in your eyes. I feel okay when I see you smile. You are the wish I made on a dandelion." },
  { id: 13, song: "My Universe - Coldplay", url: "https://www.youtube.com/watch?v=3YqPKLZF_WU", text: "You, you are my universe. And I just want to put you first. You make my world light up inside." },
  { id: 14, song: "Sweet Creature - Harry Styles", url: "https://www.youtube.com/watch?v=8uD6s-X3590", text: "Sweet creature, sweet creature. When I run out of road, you bring me home." },
  { id: 15, song: "Moonlight - Ariana Grande", url: "https://www.youtube.com/watch?v=denGNWMNsSY", text: "He knows just what it does when he's holding me tight. You're my moonlight, my guiding star." },
  { id: 16, song: "Delicate - Taylor Swift", url: "https://www.youtube.com/watch?v=tCXGJQYZ9JA", text: "Is it cool that I said all that? Is it chill that you're in my head? Because I like you. A lot." },
  { id: 17, song: "10,000 Hours - Dan + Shay", url: "https://www.youtube.com/watch?v=Y2E71oe0aSM", text: "I'd spend 10,000 hours and 10,000 more, just to learn your sweet heart. I'm in this for the long haul." },
  { id: 18, song: "Love Me Like You Do - Ellie Goulding", url: "https://www.youtube.com/watch?v=AJtDXIazrMo", text: "You're the light, you're the night, you're the color of my blood. You're the only thing I wanna touch." },
  { id: 19, song: "Thinking Out Loud - Ed Sheeran", url: "https://www.youtube.com/watch?v=lp-EO5I60KA", text: "Take me into your loving arms. Kiss me under the light of a thousand stars. I'll love you 'til we're 70." },
  { id: 20, song: "All of Me - John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg", text: "Cause all of me loves all of you. Love your curves and all your edges, all your perfect imperfections." },
  { id: 21, song: "Style - Taylor Swift", url: "https://www.youtube.com/watch?v=-CmadmM5cOk", text: "You got that James Dean daydream look in your eye. And I got that red lip classic thing that you like. We never go out of style." },
  { id: 22, song: "22 - Taylor Swift", url: "https://www.youtube.com/watch?v=AgFeZr5ptV8", text: "I don't know about you, but I'm feeling 22! Happy Birthday, baby! You are my everything, today and always." },
];

const FRIENDLY_SONGS = [
  { id: 1, song: "Lover - Taylor Swift", url: "https://www.youtube.com/watch?v=-BjZmE2gtdo", text: "Happy 22nd Birthday, Dipanjana! So grateful to have a friend as amazing as you." },
  { id: 2, song: "POV - Ariana Grande", url: "https://www.youtube.com/watch?v=frVcKPxhspA", text: "You always see the best in everyone. Thanks for being such a supportive friend." },
  { id: 3, song: "Perfect - Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g", text: "Wishing you a day as wonderful as our friendship. Cheers to another year!" },
  { id: 4, song: "Adore You - Harry Styles", url: "https://www.youtube.com/watch?v=VF-r5TtlT9w", text: "You've got a heart of gold. I'm so lucky to call you my best friend." },
  { id: 5, song: "Nonsense - Sabrina Carpenter", url: "https://www.youtube.com/watch?v=SV2Jns8dr_A", text: "To many more years of talking nonsense and making great memories together!" },
  { id: 6, song: "Just The Way You Are - Bruno Mars", url: "https://www.youtube.com/watch?v=LjhCEhWiKXk", text: "Don't ever change, Dipanjana. You're fantastic just the way you are." },
  { id: 7, song: "Die For You - The Weeknd", url: "https://www.youtube.com/watch?v=QLCpqdqeoII", text: "A friend like you is hard to find. Thanks for always being there for me." },
  { id: 8, song: "Snooze - SZA", url: "https://www.youtube.com/watch?v=cc_QxichMZc", text: "Life is more fun with you around. Let's make this 22nd year the best one yet." },
  { id: 9, song: "Into You - Ariana Grande", url: "https://www.youtube.com/watch?v=kHLHSlExFis", text: "Sending you so much happiness today. You deserve the world and more." },
  { id: 10, song: "Paper Rings - Taylor Swift", url: "https://www.youtube.com/watch?v=8zdg-pDF10g", text: "True friendship is worth more than any shiny thing. Happy Birthday, buddy!" },
  { id: 11, song: "Until I Found You - Stephen Sanchez", url: "https://www.youtube.com/watch?v=GxldQ9eX2wo", text: "So glad our paths crossed. You've made my life so much brighter." },
  { id: 12, song: "Dandelions - Ruth B.", url: "https://www.youtube.com/watch?v=W8a4sUabCUo", text: "I wish for all your birthday dreams to come true this year, Dipanjana." },
  { id: 13, song: "My Universe - Coldplay", url: "https://www.youtube.com/watch?v=3YqPKLZF_WU", text: "You light up the room wherever you go. Keep being your awesome self!" },
  { id: 14, song: "Sweet Creature - Harry Styles", url: "https://www.youtube.com/watch?v=8uD6s-X3590", text: "Thanks for being the person I can always count on. Happy Birthday!" },
  { id: 15, song: "Moonlight - Ariana Grande", url: "https://www.youtube.com/watch?v=denGNWMNsSY", text: "You're a shining star, Dipanjana. May your year be full of light and joy." },
  { id: 16, song: "Delicate - Taylor Swift", url: "https://www.youtube.com/watch?v=tCXGJQYZ9JA", text: "I really appreciate our bond. It's rare to find a friend as kind as you." },
  { id: 17, song: "10,000 Hours - Dan + Shay", url: "https://www.youtube.com/watch?v=Y2E71oe0aSM", text: "I'd spend 10,000 hours celebrating how great of a friend you are!" },
  { id: 18, song: "Love Me Like You Do - Ellie Goulding", url: "https://www.youtube.com/watch?v=AJtDXIazrMo", text: "You bring so much color to the lives of everyone around you. Have a blast!" },
  { id: 19, song: "Thinking Out Loud - Ed Sheeran", url: "https://www.youtube.com/watch?v=lp-EO5I60KA", text: "Grateful for our friendship today and for all the years to come." },
  { id: 20, song: "All of Me - John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg", text: "You're a perfect friend, flaws and all. Happy 22nd to my favorite person!" },
  { id: 21, song: "Style - Taylor Swift", url: "https://www.youtube.com/watch?v=-CmadmM5cOk", text: "Our friendship never goes out of style. Can't wait to see what this year brings." },
  { id: 22, song: "22 - Taylor Swift", url: "https://www.youtube.com/watch?v=AgFeZr5ptV8", text: "Feeling 22! Happy Birthday, Dipanjana! You're a fantastic friend, today and always." },
];

// ==========================================
// SUBCOMPONENTS
// ==========================================

// 1. Particle Leaves / Stars Background
const FloatingElements = () => {
  const [leaves, setLeaves] = useState([]);
  
  useEffect(() => {
    const items = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      duration: Math.random() * 12 + 10,
      colorClass: Math.random() > 0.5 ? 'text-sage-400/20' : 'text-champagne-300/15',
      type: Math.random() > 0.4 ? 'leaf' : 'star'
    }));
    setLeaves(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0c110d]">
      {/* Background gradients */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_30%,_rgba(111,128,106,0.15),_rgba(230,199,156,0.05),_transparent_75%)]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-sage-800/10 blur-[80px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-champagne-950/10 blur-[80px]"></div>
      
      {/* Leaves and Stars floating */}
      {leaves.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-float ${item.colorClass}`}
          style={{
            left: item.left,
            top: item.top,
            width: `${item.size}px`,
            height: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.type === 'leaf' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 22C2 22 8 20 12 16C16 12 22 2 22 2C22 2 12 8 8 12C4 16 2 22 2 22Z" fill="currentColor"/>
              <path d="M2 22C10 18 16 16 22 2" stroke="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.8 8.6L22 9.2L16.5 14L18.2 21L12 17.3L5.8 21L7.5 14L2 9.2L9.2 8.6L12 2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

// 2. Custom Welcome Screen / Portal Unlocker
const WelcomeScreen = ({ onEnter }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = passcode.replace(/[^0-9]/g, ""); // strip slashes/dashes
    
    // Anniversary date checks (April 8th 2025: 0804, 0408, 08042025, 20250408, 84, 8425)
    const isAnniversary = cleanInput === "0804" || cleanInput === "0408" || cleanInput === "08042025" || cleanInput === "20250408" || cleanInput === "84" || cleanInput === "8425";
    
    // Her Birthday checks (December 21st: 2112, 1221, 21122003, 21122025, 21121999)
    const isBirthday = cleanInput === "2112" || cleanInput === "1221" || cleanInput === "21122003" || cleanInput === "21122025" || cleanInput === "21121999";
    
    if (isAnniversary) {
      onEnter(false); // Login as User
    } else if (isBirthday) {
      onEnter(true); // Login as Admin
    } else if (passcode.toLowerCase() === "demo") {
      onEnter(false); // Demo user bypass
    } else if (passcode.toLowerCase() === "demoadmin") {
      onEnter(true); // Demo admin bypass
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c110d] px-6">
      <FloatingElements />
      <div className="relative z-10 w-full max-w-md bg-[#131b15]/80 backdrop-blur-xl border border-champagne-300/20 rounded-2xl p-8 shadow-2xl text-center">
        
        {/* Wax Seal Design */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#8c2d19] rounded-full opacity-10 animate-ping"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#aa3e28] to-[#802210] rounded-full border-4 border-[#c55b44] shadow-lg flex items-center justify-center cursor-pointer group active:scale-95 transition-transform">
            <Heart className="w-8 h-8 text-[#f9dcd6] fill-[#f9dcd6] group-hover:scale-110 transition-transform" />
            <div className="absolute inset-2 border border-dashed border-white/20 rounded-full pointer-events-none"></div>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-champagne-200 tracking-wide mb-2">Our Universe</h1>
        <p className="text-sage-300 text-xs md:text-sm tracking-widest uppercase mb-8">For Dipanjana</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={`w-full bg-[#1b261e] border text-center text-champagne-100 placeholder-sage-600/70 rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-champagne-400 transition-all font-mono tracking-widest ${
                error ? "border-red-500 animate-bounce" : "border-champagne-800/30"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-champagne-700 via-champagne-600 to-champagne-700 hover:from-champagne-600 hover:to-champagne-600 text-champagne-950 font-semibold py-3 px-6 rounded-lg text-sm tracking-widest uppercase shadow-lg hover:shadow-champagne-500/10 transition-all active:scale-95 border border-champagne-400/30"
          >
            Enter the Sanctuary
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. Floating YouTube Iframe Embed Modal
const YouTubePlayerModal = ({ url, onClose }) => {
  const getEmbedUrl = (urlStr) => {
    try {
      if (!urlStr) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = urlStr.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : urlStr;
    } catch (e) {
      return urlStr;
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-2xl bg-[#0c110d] border border-champagne-300/30 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center bg-[#131b15] px-4 py-3 border-b border-champagne-300/10">
          <span className="text-xs font-serif text-champagne-300 tracking-wider">Listening Together...</span>
          <button onClick={onClose} className="text-sage-400 hover:text-champagne-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={getEmbedUrl(url)}
            title="Special Track"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// 4. Scratch-off Canvas component
const ScratchCard = ({ voucher, onReveal }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [revealed, setRevealed] = useState(voucher.isRedeemed || false);

  useEffect(() => {
    if (voucher.isRedeemed) {
      setRevealed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize based on container size
    canvas.width = canvas.parentElement.clientWidth || 250;
    canvas.height = canvas.parentElement.clientHeight || 160;
    
    // Draw golden Champagne scratch coating
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#dbc093'); // champagne 300
    grad.addColorStop(0.5, '#cba36b'); // champagne 400
    grad.addColorStop(1, '#be8c51'); // champagne 500
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add custom pattern text overlay
    ctx.fillStyle = '#3a4237'; // sage 800
    ctx.font = '22px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch with Love', canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.font = 'italic 12px "Outfit", sans-serif';
    ctx.fillText('✨ Scratch here ✨', canvas.width / 2, canvas.height / 2 + 20);
    
    // Border
    ctx.strokeStyle = 'rgba(253, 251, 247, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
  }, [voucher]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const draw = (e) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const coords = getCoordinates(e);
    if (!coords) return;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 25, 0, Math.PI * 2);
    ctx.fill();
    
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparent++;
      }
    }
    
    const percentage = (transparent / (pixels.length / 4)) * 100;
    if (percentage > 50) {
      setRevealed(true);
      onReveal(voucher.id);
    }
  };

  return (
    <div className="relative w-full h-40 bg-[#16211a] rounded-xl overflow-hidden border border-champagne-300/10 flex flex-col justify-center items-center p-4">
      {/* Revealed/Underneath content */}
      <div className="text-center animate-fade-in-up">
        <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase">Love Voucher</span>
        <h4 className="font-serif text-lg font-semibold text-champagne-100 mt-1">{voucher.title}</h4>
        <p className="text-xs text-sage-300 mt-1 max-w-[200px] mx-auto leading-relaxed">{voucher.description}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="inline-block bg-champagne-950/40 text-[9px] text-champagne-300 font-mono px-2 py-0.5 rounded border border-champagne-800/30">
            CODE: {voucher.code}
          </span>
          {voucher.isRedeemed && (
            <span className="text-[9px] bg-red-950/40 text-red-400 border border-red-800/30 px-2 py-0.5 rounded uppercase font-semibold">
              Redeemed
            </span>
          )}
        </div>
      </div>
      
      {/* Scratch-off canvas layer */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair z-10 touch-none"
          onMouseDown={() => { isDrawing.current = true; }}
          onMouseMove={draw}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={() => { isDrawing.current = true; }}
          onTouchMove={draw}
          onTouchEnd={() => { isDrawing.current = false; }}
        />
      )}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function App() {
  // Config & persistence states
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [anniversaryDate, setAnniversaryDate] = useState(DEFAULT_ANNIVERSARY);
  const [letters, setLetters] = useState([]);
  const [compliments, setCompliments] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [savedBouquets, setSavedBouquets] = useState([]);
  
  // Audio state
  const [activeTrackUrl, setActiveTrackUrl] = useState(null); // for play popup

  // Home states
  const [dailyCompliment, setDailyCompliment] = useState(null);
  const [complimentShake, setComplimentShake] = useState(false);
  const [relationClock, setRelationClock] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Letters states
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letterOpenStates, setLetterOpenStates] = useState({});

  // Scrapbook states
  const [albumFilter, setAlbumFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  // Bouquet Builder states
  const [bouquetWrap, setBouquetWrap] = useState('cream');
  const [bouquetRibbon, setBouquetRibbon] = useState('gold');
  const [bouquetFlowers, setBouquetFlowers] = useState([]);
  const [bouquetNote, setBouquetNote] = useState('');
  const [showBouquetSuccess, setShowBouquetSuccess] = useState(false);

  // Cake states
  const [isCandleBlown, setIsCandleBlown] = useState(false);

  // Admin states
  const [adminPass, setAdminPass] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState(false);
  const [passcodeHint, setPasscodeHint] = useState("1403");
  const [adminMode, setAdminMode] = useState("letters"); // 'letters' | 'compliments' | 'settings'
  
  // Admin edits
  const [editingLetter, setEditingLetter] = useState({ id: '', title: '', content: '', date: '', songName: '', songUrl: '' });
  const [newComplimentText, setNewComplimentText] = useState("");

  // Initialize data from LocalStorage
  useEffect(() => {
    const savedAnniversary = localStorage.getItem('anniversary_date') || DEFAULT_ANNIVERSARY;
    setAnniversaryDate(savedAnniversary);

    const savedLetters = localStorage.getItem('love_letters');
    if (savedLetters) {
      setLetters(JSON.parse(savedLetters));
    } else {
      setLetters(DEFAULT_LETTERS);
      localStorage.setItem('love_letters', JSON.stringify(DEFAULT_LETTERS));
    }

    const savedCompliments = localStorage.getItem('love_compliments');
    if (savedCompliments) {
      setCompliments(JSON.parse(savedCompliments));
    } else {
      setCompliments(DEFAULT_COMPLIMENTS);
      localStorage.setItem('love_compliments', JSON.stringify(DEFAULT_COMPLIMENTS));
    }

    const savedVouchers = localStorage.getItem('love_vouchers');
    if (savedVouchers) {
      setVouchers(JSON.parse(savedVouchers));
    } else {
      setVouchers(DEFAULT_VOUCHERS);
      localStorage.setItem('love_vouchers', JSON.stringify(DEFAULT_VOUCHERS));
    }

    const savedB = localStorage.getItem('saved_bouquets');
    if (savedB) setSavedBouquets(JSON.parse(savedB));

    const savedHint = localStorage.getItem('passcode_hint') || "1403";
    setPasscodeHint(savedHint);
  }, []);

  const getHerAge = () => {
    const birthDate = new Date("2003-12-21");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getSpecialDayAlert = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed: Jan=0, Mar=2, Apr=3, Dec=11
    const date = today.getDate();

    if (month === 3 && date === 8) { // April 8
      return {
        type: 'anniversary',
        title: "💖 Happy Anniversary, My Love! 💖",
        message: "Another beautiful year of loving you, sharing laughs, and writing our own story. April 8th will always be our special day."
      };
    }
    if (month === 11 && date === 21) { // Dec 21
      return {
        type: 'her_birthday',
        title: "🎂 Happy Birthday, Dipanjana! 🎂",
        message: `Wishing you a magical day! You are the light of Saptak's life, and today is all about celebrating you.`
      };
    }
    if (month === 2 && date === 22) { // Mar 22
      return {
        type: 'his_birthday',
        title: "🎈 Saptak's Birthday Today! 🎈",
        message: "It's Saptak's birthday! Send him some extra love today."
      };
    }
    return null;
  };

  // Live relationship ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(anniversaryDate);
      const now = new Date();
      const diffMs = now - start;
      if (diffMs < 0) {
        setRelationClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const diffSecs = Math.floor(diffMs / 1000);
      const seconds = diffSecs % 60;
      const diffMins = Math.floor(diffSecs / 60);
      const minutes = diffMins % 60;
      const diffHours = Math.floor(diffMins / 60);
      const hours = diffHours % 24;
      const days = Math.floor(diffHours / 24);

      setRelationClock({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [anniversaryDate]);

  // Click Daily Compliment Jar
  const handleDrawCompliment = () => {
    // Check if clicked today
    const lastClick = localStorage.getItem('last_compliment_click');
    const today = new Date().toDateString();
    
    // Allow clicking multiple times for user demo convenience, 
    // but save timestamp and show a cute note.
    const randomIdx = Math.floor(Math.random() * compliments.length);
    setComplimentShake(true);
    setTimeout(() => {
      setComplimentShake(false);
      setDailyCompliment(compliments[randomIdx]);
      localStorage.setItem('last_compliment_click', today);
    }, 600);
  };

  // Flip Polaroid Card
  const toggleFlipCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Mark voucher as revealed/saved
  const handleRevealVoucher = (id) => {
    const updated = vouchers.map(v => {
      if (v.id === id) {
        return { ...v, isRedeemed: true, redeemedAt: new Date().toLocaleDateString() };
      }
      return v;
    });
    setVouchers(updated);
    localStorage.setItem('love_vouchers', JSON.stringify(updated));
  };

  // Flower placement logic
  const handleAddFlower = (flowerType) => {
    if (bouquetFlowers.length >= 15) return; // Limit bouquet size
    const newFlower = {
      id: Date.now(),
      type: flowerType,
      x: Math.random() * 120 - 60, // offset coordinates around base center
      y: Math.random() * 80 - 110,
      scale: Math.random() * 0.2 + 0.9, // scaling variance
      rotate: Math.random() * 60 - 30 // rotation variance
    };
    setBouquetFlowers([...bouquetFlowers, newFlower]);
  };

  const handleSaveBouquet = () => {
    if (bouquetFlowers.length === 0) return;
    const newBouquet = {
      id: Date.now(),
      wrap: bouquetWrap,
      ribbon: bouquetRibbon,
      flowers: bouquetFlowers,
      note: bouquetNote || "A bundle of digital love",
      date: new Date().toLocaleDateString()
    };
    const updated = [newBouquet, ...savedBouquets];
    setSavedBouquets(updated);
    localStorage.setItem('saved_bouquets', JSON.stringify(updated));

    // Reset editor
    setBouquetFlowers([]);
    setBouquetNote('');
    setShowBouquetSuccess(true);
    setTimeout(() => setShowBouquetSuccess(false), 3000);
  };

  // Cake extinguish sound
  const handleBlowCandle = () => {
    setIsCandleBlown(true);
    const blowAudio = new Audio(`${import.meta.env.BASE_URL}blow.mp3`);
    blowAudio.play().catch(() => {});
  };

  const handleResetCandle = () => {
    setIsCandleBlown(false);
  };

  // Admin authentication
  const handleAdminAuth = (e) => {
    e.preventDefault();
    const passcode = passcodeHint || "1403";
    if (adminPass === passcode || adminPass === "admin123") {
      setAdminAuthenticated(true);
      setAdminError(false);
    } else {
      setAdminError(true);
      setTimeout(() => setAdminError(false), 800);
    }
  };

  // Admin save letter changes
  const handleSaveLetter = (e) => {
    e.preventDefault();
    let updated;
    if (editingLetter.id) {
      // Editing
      updated = letters.map(l => l.id === editingLetter.id ? editingLetter : l);
    } else {
      // Create new
      const newLetter = {
        ...editingLetter,
        id: Date.now()
      };
      updated = [...letters, newLetter];
    }
    setLetters(updated);
    localStorage.setItem('love_letters', JSON.stringify(updated));
    // Reset edit state
    setEditingLetter({ id: '', title: '', content: '', date: '', songName: '', songUrl: '' });
  };

  const handleDeleteLetter = (id) => {
    const updated = letters.filter(l => l.id !== id);
    setLetters(updated);
    localStorage.setItem('love_letters', JSON.stringify(updated));
  };

  // Admin Compliment Jar management
  const handleAddCompliment = () => {
    if (!newComplimentText.trim()) return;
    const updated = [...compliments, newComplimentText.trim()];
    setCompliments(updated);
    localStorage.setItem('love_compliments', JSON.stringify(updated));
    setNewComplimentText("");
  };

  const handleDeleteCompliment = (index) => {
    const updated = compliments.filter((_, idx) => idx !== index);
    setCompliments(updated);
    localStorage.setItem('love_compliments', JSON.stringify(updated));
  };

  // Admin settings update
  const handleUpdateAnniversary = (e) => {
    e.preventDefault();
    localStorage.setItem('anniversary_date', anniversaryDate);
    alert("Relationship start date updated successfully!");
  };

  const handleUpdatePasscodeHint = (newHint) => {
    setPasscodeHint(newHint);
    localStorage.setItem('passcode_hint', newHint);
    alert("Portal Passcode updated!");
  };

  const handleBackupExport = () => {
    const data = {
      anniversaryDate,
      passcodeHint,
      letters,
      compliments,
      vouchers
    };
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      alert("Configuration JSON copied to clipboard! You can paste this as backups.");
    });
  };

  const handleResetVouchers = () => {
    const reset = vouchers.map(v => ({ ...v, isRedeemed: false, redeemedAt: null }));
    setVouchers(reset);
    localStorage.setItem('love_vouchers', JSON.stringify(reset));
    alert("All scratch vouchers have been reset and covered!");
  };

  // Mapping old photos for the Scrapbook gallery
  const mappedPhotos = [];
  for (let i = 1; i <= 22; i++) {
    const songData = ROMANTIC_SONGS[i - 1];
    mappedPhotos.push({
      id: i,
      imagePath: `${import.meta.env.BASE_URL}photos/page${i}.jpg`,
      text: songData?.text || "A beautiful memory with you.",
      song: songData?.song || "Special Track",
      songUrl: songData?.url || "",
      category: 'romantic'
    });
  }
  for (let i = 1; i <= 22; i++) {
    const songData = FRIENDLY_SONGS[i - 1];
    mappedPhotos.push({
      id: i + 22,
      imagePath: `${import.meta.env.BASE_URL}photos/page${i + 22}.jpg`,
      text: songData?.text || "Wonderful celebration memories.",
      song: songData?.song || "Celebration track",
      songUrl: songData?.url || "",
      category: 'friendly'
    });
  }

  const filteredPhotos = albumFilter === 'all' 
    ? mappedPhotos 
    : mappedPhotos.filter(p => p.category === albumFilter);

  // Time locking check for letters
  const isLetterLocked = (dateStr) => {
    if (!dateStr) return false;
    const unlockDate = new Date(dateStr);
    const now = new Date();
    return unlockDate > now;
  };

  const getLetterCountdown = (dateStr) => {
    if (!dateStr) return "";
    const diff = new Date(dateStr) - new Date();
    if (diff <= 0) return "";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${mins}m`;
  };

  if (!hasEntered) {
    return (
      <WelcomeScreen 
        onEnter={(isAdmin) => {
          setHasEntered(true);
          if (isAdmin) {
            setAdminAuthenticated(true);
            setActiveTab('admin');
          } else {
            setAdminAuthenticated(false);
            setActiveTab('home');
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-[#0c110d] text-[#ebdcb0] selection:bg-champagne-800/40">
      
      {/* Decorative Particle Background */}
      <FloatingElements />

      {/* Embedded YouTube Popup modal */}
      {activeTrackUrl && (
        <YouTubePlayerModal url={activeTrackUrl} onClose={() => setActiveTrackUrl(null)} />
      )}

      {/* ==========================================
          SIDE NAVIGATION (DESKTOP)
          ========================================== */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111913]/90 backdrop-blur-md border-r border-champagne-300/10 z-40 p-6 space-y-8 select-none">
        <div>
          <h2 className="font-serif text-2xl tracking-wide text-champagne-200">Our Space</h2>
          <p className="text-[10px] text-sage-400 uppercase tracking-widest mt-1">Saptak & Dipanjana</p>
        </div>

        <nav className="flex-1 space-y-1.5">
          {[
            { id: 'home', label: 'Dashboard', icon: Home },
            { id: 'letters', label: 'Love Letters', icon: Mail },
            { id: 'scrapbook', label: 'Memory Book', icon: Camera },
            { id: 'bouquet', label: 'Flower Garden', icon: Flower2 },
            { id: 'vouchers', label: 'Scratch Cards', icon: Gift },
            { id: 'cake', label: 'Birthday Cake', icon: Cake },
            adminAuthenticated && { id: 'admin', label: 'Writer Desk', icon: Settings },
          ].filter(Boolean).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-sage-800/40 border border-champagne-300/30 text-champagne-100 font-semibold"
                    : "text-sage-400 hover:text-champagne-300 hover:bg-sage-900/40"
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-champagne-300' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Memory Track Launcher widget (replaces ambient loop) */}
        <div className="bg-[#19241c] border border-champagne-300/10 rounded-xl p-4 flex flex-col space-y-3 shadow-inner">
          <div className="text-center space-y-0.5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-champagne-300">🎵 Our Soundtrack</p>
            <p className="text-[9px] text-sage-400">Play a memory song</p>
          </div>
          
          <select 
            onChange={(e) => {
              const url = e.target.value;
              if (url) setActiveTrackUrl(url);
            }}
            className="w-full bg-[#0c110d] border border-champagne-300/10 text-champagne-200 rounded py-2 px-2 text-xs focus:outline-none focus:ring-1 focus:ring-champagne-400 cursor-pointer select-none"
            defaultValue=""
          >
            <option value="" disabled>Choose a song...</option>
            {ROMANTIC_SONGS.map(s => (
              <option key={s.id} value={s.url}>{s.song}</option>
            ))}
          </select>
        </div>
      </aside>

      {/* ==========================================
          MOBILE NAVIGATION (BOTTOM BAR)
          ========================================== */}
      <header className="md:hidden bg-[#111913]/90 backdrop-blur-md border-b border-champagne-300/10 px-6 py-4 flex justify-between items-center z-40 select-none">
        <div>
          <h2 className="font-serif text-xl tracking-wide text-champagne-200">Our Space</h2>
        </div>
        
        {/* Mobile quick music control */}
        <button 
          onClick={() => {
            const randomSong = ROMANTIC_SONGS[Math.floor(Math.random() * ROMANTIC_SONGS.length)];
            setActiveTrackUrl(randomSong.url);
          }} 
          className="flex items-center gap-1.5 bg-sage-800/40 border border-champagne-300/20 px-3 py-1.5 rounded-full text-xs text-champagne-200"
        >
          <Play className="w-3 h-3 text-champagne-300 fill-champagne-300 animate-pulse" />
          <span>Shuffle Song</span>
        </button>
      </header>

      {/* ==========================================
          MAIN CONTENT AREA
          ========================================== */}
      <main className="flex-1 relative z-30 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 flex flex-col">
        
        {/* ==========================================
            TAB: 🏠 HOME / DASHBOARD
            ========================================== */}
        {activeTab === 'home' && (
          <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full space-y-6 md:space-y-12">
            
            {/* Special Day Notification Banner */}
            {getSpecialDayAlert() && (
              <div className="bg-gradient-to-r from-champagne-950/40 via-sage-950/40 to-champagne-950/40 border border-champagne-300/20 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden animate-pulse-glow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-champagne-500 via-sage-400 to-champagne-500"></div>
                <h3 className="font-serif text-lg md:text-xl text-champagne-200 tracking-wide">{getSpecialDayAlert().title}</h3>
                <p className="text-xs text-sage-300 mt-2 max-w-2xl mx-auto leading-relaxed">{getSpecialDayAlert().message}</p>
              </div>
            )}

            {/* Header Greeting Banner */}
            <div className="glass-panel rounded-2xl p-6 md:p-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-champagne-300/5 rounded-full blur-xl"></div>
              <div className="space-y-3 z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-800/40 border border-sage-700/50 text-[10px] tracking-widest text-champagne-300 font-bold uppercase">
                  <Sparkles className="w-3 h-3 text-champagne-400" />
                  Our Sanctuary
                </div>
                <h1 className="font-serif text-3xl md:text-5xl text-champagne-200 leading-tight">Welcome Home, Dipanjana</h1>
                <p className="text-xs md:text-sm text-sage-300 max-w-xl leading-relaxed">
                  A digital drawer of love letters, a garden of flowers, and memories we've gathered. Explore our tiny corner of the digital universe.
                </p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-champagne-950/20 rounded-full border border-champagne-400/20 z-10 shadow-inner">
                <Heart className="w-12 h-12 md:w-16 md:h-16 text-champagne-300 animate-pulse-glow" />
              </div>
            </div>

            {/* Grid statistics: Relationship Clock & Compliment Jar */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Relationship Ticker Card */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <span className="text-[10px] text-champagne-400/70 tracking-widest uppercase font-bold mb-4">Time Spent Loving You</span>
                
                <div className="grid grid-cols-4 gap-2 md:gap-4 w-full">
                  {[
                    { value: relationClock.days, label: 'Days' },
                    { value: relationClock.hours, label: 'Hrs' },
                    { value: relationClock.minutes, label: 'Mins' },
                    { value: relationClock.seconds, label: 'Secs' },
                  ].map((unit, index) => (
                    <div key={index} className="bg-sage-950/30 border border-champagne-300/10 rounded-xl p-2 md:p-3 flex flex-col items-center">
                      <span className="font-serif text-2xl md:text-4xl text-champagne-300 font-semibold">{String(unit.value).padStart(2, '0')}</span>
                      <span className="text-[9px] text-sage-400 uppercase tracking-widest mt-1">{unit.label}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-[11px] text-sage-400 italic mt-6">
                  Counting since {new Date(anniversaryDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Interactive Compliment Jar */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                <span className="text-[10px] text-champagne-400/70 tracking-widest uppercase font-bold mb-2">Compliment Jar</span>
                
                <div 
                  onClick={handleDrawCompliment}
                  className={`cursor-pointer transition-all hover:scale-105 active:scale-95 py-2 ${complimentShake ? 'animate-flicker' : ''}`}
                >
                  {/* Digital Jar SVG Illustration */}
                  <svg className="w-24 h-24 text-champagne-300 fill-champagne-500/10 hover:fill-champagne-500/25 transition-all" viewBox="0 0 100 100">
                    <rect x="35" y="10" width="30" height="10" rx="3" stroke="currentColor" strokeWidth="4" />
                    <path d="M35 20 Q20 20 20 40 L20 80 Q20 90 35 90 L65 90 Q80 90 80 80 L80 40 Q80 20 65 20 Z" stroke="currentColor" strokeWidth="4" />
                    <line x1="20" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Floating hearts inside */}
                    <Heart className="w-4 h-4 text-champagne-300 absolute top-[45px] left-[45px] animate-pulse" />
                    <Heart className="w-3 h-3 text-champagne-400 absolute top-[55px] left-[32px]" />
                    <Heart className="w-3 h-3 text-champagne-400 absolute top-[62px] left-[55px]" />
                  </svg>
                </div>
                
                <p className="text-[11px] text-sage-400 mt-2 mb-4">Click the jar to draw a sweet message!</p>

                {/* Drawn compliment box */}
                {dailyCompliment && (
                  <div className="bg-champagne-50/5 border border-champagne-300/20 rounded-xl p-4 mt-2 max-w-sm animate-fade-in-up">
                    <p className="font-serif text-sm italic text-champagne-200">
                      "{dailyCompliment}"
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Quick dashboard stats or links */}
            <div className="bg-[#111913]/60 border border-champagne-300/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-champagne-400" />
                <div className="text-center md:text-left">
                  <h4 className="text-sm font-semibold text-champagne-200">You have {vouchers.filter(v => !v.isRedeemed).length} unredeemed scratch vouchers!</h4>
                  <p className="text-xs text-sage-400">Head over to the Scratch Cards section to unlock your free dates and cuddles.</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('vouchers')}
                className="bg-champagne-800 hover:bg-champagne-700 text-champagne-950 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-95 shrink-0"
              >
                Scratch Cards
              </button>
            </div>

          </div>
        )}

        {/* ==========================================
            TAB: ✉️ LOVE LETTERS
            ========================================== */}
        {activeTab === 'letters' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Header */}
            <div className="mb-8 space-y-2 text-center md:text-left">
              <h2 className="font-serif text-3xl text-champagne-200">Your Letterbox</h2>
              <p className="text-xs text-sage-400 max-w-md leading-relaxed">
                A digital archive of letters written for you. Tap on an unlocked envelope to slide the letter out.
              </p>
            </div>

            {/* Envelope Grid */}
            <div className="grid sm:grid-cols-2 gap-8 items-start py-4">
              {letters.map((letter) => {
                const locked = isLetterLocked(letter.date);
                const isOpen = letterOpenStates[letter.id];

                return (
                  <div key={letter.id} className="flex flex-col items-center space-y-4">
                    {locked ? (
                      /* LOCKED ENVELOPE CARD */
                      <div className="w-full max-w-[340px] aspect-[1.5] bg-sage-950/20 border border-dashed border-sage-800/40 rounded-xl flex flex-col items-center justify-center p-6 text-center select-none">
                        <Lock className="w-8 h-8 text-sage-600 mb-3 animate-pulse" />
                        <h4 className="font-serif text-sm font-semibold text-sage-500">{letter.title}</h4>
                        <p className="text-[10px] text-sage-600 uppercase tracking-widest mt-2">
                          Unlocks in: <span className="font-mono text-champagne-400/80">{getLetterCountdown(letter.date)}</span>
                        </p>
                        <p className="text-[9px] text-sage-600 mt-1 italic">Release Date: {new Date(letter.date).toLocaleDateString()}</p>
                      </div>
                    ) : (
                      /* UNLOCKED ENVELOPE CARD */
                      <div className="flex flex-col items-center w-full max-w-[340px] relative">
                        {/* 3D Envelope Wrapper */}
                        <div 
                          className={`envelope-wrapper w-full relative ${isOpen ? 'open' : ''}`}
                          onClick={() => setLetterOpenStates(prev => ({ ...prev, [letter.id]: !prev[letter.id] }))}
                        >
                          <div className="envelope-flap"></div>
                          
                          {/* Inside Sheet */}
                          <div className="letter-content-sheet overflow-hidden flex flex-col justify-between">
                            <div className="space-y-1">
                              <span className="text-[8px] tracking-widest font-bold uppercase text-sage-600">Private Letter</span>
                              <h4 className="font-serif text-sm font-semibold text-sage-900 border-b border-sage-200 pb-1">{letter.title}</h4>
                              <p className="font-serif text-[11px] italic text-sage-700 leading-relaxed truncate-3-lines mt-1">
                                {letter.content.split('\n')[0]}...
                              </p>
                            </div>
                            <div className="flex justify-between items-center text-[9px] text-sage-500 font-serif pt-1">
                              <span>Read Entire Letter...</span>
                              <Heart className="w-3 h-3 text-red-700 fill-red-700" />
                            </div>
                          </div>

                          <div className="envelope-pocket"></div>
                        </div>

                        {/* Title & Interaction Instructions */}
                        <div className="mt-4 text-center">
                          <h4 className="font-serif text-md text-champagne-200">{letter.title}</h4>
                          <button
                            onClick={() => setSelectedLetter(letter)}
                            className="mt-2 text-xs text-champagne-400 hover:text-champagne-300 font-semibold tracking-wider uppercase inline-flex items-center gap-1 bg-sage-900/60 border border-champagne-300/10 px-3 py-1 rounded-full transition-all"
                          >
                            <Eye className="w-3 h-3" /> Open Letter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* FULLSCREEN LETTER OVERLAY READER */}
            {selectedLetter && (
              <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/80 p-4 md:p-8 animate-fade-in-up">
                <div className="relative w-full max-w-xl max-h-[85vh] bg-[#FAF6EE] text-[#2b392d] rounded-xl overflow-hidden shadow-2xl flex flex-col">
                  
                  {/* Decorative frame top */}
                  <div className="h-2 bg-gradient-to-r from-champagne-600 via-sage-700 to-champagne-600"></div>

                  <div className="p-6 md:p-10 overflow-y-auto space-y-6 flex-1 relative font-serif">
                    {/* Letter Seal background watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                      <Heart className="w-72 h-72 text-red-900" />
                    </div>

                    {/* Date / Time stamp */}
                    <div className="text-right text-xs text-sage-600 font-sans border-b border-sage-200 pb-2">
                      {selectedLetter.date ? new Date(selectedLetter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "A Special Day"}
                    </div>

                    {/* Letter Content */}
                    <div className="font-serif leading-relaxed text-md text-justify whitespace-pre-line text-sage-900 pr-2">
                      {selectedLetter.content}
                    </div>

                    {/* Song Attachments */}
                    {selectedLetter.songUrl && (
                      <div className="font-sans mt-8 bg-[#f4ebd9] border border-[#d6c7ac] rounded-lg p-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4 text-champagne-700 fill-champagne-700" />
                          <div className="text-left">
                            <span className="text-[9px] uppercase tracking-wider text-sage-600 block">Letter Soundtrack</span>
                            <span className="text-xs font-semibold text-sage-800">{selectedLetter.songName || "Special track"}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTrackUrl(selectedLetter.songUrl)}
                          className="bg-champagne-700 hover:bg-champagne-600 text-champagne-950 font-bold px-3 py-1.5 rounded text-[10px] tracking-widest uppercase transition-all shadow active:scale-95"
                        >
                          Play Track
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar Footer */}
                  <div className="bg-[#FAF6EE] px-6 py-4 border-t border-sage-200 flex justify-between items-center">
                    <span className="text-xs font-cursive text-sage-600 text-xl">Love, Saptak</span>
                    <button
                      onClick={() => setSelectedLetter(null)}
                      className="bg-sage-800 hover:bg-sage-950 text-champagne-100 font-semibold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all"
                    >
                      Fold & Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==========================================
            TAB: 📸 PHOTO SCRAPBOOK
            ========================================== */}
        {activeTab === 'scrapbook' && (
          <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-champagne-300/10 pb-4">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="font-serif text-3xl text-champagne-200">Memory scrapbook</h2>
                <p className="text-xs text-sage-400">
                  Every card contains a story from our journey. Hover or tap to flip the card and play the track.
                </p>
              </div>

              {/* Album filter options */}
              <div className="flex justify-center gap-1.5 self-center md:self-auto bg-sage-950/40 p-1 border border-champagne-300/10 rounded-lg">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'romantic', label: 'Romantic' },
                  { id: 'friendly', label: 'Friendly' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setAlbumFilter(btn.id)}
                    className={`px-3 py-1.5 rounded text-xs transition-all tracking-wider ${
                      albumFilter === btn.id
                        ? "bg-champagne-800 text-champagne-950 font-bold"
                        : "text-sage-400 hover:text-champagne-200"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry / Grid Polaroid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
              {filteredPhotos.map((photo, idx) => {
                const isFlipped = flippedCards[photo.id];
                // Apply random rotate tilt for dynamic layout feel
                const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];
                const rotationClass = rotations[photo.id % rotations.length];

                return (
                  <div 
                    key={photo.id} 
                    className={`w-full max-w-[260px] aspect-[4/5] mx-auto select-none transition-all duration-300 hover:scale-[1.03] ${rotationClass}`}
                  >
                    {/* Polaroid Container with 3D Flip */}
                    <div 
                      onClick={() => toggleFlipCard(photo.id)}
                      className="relative w-full h-full cursor-pointer"
                      style={{ perspective: '800px' }}
                    >
                      <div 
                        className="relative w-full h-full transition-transform duration-700 shadow-xl"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: isFlipped ? 'rotateY(180deg)' : 'none'
                        }}
                      >
                        
                        {/* POLAROID FRONT SIDE */}
                        <div 
                          className="absolute inset-0 w-full h-full bg-[#fcf9f2] text-sage-900 p-3 rounded-lg border border-champagne-300/20 shadow-md flex flex-col justify-between"
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        >
                          {/* Image container */}
                          <div className="w-full aspect-square bg-[#ece4d3] rounded overflow-hidden relative shadow-inner">
                            <img 
                              src={photo.imagePath} 
                              alt="Memory" 
                              className="w-full h-full object-cover filter brightness-[0.96] contrast-[1.02]"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-sage-950/5">
                              <Heart className="w-8 h-8 text-champagne-700/50 mb-1" />
                              <span className="text-[10px] text-sage-500 font-mono">Photo {photo.id}</span>
                            </div>
                          </div>

                          {/* Polaroid bottom caption */}
                          <div className="pt-3 pb-1 flex-1 flex items-center justify-center text-center">
                            <p className="font-cursive text-lg text-sage-800 leading-tight">
                              {photo.text.length > 50 ? `${photo.text.substring(0, 50)}...` : photo.text}
                            </p>
                          </div>

                          {/* Quick tap index */}
                          <div className="flex justify-between items-center text-[9px] text-sage-400 font-mono border-t border-sage-100 pt-1">
                            <span>#{photo.id}</span>
                            <span className="uppercase tracking-widest text-[8px]">{photo.category}</span>
                          </div>
                        </div>

                        {/* POLAROID BACK SIDE */}
                        <div 
                          className="absolute inset-0 w-full h-full bg-[#FAF6EE] text-sage-900 p-4 rounded-lg border border-champagne-300/30 shadow-md flex flex-col justify-between"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          <div className="space-y-4">
                            <span className="text-[9px] font-bold text-champagne-600 uppercase tracking-widest block border-b border-sage-200 pb-1">Memory Note</span>
                            <p className="font-serif text-sm italic leading-relaxed text-sage-800 text-center py-2 px-1">
                              "{photo.text}"
                            </p>
                          </div>

                          <div className="space-y-3">
                            {photo.songUrl && (
                              <div className="bg-[#f0e6d2] border border-[#d6c7ac] rounded-lg p-2 flex flex-col space-y-2">
                                <div className="text-left truncate">
                                  <span className="text-[8px] uppercase tracking-wider text-sage-500 block">Linked Song</span>
                                  <span className="text-xs font-semibold text-sage-800 truncate block">{photo.song}</span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // prevent flipping back
                                    setActiveTrackUrl(photo.songUrl);
                                  }}
                                  className="w-full bg-champagne-700 hover:bg-champagne-600 text-champagne-950 font-bold py-1.5 rounded text-[9px] tracking-widest uppercase transition-all shadow"
                                >
                                  Play Song
                                </button>
                              </div>
                            )}

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActivePhotoModal(photo);
                              }}
                              className="w-full bg-sage-800 hover:bg-sage-950 text-champagne-100 font-semibold py-1 px-3 rounded text-[10px] uppercase tracking-wider transition-all"
                            >
                              Expand View
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FULLSCREEN PHOTO PREVIEW MODAL */}
            {activePhotoModal && (
              <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/90 p-4 animate-fade-in-up">
                <div className="relative max-w-3xl w-full flex flex-col md:flex-row bg-[#FAF6EE] text-sage-900 rounded-xl overflow-hidden shadow-2xl">
                  <button 
                    onClick={() => setActivePhotoModal(null)} 
                    className="absolute top-4 right-4 z-50 bg-[#0c110d]/40 backdrop-blur-md rounded-full p-2 border border-white/20 text-white hover:bg-[#0c110d]/70 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex-[3] bg-black flex items-center justify-center aspect-square md:aspect-auto md:max-h-[75vh]">
                    <img 
                      src={activePhotoModal.imagePath} 
                      alt="Expanded view" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-[2] p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-champagne-600 tracking-widest uppercase block border-b border-sage-200 pb-1">Memory Capsule</span>
                      <h4 className="font-serif text-lg italic leading-relaxed text-sage-800 mt-2">
                        "{activePhotoModal.text}"
                      </h4>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-sage-200">
                      {activePhotoModal.songUrl && (
                        <div className="bg-[#f0e6d2] border border-[#d6c7ac] rounded-lg p-3">
                          <span className="text-[8px] uppercase tracking-wider text-sage-500 block">Soundtrack</span>
                          <span className="text-xs font-semibold text-sage-800 block truncate mb-2">{activePhotoModal.song}</span>
                          <button
                            onClick={() => setActiveTrackUrl(activePhotoModal.songUrl)}
                            className="w-full bg-champagne-700 hover:bg-champagne-600 text-champagne-950 font-bold py-2 rounded text-[10px] tracking-widest uppercase transition-all shadow"
                          >
                            Listen in Popup
                          </button>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xs text-sage-400 font-mono">
                        <span>Memory Card #{activePhotoModal.id}</span>
                        <span className="uppercase">{activePhotoModal.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==========================================
            TAB: 🌸 FLOWER BOUQUET BUILDER
            ========================================== */}
        {activeTab === 'bouquet' && (
          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Header */}
            <div className="mb-6 space-y-1 text-center md:text-left">
              <h2 className="font-serif text-3xl text-champagne-200">Digital Flower Garden</h2>
              <p className="text-xs text-sage-400">
                Design a custom flower bouquet for yourself or write a dedication. Pick a wrapper, add ribbons, arrange your favorite flowers, and store it in your garden showcase.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 items-start py-4">
              
              {/* Left Column (Builder Panel) */}
              <div className="md:col-span-2 glass-panel rounded-2xl p-5 space-y-6 shadow-md">
                <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Bouquet Materials</span>
                
                {/* Wrap styles selector */}
                <div className="space-y-2">
                  <label className="text-xs text-sage-300">Wrapping Paper:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'cream', name: 'Linen', class: 'bg-[#faf6ee] border border-sage-300/50' },
                      { id: 'gold', name: 'Gold', class: 'bg-gradient-to-r from-champagne-400 to-champagne-600' },
                      { id: 'green', name: 'Velvet', class: 'bg-[#1b2f21] border border-sage-800' },
                      { id: 'pink', name: 'Silk', class: 'bg-[#eecaca]' },
                    ].map((wrap) => (
                      <button
                        key={wrap.id}
                        onClick={() => setBouquetWrap(wrap.id)}
                        className={`p-2 rounded text-[10px] font-medium text-center transition-all ${
                          bouquetWrap === wrap.id 
                            ? 'ring-2 ring-champagne-400 scale-[1.05] font-bold text-champagne-100' 
                            : 'opacity-85 text-sage-400'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full mx-auto mb-1 ${wrap.class}`}></div>
                        {wrap.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ribbon selector */}
                <div className="space-y-2">
                  <label className="text-xs text-sage-300">Ribbon Bow:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gold', name: 'Gold', color: 'bg-champagne-400' },
                      { id: 'burgundy', name: 'Burgundy', color: 'bg-red-800' },
                      { id: 'sage', name: 'Sage', color: 'bg-sage-600' },
                      { id: 'cream', name: 'Cream', color: 'bg-[#fcfaf4]' },
                    ].map((rib) => (
                      <button
                        key={rib.id}
                        onClick={() => setBouquetRibbon(rib.id)}
                        className={`p-1.5 rounded text-[10px] transition-all text-center ${
                          bouquetRibbon === rib.id 
                            ? 'ring-1 ring-champagne-400 scale-[1.03] font-bold text-champagne-100' 
                            : 'opacity-85 text-sage-400'
                        }`}
                      >
                        <div className={`w-6 h-3 rounded mx-auto mb-1 ${rib.color}`}></div>
                        {rib.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flower Tray */}
                <div className="space-y-2">
                  <label className="text-xs text-sage-300">Flower stems (Max 15):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: 'rose', name: 'Rose', icon: '🌹', desc: 'Love & Passion' },
                      { type: 'sunflower', name: 'Sunflower', icon: '🌻', desc: 'Bright Adoration' },
                      { type: 'lavender', name: 'Lavender', icon: '🪻', desc: 'Devotional Grace' },
                      { type: 'tulip', name: 'Tulip', icon: '🌷', desc: 'Perfect Care' },
                      { type: 'daisy', name: 'Daisy', icon: '🌼', desc: 'Loyalty' },
                      { type: 'dandelion', name: 'Dandelion', icon: '🌾', desc: 'Wishes' },
                    ].map((flower) => (
                      <button
                        key={flower.type}
                        onClick={() => handleAddFlower(flower.type)}
                        disabled={bouquetFlowers.length >= 15}
                        className="bg-sage-950/40 hover:bg-sage-900/60 border border-champagne-300/10 p-2.5 rounded-lg flex flex-col items-center text-center transition-all hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
                      >
                        <span className="text-2xl">{flower.icon}</span>
                        <span className="text-[10px] font-semibold text-champagne-200 mt-1">{flower.name}</span>
                        <span className="text-[8px] text-sage-400">{flower.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tag Note */}
                <div className="space-y-2">
                  <label className="text-xs text-sage-300">Dedication Tag:</label>
                  <input
                    type="text"
                    maxLength="50"
                    placeholder="Write a tiny dedication tag..."
                    value={bouquetNote}
                    onChange={(e) => setBouquetNote(e.target.value)}
                    className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs placeholder-sage-600/70 text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setBouquetFlowers([])}
                    className="flex-1 bg-sage-900 hover:bg-sage-800 text-sage-300 border border-sage-800 font-semibold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-all"
                  >
                    Clear Canvas
                  </button>
                  <button
                    onClick={handleSaveBouquet}
                    disabled={bouquetFlowers.length === 0}
                    className="flex-1 bg-champagne-800 hover:bg-champagne-700 disabled:bg-sage-900/40 disabled:text-sage-600 disabled:border-transparent text-champagne-950 font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                  >
                    Tie & Save
                  </button>
                </div>

                {showBouquetSuccess && (
                  <div className="text-center text-xs text-green-400 font-medium animate-pulse">
                    ✨ Your beautiful bouquet has been saved in the Showcase!
                  </div>
                )}
              </div>

              {/* Right Column (Bouquet Canvas / Display Board) */}
              <div className="md:col-span-3 flex flex-col space-y-6">
                
                {/* Visualizer Frame */}
                <div className="aspect-[4/5] bg-gradient-to-b from-[#101913]/60 to-[#0b100c] border border-champagne-300/10 rounded-2xl p-6 relative overflow-hidden flex items-center justify-center shadow-lg min-h-[360px]">
                  
                  {/* Digital Glass shelf backdrop */}
                  <div className="absolute bottom-[20%] w-[80%] h-1 bg-champagne-300/10 shadow-[0_0_10px_rgba(230,199,156,0.1)] rounded-full"></div>
                  
                  {/* Bouquet Container Assembly */}
                  <div className="relative w-72 h-80 flex flex-col items-center justify-end z-10">
                    
                    {/* Floating Flower Stems */}
                    {bouquetFlowers.map((flower) => {
                      const icons = { rose: '🌹', sunflower: '🌻', lavender: '🪻', tulip: '🌷', daisy: '🌼', dandelion: '🌾' };
                      return (
                        <div
                          key={flower.id}
                          className="absolute text-4xl select-none animate-fade-in-up"
                          style={{
                            transform: `translate(${flower.x}px, ${flower.y}px) scale(${flower.scale}) rotate(${flower.rotate}deg)`,
                            transformOrigin: 'bottom center',
                            zIndex: 12
                          }}
                        >
                          {icons[flower.type]}
                        </div>
                      );
                    })}

                    {/* Wrapping Paper rendering */}
                    {bouquetFlowers.length > 0 && (
                      <div className="relative z-10 flex flex-col items-center w-full">
                        {/* Custom wrapper visuals based on wrap state */}
                        <div className={`w-36 h-28 clip-wrap-path relative flex items-center justify-center opacity-90 shadow-md ${
                          bouquetWrap === 'cream' ? 'bg-[#faf6ee]' :
                          bouquetWrap === 'gold' ? 'bg-gradient-to-t from-champagne-600 via-champagne-400 to-champagne-300' :
                          bouquetWrap === 'green' ? 'bg-[#1b2f21] border border-sage-800' :
                          'bg-[#eecaca]'
                        }`}
                        style={{
                          clipPath: 'polygon(15% 0%, 85% 0%, 70% 100%, 30% 100%)',
                          borderRadius: '0 0 16px 16px'
                        }}>
                          {/* Inner shadow crease */}
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>

                        {/* Ribbon bow decoration */}
                        <div className={`absolute bottom-3 w-8 h-4 rounded-full flex items-center justify-center z-25 ${
                          bouquetRibbon === 'gold' ? 'bg-champagne-400' :
                          bouquetRibbon === 'burgundy' ? 'bg-red-800' :
                          bouquetRibbon === 'sage' ? 'bg-sage-600' : 'bg-[#faf6ee]'
                        } shadow-md`}>
                          <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                        </div>
                      </div>
                    )}

                    {/* Display message if empty */}
                    {bouquetFlowers.length === 0 && (
                      <div className="text-center text-sage-500 max-w-xs p-6 select-none flex flex-col items-center space-y-3">
                        <Flower2 className="w-12 h-12 text-sage-700 animate-pulse" />
                        <p className="text-xs leading-relaxed">
                          Your bouquet canvas is empty. Add flower stems from the panel on the left to start building your gift arrangement.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Handwriting dedication Tag on wrapping */}
                  {bouquetFlowers.length > 0 && bouquetNote && (
                    <div className="absolute bottom-6 bg-[#faf6ee] text-[#2b392d] px-3 py-1.5 rounded shadow-md border border-[#dacbae] font-cursive text-md z-30 animate-fade-in-up">
                      {bouquetNote}
                    </div>
                  )}

                  {/* Flower Count */}
                  {bouquetFlowers.length > 0 && (
                    <div className="absolute top-4 right-4 text-[9px] font-bold text-champagne-300 uppercase tracking-widest bg-sage-950/60 border border-champagne-300/10 px-2 py-0.5 rounded-full">
                      Stems: {bouquetFlowers.length}/15
                    </div>
                  )}
                </div>

                {/* Showcase Showcase cabinet */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Saved Showcase Cabinet</span>
                  
                  {savedBouquets.length === 0 ? (
                    <div className="bg-sage-950/20 border border-dashed border-sage-800/40 rounded-xl p-6 text-center select-none">
                      <p className="text-xs text-sage-500 italic">No saved bouquets. Tie a bouquet to place it in your collection.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {savedBouquets.map((b) => (
                        <div key={b.id} className="glass-panel rounded-xl p-3 flex flex-col justify-between text-left space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] text-sage-400 font-mono">{b.date}</span>
                            <button
                              onClick={() => {
                                const updated = savedBouquets.filter(sb => sb.id !== b.id);
                                setSavedBouquets(updated);
                                localStorage.setItem('saved_bouquets', JSON.stringify(updated));
                              }}
                              className="text-sage-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          {/* Mini visual preview */}
                          <div className="h-16 bg-sage-950/40 rounded flex items-center justify-center text-lg select-none">
                            {b.flowers.slice(0, 3).map((f, idx) => {
                              const icons = { rose: '🌹', sunflower: '🌻', lavender: '🪻', tulip: '🌷', daisy: '🌼', dandelion: '🌾' };
                              return <span key={idx} className="-mx-0.5">{icons[f.type]}</span>;
                            })}
                          </div>
                          
                          <p className="font-cursive text-xs text-champagne-200 truncate leading-relaxed">
                            "{b.note}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ==========================================
            TAB: 🎟️ SCRATCH CARDS
            ========================================== */}
        {activeTab === 'vouchers' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Header */}
            <div className="mb-8 space-y-1 text-center md:text-left">
              <h2 className="font-serif text-3xl text-champagne-200">Scratch Love Coupons</h2>
              <p className="text-xs text-sage-400">
                Scratch off the silver-champagne coating to reveal your special voucher. You can redeem these tickets with Saptak!
              </p>
            </div>

            {/* Grid of Scratch Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
              {vouchers.map((voucher) => (
                <ScratchCard
                  key={voucher.id}
                  voucher={voucher}
                  onReveal={handleRevealVoucher}
                />
              ))}
            </div>
            
            <div className="mt-8 bg-[#111913]/60 border border-champagne-300/10 rounded-2xl p-6 text-center max-w-xl mx-auto">
              <h4 className="font-serif text-sm font-semibold text-champagne-300 mb-2">How to redeem?</h4>
              <p className="text-xs text-sage-400 leading-relaxed">
                Once a voucher is scratched, copy the code or tell Saptak. Saptak will verify the coupon and mark it as "redeemed" for you! These vouchers are fully backed by promises.
              </p>
            </div>

          </div>
        )}

        {/* ==========================================
            TAB: 🎂 CAKE EXPERIENCE (RELIVE 22ND)
            ========================================== */}
        {activeTab === 'cake' && (
          <div className="max-w-xl mx-auto w-full flex-1 flex flex-col items-center justify-center p-4">
            
            {/* Cake card frame */}
            <div className="glass-panel rounded-2xl p-8 text-center shadow-2xl relative w-full flex flex-col items-center overflow-hidden">
              
              {/* Back button option */}
              <button 
                onClick={handleResetCandle}
                className="absolute top-4 right-4 bg-sage-800/40 hover:bg-sage-800 text-xs px-3 py-1 rounded border border-champagne-300/15 text-champagne-200 uppercase tracking-widest transition-all"
              >
                Reset Candle
              </button>

              <div className="relative group mt-6 select-none cursor-pointer" onClick={handleBlowCandle}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-champagne-500/5 rounded-full blur-xl animate-pulse"></div>
                <div className="relative flex flex-col items-center scale-90 md:scale-100">
                  
                  {/* Flashing Candle Flame */}
                  {!isCandleBlown && (
                    <div className="absolute -top-16 z-20">
                      <div className="w-3.5 h-10 bg-gradient-to-t from-champagne-500 to-champagne-100 rounded-full blur-[2px] animate-flicker origin-bottom"></div>
                      <div className="absolute top-2 left-1 w-1.5 h-5 bg-white rounded-full blur-[1px]"></div>
                      <div className="absolute -inset-4 bg-champagne-400/20 blur-lg animate-pulse"></div>
                    </div>
                  )}

                  {/* Smoke after blowing */}
                  {isCandleBlown && (
                    <div className="absolute -top-24 z-20">
                      <div className="w-1.5 h-16 bg-sage-400/30 blur-md rounded-full animate-smoke-rise"></div>
                    </div>
                  )}

                  {/* Candle Stem */}
                  <div className="w-3 h-14 bg-white rounded-sm shadow-md mb-1 relative z-10 border border-champagne-300/10"></div>
                  
                  {/* Cake Body */}
                  <div className="relative z-10">
                    <div className="w-48 h-28 bg-gradient-to-br from-sage-800 to-sage-900 rounded-2xl shadow-xl flex items-center justify-center border-t border-champagne-300/20">
                      <div className="absolute -top-1.5 w-full flex justify-center gap-0.5">
                        {[...Array(6)].map((_, i) => <div key={i} className="w-8 h-4 bg-champagne-200 rounded-full -ml-0.5 opacity-90"></div>)}
                      </div>
                      <span className="font-serif text-4xl text-champagne-200 drop-shadow-md z-10 mt-2">{getHerAge()}</span>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-2 bg-black/35 rounded-full blur-sm"></div>
                  </div>

                </div>
              </div>

              {/* Message status */}
              <div className="mt-8 space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl text-champagne-200">
                  {isCandleBlown ? "Candle is Extinguished" : "Make a Wish"}
                </h3>
                <p className="text-sage-400 text-xs md:text-sm tracking-widest uppercase">
                  {isCandleBlown ? "I love you baby ❤️" : "Click the candle or tap to blow it out"}
                </p>
              </div>

              {/* Confetti effect when blown */}
              {isCandleBlown && (
                <div className="fixed inset-0 pointer-events-none z-[120]">
                  {[...Array(30)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute animate-confetti" 
                      style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `-10%`, 
                        backgroundColor: ['#e6c79c', '#8a9a86', '#FAF6EE', '#465143'][Math.floor(Math.random() * 4)], 
                        width: `${Math.random() * 6 + 4}px`, 
                        height: `${Math.random() * 6 + 4}px`, 
                        animationDelay: `${Math.random() * 0.8}s`, 
                        animationDuration: `${Math.random() * 3 + 2}s` 
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==========================================
            TAB: ⚙️ ADMIN DESK / WRITER DESK
            ========================================== */}
        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            
            {/* Password Gate */}
            {!adminAuthenticated ? (
              <div className="glass-panel rounded-2xl p-6 md:p-8 text-center shadow-lg max-w-md mx-auto w-full space-y-6 mt-8">
                <h3 className="font-serif text-2xl text-champagne-200">Composition Desk Access</h3>
                <p className="text-xs text-sage-400 leading-relaxed">
                  Only Saptak (the writer) should access this board. Please input your secure password code to unlock.
                </p>
                <form onSubmit={handleAdminAuth} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Enter Desk PIN"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className={`w-full bg-sage-950/40 border border-champagne-300/10 text-center rounded-lg py-2.5 px-4 text-sm text-champagne-100 placeholder-sage-600 focus:outline-none focus:ring-1 focus:ring-champagne-400 ${adminError ? 'animate-bounce border-red-500' : ''}`}
                  />
                  <button
                    type="submit"
                    className="w-full bg-champagne-800 hover:bg-champagne-700 text-champagne-950 font-bold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                  >
                    Unlock Desk
                  </button>
                </form>
              </div>
            ) : (
              /* AUTHENTICATED PANEL */
              <div className="space-y-6">
                
                {/* Admin Top Menu bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-champagne-300/10 pb-4">
                  <div>
                    <h3 className="font-serif text-2xl text-champagne-200">Desk Dashboard</h3>
                    <p className="text-xs text-sage-400">Compose new letters, manage compliments, and backup configurations.</p>
                  </div>
                  
                  {/* Mode Selector */}
                  <div className="flex gap-2 bg-sage-950/30 p-1 border border-champagne-300/10 rounded-lg">
                    {[
                      { id: 'letters', label: 'Letters' },
                      { id: 'compliments', label: 'Compliments' },
                      { id: 'settings', label: 'Settings' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setAdminMode(btn.id)}
                        className={`px-3 py-1.5 rounded text-xs transition-all tracking-wider ${
                          adminMode === btn.id
                            ? "bg-champagne-800 text-champagne-950 font-bold"
                            : "text-sage-400 hover:text-champagne-200"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ADMIN MODE: LETTERS */}
                {adminMode === 'letters' && (
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    
                    {/* Letter composer form */}
                    <div className="glass-panel rounded-xl p-5 space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">
                        {editingLetter.id ? "Edit Letter Stem" : "Compose New Letter"}
                      </span>
                      
                      <form onSubmit={handleSaveLetter} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-sage-300 tracking-widest">Letter Title:</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. A Promise of Spring"
                            value={editingLetter.title}
                            onChange={(e) => setEditingLetter({ ...editingLetter, title: e.target.value })}
                            className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-sage-300 tracking-widest">Unlock Date (Optional):</label>
                          <input
                            type="date"
                            value={editingLetter.date}
                            onChange={(e) => setEditingLetter({ ...editingLetter, date: e.target.value })}
                            className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                          />
                          <p className="text-[9px] text-sage-500">Leave blank to unlock immediately. Assign a future date to lock it.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase text-sage-300 tracking-widest">Soundtrack Name:</label>
                            <input
                              type="text"
                              placeholder="e.g. Lover - Taylor Swift"
                              value={editingLetter.songName}
                              onChange={(e) => setEditingLetter({ ...editingLetter, songName: e.target.value })}
                              className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase text-sage-300 tracking-widest">YouTube URL:</label>
                            <input
                              type="url"
                              placeholder="https://youtube.com/..."
                              value={editingLetter.songUrl}
                              onChange={(e) => setEditingLetter({ ...editingLetter, songUrl: e.target.value })}
                              className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-sage-300 tracking-widest">Letter Content:</label>
                          <textarea
                            required
                            rows="8"
                            placeholder="Write your romantic thoughts here..."
                            value={editingLetter.content}
                            onChange={(e) => setEditingLetter({ ...editingLetter, content: e.target.value })}
                            className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400 font-serif leading-relaxed"
                          />
                        </div>

                        <div className="flex gap-2">
                          {editingLetter.id && (
                            <button
                              type="button"
                              onClick={() => setEditingLetter({ id: '', title: '', content: '', date: '', songName: '', songUrl: '' })}
                              className="flex-1 bg-sage-900 hover:bg-sage-800 text-sage-300 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                            >
                              Cancel Edit
                            </button>
                          )}
                          <button
                            type="submit"
                            className="flex-1 bg-champagne-800 hover:bg-champagne-700 text-champagne-950 font-bold py-2 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                          >
                            {editingLetter.id ? "Save Changes" : "Create Letter"}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Letter management list */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Letters Index</span>
                      
                      {letters.length === 0 ? (
                        <p className="text-xs text-sage-500 italic">No letters. Create one using the form.</p>
                      ) : (
                        <div className="space-y-2">
                          {letters.map((l) => (
                            <div key={l.id} className="glass-panel-light rounded-xl p-3 flex justify-between items-center gap-4">
                              <div className="truncate text-left">
                                <h4 className="text-xs font-semibold text-champagne-200 truncate">{l.title}</h4>
                                <div className="flex gap-2 text-[9px] text-sage-400 font-mono mt-1">
                                  <span>{l.date ? `Locked: ${l.date}` : 'Unlocked'}</span>
                                  {l.songName && <span className="truncate">| 🎵 {l.songName}</span>}
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => setEditingLetter(l)}
                                  className="p-1.5 bg-sage-800/40 hover:bg-sage-800 rounded border border-champagne-300/10 text-xs text-champagne-300 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteLetter(l.id)}
                                  className="p-1.5 bg-red-950/20 hover:bg-red-900/40 rounded border border-red-800/20 text-xs text-red-400 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* ADMIN MODE: COMPLIMENTS */}
                {adminMode === 'compliments' && (
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    
                    {/* Add compliment */}
                    <div className="glass-panel rounded-xl p-5 space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Add Daily Compliment</span>
                      <div className="space-y-2">
                        <textarea
                          rows="4"
                          maxLength="120"
                          placeholder="Write a sweet compliment (Max 120 chars)..."
                          value={newComplimentText}
                          onChange={(e) => setNewComplimentText(e.target.value)}
                          className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400 font-serif leading-relaxed"
                        />
                        <button
                          onClick={handleAddCompliment}
                          className="w-full bg-champagne-800 hover:bg-champagne-700 text-champagne-950 font-bold py-2 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                        >
                          Add to Jar
                        </button>
                      </div>
                    </div>

                    {/* Manage list */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Compliments Jar List</span>
                      
                      {compliments.length === 0 ? (
                        <p className="text-xs text-sage-500 italic">Jar is empty. Please add compliments.</p>
                      ) : (
                        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                          {compliments.map((comp, idx) => (
                            <div key={idx} className="glass-panel-light rounded-xl p-3 flex justify-between items-center gap-3 text-left">
                              <p className="text-xs text-sage-200 italic font-serif leading-relaxed">
                                "{comp}"
                              </p>
                              <button
                                onClick={() => handleDeleteCompliment(idx)}
                                className="p-1 bg-red-950/20 hover:bg-red-900/40 rounded border border-red-800/20 text-red-400 transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* ADMIN MODE: SETTINGS */}
                {adminMode === 'settings' && (
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    
                    {/* Anniversary setting */}
                    <div className="glass-panel rounded-xl p-5 space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Core Settings</span>
                      
                      <form onSubmit={handleUpdateAnniversary} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-sage-300 tracking-widest">Anniversary Start Date:</label>
                          <input
                            type="date"
                            required
                            value={anniversaryDate}
                            onChange={(e) => setAnniversaryDate(e.target.value)}
                            className="w-full bg-sage-950/40 border border-champagne-300/10 rounded-lg py-2 px-3 text-xs text-champagne-100 focus:outline-none focus:ring-1 focus:ring-champagne-400"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-champagne-800 hover:bg-champagne-700 text-champagne-950 font-bold py-2 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                        >
                          Save Anniversary Date
                        </button>
                      </form>
                    </div>

                    {/* Utility settings */}
                    <div className="glass-panel rounded-xl p-5 space-y-4">
                      <span className="text-[10px] font-bold text-champagne-400 tracking-widest uppercase block border-b border-champagne-300/10 pb-2">Desk Operations</span>
                      
                      <div className="space-y-3">
                        {/* Custom passcode lock info */}
                        <div className="space-y-1 bg-sage-950/20 border border-champagne-300/5 rounded-lg p-3">
                          <label className="text-[10px] uppercase text-champagne-300 tracking-widest font-bold block mb-1">🔑 Access Portal Info</label>
                          <p className="text-xs text-sage-300 leading-relaxed">
                            For security and romance, passcode hints are disabled on the frontend. The keys are:
                          </p>
                          <ul className="text-xs text-sage-400 list-disc pl-4 mt-1 space-y-0.5">
                            <li><strong>Her Passcode</strong>: Anniversary date (April 8th - <code className="text-champagne-200">0804</code>)</li>
                            <li><strong>Admin Passcode</strong>: Her Birthday (Dec 21st - <code className="text-champagne-200">2112</code>)</li>
                          </ul>
                        </div>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            onClick={handleResetVouchers}
                            className="w-full bg-sage-900 hover:bg-sage-800 text-sage-300 font-semibold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-all border border-sage-850"
                          >
                            Reset Scratch Vouchers
                          </button>
                          
                          <button
                            onClick={handleBackupExport}
                            className="w-full bg-champagne-800 hover:bg-champagne-700 text-champagne-950 font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase transition-all shadow"
                          >
                            Export Backup JSON
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* ==========================================
          MOBILE NAVIGATION BOTTOM BAR (NATIVE LOOK)
          ========================================== */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full bg-[#111913]/95 backdrop-blur-md border-t border-champagne-300/10 z-50 flex items-center justify-around py-2.5 select-none">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'letters', label: 'Letters', icon: Mail },
          { id: 'scrapbook', label: 'Memory', icon: Camera },
          { id: 'bouquet', label: 'Garden', icon: Flower2 },
          { id: 'vouchers', label: 'Cards', icon: Gift },
          { id: 'cake', label: 'Cake', icon: Cake },
          adminAuthenticated && { id: 'admin', label: 'Desk', icon: Settings },
        ].filter(Boolean).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
                activeTab === tab.id ? 'text-champagne-300 font-bold' : 'text-sage-500 hover:text-sage-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[8px] uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </footer>

    </div>
  );
}