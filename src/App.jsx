import React, { useState, useEffect, useRef } from 'react';
import { Play, Heart, ChevronRight, ChevronLeft, Sparkles, Music2, Star } from 'lucide-react';

/**
 * CONFIGURATION
 * 1. Photos: /public/photos/page1.jpg to page22.jpg
 * 2. Audio: /public/blow.mp3 and /public/ambient.mp3
 */

const STORY_DATA = [
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

// --- VISUAL COMPONENTS ---

const MagicalBackground = () => (
  <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
    {/* Animated Gradient Mesh */}
    <div className="absolute inset-0 opacity-40 animate-gradient-mesh bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.3),_rgba(124,58,237,0.3),_rgba(59,130,246,0.2),_transparent_70%)] scale-150"></div>
    
    {/* Moving Color Blobs */}
    <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>

    {/* Static Twinkling Stars */}
    <div className="absolute inset-0">
      {[...Array(60)].map((_, i) => (
        <div 
          key={`star-${i}`}
          className="absolute rounded-full bg-white animate-twinkle shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
    </div>

    {/* Floating Magic Dust */}
    <div className="absolute inset-0">
       {[...Array(20)].map((_, i) => (
         <div 
           key={`dust-${i}`}
           className="absolute rounded-full bg-pink-200/40 animate-float"
           style={{
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             width: `${Math.random() * 4 + 2}px`,
             height: `${Math.random() * 4 + 2}px`,
             animationDuration: `${Math.random() * 10 + 10}s`,
             animationDelay: `${Math.random() * 5}s`
           }}
         />
       ))}
    </div>

    {/* Shooting Stars */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
       {[...Array(4)].map((_, i) => (
          <div
             key={`shooting-${i}`}
             className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shooting-star"
             style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: '3s'
             }}
          />
       ))}
    </div>
  </div>
);

const PhotoCard = ({ pageId, imagePath, isActive }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`
      relative w-full max-w-[360px] aspect-[4/5]
      transition-all duration-[1200ms] ease-out
      ${isActive ? 'opacity-100 translate-y-0 rotate-0 scale-100' : 'opacity-0 translate-y-24 rotate-6 scale-90'}
    `}>
      {/* Decorative Glow Ring */}
      <div className={`absolute -inset-1 rounded-[24px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-70 blur-md transition-opacity duration-1000 ${isActive ? 'opacity-70' : 'opacity-0'}`}></div>
      
      {/* Card Body */}
      <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
        {!imgError ? (
          <img 
            src={imagePath} 
            alt={`Page ${pageId}`} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
            <Heart className="w-12 h-12 text-pink-500/50 mb-3" />
            <p className="text-white/40 text-sm">Add photo:<br/><span className="font-mono text-xs text-pink-300">/photos/page{pageId}.jpg</span></p>
          </div>
        )}

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-30 pointer-events-none"></div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-float">
         <span className="font-cursive text-2xl text-white pt-1">{pageId}</span>
      </div>
    </div>
  );
};

const ContentPanel = ({ data, isActive }) => (
  <div className={`
    flex flex-col items-center md:items-start text-center md:text-left
    transition-all duration-1000 delay-200
    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
  `}>
    
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6 backdrop-blur-sm">
      <Sparkles className="w-3 h-3 text-pink-300" />
      <span className="text-[10px] font-bold tracking-widest text-pink-200 uppercase">For You</span>
    </div>

    <p className="font-cursive text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-purple-200 leading-tight mb-8 drop-shadow-lg p-1">
      "{data.text}"
    </p>

    {/* Song Player Card */}
    <a 
      href={data.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 pr-6 backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]"
    >
       <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-black flex items-center justify-center group-hover:rotate-3 transition-transform">
          {/* Mock Album Art Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600"></div>
          <Play className="relative w-5 h-5 text-white fill-white" />
       </div>
       
       <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-white/50 group-hover:text-pink-300 transition-colors">Now Playing</span>
          <span className="text-sm font-medium text-white truncate max-w-[200px]">{data.song}</span>
       </div>

       {/* Visualizer bars (decorative) */}
       <div className="flex gap-0.5 items-end h-4 ml-4 opacity-50 group-hover:opacity-100">
          <div className="w-0.5 bg-pink-400 h-full animate-music-bar-1"></div>
          <div className="w-0.5 bg-pink-400 h-2/3 animate-music-bar-2"></div>
          <div className="w-0.5 bg-pink-400 h-3/4 animate-music-bar-3"></div>
       </div>
    </a>
  </div>
);

const Cake = ({ isBlown, onBlow }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full z-20 animate-fade-in-up">
       <div 
         onClick={onBlow}
         className="relative cursor-pointer group"
       >
          {/* Magic Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-[60px] animate-pulse"></div>

          {/* Candle & Flame */}
          <div className="relative flex flex-col items-center">
             {!isBlown && (
               <div className="absolute -top-16 z-20">
                  <div className="w-4 h-12 bg-gradient-to-t from-orange-500 to-yellow-200 rounded-full blur-[4px] animate-flicker origin-bottom"></div>
                  <div className="absolute top-2 left-1 w-2 h-6 bg-white rounded-full blur-[2px]"></div>
                  <div className="absolute -inset-6 bg-orange-400/30 blur-xl animate-pulse"></div>
               </div>
             )}
             
             {isBlown && (
                <div className="absolute -top-24 z-20">
                   <div className="w-2 h-20 bg-gray-400/40 blur-md rounded-full animate-smoke-rise"></div>
                </div>
             )}

             {/* Candle Stick */}
             <div className="w-4 h-16 bg-white rounded-sm shadow-lg mb-1 relative z-10"></div>

             {/* Cake Base */}
             <div className="relative z-10">
                <div className="w-56 h-32 bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center border-t border-white/30">
                   {/* Frosting Detail */}
                   <div className="absolute -top-2 w-full flex justify-center gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-8 h-6 bg-pink-200 rounded-full -ml-1"></div>
                      ))}
                   </div>
                   <span className="font-cursive text-5xl text-white drop-shadow-md z-10 mt-2">22</span>
                </div>
                {/* Plate */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 h-3 bg-white/20 rounded-full blur-sm"></div>
             </div>
          </div>
       </div>

       <div className={`mt-16 text-center transition-all duration-1000 ${isBlown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
          <h1 className="font-cursive text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] mb-4">
             Happy Birthday
          </h1>
          <p className="text-white/60 text-sm tracking-[0.4em] uppercase font-medium">
             {isBlown ? "Dreams do come true ✨" : "Make a wish, Baby"}
          </p>
       </div>

       {isBlown && (
         <div className="fixed inset-0 pointer-events-none">
           {[...Array(50)].map((_, i) => (
             <div key={i} className="absolute animate-confetti" 
                  style={{
                     left: `${Math.random() * 100}%`,
                     top: `-10%`,
                     backgroundColor: ['#F9A8D4', '#C4B5FD', '#FDE047', '#FFFFFF'][Math.floor(Math.random() * 4)],
                     width: `${Math.random() * 8 + 4}px`,
                     height: `${Math.random() * 8 + 4}px`,
                     animationDelay: `${Math.random() * 0.5}s`,
                     animationDuration: `${Math.random() * 3 + 3}s`
                  }}>
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const ambientRef = useRef(null);

  const totalPages = STORY_DATA.length + 1;

  useEffect(() => {
    // Initialize audio
    ambientRef.current = new Audio('/ambient.mp3');
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.5;

    // Function to handle auto-play with user interaction fallback
    const playAudio = () => {
      ambientRef.current.play().catch((error) => {
        console.log("Autoplay prevented. Waiting for user interaction...", error);
      });
    };

    // Attempt to play immediately
    playAudio();

    // Fallback: Play on first interaction (click or keypress) if blocked
    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleNext = () => { if (currentPage < totalPages - 1) setCurrentPage(p => p + 1); };
  const handlePrev = () => { if (currentPage > 0) setCurrentPage(p => p - 1); };

  const handleBlow = () => {
    setIsCandleBlown(true);
    const blowAudio = new Audio('/blow.mp3');
    blowAudio.play().catch(() => {});
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentPage]);

  return (
    <div className="relative w-full h-screen bg-[#120024] text-white overflow-hidden font-sans selection:bg-pink-500/30">
      
      {/* FONTS & ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Outfit:wght@300;400;600&display=swap');
        
        :root {
          --font-cursive: 'Great Vibes', cursive;
          --font-sans: 'Outfit', sans-serif;
        }
        .font-cursive { font-family: var(--font-cursive); }
        .font-sans { font-family: var(--font-sans); }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes music-bar {
          0%, 100% { height: 100%; }
          50% { height: 40%; }
        }
        @keyframes flicker {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1) skewX(2deg); opacity: 0.8; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-50px) scale(2); opacity: 0; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0) rotate(-45deg) scale(1); opacity: 1; }
          100% { transform: translateX(-500px) translateY(500px) rotate(-45deg) scale(0.1); opacity: 0; }
        }

        .animate-blob { animation: blob 10s infinite; }
        .animate-twinkle { animation: twinkle 3s infinite ease-in-out; }
        .animate-float { animation: float 6s infinite ease-in-out; }
        .animate-music-bar-1 { animation: music-bar 0.8s infinite ease-in-out; }
        .animate-music-bar-2 { animation: music-bar 0.8s infinite ease-in-out 0.2s; }
        .animate-music-bar-3 { animation: music-bar 0.8s infinite ease-in-out 0.4s; }
        .animate-flicker { animation: flicker 0.1s infinite alternate; }
        .animate-smoke-rise { animation: smoke-rise 2s forwards; }
        .animate-confetti { animation: confetti 4s linear forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-shooting-star { animation: shooting-star 3s linear infinite; }
      `}</style>

      <MagicalBackground />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
         <div>
            <h1 className="font-cursive text-3xl text-pink-200 drop-shadow-md">Dipanjana</h1>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
               <span className="text-[10px] tracking-widest uppercase text-white/50 font-bold">Birthday Edition</span>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12 pb-32 md:pb-12">
        {currentPage < STORY_DATA.length ? (
           <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex justify-center md:justify-end">
                 <PhotoCard 
                    pageId={STORY_DATA[currentPage].id}
                    imagePath={`./photos/page${STORY_DATA[currentPage].id}.jpg`}
                    isActive={true}
                 />
              </div>
              <div className="flex justify-center md:justify-start">
                 <ContentPanel 
                    data={STORY_DATA[currentPage]}
                    isActive={true}
                 />
              </div>
           </div>
        ) : (
           <div className="w-full max-w-xl aspect-square">
              <Cake isBlown={isCandleBlown} onBlow={handleBlow} />
           </div>
        )}
      </main>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-50 flex justify-center items-center gap-8 pointer-events-none">
         <button 
           onClick={handlePrev}
           disabled={currentPage === 0}
           className={`pointer-events-auto p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 active:scale-95 ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
         >
            <ChevronLeft className="w-6 h-6" />
         </button>

         <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pink-500 transition-all duration-500 ease-out shadow-[0_0_10px_#ec4899]"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            ></div>
         </div>

         <button 
           onClick={handleNext}
           disabled={currentPage === totalPages - 1}
           className={`pointer-events-auto p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all hover:bg-white/20 active:scale-95 ${currentPage === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
         >
            <ChevronRight className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
}